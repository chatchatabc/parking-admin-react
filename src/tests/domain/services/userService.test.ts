import { describe, it } from "vitest";
import { authLogin } from "../../../domain/services/authService";
import { userCreateProfile } from "../../../domain/services/userService";

describe("User Service", async () => {
  const credentials = {
    username: "admin",
    password: "123456",
  };
  const response = await authLogin(credentials);
  if (response.error) return;

  it("Add User", async () => {
    const values = {
      phone: "123456789",
      username: "test",
      role: "ADMIN",
    };
    const addUser = userCreateProfile(values);
  });

  it("Fetch User Profile", () => "TODO");
});
