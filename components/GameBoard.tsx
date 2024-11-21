import React, { useEffect, useState } from "react";
import { getInitialCards } from "../utils/boardUtils";
import { View, StyleSheet } from "react-native";
import { Card } from "./Card";

export function Board({
  currentPlayer,
  onTurnChange,
  onGameOver,
  onScoreUpdate,
}: any) {
  const [cards, setCards] = useState(getInitialCards());
  const [flippedCards, setFlippedCards] = useState<number[]>([]); // [4, 5]
  const [matchedCards, setMatchedCards] = useState<number[]>([]); // []
  const [isFlipping, setIsFlipping] = useState(false);

  const handleCardPress = (index: number) => {
    // Verificar se a carta já está aberta ou se já foi pareada
    if (
      isFlipping ||
      matchedCards.includes(index) ||
      flippedCards.includes(index)
    ) {
      return;
    }

    // Adicionar a carta virada ao array de flippedCards
    if (flippedCards.length === 1) {
      setFlippedCards([...flippedCards, index]);
      setIsFlipping(true);
    } else {
      setFlippedCards([index]);
    }
  };

  useEffect(() => {
    if (flippedCards.length === 2) {
      const [firstIndex, secondIndex] = flippedCards;

      // Verificar se as cartas viradas são iguais
      if (cards[firstIndex] === cards[secondIndex]) {
        // Marcar como pareadas
        setMatchedCards((prev) => [...prev, firstIndex, secondIndex]);
        // Atualizar o placar do jogador
        onScoreUpdate(currentPlayer); // Aqui chamamos a função para atualizar o placar
      }

      // Após 700ms, reinicia as cartas viradas e muda o turno
      setTimeout(() => {
        // Verificar se todas as cartas foram pareadas
        if (matchedCards.length + 2 === cards.length) {
          onGameOver(currentPlayer); // Finalizar o jogo
        } else {
          setFlippedCards([]);
          setIsFlipping(false);
          // Mudar o turno
          onTurnChange(currentPlayer === 1 ? 2 : 1);
        }
      }, 700);
    }
  }, [flippedCards, matchedCards, cards, currentPlayer, onTurnChange, onGameOver, onScoreUpdate]);

  return (
    <View style={styles.container}>
      {cards.map((card, index) => (
        <Card
          isFlipped={flippedCards.includes(index) || matchedCards.includes(index)}
          backContent={card}
          onPress={() => handleCardPress(index)}
          key={index}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
});
