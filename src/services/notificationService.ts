import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

// Behavior when app is in foreground
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export const requestNotificationPermissions = async (): Promise<boolean> => {
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  return finalStatus === 'granted';
};

export const scheduleDailyNotification = async (hour: number, minute: number): Promise<void> => {
  await cancelAllNotifications();
  
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Daily Bible Verse \u2728",
      body: "Time for your daily verse! Tap to read and reflect.",
    },
    trigger: { 
      type: Notifications.SchedulableTriggerInputTypes.DAILY,
      hour, 
      minute 
    },
  });
};

export const cancelAllNotifications = async (): Promise<void> => {
  await Notifications.cancelAllScheduledNotificationsAsync();
};
