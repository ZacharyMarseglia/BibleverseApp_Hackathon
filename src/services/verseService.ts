import versesData from '../data/verses.json';
import { getVerseState, saveVerseState } from './storageService';

export interface Verse {
  id: number;
  reference: string;
  text: string;
  reflection: string;
}

const verses: Verse[] = versesData as Verse[];

export const getTodayVerse = async (): Promise<Verse> => {
  const state = await getVerseState();
  const todayString = new Date().toISOString().split('T')[0];

  if (state && state.dateString === todayString) {
    const verse = verses.find(v => v.id === state.verseId);
    if (verse) return verse;
  }

  const randomVerseIndex = Math.floor(Math.random() * verses.length);
  const selectedVerse = verses[randomVerseIndex];

  await saveVerseState({
    dateString: todayString,
    verseId: selectedVerse.id,
  });

  return selectedVerse;
};
