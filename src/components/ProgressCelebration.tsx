import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Expo icons

interface ProgressCelebrationProps {
  progress: number; // percentage 0-100
}

export const ProgressCelebration: React.FC<ProgressCelebrationProps> = ({ progress }) => {
  const showCelebration = progress >= 100;

  return (
    <View style={styles.container}>
      {showCelebration ? (
        <View style={styles.celebration}>
          <Ionicons name="trophy-outline" size={48} color="gold" />
          <Text style={styles.text}>Congratulations! 🎉</Text>
        </View>
      ) : (
        <View style={styles.progress}>
          <Text style={styles.text}>Progress: {progress}%</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 16,
  },
  celebration: {
    alignItems: 'center',
  },
  progress: {
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 16,
    marginTop: 8,
  },
});
