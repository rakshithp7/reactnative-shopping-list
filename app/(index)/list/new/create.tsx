import { View, Text, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import BodyScrollView from '@/components/ui/BodyScrollView';
import { Link, Stack } from 'expo-router';
import { appleBlue, backgroundColors, emojies } from '@/constants/Colors';
import TextInput from '@/components/ui/TextInput';
import { ThemedText } from '@/components/ThemedText';
import Button from '@/components/ui/Button';
import { useListCreation } from '@/context/ListCreationContext';

export default function CreateScreen() {
  const [listName, setListName] = useState('');
  const [listDescription, setListDescription] = useState('');
  const { selectedEmoji, setSelectedEmoji, selectedColor, setSelectedColor } = useListCreation();

  const handleCreateList = () => {};

  useEffect(() => {
    setSelectedEmoji(emojies[Math.floor(Math.random() * emojies.length)]);
    setSelectedColor(backgroundColors[Math.floor(Math.random() * backgroundColors.length)]);

    return () => {
      setSelectedEmoji('');
      setSelectedColor('');
    };
  }, []);

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: 'New List',
          headerLargeTitle: false,
        }}
      />
      <BodyScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Grocery Essentials"
            size="lg"
            variant="ghost"
            value={listName}
            onChangeText={setListName}
            returnKeyType="done"
            onSubmitEditing={handleCreateList}
            autoFocus
            inputStyle={styles.titleInput}
            containerStyle={styles.titleInputContainer}
          />
          <Link
            href={{
              pathname: '/emoji-picker',
            }}
            style={[styles.pickerButton, { borderColor: selectedColor }]}>
            <View style={styles.emojiContainer}>
              <Text>{selectedEmoji}</Text>
            </View>
          </Link>
          <Link
            href={{
              pathname: '/color-picker',
            }}
            style={[styles.pickerButton, { borderColor: selectedColor }]}>
            <View style={styles.colorContainer}>
              <View
                style={{
                  height: 24,
                  width: 24,
                  borderRadius: 100,
                  backgroundColor: selectedColor,
                }}
              />
            </View>
          </Link>
        </View>
        <TextInput
          placeholder="Description (optional)"
          value={listDescription}
          onChangeText={setListDescription}
          onSubmitEditing={handleCreateList}
          returnKeyType="done"
          variant="ghost"
          inputStyle={styles.descriptionInput}
        />
        <Button onPress={handleCreateList} disabled={!listName} variant="ghost">
          Create list
        </Button>
      </BodyScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  scrollViewContent: {
    padding: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  titleInput: {
    fontWeight: '600',
    fontSize: 28,
    padding: 0,
  },
  titleInputContainer: {
    flexGrow: 1,
    flexShrink: 1,
    maxWidth: 'auto',
    marginBottom: 0,
  },
  emojiContainer: {
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  descriptionInput: {
    padding: 0,
  },
  pickerButton: {
    padding: 1,
    borderWidth: 3,
    borderRadius: 100,
  },
  colorContainer: {
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
