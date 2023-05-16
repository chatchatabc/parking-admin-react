import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import LoginPage from "../../../application/pages/LoginPage";
import TestEnvironment from "../../TestEnvironment";
import { authTokenRemove } from "../../../domain/services/authService";

describe("Login Page", () => {
  beforeEach(() => {
    authTokenRemove();
    render(
      <TestEnvironment>
        <LoginPage />
      </TestEnvironment>
    );
  });

  it("should have username input", () => {
    const username = screen.getByTestId(/username/i);
    expect(username).toBeDefined();
  });

  it("should have password input", () => {
    const password = screen.getByLabelText(/password/i);
    expect(password).toBeDefined();
  });

  it("should have submit button", () => {
    const submit = screen.getByRole("button", { name: /login/i });
    expect(submit).toBeDefined();
  });

  it("should show error message when username is empty", async () => {
    const username = screen.getByTestId(/username/i);
    const submit = screen.getByRole("button", { name: /login/i });

    fireEvent.change(username, { target: { value: "" } });
    fireEvent.click(submit);

    const feedback = await screen.findByText(/need some input/i);
    expect(feedback).toBeDefined();
  });

  it("should redirect to home page when login success", async () => {
    const username = screen.getByTestId(/username/i);
    const password = screen.getByLabelText(/password/i);
    const submit = screen.getByRole("button", { name: /login/i });

    fireEvent.change(username, { target: { value: "admin" } });
    fireEvent.change(password, { target: { value: "123456" } });
    fireEvent.click(submit);

    const message = await screen.findByText(/success/i);
    expect(message).toBeDefined();
    expect(window.location.pathname).toBe("/");
  });
});
