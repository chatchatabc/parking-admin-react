import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import LoginPage from "../../../application/pages/LoginPage";
import TestEnvironment from "../../TestEnvironment";
import { authTokenRemove } from "../../../domain/services/authService";

describe("Login Page", async () => {
  authTokenRemove();

  render(
    <TestEnvironment>
      <LoginPage />
    </TestEnvironment>
  );

  const username = screen.getByTestId(/username/i);
  const password = screen.getByLabelText(/password/i);
  const submit = screen.getByRole("button", { name: /login/i });

  it("should have username input", () => {
    expect(username).toBeDefined();
  });

  it("should have password input", () => {
    expect(password).toBeDefined();
  });

  it("should have submit button", () => {
    expect(submit).toBeDefined();
  });

  fireEvent.change(username, { target: { value: "" } });
  fireEvent.click(submit);
  const feedback = await screen.findByText(/need some input/i);

  it("should show error message when username is empty", () => {
    expect(feedback).toBeDefined();
  });

  fireEvent.change(username, { target: { value: "admin" } });
  fireEvent.change(password, { target: { value: "123456" } });
  fireEvent.click(submit);

  const message = await screen.findByText(/success/i);

  it("should redirect to home page when login success", () => {
    expect(message).toBeDefined();
    expect(window.location.pathname).toBe("/");
  });
});
