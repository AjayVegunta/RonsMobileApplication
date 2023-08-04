import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  StatusBar,
  TextInput,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
const data = require("../assets/data.json");
const VowTitles = ({ route, navigation }) => {
  const [titles, setTitles] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const { UID } = route.params;
  useEffect(() => {
    const vowelData = data.filter((item) => {
      for (const key in item) {
        if (
          typeof item[key] === "string" &&
          item[key].includes("Vowels") &&
          !item[key].includes("R")
        ) {
          return true;
        }
      }
      return false;
    });
    setTitles(vowelData);
  }, []);
  const handleTilePress = (PID) => {
    navigation.navigate("Details", { UID, PID, titles });
  };

  const filteredData = titles.filter((item) => {
    if (!searchQuery) {
      return true;
    }
    const lowerCaseQuery = searchQuery.toLowerCase();
    return (
      item.IPA.toLowerCase().includes(lowerCaseQuery) ||
      item.Examples.toLowerCase().includes(lowerCaseQuery)
    );
  });
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="black" barStyle="light-content" />
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.backContainer}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="caret-back-outline" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Vowels with "{searchQuery}" IPA</Text>
        <View />
      </View>
      <View style={styles.paddingEntry}>
        <View style={styles.header}>
          <TextInput
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search..."
          />
        </View>

        <ScrollView contentContainerStyle={styles.tilesContainer}>
          {filteredData.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.tile}
              onPress={() => handleTilePress(item.ID)}
            >
              <Text style={styles.tileTitle}>{item.IPA}</Text>
              <Text style={styles.tileSubtitle}>{item.Examples}</Text>
              <Text style={styles.tileSubtitle}>{item.Type}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 20,
    backgroundColor: "black",
    height: Platform.OS === "ios" ? 110 : 60,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    flex: 1,
    textAlign: "center",
    marginRight: 24,
    color: "white",
    marginTop: Platform.OS === "ios" ? 50 : 0,
  },
  backContainer: {
    marginTop: Platform.OS === "ios" ? 50 : 0,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  searchInput: {
    height: 40,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    flex: 1,
    marginLeft: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    marginLeft: 30,
  },
  tilesContainer: {
    paddingBottom: 16,
  },
  paddingEntry: {
    paddingHorizontal: 16,
  },
  tile: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  tileTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  tileSubtitle: {
    fontSize: 16,
    marginBottom: 4,
  },
});

export default VowTitles;
