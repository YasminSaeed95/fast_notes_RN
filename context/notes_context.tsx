import { useAuthContext } from '@/hooks/use-auth-context';
import { supabase } from '@/lib/supabase';
import * as Notifications from 'expo-notifications';
import { useCallback, useEffect, useState } from 'react';
import { Alert } from 'react-native';

export type Note = {
  id: string;
  title: string;
  text: string;
  user_id: string;
  updated_at: string;
  image_url?: string | null;
};


async function fetchLatestNotes(limit = 5, page = 0) {
  const start = page * limit;
  const end = start + limit - 1;

  const { data, error } = await supabase
    .from('fast-notes')
    .select('*')
    .order('created_at', { ascending: false })
    .range(start, end);

  if (error) throw error;
  return data;
}


// A custom hook to get and set notes in storage (AsyncStorage + Supabase sync)
export function useFastNotes() {
  const { session } = useAuthContext()
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState(0); // side 0 = første 5 notater
  const [hasMore, setHasMore] = useState(true); // om det finnes flere notater å hente

  useEffect(() => {
    const loadNotes = async () => {
      setLoading(true);

      try {
      const notesFromDb = await fetchLatestNotes(5, 0);
      setNotes(notesFromDb);
      setPage(0);
      setHasMore(notesFromDb.length === 5); // hvis mindre enn 5, er det ingen flere
    } catch {
      Alert.alert("Failed to load notes");
    } finally {
      setLoading(false);
    }
  };

    loadNotes();
  }, [session]);

const refresh = useCallback(async () => {
  setLoading(true);
  try {
    const notesFromDb = await fetchLatestNotes(5, 0);
    setNotes(notesFromDb);
    setPage(0);
    setHasMore(notesFromDb.length === 5);
  } catch (e) {
    Alert.alert("Failed to refresh FastNotes");
  } finally {
    setLoading(false);
  }
}, [session]);


  const addNote = useCallback(async (title: string, text: string, imageUrl?: string) => {
    if (!session) {
      Alert.alert("No session available yet")
   
      return;
    }
    if (!title.trim() || !text.trim()) {
    throw new Error('Title and text cannot be empty')
    }
    
     try {
      // Legg til notatet i Supabase
      const { data, error } = await supabase
        .from('fast-notes')
        .insert({
          title,
          text,
          user_id: session.user.id,
          created_at: new Date(),
          image_url: imageUrl ?? null,
        })
        .select()
        .single();

      if (error) {
        Alert.alert("Failed to add note");
        return;
      }

      setNotes(prev => [data, ...prev]);

     
      // Lokal Trigger: send notifikasjon
      await Notifications.scheduleNotificationAsync({
        content: {
          title: 'New note',
          body: `You added a new note: ${title}`, // viser notatets tittel
        },
        trigger: null, // null = send med en gang
      });
          
        

        return { data, error };
      } catch (e) {
        return { data: null, error: e };
      }
    },
    [session, setNotes]
  );

  

  const updateNote = useCallback(async (id: string, newTitle: string, newText: string,) => {
    if (!session) {
      Alert.alert("No session available yet")
      return;
    }
    if (!newTitle.trim() || !newText.trim()) {
    throw new Error('Title and text cannot be empty')
    }

    try {
      const { data, error } = await supabase
        .from('fast-notes')
        .update({title: newTitle, text: newText, updated_at: new Date() })
        .eq('id', id)
        .eq('user_id', session.user.id)
        .select()
        .single();
      
      if (error) {
        Alert.alert("Failed to update note");
        return;
      }

      setNotes(prev =>
        prev.map(note =>
          note.id === id
            ? { ...note, ...data }
            : note
        )
      );

      return { data, error };
    } catch (e) {
      return { data: null, error: e };
    }
  }, [session, setNotes]);

const deleteNote = useCallback(async (id: string) => {
    if (!session) {
      Alert.alert("No session available yet")
      return;
    }
 
    try {
      const { data, error } = await supabase
        .from('fast-notes')
        .delete()
        .eq('id', id)
        .eq('user_id', session.user.id)
        .select('id');
      
      if (error) {
        Alert.alert("Failed to delete note");
        return;
      }

      setNotes(prev => prev.filter(note => note.id !== id));

      return { data, error };
    } catch (e) {
      Alert.alert("Delete Note failed");      
      return { data: null, error: e };
    }
  }, [session, setNotes]);

  const loadMore = useCallback(async () => {
  if (!hasMore || loading) return;

  setLoading(true);
  try {
    const nextPage = page + 1;
    const newNotes = await fetchLatestNotes(5, nextPage);
    setNotes(prev => [...prev, ...newNotes]);
    setPage(nextPage);
    setHasMore(newNotes.length === 5); // hvis mindre enn 5, ingen flere notater
  } catch (e) {
    Alert.alert("Failed to load more notes");
  } finally {
    setLoading(false);
  }
}, [page, hasMore, loading]);


  return { notes, setNotes, refresh, loading, addNote, updateNote, deleteNote, loadMore, hasMore } as const;
}
 
