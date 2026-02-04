import { useLocalSearchParams } from 'expo-router';
import { Text, View } from 'react-native';

export default function NoteDetail() {
    const { title, content } = useLocalSearchParams(); // Get the title and content passed via router

    return (
        <View style={{ flex: 1, padding: 20 }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold' }}>
                {title}
            </Text>

            <Text style={{ marginTop: 10 }}>
                {content}
            </Text>
        </View>
    );
}
