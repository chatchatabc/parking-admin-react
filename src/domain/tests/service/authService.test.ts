import { describe, expect, it } from "vitest";
import {
  authTokenGet,
  authTokenRemove,
  authTokenSave,
} from "../../service/authService";

describe("Auth Token", () => {
  const token = "1234567890";

  it("Save Token", () => {
    authTokenSave(token);
    const tokenSaved = authTokenGet();
    expect(tokenSaved).toBe(token);
  });

  it("Get Token", () => {
    const tokenSaved = authTokenGet();
    expect(tokenSaved).toBe(token);
  });

  it("Remove Token", () => {
    authTokenRemove();
    const tokenSaved = authTokenGet();
    expect(tokenSaved).toBe(undefined);
  });
});
