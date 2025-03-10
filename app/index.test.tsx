import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "./LoginScreen";

const mockNavigation = jest.fn();
jest.mock("@react-navigation/native", () => {
  const actualNav = jest.requireActual("@react-navigation/native");
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: mockNavigation,
    }),
  };
});

describe("App Component", () => {
  it("renders correctly", () => {
    const { getByPlaceholderText, getByText } = render(<LoginScreen />);
    expect(getByPlaceholderText("Email")).toBeTruthy();
    expect(getByPlaceholderText("Password")).toBeTruthy();
    expect(getByText("Submit")).toBeTruthy();
  });

  it("Submit without fill", () => {
    const { getByText } = render(<LoginScreen />);
    const submitButton = getByText("Submit");
    fireEvent.press(submitButton);
    const emailErrorText = getByText("Invalid email address"),
      passwordErrorText = getByText("Password must be at least 6 characters");
    expect(emailErrorText).toBeTruthy();
    expect(passwordErrorText).toBeTruthy();
  });

  it("Submit invalid email without @", () => {
    const { getByText, getByPlaceholderText } = render(<LoginScreen />);
    const emailInput = getByPlaceholderText("Email"),
      submitButton = getByText("Submit");
    fireEvent.changeText(emailInput, "testgmail.com");
    fireEvent.press(submitButton);
    const emailErrorText = getByText("Invalid email address");
    expect(emailErrorText).toBeTruthy();
  });

  it("Submit invalid email .", () => {
    const { getByText, getByPlaceholderText } = render(<LoginScreen />);
    const emailInput = getByPlaceholderText("Email"),
      submitButton = getByText("Submit");
    fireEvent.changeText(emailInput, "test@gmailcom");
    fireEvent.press(submitButton);
    const emailErrorText = getByText("Invalid email address");
    expect(emailErrorText).toBeTruthy();
  });

  it("Submit password less than 6 char", () => {
    const { getByText, getByPlaceholderText } = render(<LoginScreen />);
    const passwordInput = getByPlaceholderText("Password"),
      submitButton = getByText("Submit");
    fireEvent.changeText(passwordInput, "test");
    fireEvent.press(submitButton);
    const passwordErrorText = getByText(
      "Password must be at least 6 characters"
    );
    expect(passwordErrorText).toBeTruthy();
  });

  it("Submit invalid email and password", () => {
    const { getByText, getByPlaceholderText, queryByText } = render(
      <LoginScreen />
    );
    const emailInput = getByPlaceholderText("Email"),
      passwordInput = getByPlaceholderText("Password"),
      submitButton = getByText("Submit");
    fireEvent.changeText(emailInput, "testgmail.com");
    fireEvent.changeText(passwordInput, "test");
    fireEvent.press(submitButton);
    expect(getByText("Invalid email address")).toBeTruthy();
    expect(getByText("Password must be at least 6 characters")).toBeTruthy();
  });

  it("Submit valid email", () => {
    const { getByText, getByPlaceholderText, queryByText } = render(
      <LoginScreen />
    );
    const emailInput = getByPlaceholderText("Email"),
      submitButton = getByText("Submit");
    fireEvent.changeText(emailInput, "test@gmail.com");
    fireEvent.press(submitButton);
    expect(queryByText("Invalid email address")).toBeNull();
  });

  it("Submit password with 6 char", () => {
    const { getByText, getByPlaceholderText, queryByText } = render(
      <LoginScreen />
    );
    const passwordInput = getByPlaceholderText("Password"),
      submitButton = getByText("Submit");
    fireEvent.changeText(passwordInput, "test@123");
    fireEvent.press(submitButton);
    expect(queryByText("Password must be at least 6 characters")).toBeNull();
  });

  it("Submit valid email and password", () => {
    const { getByPlaceholderText, getByText, queryByText } = render(
      <NavigationContainer>
        <LoginScreen />
      </NavigationContainer>
    );
    const emailInput = getByPlaceholderText("Email"),
      passwordInput = getByPlaceholderText("Password"),
      submitButton = getByText("Submit"),
      emailError = queryByText("Invalid email address"),
      passwordError = queryByText("Invalid password");
    fireEvent.changeText(emailInput, "test@gmail.com");
    fireEvent.changeText(passwordInput, "test@123");
    fireEvent.press(submitButton);
    expect(emailError).toBeNull();
    expect(passwordError).toBeNull();
    expect(mockNavigation).toHaveBeenCalledWith("HomeScreen");
  });
});
