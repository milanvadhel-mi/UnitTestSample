import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type LoginInfo = {
  email: string;
  password: string;
  emailError: string;
  passwordError: string;
};

export default function LoginScreen() {
  const [loginInfo, setLoginInfo] = useState<LoginInfo>({
    email: "",
    password: "",
    emailError: "",
    passwordError: "",
  });

  const navigation = useNavigation();

  const updateLoginInfo = (key: keyof LoginInfo) => (value: string) => {
    setLoginInfo((prev) => {
      return {
        ...prev,
        [key]: value,
      };
    });
  };

  const validateLoginInfo = () => {
    let valid = true;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const newLoginInfo = { ...loginInfo, emailError: "", passwordError: "" };

    if (!emailRegex.test(loginInfo.email)) {
      newLoginInfo.emailError = "Invalid email address";
      valid = false;
    }

    if (loginInfo.password.length < 6) {
      newLoginInfo.passwordError = "Password must be at least 6 characters";
      valid = false;
    }

    setLoginInfo(newLoginInfo);
    return valid;
  };

  const handleSubmit = () => {
    if (validateLoginInfo()) {
      // Proceed with login
      navigation.navigate("HomeScreen");
    }
  };

  return (
    <View style={styles.mainContainer}>
      <TextInput
      testID="Email"
        placeholder="Email"
        style={styles.input}
        onChangeText={updateLoginInfo("email")}
        value={loginInfo.email}
        keyboardType="email-address"
        cursorColor={"black"}
      />
      {loginInfo.emailError && <Error message={loginInfo.emailError} />}
      <TextInput
      testID="Password"
        placeholder="Password"
        style={[styles.input, styles.paswordInput]}
        onChangeText={updateLoginInfo("password")}
        value={loginInfo.password}
        keyboardType="visible-password"
        cursorColor={"black"}
      />
      {loginInfo.passwordError && <Error message={loginInfo.passwordError} />}
      <TouchableOpacity style={styles.button} onPress={handleSubmit} testID="Submit">
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}

function Error({ message }: { message: string }) {
  return <Text style={styles.errorMessage}>{message}</Text>;
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  input: {
    borderColor: "black",
    borderWidth: 1,
    padding: 16,
    fontSize: 16,
    fontWeight: "semibold",
  },
  paswordInput: {
    marginTop: 16,
  },
  errorMessage: {
    color: "red",
    fontSize: 12,
    fontWeight: "bold",
    marginVertical: 8,
  },
  button: {
    padding: 16,
    backgroundColor: "black",
    marginTop: 40,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});
