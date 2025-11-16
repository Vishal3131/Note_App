import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface data{ id: string; title: string; desc: string; }

export default function HomeScreen() {
  const [notes, setNotes] = useState<data[]>([]);

  useEffect(() => {
    loadNotes();
  }, []);

    useEffect(() => {
    saveNotes();
  }, [notes]);


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

  const deleteNote = (id:string) => {
    setNotes(notes.filter((note) => note.id !== id));
  };


  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={styles.title}>My Notes</Text>

 {/* Notes List */}
      <FlatList
        data={notes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View>
              <Text style={styles.cardTitle}>{item.title}</Text>
              {/* <Text style={styles.cardDesc}>{item.desc}</Text> */}
            </View>

            <TouchableOpacity onPress={() => deleteNote(item.id)}>
              <Text style={styles.delete}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <TouchableOpacity
        style={styles.fab}
        onPress={() => router.push("/addNotes")}
      >
        <Text style={styles.plus}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  fab: {
    position: "absolute",
    bottom: 30,
    right: 30,
    backgroundColor: "black",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center"
  },
  plus: { fontSize: 40, color: "white", marginTop: -3 },

   btn: {
    backgroundColor: "black",
    padding: 12,
    borderRadius: 6,
    marginVertical: 10,
  },
  btnText: { color: "white", textAlign: "center", fontWeight: "bold" },

  card: {
    backgroundColor: "#eee",
    padding: 15,
    borderRadius: 8,
    marginVertical: 8,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardTitle: { fontSize: 18, fontWeight: "bold" },
  cardDesc: { fontSize: 14, color: "#444", marginTop: 5 },
  delete: { color: "red", fontWeight: "bold" },
});
