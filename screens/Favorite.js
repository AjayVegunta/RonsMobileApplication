import React, { useState, useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  TouchableWithoutFeedback,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
const jsondata = require("../assets/data.json");
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useIsFocused } from "@react-navigation/native";
const Favorites = ({ route, navigation }) => {
  const [favorites, setFavorites] = useState([]);
  const navigations = useNavigation();
  const isFocused = useIsFocused();
  const { UID } = route.params;

  const fetchData = async () => {
    try {
      // Load favorites data from local storage
      const storedFavorites = await AsyncStorage.getItem("favor_" + UID);
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites));
      }
    } catch (error) {
      console.error(error);
    }
  };
  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, [])
  );

  const handleRemoveFavorite = (item) => {
    const updatedFavorites = favorites.filter(
      (favorite) => favorite.ID !== item.ID
    );
    setFavorites(updatedFavorites);
    AsyncStorage.setItem("favor_" + UID, JSON.stringify(updatedFavorites));
  };

  const renderTile = (item) => (
    <TouchableWithoutFeedback
      key={item.ID}
      onPress={() =>
        navigation.navigate("Details", {
          UID: UID,
          PID: item.ID,
          titles: favorites,
        })
      }
    >
      <View style={styles.favoriteTile}>
        <TouchableOpacity onPress={() => handleRemoveFavorite(item)}>
          <Ionicons name="heart" size={32} color="red" />
        </TouchableOpacity>
        <Text style={styles.favoriteText}>{item.IPA}</Text>
      </View>
    </TouchableWithoutFeedback>
  );

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
        <Text style={styles.headerText}>Favorites</Text>
        <View />
      </View>
      {favorites.length > 0 ? (
        <View style={styles.gridContainer}>{favorites.map(renderTile)}</View>
      ) : (
        <Text style={styles.emptyText}>No favorites added yet</Text>
      )}
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
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    marginTop: 40,
  },
  title: {
    flex: 1,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  favoriteTile: {
    flexDirection: "row",
    width: "30%",
    margin: "1%",
    backgroundColor: "#eee",
    padding: 16,
    borderRadius: 8,
  },
  favoriteText: {
    paddingLeft: 20,
    fontSize: 24,
    color: "black",
  },
  emptyText: {
    alignSelf: "center",
    marginTop: 16,
    fontSize: 16,
    color: "gray",
  },
});

export default Favorites;
