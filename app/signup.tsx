import { useAuthContext } from '@/hooks/use-auth-context';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function SignUpScreen() {
  const { signUp } = useAuthContext();
  const router = useRouter();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')


  const handleSignUp = async () => {
    if (!email.trim() || !password.trim()) {
      alert('All fields are required');
      return;
    }

    const { data, error } = await signUp!(email, password);
    if (error) {
      alert(error.message);
    } else {
      alert('Sign up successful! Please check your email.');
      router.replace('/login'); // gå videre til login
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <TextInput placeholder="Email" style={styles.input} value={email} onChangeText={setEmail} />
      <TextInput placeholder="Password" style={styles.input} value={password} onChangeText={setPassword} secureTextEntry />
      <Button title=" Create account" onPress={handleSignUp} />
      <TouchableOpacity onPress={() => router.back()} style={{ marginTop: 20 }}>
        <Text style={{ color: '#007AFF' }}>Go back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 15, borderRadius: 5 },
});
