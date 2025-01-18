import React, { useState } from 'react';
import { ThemedText } from '@/components/ThemedText';
import BodyScrollView from '@/components/ui/BodyScrollView';
import Button from '@/components/ui/Button';
import { useClerk } from '@clerk/clerk-expo';
import { Stack, useRouter } from 'expo-router';
import { Pressable } from 'react-native';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { appleBlue } from '@/constants/Colors';

export default function index() {
  const { signOut } = useClerk();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSignOut = async () => {
    try {
      setIsLoading(true);
      await signOut();
      // Redirect to your desired page
      router.replace('/(auth)');
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    } finally {
      setIsLoading(false);
    }
  };

  const renderHeaderRight = () => {
    return (
      <Pressable
        onPress={() => {
          router.push('/list/new');
        }}>
        <IconSymbol name="plus" color={appleBlue} />
      </Pressable>
    );
  };

  const renderHeaderLeft = () => {
    return (
      <Pressable
        onPress={() => {
          router.push('/profile');
        }}>
        <IconSymbol name="gear" color={appleBlue} />
      </Pressable>
    );
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerRight: renderHeaderRight,
          headerLeft: renderHeaderLeft,
        }}
      />
      <BodyScrollView
        contentContainerStyle={{
          padding: 16,
        }}>
        <ThemedText type="title">Home Screen</ThemedText>
        <Button disabled={isLoading} loading={isLoading} onPress={handleSignOut}>
          Sign Out
        </Button>
      </BodyScrollView>
    </>
  );
}
