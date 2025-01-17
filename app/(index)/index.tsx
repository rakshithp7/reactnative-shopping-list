import React, { useState } from 'react';
import { ThemedText } from '@/components/ThemedText';
import BodyScrollView from '@/components/ui/BodyScrollView';
import Button from '@/components/ui/Button';
import { useClerk } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';

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

  return (
    <BodyScrollView
      contentContainerStyle={{
        padding: 16,
      }}>
      <ThemedText type="title">Home Screen</ThemedText>
      <Button disabled={isLoading} loading={isLoading} onPress={handleSignOut}>
        Sign Out
      </Button>
    </BodyScrollView>
  );
}
