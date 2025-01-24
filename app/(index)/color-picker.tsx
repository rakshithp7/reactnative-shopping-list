import { FlatList, Pressable, View } from 'react-native';
import React from 'react';
import { backgroundColors } from '@/constants/Colors';
import { useListCreation } from '@/context/ListCreationContext';
import { useRouter } from 'expo-router';

export default function ColorPickerScreen() {
  const { setSelectedColor } = useListCreation();
  const router = useRouter();

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
    router.back();
  };

  return (
    <FlatList
      data={backgroundColors}
      renderItem={({ item }) => (
        <Pressable
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => handleColorSelect(item)}>
          <View
            style={{
              height: 40,
              width: 40,
              borderRadius: 100,
              backgroundColor: item,
            }}
          />
        </Pressable>
      )}
      numColumns={5}
      keyExtractor={(item) => item}
      automaticallyAdjustContentInsets
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={{
        padding: 16,
        gap: 16,
        paddingBottom: 100,
      }}
    />
  );
}
