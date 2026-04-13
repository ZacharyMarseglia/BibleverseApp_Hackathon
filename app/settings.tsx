import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { InputField } from '../src/components/InputField';
import { TimePicker } from '../src/components/TimePicker';
import { getUserSettings, saveUserSettings } from '../src/services/storageService';
import { scheduleDailyNotification, requestNotificationPermissions } from '../src/services/notificationService';

export default function SettingsScreen() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [hour, setHour] = useState(8);
  const [minute, setMinute] = useState(0);

  useEffect(() => {
    const loadSettings = async () => {
      const s = await getUserSettings();
      if (s) {
        setName(s.name);
        setHour(s.hour);
        setMinute(s.minute);
      }
    };
    loadSettings();
  }, []);

  const handleSave = async () => {
    if (!name.trim()) {
      Alert.alert("Missing Info", "Please enter your name.");
      return;
    }

    const hasPermission = await requestNotificationPermissions();
    if (!hasPermission) {
      Alert.alert("Notice", "Notifications are not allowed. You won't receive daily reminders.");
    }

    await saveUserSettings({ name, hour, minute });
    await scheduleDailyNotification(hour, minute);

    Alert.alert("Settings Saved", "Your settings have been updated.", [
      { text: "OK", onPress: () => router.back() }
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.formSpace}>
        <InputField 
          label="Your Name" 
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

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Save Changes</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: '#ffffff',
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
