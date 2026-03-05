
import {
    Dimensions,
    Image
} from 'react-native';

const screenWidth = Dimensions.get('window').width;

export default function DynamicImage({ uri }: { uri: string | null }) {

  return (
      uri && <Image
        source={{ uri }}
        style={{ width: '100%', aspectRatio: 1, borderRadius: 8, marginTop: 10 }}
        resizeMode="contain" // viser hele bildet uten å strekke
        />
  );
}