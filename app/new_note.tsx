import { useRouter } from 'expo-router';
import { useContext, useState } from 'react';
import { Button, KeyboardAvoidingView, Platform, StyleSheet, TextInput } from 'react-native';
import { NotesContext } from './_context/notes_context';

export default function NewNoteScreen() {
  const router = useRouter();
  const { addNote } = useContext(NotesContext); // <- Get the function from context
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />

      <TextInput
        style={[styles.input, styles.contentInput]}
        placeholder="Write your note here..."
        value={content}
        onChangeText={setContent}
        multiline
      />

      <Button
        title="Save"
        onPress={() => {
          console.log('Save pressed');
          addNote(title, content);  // Adds the note to the list via addNote from NotesContext
          router.back();             // Goes back to HomeScreen
        }}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
});
