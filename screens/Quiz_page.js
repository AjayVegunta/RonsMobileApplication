import React, { useEffect, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
  StyleSheet,
  StatusBar,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import * as Progress from "react-native-progress";

const QuizScreen = ({ navigation }) => {
  const [q1, setQ1] = useState("");
  const [q2, setQ2] = useState("");
  const [q3, setQ3] = useState("");
  const [q4, setQ4] = useState("");

  const getScores = async () => {
    try {
      const response = await fetch("https://sxu2906.uta.cloud/getScores.php", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const value = await response.json();

      if (value.status === "success") {
        setQ1(value.user.Quiz1);
        setQ2(value.user.Quiz2);
        setQ3(value.user.Quiz3);
        setQ4(value.user.Quiz4);
      } else {
        Alert.alert("Something went wrong");
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };
  useFocusEffect(
    React.useCallback(() => {
      getScores();
    }, [])
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
        <Text style={styles.headerText}>Quizzes</Text>
        <View />
      </View>
      <ScrollView style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("QuizScore", { level: "Quiz 1" })}
        >
          <Text style={styles.buttonText}>Quiz - I</Text>
          <Progress.Bar progress={q1 / 100} width={275} color={"black"} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("QuizScore", { level: "Quiz 2" })}
        >
          <Text style={styles.buttonText}>Quiz - II</Text>
          <Progress.Bar progress={q2 / 100} width={275} color={"black"} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("QuizScore", { level: "Quiz 3" })}
        >
          <Text style={styles.buttonText}>Quiz - III</Text>
          <Progress.Bar progress={q3 / 100} width={275} color={"black"} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("QuizScore", { level: "Quiz 4" })}
        >
          <Text style={styles.buttonText}>Quiz - IV</Text>
          <Progress.Bar progress={q4 / 100} width={275} color={"black"} />
        </TouchableOpacity>
      </ScrollView>
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
  buttonContainer: {
    flexDirection: "column",
    marginTop: 10,
  },
  buttonContainer1: {
    flexDirection: "row",
    marginTop: 30,
  },
  button: {
    backgroundColor: "#A6A5A6",
    borderColor: "white",
    borderWidth: 5,
    borderRadius: 10,
    paddingVertical: 45,
    paddingHorizontal: 50,
    width: 370,
    margin: 10,
    textAlign: "center",
    textDecoration: "none",
    transition: "background-color 0.3s, color 0.3s",
  },
  button1: {
    borderWidth: 5,
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 10,
    width: 70,
    margin: 10,
    textAlign: "center",
    textDecoration: "none",
    transition: "background-color 0.3s, color 0.3s",
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    textTransform: "uppercase",
  },
  buttonText1: {
    color: "white",
    backgroundColor: "black",
    fontSize: 20,

    fontWeight: "bold",
    textAlign: "center",
    textTransform: "uppercase",
  },
  backButton: {
    marginTop: 40,
    flexDirection: "row",
    alignContent: "flex-start",
    paddingLeft: 20,
  },
  Title: {
    textAlign: "center",
    marginLeft: 90,
    fontSize: 30,
    fontStyle: "italic",
  },
});

export default QuizScreen;
