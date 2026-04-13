import { useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { getUserSettings } from '../src/services/storageService';

export default function IndexScreen() {
  const router = useRouter();

  useEffect(() => {
    const checkSetup = async () => {
      const settings = await getUserSettings();
      if (settings && settings.name) {
        router.replace('/home');
      } else {
        router.replace('/setup');
      }
    };
    checkSetup();
  }, []);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#333333" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff'
  }
});
