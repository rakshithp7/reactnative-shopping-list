import { Text, FlatList, Pressable } from 'react-native';
import React from 'react';
import { emojies } from '@/constants/Colors';
import { useListCreation } from '@/context/ListCreationContext';
import { useRouter } from 'expo-router';

export default function EmojiPickerScreen() {
  const { setSelectedEmoji } = useListCreation();
  const router = useRouter();

  const handleEmojiSelect = (emoji: string) => {
    setSelectedEmoji(emoji);
    router.back();
  };

  return (
    <FlatList
      data={emojies}
      renderItem={({ item }) => (
        <Pressable
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => handleEmojiSelect(item)}>
          <Text style={{ fontSize: 40 }}>{item}</Text>
        </Pressable>
      )}
      numColumns={5}
      keyExtractor={(item) => item}
      automaticallyAdjustContentInsets
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={{
        padding: 16,
        paddingBottom: 100,
      }}
    />
  );
}
