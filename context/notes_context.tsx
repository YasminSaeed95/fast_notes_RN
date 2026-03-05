import { useAuthContext } from '@/hooks/use-auth-context';
import { supabase } from '@/lib/supabase';
import * as Notifications from 'expo-notifications';
import { useCallback, useEffect, useState } from 'react';

export type Note = {
  id: string;
  title: string;
  text: string;
  user_id: string;
  updated_at: string;
  image_url?: string | null;
};


async function fetchLatestNotes (limit = 100) {
  const { data, error } = await supabase
    .from('fast-notes')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) throw error;

  // const response: Note[] = [];
  // data.map((note: any) => {
  //   response.push({
  //     id: note.id, 
  //     title: note.title,
  //     text: note.text,
  //     user_id: note.user_id,
  //     updated_at: note.updated_at
  //   });
  // });

  // return response;
  return data;
}


// A custom hook to get and set notes in storage (AsyncStorage + Supabase sync)
export function useFastNotes() {
  const { session } = useAuthContext()
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);

        const notesFromDb = await fetchLatestNotes();
        if (mounted) setNotes(notesFromDb);
      } catch (e) {
        console.error(e);
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
      try {
        const ch = (globalThis as any).__catfacts_channel;
        if (ch && typeof ch.unsubscribe === 'function') ch.unsubscribe();
      } catch {}
    };
  }, [notes]);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const notesFromDb = await fetchLatestNotes();
      setNotes(notesFromDb);
    } catch (e) {
      console.error('Failed to refresh FastNotes', e);
    } finally {
      setLoading(false);
    }
  }, [session]);


  const addNote = useCallback(async (title: string, text: string, imageUrl?: string) => {
    if (!session) {
      console.warn('No session available yet');
      return;
    }
    if (!title.trim() || !text.trim()) {
    throw new Error('Title and text cannot be empty')
    }

    console.log("Session user id:", session?.user?.id);
    
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
        .select();

      if (!error) {
      
        await refresh();

     
        // Lokal Trigger: send notifikasjon
    
            await Notifications.scheduleNotificationAsync({
              content: {
                title: 'New note',
            body: `You added a new note: ${title}`, // viser notatets tittel
              },
          trigger: null, // null = send med en gang
            });
          
        }

        return { data, error };
      } catch (e) {
        console.error('addNote error', e);
        return { data: null, error: e };
      }
    },
    [session, refresh]
  );

  

  const updateNote = useCallback(async (id: string, newTitle: string, newText: string,) => {
    if (!session) {
      console.warn('No session available yet');
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
        .select('id');
      
      if (!error) {
        await refresh();
      }

      return { data, error };
    } catch (e) {
      console.error('Update Note error', e);
      return { data: null, error: e };
    }
  }, [session,refresh]);

const deleteNote = useCallback(async (id: string) => {
    if (!session) {
      console.warn('No session available yet');
      return;
    }
 
    try {
      const { data, error } = await supabase
        .from('fast-notes')
        .delete()
        .eq('id', id)
        .eq('user_id', session.user.id)
        .select('id');
      
      if (!error) {
        await refresh();
      }

      return { data, error };
    } catch (e) {
      console.error('Delete Note error', e);
      return { data: null, error: e };
    }
  }, [session,refresh]);


  return { notes, setNotes, refresh, loading, addNote, updateNote, deleteNote } as const;
}
 
