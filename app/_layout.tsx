import { Stack } from 'expo-router';
import { requestNotificationPermissions } from '../src/services/notificationService';
import { useEffect } from 'react';

export default function RootLayout() {
  useEffect(() => {
    requestNotificationPermissions();
  }, []);

  return (
    <Stack 
      screenOptions={{ 
        headerStyle: { backgroundColor: '#ffffff' },
        headerShadowVisible: false,
        headerTintColor: '#333333',
        headerTitleStyle: { fontWeight: 'bold' },
        contentStyle: { backgroundColor: '#fdfdfd' }
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="setup" options={{ headerShown: false }} />
      <Stack.Screen name="home" options={{ title: 'Daily Bible Verse', headerBackVisible: false }} />
      <Stack.Screen name="verse-detail" options={{ title: 'Reflection' }} />
      <Stack.Screen name="settings" options={{ title: 'Settings', presentation: 'modal' }} />
    </Stack>
  );
}
