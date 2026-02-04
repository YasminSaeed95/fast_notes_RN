import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useContext } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { NotesContext } from '../_context/notes_context';

export default function HomeScreen() {
  const router = useRouter();
  const { notes } = useContext(NotesContext); // fetch the list from context


  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Notes</Text>

      {notes.length === 0 ? (
        <Text style={styles.emptyText}>No notes yet 📭</Text>
      ) : (
        <FlatList
          data={notes}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 100 }}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.noteItem}
              onPress={() =>
                router.push({
                  pathname: '/note_detail',
                  params: { title: item.title, content: item.content },
                })
              }
            >
              <View style={styles.noteHeader}>
                <MaterialIcons name="notes" size={20} color="#007AFF" />
                <Text style={styles.noteTitle}>{item.title}</Text>
              </View>

              <Text style={styles.noteContent} numberOfLines={2}>
                {item.content}
              </Text>
            </TouchableOpacity>
          )}
        />
      )}

      {/* Floating Add Button – ALWAYS visible */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => router.push('/new_note')}
      >
        <MaterialIcons name="note-add" size={20} color="#ffffff" />
        <Text style={styles.addButtonText}>Add Note</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  noteItem: {
    width: '100%',
    padding: 18,
    borderRadius: 12,
    backgroundColor: '#ffffff',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 3,
  },
  noteHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
    gap: 6,
  },
  noteTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000000',
  },
  noteContent: {
    fontSize: 15,
    color: '#555',
    lineHeight: 20,
  },
  addButton: {
    flexDirection: 'row',       // ← KEY
    alignItems: 'center',       // vertically aligned nicely
    gap: 8,
    backgroundColor: '#007AFF',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 30,
    position: 'absolute',
    bottom: 30,
    right: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 4,
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: '#777',
  },
});
