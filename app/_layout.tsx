import { useAuthContext } from '@/hooks/use-auth-context';
import AuthProvider from '@/providers/auth-provider';
import { useFonts } from 'expo-font';
import * as Notifications from 'expo-notifications';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { Alert, Linking } from 'react-native';

function RootNavigator() {
  const { isLoggedIn, isLoading } = useAuthContext();

  if (isLoading || isLoggedIn == null) return null;

  return (
    <Stack>
      <Stack.Protected guard={isLoggedIn}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
      </Stack.Protected>

      <Stack.Protected guard={!isLoggedIn}>
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="signup" options={{ headerShown: false }} />
      </Stack.Protected>
    </Stack>
  );
}

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    // Disse to manglet og forårsaket feilen:
    shouldShowBanner: true, 
    shouldShowList: true,
  }),
});

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    
    const askPermission = async () => {
      try {
        let { status } = await Notifications.getPermissionsAsync();

        // Hvis ikke gitt, be om tillatelse
        if (status !== 'granted') {
          const response = await Notifications.requestPermissionsAsync();
          status = response.status;
        }

        if (status !== 'granted') {
          Alert.alert(
            'Permission required',
            'Notifications permission is required. Please enable it in settings.',
            [
              {
                text: 'Open Settings',
                onPress: () => Linking.openSettings(),
              },
              {
                text: 'Cancel',
                style: 'cancel',
              },
            ]
          );
          return;
        }

        
      } catch (error) {
      }
    };

    askPermission();
  }, []);

  if (!loaded) return null;

  return (
    <AuthProvider>
      <RootNavigator />
      <StatusBar style="auto" />
    </AuthProvider>
  );
}