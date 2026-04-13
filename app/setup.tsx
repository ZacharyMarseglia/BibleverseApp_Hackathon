import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { InputField } from '../src/components/InputField';
import { TimePicker } from '../src/components/TimePicker';
import { saveUserSettings } from '../src/services/storageService';
import { scheduleDailyNotification, requestNotificationPermissions } from '../src/services/notificationService';

export default function SetupScreen() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [hour, setHour] = useState(8);
  const [minute, setMinute] = useState(0);

  const handleCompleteSetup = async () => {
    if (!name.trim()) {
      Alert.alert("Missing Info", "Please enter your name.");
      return;
    }

    const hasPermission = await requestNotificationPermissions();
    if (!hasPermission) {
      Alert.alert("Notice", "Notifications were not allowed. You won't receive daily reminders, but you can still read verses in the app.");
    }

    await saveUserSettings({ name, hour, minute });
    await scheduleDailyNotification(hour, minute);

    router.replace('/home');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Welcome \uD83D\uDC4B</Text>
        <Text style={styles.subtitle}>Let's set up your daily verse.</Text>

        <View style={styles.formSpace}>
          <InputField 
            label="Your Name" 
            placeholder="John Doe" 
            value={name}
            onChangeText={setName}
          />

          <TimePicker 
            hour={hour} 
            minute={minute} 
            onChangeHour={setHour} 
            onChangeMinute={setMinute} 
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleCompleteSetup}>
          <Text style={styles.buttonText}>Complete Setup</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#ffffff' },
  container: {
    flexGrow: 1,
    padding: 30,
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#111111',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#666666',
    marginBottom: 40,
  },
  formSpace: {
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#333333',
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '700',
  }
});
