// app/components/ui/AddPicture.tsx
import * as ImagePicker from 'expo-image-picker';
import { useEffect, useState } from 'react';
import { Alert, Button, StyleSheet, Text, View } from 'react-native';
import DynamicImage from './DynamicImage';

type AddPictureProps = {
  value: string | null;
  onChange: (uri: string | null) => void;
};

export default function AddPicture({ value, onChange }: AddPictureProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(value);
  const [hasPermission, setHasPermission] = useState(false);

  // Sjekk permissions når komponenten monteres
  useEffect(() => {
    (async () => {
      
      const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
      const mediaStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!cameraStatus.granted || !mediaStatus.granted) {
        Alert.alert('Permission required', 'Camera and gallery access is required.');
        setHasPermission(false);
      } else {
        setHasPermission(true);
      }
    })();
  }, []);

  // Pick image fra galleri
  const pickImage = async () => {
    if (!hasPermission) {
      Alert.alert('Permission required');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setSelectedImage(uri);
      onChange(uri);

      
    }
  };

  // Ta bilde med kamera
  const takePhoto = async () => {
    if (!hasPermission) {
      Alert.alert('Permission required');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({ quality: 1 });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setSelectedImage(uri);
      onChange(uri);
    }
  };

  return (
    <View style={styles.container}>
      {/* Preview */}
      {selectedImage ? (
        <View style={{marginBottom: 20 }}>
          <DynamicImage uri={selectedImage}/>
        </View>
      ) : (
        <Text></Text>
      )}

      {/* Buttons */}
      <View style={styles.buttonsRow}>
        <View style={{ flex: 1, marginRight: 5 }}>
          <Button title="Take Photo" onPress={takePhoto} />
        </View>
        <View style={{ flex: 1, marginLeft: 5 }}>
          <Button title="Pick from Gallery" onPress={pickImage} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 20 },
  buttonsRow: { flexDirection: 'row', justifyContent: 'space-between' },
});

