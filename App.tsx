import React, { useState } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import { Board } from './components/GameBoard'; // Componente do tabuleiro de jogo

export default function Game() {
  // Estado para controlar o turno (Jogador 1 ou Jogador 2)
  const [turn, setTurn] = useState<1 | 2>(1); // 1 para Jogador 1, 2 para Jogador 2
  const [player1Score, setPlayer1Score] = useState(0); // Pontuação do Jogador 1
  const [player2Score, setPlayer2Score] = useState(0); // Pontuação do Jogador 2
  const [isGameOver, setIsGameOver] = useState(false); // Flag para controle de fim de jogo

  // Função para reiniciar o jogo
  const handleGameReset = () => {
    setTurn(1); // Reinicia para o Jogador 1 começar
    setPlayer1Score(0); // Reinicia a pontuação do Jogador 1
    setPlayer2Score(0); // Reinicia a pontuação do Jogador 2
    setIsGameOver(false); // Reseta o estado do jogo
  };

  // Função chamada quando um jogador vence
  const handleGameOver = (winner: 1 | 2) => {
    setIsGameOver(true); // O jogo acabou
    if (winner === 1) {
      setPlayer1Score(player1Score + 1); // Incrementa a pontuação do Jogador 1
    } else {
      setPlayer2Score(player2Score + 1); // Incrementa a pontuação do Jogador 2
    }
  };

  return (
    <View style={styles.container}>
      {/* Exibe o nome do jogador atual */}
      <Text style={styles.turnText}>
        {isGameOver
          ? `Jogador ${turn === 1 ? 2 : 1} venceu!` // Exibe quem venceu
          : `Jogador ${turn} está jogando`} {/* Exibe o turno atual */}
      </Text>
      
      {/* Passa o turno para o Board e fornece funções de controle */}
      <Board 
        currentPlayer={turn} // Passa o jogador atual para o Board
        onTurnChange={setTurn} // Altera o turno após cada jogada
        onGameOver={handleGameOver} // Chama o fim do jogo quando alguém vencer
      />
      
      {/* Botão de reiniciar o jogo, só aparece após a vitória */}
      {isGameOver && (
        <View style={styles.buttons}>
          <Button title="Reiniciar Jogo" onPress={handleGameReset} />
        </View>
      )}

      {/* Exibe a pontuação de cada jogador */}
      <View style={styles.scores}>
        <Text style={styles.scoreText}>Jogador 1: {player1Score}</Text>
        <Text style={styles.scoreText}>Jogador 2: {player2Score}</Text>
      </View>
    </View>
  );
}

// Estilos para o componente Game
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  turnText: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  buttons: {
    marginTop: 20,
  },
  scores: {
    marginTop: 20,
    alignItems: 'center',
  },
  scoreText: {
    fontSize: 20,
  },
});