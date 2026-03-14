import { supabase } from '@/lib/supabase';
import { Alert, Button } from 'react-native';

async function onSignOutButtonPress() {
  const { error } = await supabase.auth.signOut()

  if (error) {
    Alert.alert('Error signing out');
  }
}

export default function SignOutButton() {
  return <Button title="Sign out" onPress={onSignOutButtonPress} color="red" />
}