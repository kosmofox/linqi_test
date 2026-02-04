export const testUsers = {
  validUser: {
    username: process.env.TEST_USER_NAME || "test@linqi.com",
    password: process.env.TEST_USER_PASSWORD || "Test123!@#",
  },
  invalidUser: {
    username: "invalid@example.com",
    password: "WrongPassword",
  },
} as const;
