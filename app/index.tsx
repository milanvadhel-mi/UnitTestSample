import { StyleSheet, Text } from "react-native";
import LoginScreen from "./LoginScreen";
import HomeScreen from "./HomeScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

type LoginInfo = {
  email: string;
  password: string;
  emailError: string;
  passwordError: string;
};

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
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
