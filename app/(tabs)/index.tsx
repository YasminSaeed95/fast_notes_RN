import DynamicImage from '@/components/ui/DynamicImage';
import { useAuthContext } from '@/hooks/use-auth-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { useFastNotes } from '../../context/notes_context';

export default function HomeScreen() {
  const router = useRouter();
  const { notes, loading, refresh, loadMore, hasMore  } = useFastNotes();
  const { logout } = useAuthContext();

  useFocusEffect(
    useCallback(() => {
      refresh();
    }, [refresh])
  );

  const handleLogout = async () => {
    await logout!();
    router.replace('/login');
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Job Notes</Text>
      </View>

      {loading ? (
        <View testID="loader">
          <ActivityIndicator size="large" color="#0000ff" />
          <Text>Loading notes...</Text>
        </View>
      ) : notes.length === 0 ? (
        <Text style={styles.emptyText}>No notes yet 📭</Text>
      ) : (
        <FlatList
          data={notes}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 120 }}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.noteItem}
              onPress={() =>
                router.push({
                  pathname: '/note_detail',
                  params: {
                    id: item.id,
                    title: item.title,
                    content: item.text,
                    imageUrl: item.image_url,
                  },
                })
              }
            >
              <View style={styles.noteHeader}>
                <MaterialIcons name="notes" size={20} color="#007AFF" />
                <Text style={styles.noteTitle}>{item.title}</Text>
              </View>
              <Text style={styles.noteContent} numberOfLines={2}>
                {item.text}
              </Text>
              {item.image_url && <DynamicImage uri={item.image_url} />}
            </TouchableOpacity>
          )}
        />
      )}

      {/* Flytende Add Note knapp */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => router.push('/new_note')}
      >
        <MaterialIcons name="note-add" size={20} color="#ffffff" />
        <Text style={styles.addButtonText}>Add Note</Text>
      </TouchableOpacity>

      {/* Logout knapp */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <MaterialIcons name="logout" size={24} color="#ffffff" />
        <Text style={styles.addButtonText}>Logout</Text>
      </TouchableOpacity>

      {/* Load more knapp */}
      <TouchableOpacity style={styles.loadMoreButton} onPress={loadMore}>
        <MaterialIcons name="download" size={24} color="#ffffff" />
        <Text style={styles.addButtonText}>Load More</Text>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
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
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#009dff',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 30,
    position: 'absolute',
    bottom: 70,
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
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#009dff',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 30,
    position: 'absolute',
    bottom: 70,
    left: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 4,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: '#777',
  },
loadMoreButton: {
  flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  paddingVertical: 12,
  paddingHorizontal: 12,
  backgroundColor: '#009dff',
  borderRadius: 30,
  alignSelf: 'center',
  marginVertical: 10,
  elevation: 3,
  shadowColor: '#000',
  shadowOpacity: 0.2,
  shadowOffset: { width: 0, height: 2 },
  shadowRadius: 4,
  fontWeight: 'bold',
  fontSize: 16,
   position: 'absolute',
    bottom: 120,
    right: 20,
},

});