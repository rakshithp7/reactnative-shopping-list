import { FlatList } from 'react-native';
import React from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';

export default function ListScreen() {
  const router = useRouter();
  const { listId } = useLocalSearchParams() as { listId: string };

  return (
    <>
      <FlatList
        data={[listId]}
        renderItem={({ item }) => <ThemedText>{item}</ThemedText>}
        contentInsetAdjustmentBehavior="automatic"
      />
    </>
  );
}
