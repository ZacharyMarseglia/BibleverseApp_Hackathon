import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ActivityIndicator } from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import { getUserSettings, UserSettings } from '../src/services/storageService';
import { getTodayVerse, Verse } from '../src/services/verseService';
import { VerseCard } from '../src/components/VerseCard';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function HomeScreen() {
  const router = useRouter();
  const [settings, setSettings] = useState<UserSettings | null>(null);
  const [verse, setVerse] = useState<Verse | null>(null);

  useEffect(() => {
    const loadData = async () => {
      const uSettings = await getUserSettings();
      if (uSettings) setSettings(uSettings);

      const v = await getTodayVerse();
      setVerse(v);
    };
    loadData();
  }, []);

  // Use focus effect to refresh settings when returning from settings screen
  useFocusEffect(
    useCallback(() => {
      const reload = async () => {
        const uSettings = await getUserSettings();
        if (uSettings) setSettings(uSettings);
      };
      reload();
    }, [])
  );

  if (!settings || !verse) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#333333" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Hello, {settings.name}</Text>
        <TouchableOpacity onPress={() => router.push('/settings')} style={styles.settingsBtn}>
          <Ionicons name="settings-outline" size={24} color="#333333" />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Text style={styles.subGreeting}>Here is your verse for today:</Text>
        
        <VerseCard verse={verse} />

        <TouchableOpacity 
          style={styles.readMoreButton} 
          onPress={() => router.push({ pathname: '/verse-detail', params: { verseId: verse.id } })}
        >
          <Text style={styles.readMoreText}>Read Reflection</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  safeArea: { flex: 1, backgroundColor: '#fdfdfd' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 10,
  },
  greeting: {
    fontSize: 28,
    fontWeight: '800',
    color: '#111111',
  },
  settingsBtn: {
    padding: 8,
  },
  content: {
    paddingHorizontal: 24,
    flex: 1,
    justifyContent: 'center',
  },
  subGreeting: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 5,
  },
  readMoreButton: {
    marginTop: 20,
    alignSelf: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
  },
  readMoreText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
  }
});
