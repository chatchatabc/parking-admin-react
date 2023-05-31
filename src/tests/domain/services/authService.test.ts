import { describe, expect, it } from "vitest";
import {
  authLogin,
  authLogout,
  authTokenGet,
  authTokenRemove,
} from "../../../domain/services/authService";

describe("Auth Operations", () => {
  const credentials = {
    username: "admin",
    password: "123456",
  };
  authTokenRemove();

  it("Login", async () => {
    const response = await authLogin(credentials);
    expect(response.errors).toBe(false);
  });

  it("Token Saved", () => {
    const tokenSaved = authTokenGet();
    expect(tokenSaved).not.toBe(undefined);
  });

  it("Logout", async () => {
    const response = await authLogout();
    expect(response.errors).toBe(false);
  });

  it("Token Removed", () => {
    const tokenSaved = authTokenGet();
    expect(tokenSaved).toBe(undefined);
  });
});
