import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { NotesProvider } from './_context/notes_context';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <NotesProvider>
      <Stack>
  <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
  <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
  <Stack.Screen name="new_note" options={{ title: 'New Note' }} />
    <Stack.Screen name="note_detail" options={{ title: 'Note Detail' }} />
</Stack>
      <StatusBar style="auto" />
    </NotesProvider>
  );
}
