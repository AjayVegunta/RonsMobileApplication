import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  View,
  StatusBar,
  Dimensions,
} from "react-native";

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };
  const handleResetPassword = () => {
    fetch("https://sxu2906.uta.cloud/forgotPassword.php", {
      // Replace with your PHP script URL
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `email=${email}`, // Pass email as a parameter to the PHP script
    })
      .then((response) => response.text()) // Get the response as plain text
      .then((responseText) => {
        // Handle the response from PHP script
        setResponseMessage(responseText);
        if (responseText === "Reset Successful!") {
          // Show an alert if password reset is successful
          Alert.alert("Success", "Password reset successful!");
          // Alert.alert(responseMessage);
          navigation.navigate("Login");
        } else if (responseText === "Reset Unsuccessful!") {
          Alert.alert("Error", "Password reset failed!");
          // Alert.alert(responseMessage);
          navigation.navigate("ForgotPassword");
        } else if (responseText === "Email doesn't exist!") {
          Alert.alert("Error", "Email doesn't exist!");
          // Alert.alert(responseMessage);
          navigation.navigate("ForgotPassword");
        } else {
          Alert.alert(responseMessage);
          navigation.navigate("ForgotPassword");
        }
      })
      .catch((error) => console.error(error));
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={styles.container}>
        <StatusBar backgroundColor="black" barStyle="light-content" />
        <Text style={styles.heading}>Forgot Password</Text>
        <Text style={styles.subheading}>
          Enter your email address below to reset your password.
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Email Address"
          placeholderTextColor="#555555"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />
        <TouchableOpacity
          style={styles.resetButton}
          onPress={handleResetPassword}
        >
          <Text style={styles.resetButtonText}>Reset Password</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>Back to Login</Text>
        </TouchableOpacity>
        <View style={styles.bottomDivider} />
        <View style={styles.signupContainer}>
          <Text style={styles.signupText} onPress={() => navigation.goBack()}>
            Go Back
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: "white",
  },
  subheading: {
    fontSize: 16,
    marginBottom: 32,
    color: "white",
  },
  input: {
    width: "100%",
    height: 40,
    backgroundColor: "#1c1c1c",
    color: "white",
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
  },
  resetButton: {
    width: "100%",
    backgroundColor: "#0095F6",
    paddingVertical: 12,
    borderRadius: 4,
    marginBottom: 16,
  },
  resetButtonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  backButton: {
    width: "100%",
  },
  backButtonText: {
    color: "#000",
    fontWeight: "bold",
    textAlign: "center",
    textDecorationLine: "underline",
  },
  bottomDivider: {
    position: "absolute",
    bottom: 50,
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: "#555555",
  },
  signupContainer: {
    bottom: -235,
  },
  signupText: {
    color: "#rgb(0, 149, 246)",
    fontSize: 16,
    textAlign: "center",
  },
});

if (windowWidth >= 400 && windowHeight >= 850) {
  styles.signupContainer.bottom = -290;
}
if (windowWidth >= 429 && windowHeight >= 931) {
  styles.signupContainer.bottom = -275;
  styles.bottomDivider.bottom = 90;
}
export default ForgotPasswordScreen;
