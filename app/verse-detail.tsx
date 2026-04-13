import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { getTodayVerse, Verse } from '../src/services/verseService';

export default function VerseDetailScreen() {
  const { verseId } = useLocalSearchParams();
  const [verse, setVerse] = useState<Verse | null>(null);

  useEffect(() => {
    const fetchVerse = async () => {
      const v = await getTodayVerse();
      setVerse(v);
    };
    fetchVerse();
  }, []);

  if (!verse) return <View style={styles.container}></View>;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.reference}>{verse.reference}</Text>
        <Text style={styles.text}>"{verse.text}"</Text>
        
        <View style={styles.divider} />
        
        <Text style={styles.reflectionLabel}>Reflection</Text>
        <Text style={styles.reflection}>{verse.reflection}</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#ffffff' },
  container: {
    padding: 30,
  },
  reference: {
    fontSize: 18,
    fontWeight: '700',
    color: '#888888',
    marginBottom: 10,
  },
  text: {
    fontSize: 24,
    lineHeight: 36,
    fontWeight: '600',
    color: '#222222',
  },
  divider: {
    height: 1,
    backgroundColor: '#eaeaea',
    marginVertical: 30,
  },
  reflectionLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333333',
    marginBottom: 10,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  reflection: {
    fontSize: 18,
    lineHeight: 28,
    color: '#555555',
  }
});
