import React, { useState } from 'react';
import { ThemedText } from '@/components/ThemedText';
import BodyScrollView from '@/components/ui/BodyScrollView';
import Button from '@/components/ui/Button';
import { useClerk } from '@clerk/clerk-expo';
import { Link, Stack, useRouter } from 'expo-router';
import { FlatList, Platform, Pressable, StyleSheet } from 'react-native';
import * as Haptics from 'expo-haptics';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { appleBlue, backgroundColors } from '@/constants/Colors';
import { useShoppingListIds } from '@/stores/ShoppingListsStore';
import IconCircle from '@/components/IconCircle';
import ShoppingListItem from '@/components/ShoppingListItem';

export default function index() {
  const { signOut } = useClerk();
  const router = useRouter();
  const shoppingListIds = useShoppingListIds();
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

  const handleNewListPress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    router.push('/list/new');
  };

  const handleProfilePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    router.push('/profile');
  };

  const renderEmptyList = () => (
    <BodyScrollView contentContainerStyle={styles.emptyStateContainer}>
      <IconCircle emoji="🛒" backgroundColor={backgroundColors[Math.floor(Math.random() * backgroundColors.length)]} />
      <Button onPress={handleNewListPress} variant="ghost">
        Create your first list
      </Button>
    </BodyScrollView>
  );

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
          title: 'Shopping lists',
          headerRight: renderHeaderRight,
          headerLeft: renderHeaderLeft,
        }}
      />
      <FlatList
        data={shoppingListIds}
        renderItem={({ item: listId }) => <ShoppingListItem listId={listId} />}
        contentContainerStyle={styles.listContainer}
        contentInsetAdjustmentBehavior="automatic"
        ListEmptyComponent={renderEmptyList}
      />
    </>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    paddingTop: 8,
  },
  emptyStateContainer: {
    alignItems: 'center',
    gap: 8,
    paddingTop: 100,
  },
  headerButton: {
    padding: 8,
    paddingRight: 0,
    marginHorizontal: Platform.select({ web: 16, default: 0 }),
  },
  headerButtonLeft: {
    paddingLeft: 0,
  },
});
