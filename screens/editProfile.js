import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
  StatusBar,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const EditProfileScreen = ({ route, navigation }) => {
  const { username, email, contact, dob, fname, lname } = route.params;

  const [editedUsername, setEditedUsername] = useState(username);
  const [editedEmail, setEditedEmail] = useState(email);
  const [editedContact, setEditedContact] = useState(contact);
  const [editedDOB, setEditedDOB] = useState(dob);
  const [editedFname, setEditedHobby] = useState(fname);
  const [editedLname, setEditedGenre] = useState(lname);
  const updateProfile = () => {
    fetch("https://sxu2906.uta.cloud/updateProfile.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `editedUsername=${editedUsername}&editedEmail=${editedEmail}&editedContact=${editedContact}&editedDOB=${editedDOB}&editedFname=${editedFname}&editedLname=${editedLname}`,
    })
      .then((response) => response.text())
      .then((data) => {
        if (data === "Profile updated successfully") {
          Alert.alert("Success", "Profile updated successfully!", [
            {
              text: "OK",
              onPress: () => navigation.navigate("Profile"),
            },
          ]);
        } else if (data === "Failed to update profile") {
          Alert.alert("Error", "Please try again!", [
            {
              text: "OK",
              onPress: () => navigation.navigate("Profile"),
            },
          ]);
        } else {
          Alert.alert("Error", "Failed to register user");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

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
        <Text style={styles.headerText}>Edit Profile</Text>
        <View />
      </View>
      <View style={styles.settingContainer}>
        <Text style={styles.settingLabel}>
          {username
            ? "Username"
            : email
            ? "Email"
            : contact
            ? "Contact"
            : dob
            ? "Date of Birth"
            : fname
            ? "First Name"
            : "Last Name"}
        </Text>
        <TextInput
          style={styles.textInput}
          value={
            editedUsername ||
            editedEmail ||
            editedContact ||
            editedDOB ||
            editedFname ||
            editedLname
          }
          onChangeText={(text) => {
            if (username) {
              setEditedUsername(text);
            } else if (email) {
              setEditedEmail(text);
            } else if (contact) {
              setEditedContact(text);
            } else if (dob) {
              setEditedDOB(text);
            } else if (fname) {
              setEditedHobby(text);
            } else if (lname) {
              setEditedGenre(text);
            }
          }}
          placeholder={"Enter new value"}
        />
        {/* Render editable fields and form components for editing the profile */}
        <TouchableOpacity style={styles.editButton} onPress={updateProfile}>
          <Text style={styles.editButtonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  editButton: {
    width: "100%",
    backgroundColor: "black",
    paddingVertical: 12,
    borderRadius: 4,
    marginBottom: 16,
  },
  editButtonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
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
  settingContainer: {
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  textInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 16,
  },
});

export default EditProfileScreen;
