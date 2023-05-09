import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "../../../application/pages/LoginPage";

describe("Login Page", () => {
  render(
    <Routes>
      <Route path="" element={<LoginPage />} />
    </Routes>,
    { wrapper: BrowserRouter }
  );

  it("Show user inputs", () => {
    expect(screen.getByText(/username/i)).toBeDefined();
    expect(screen.getByText(/password/i)).toBeDefined();
  });
});
