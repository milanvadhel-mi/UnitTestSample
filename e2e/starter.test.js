describe("LoginScreen E2E Tests", () => {
  beforeAll(async () => {
    await device.launchApp(); // Launch the app before running tests
  });

  beforeEach(async () => {
    await device.reloadReactNative(); // Reload React Native before each test
  });

  it("should display the login screen", async () => {
    await expect(element(by.id("Login"))).toBeVisible();
  });

  it("should show error when submitting without filling any fields", async () => {
    await element(by.id("Submit")).tap();
    await expect(element(by.text("Invalid email address"))).toBeVisible();
    await expect(
      element(by.text("Password must be at least 6 characters"))
    ).toBeVisible();
  });

  it("should show error for invalid email without '@'", async () => {
    await element(by.id("Email")).typeText("testgmail.com");
    await element(by.id("Submit")).tap();
    await expect(element(by.text("Invalid email address"))).toBeVisible();
  });

  it("should show error for invalid email without a dot in domain", async () => {
    await element(by.id("Email")).typeText("test@gmailcom");
    await element(by.id("Submit")).tap();
    await expect(element(by.text("Invalid email address"))).toBeVisible();
  });

  it("should show error for password less than 6 characters", async () => {
    await element(by.id("Password")).typeText("test");
    await element(by.id("Submit")).tap();
    await expect(
      element(by.text("Password must be at least 6 characters"))
    ).toBeVisible();
  });

  it("should show errors for invalid email and password together", async () => {
    await element(by.id("Email")).typeText("testgmail.com");
    await element(by.id("Password")).typeText("test");
    await element(by.id("Submit")).tap();
    await expect(element(by.text("Invalid email address"))).toBeVisible();
    await expect(
      element(by.text("Password must be at least 6 characters"))
    ).toBeVisible();
  });

  it("should not show error for valid email", async () => {
    await element(by.id("Email")).clearText();
    await element(by.id("Email")).typeText("test@gmail.com");
    await element(by.id("Submit")).tap();
    await expect(element(by.text("Invalid email address"))).toBeNotVisible();
  });

  it("should not show error for valid password of 6 characters or more", async () => {
    await element(by.id("Password")).clearText();
    await element(by.id("Password")).typeText("test@123");
    await element(by.id("Submit")).tap();
    await expect(
      element(by.text("Password must be at least 6 characters"))
    ).toBeNotVisible();
  });

  it("should navigate to HomeScreen for valid email and password", async () => {
    await element(by.id("Email")).clearText();
    await element(by.id("Password")).clearText();
    await element(by.id("Email")).typeText("test@gmail.com");
    await element(by.id("Password")).typeText("test@123");
    await element(by.id("Submit")).tap();
    await expect(element(by.text("Home Screen"))).toBeVisible();
  });
});

