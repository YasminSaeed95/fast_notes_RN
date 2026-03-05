import { useFastNotes } from '@/context/notes_context';
import { supabase } from '@/lib/supabase';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, Button, Image, ScrollView, StyleSheet, TextInput, View } from 'react-native';


export default function NoteDetail() {
    const router = useRouter();
    const {updateNote, deleteNote} = useFastNotes(); 
    const { id, title, content } = useLocalSearchParams(); // Get the title and content passed via router

      // Local state for editing
    const [titleState, setTitleState] = useState(title as string || '');
    const [contentState, setContentState] = useState(content as string || '');
    const [imageState, setImageState] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [removeImage, setRemoveImage] = useState(false); // true hvis brukeren vil slette bildet

     // ---------- Hent notatet fra Supabase ----------
  useEffect(() => {
    if (!id) return;

    const fetchNote = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('fast-notes')
          .select('*')
          .eq('id', id as string)
          .single();

        if (error) {
          console.error(error);
          Alert.alert('Failed to fetch note');
          return;
        }

        if (data) {
          setTitleState(data.title);
          setContentState(data.text);
          setImageState(data.image_url || null); // Her får vi URL fra DB
        }
      } catch (e) {
        console.error(e);
        Alert.alert('Error fetching note');
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id]);

const handleUpdate = async () => {
  if (!id) 
    return;

  try {
    await updateNote(id as string , titleState, contentState).then(res => {
              if (res && res.data && res.data.length > 0) {
                alert('✅ Note updated successfully!');
              } else {
                alert('🚫 You are not allowed to update this note');
              }
    router.back(); 
     });
     
  } catch (e) {
    console.error(e);
    alert('Failed to update note');
  }
};

const handleDelete = async () => {
  if (!id) return;

    Alert.alert(
      'Delete Note',
      'Are you sure you want to delete this note?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {// Hent notatet først for å få image_url
            const { data: noteData, error: fetchError } = await supabase
              .from('fast-notes')
              .select('image_url')
              .eq('id', id as string)
              .single();

            if (fetchError) {
              console.error(fetchError);
              alert('Failed to fetch note before deleting');
              return;
            }

            // Hvis bilde finnes → slett fra storage
            if (noteData?.image_url) {
              const filePath = noteData.image_url.split('/').pop(); 
              // Viktig: dette må matche pathen du bruker i uploadImage()

              if (filePath) {
                const { error: storageError } = await supabase.storage
                  .from('note-images') // 👈 ditt bucket-navn
                  .remove([filePath]);

                if (storageError) {
                  console.error(storageError);
                }
              }
            }

            //  Slett notatet fra databasen
            await deleteNote(id as string).then(res => {
              if (res && res.data && res.data.length > 0) {
                alert('✅ Note deleted successfully!');
              } else {
                alert('🚫 You are not allowed to delete this note');
              }
            
              router.back();
            });

          } catch (e) {
            console.error(e);
            alert('Failed to delete note');
          }
        },
      },
    ]
  );
};

  return (
    <ScrollView contentContainerStyle={styles.container}>
     

      <TextInput
        style={styles.input}
        value={titleState}
        onChangeText={setTitleState}
        placeholder="Title"
      />

      <TextInput
        style={[styles.input, styles.contentInput]}
        value={contentState}
        onChangeText={setContentState}
        placeholder="Write your note here..."
        multiline
      />

       {imageState && (
        <Image
          source={{ uri: imageState }}
          style={styles.image}
          resizeMode="contain"
        />
      )}

      <Button title="Update Note" onPress={handleUpdate} />

      <View style={{ marginTop: 10 }}>
        <Button title="Delete Note" onPress={handleDelete} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
  contentInput: {
    height: 120,
    textAlignVertical: 'top',
  },
  image: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 8,
    marginTop: 10
  },
});