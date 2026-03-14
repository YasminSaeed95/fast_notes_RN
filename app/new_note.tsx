import AddPicture from '@/components/ui/AddPicture'; // importerer AddPicture
import { useFastNotes } from '@/context/notes_context';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator, Alert, Button, KeyboardAvoidingView, Modal, Platform, Text as RNText, StyleSheet, TextInput, View } from 'react-native';

export default function NewNoteScreen() {
  const router = useRouter();
  const { addNote } = useFastNotes();
  const [imageState, setImageState] = useState<string | null>(null);
  const [imageRatio, setImageRatio] = useState<number | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null); // lagrer URI fra AddPicture
  const [isloading, setIsloading] = useState(false);

const validateImage = async (uri: string) => {
  try {
    const response = await fetch(uri);
    const blob = await response.blob();


    // Sjekk størrelse < 15 MB
    const sizeInMB = blob.size / (1024 * 1024);
    if (sizeInMB > 15) {
      Alert.alert('File too large', 'Image must be smaller than 15 MB');
      return false;
    }

    // Sjekk format
    const allowedTypes = ['image/jpg', 'image/jpeg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(blob.type)) {
      Alert.alert('Invalid file type', 'Only JPG, PNG, or WebP allowed');
      return false;
    }

    return true;
  } catch (error) {
    Alert.alert('Validation error', 'Could not validate image');
    return false;
  }
};


const uploadImage = async (uri: string) => {
  try {
    const response = await fetch(uri);
    const arrayBuffer = await response.arrayBuffer();

    const fileExt = uri.split('.').pop()?.toLowerCase();

    let contentType = '';
    if (fileExt === 'png') contentType = 'image/png';
    if (fileExt === 'webp') contentType = 'image/webp';
    if (fileExt === 'jpg') contentType = 'image/jpg';
    if (fileExt === 'jpeg') contentType = 'image/jpg';

    const fileName = `${Date.now()}.${fileExt}`;

    const { error } = await supabase.storage
      .from('fast-notes')
      .upload(fileName, arrayBuffer, {
        contentType,
      });

    if (error) {
      Alert.alert('Upload failed', error.message);
      return null;
    }

  const { data } = supabase.storage
  .from('fast-notes')
  .getPublicUrl(fileName);
const publicUrl = data.publicUrl;
    return publicUrl;
  } 
  
  catch (error) {
    Alert.alert('Upload error', 'Network request failed');
    return null;
  }
};

const handleSave = async () => {
  
  if (!title.trim() || !content.trim()) {
    Alert.alert('Title or content cannot be empty');
    return;
  }
  setIsloading(true); // spinner starter her
  let imageUrl: string | null = null;

  if (selectedImage) {
    const isValid = await validateImage(selectedImage);
    if (!isValid) {
      setIsloading(false); // stopp spinner hvis validering feiler
      return;
    }

    imageUrl = await uploadImage(selectedImage);
    if (!imageUrl) {
      setIsloading(false); // stopp spinner hvis upload feiler
      return;
    }
  }

  try {
    await addNote(title, content, imageUrl ?? undefined);
    alert('✅ Note added successfully!');
    router.back();
  } catch (e) {
    Alert.alert('Could not save the note');
  } finally {
    setIsloading(false); // spinner stopper uansett
  }
};

return (
<View style={styles.container}>
  {/* Skjema */}
  <KeyboardAvoidingView
    style={{ flex: 1, padding: 20 }}
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
    <AddPicture value={selectedImage} onChange={setSelectedImage}/>    

    <Button
      title={isloading ? 'Saving...' : 'Save'}
      onPress={handleSave}
      disabled={isloading}
    />
  </KeyboardAvoidingView>


      <Modal
        visible={isloading}
        transparent
        animationType="fade"
        statusBarTranslucent
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <ActivityIndicator size="large" color="#3b82f6" />
            <RNText style={styles.loadingText}>Uploading image…</RNText>
          </View>
        </View>
      </Modal>
    </View>
  );
}


// Styling for the screen

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  // Modal-stiler
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCard: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    minWidth: 180,
    alignItems: 'center',
    gap: 12,
    // Litt skygge
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 8, // for Android
  },
  loadingText: {
    marginTop: 8,
    fontSize: 14,
    color: '#111827',
  },
  // image: {
  //   width: '100%',     
  //   borderRadius: 8,
  //   marginTop: 10
  // },
});
