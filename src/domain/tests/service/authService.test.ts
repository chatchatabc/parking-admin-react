import { describe, expect, it } from "vitest";
import { authLogin, authLogout, authTokenGet } from "../../service/authService";

describe("Auth Login and Logout", () => {
  const credentials = {
    username: "admin",
    password: "123456",
  };

  it("Login", async () => {
    const response = await authLogin(credentials);
    expect(response.error).toBe(false);
  });

  it("Token Saved", () => {
    const tokenSaved = authTokenGet();
    expect(tokenSaved).not.toBe(undefined);
  });

  it("Logout", async () => {
    const response = await authLogout();
    expect(response.error).toBe(false);
  });

  it("Token Removed", () => {
    const tokenSaved = authTokenGet();
    expect(tokenSaved).toBe(undefined);
  });
});
