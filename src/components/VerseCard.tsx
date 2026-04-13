import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Verse } from '../services/verseService';

export const VerseCard = ({ verse }: { verse: Verse }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.text}>"{verse.text}"</Text>
      <Text style={styles.reference}>- {verse.reference}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 30,
    marginVertical: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.05,
    shadowRadius: 20,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  text: {
    fontSize: 22,
    lineHeight: 32,
    fontWeight: '600',
    color: '#333333',
    fontStyle: 'italic',
    textAlign: 'center',
    marginBottom: 20,
  },
  reference: {
    fontSize: 16,
    fontWeight: '700',
    color: '#888888',
    textAlign: 'right',
  },
});
