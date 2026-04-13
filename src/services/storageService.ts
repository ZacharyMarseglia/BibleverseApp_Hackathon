import AsyncStorage from '@react-native-async-storage/async-storage';

export interface UserSettings {
  name: string;
  hour: number;
  minute: number;
}

export interface VerseState {
  dateString: string; // YYYY-MM-DD
  verseId: number;
}

const SETTINGS_KEY = '@app_settings';
const VERSE_STATE_KEY = '@app_verse_state';

export const saveUserSettings = async (settings: UserSettings): Promise<void> => {
  try {
    const jsonValue = JSON.stringify(settings);
    await AsyncStorage.setItem(SETTINGS_KEY, jsonValue);
  } catch (e) {
    console.error('Failed to save settings.', e);
  }
};

export const getUserSettings = async (): Promise<UserSettings | null> => {
  try {
    const jsonValue = await AsyncStorage.getItem(SETTINGS_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error('Failed to load settings.', e);
    return null;
  }
};

export const saveVerseState = async (state: VerseState): Promise<void> => {
  try {
    const jsonValue = JSON.stringify(state);
    await AsyncStorage.setItem(VERSE_STATE_KEY, jsonValue);
  } catch (e) {
    console.error('Failed to save verse state.', e);
  }
};

export const getVerseState = async (): Promise<VerseState | null> => {
  try {
    const jsonValue = await AsyncStorage.getItem(VERSE_STATE_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error('Failed to load verse state.', e);
    return null;
  }
};
