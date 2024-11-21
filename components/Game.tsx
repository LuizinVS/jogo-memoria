import React, { useState } from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';
import { Board } from './GameBoard';
export default function Game() {
  const [currentPlayer, setCurrentPlayer] = useState<1 | 2>(1); // Jogador atual
  const [player1Score, setPlayer1Score] = useState(0); // Placar do jogador 1
  const [player2Score, setPlayer2Score] = useState(0); // Placar do jogador 2
  const [gameOver, setGameOver] = useState(false); // Estado de jogo terminado

  // Função para alternar o turno entre os jogadores
  const onTurnChange = (player: 1 | 2) => {
    setCurrentPlayer(player);
  };

  // Função que é chamada quando o jogo termina
  const onGameOver = (winningPlayer: 1 | 2) => {
    setGameOver(true);
    alert(`Jogador ${winningPlayer} venceu!`);
  };

  // Função que atualiza o placar dos jogadores
  const onScoreUpdate = (player: 1 | 2) => {
    if (player === 1) {
      setPlayer1Score((prevScore) => prevScore + 1);
    } else {
      setPlayer2Score((prevScore) => prevScore + 1);
    }
  };

  // Função para reiniciar o jogo
  const onRestartGame = () => {
    setPlayer1Score(0);
    setPlayer2Score(0);
    setCurrentPlayer(1); // Começar com o jogador 1
    setGameOver(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.scoreText}>
        Jogador 1: {player1Score} - Jogador 2: {player2Score}
      </Text>

      {/* Exibir quem está jogando */}
      <Text style={styles.turnText}>
        {`Jogador ${currentPlayer} está jogando`}
      </Text>

      {/* Passando as funções como props para o Board */}
      <Board
        currentPlayer={currentPlayer}
        onTurnChange={onTurnChange}
        onGameOver={onGameOver}
        onScoreUpdate={onScoreUpdate} // Passando a função corretamente
      />

      {/* Exibir o botão de reinício caso o jogo tenha acabado */}
      {gameOver && (
        <Button title="Reiniciar Jogo" onPress={onRestartGame} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  scoreText: {
    fontSize: 24,
    marginBottom: 20,
  },
  turnText: {
    fontSize: 18,
    marginBottom: 20,
  },
});
