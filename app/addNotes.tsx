import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, TextInput, View } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

interface data{ id: string; title: string; desc: string; }

export default function AddNoteScreen({  }) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [notes, setNotes] = useState<data[]>([]);

  
  useEffect(() => {
    loadNotes();
  }, []);

  useEffect(() => {
    saveNotes();
  }, [notes]);

  // READ (Load from storage)
  const loadNotes = async () => {
    try {
      const saved = await AsyncStorage.getItem("notes");
      if (saved) {
        setNotes(JSON.parse(saved));
      }
    } catch (error) {
      console.log("Error loading:", error);
    }
  };

   const saveNotes = async () => {
    try {
      await AsyncStorage.setItem("notes", JSON.stringify(notes));
    } catch (error) {
      console.log("Error saving:", error);
    }
  };

  const addNote = () => {
    if (!title.trim() || !desc.trim()) return;

    const newNote = {
      id: Date.now().toString(),
      title,
      desc,
    };

    setNotes([...notes, newNote]);
    setTitle("");
    setDesc("");
  };


  return (
    <SafeAreaView style={{flex:1, padding:20}}> 
    <View style={styles.container}>
      <TextInput
        placeholder="Title"
        style={styles.input}
        value={title}
        onChangeText={setTitle}
      />

      <TextInput
        placeholder="Description"
        multiline
        style={[styles.input, { height: 120 }]}
        value={desc}
        onChangeText={setDesc}
      />

      <Button title="Save Note" onPress={addNote} />
    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    marginBottom: 15
  }
});
