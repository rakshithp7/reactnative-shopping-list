import Button from '@/components/ui/Button';
import { ListCreationProvider } from '@/context/ListCreationContext';
import { useUser } from '@clerk/clerk-expo';
import { Redirect, Stack, useRouter } from 'expo-router';

export default function HomeRoutesLayout() {
  const router = useRouter();
  const { user } = useUser();

  if (!user) {
    return <Redirect href={'/(auth)'} />;
  }

  return (
    <ListCreationProvider>
      <Stack
        screenOptions={{
          ...(process.env.EXPO_OS !== 'ios'
            ? {}
            : {
                headerLargeTitle: true,
                headerTransparent: true,
                headerBlurEffect: 'systemChromeMaterial',
                headerLargeTitleShadowVisible: false,
                headerShadowVisible: true,
                headerLargeStyle: {
                  backgroundColor: 'transparent',
                },
              }),
        }}>
        <Stack.Screen name="index" options={{ headerTitle: 'Shopping List' }} />
        <Stack.Screen
          name="list/new/index"
          options={{
            presentation: 'formSheet',
            sheetGrabberVisible: true,
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="profile"
          options={{
            presentation: 'formSheet',
            sheetAllowedDetents: [0.75, 1],
            sheetGrabberVisible: true,
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="list/new/scan"
          options={{
            presentation: 'fullScreenModal',
            headerLargeTitle: false,
            headerTitle: 'Scan QR code',
            headerLeft: () => (
              <Button variant="ghost" onPress={() => router.back()}>
                Cancel
              </Button>
            ),
          }}
        />
        <Stack.Screen
          name="emoji-picker"
          options={{
            presentation: 'formSheet',
            headerLargeTitle: false,
            headerTitle: 'Choose an emoji',
            sheetAllowedDetents: [0.5, 0.75, 1],
            sheetGrabberVisible: true,
          }}
        />
        <Stack.Screen
          name="color-picker"
          options={{
            presentation: 'formSheet',
            headerLargeTitle: false,
            headerTitle: 'Choose a color',
            sheetAllowedDetents: [0.5, 0.75, 1],
            sheetGrabberVisible: true,
          }}
        />
      </Stack>
    </ListCreationProvider>
  );
}
