import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Header from "../components/Header";
import { BrowserRouter } from "react-router-dom";
import { signOut } from "aws-amplify/auth";
import { useAuth } from "../auth/AuthContext";

const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

jest.mock("../auth/AuthContext", () => ({
  useAuth: jest.fn(),
}));

jest.mock("aws-amplify/auth", () => ({
  signOut: jest.fn(),
}));

const renderHeader = (authValue, props = {}) => {
  useAuth.mockReturnValue(authValue);

  return render(
    <BrowserRouter>
      <Header onMenuClick={jest.fn()} {...props} />
    </BrowserRouter>,
  );
};
test("renders user name", () => {
  renderHeader({
    user: { firstName: "Yash" },
    setUser: jest.fn(),
  });

  expect(screen.getByText(/Hello,/)).toBeInTheDocument();
  expect(screen.getByText("Yash")).toBeInTheDocument();
});
test("shows Guest when user is null", () => {
  renderHeader({
    user: null,
    setUser: jest.fn(),
  });

  expect(screen.getByText("Guest")).toBeInTheDocument();
});
test("calls onMenuClick when menu button is clicked", () => {
  const onMenuClick = jest.fn();

  render(
    <BrowserRouter>
      <Header onMenuClick={onMenuClick} />
    </BrowserRouter>,
  );

  fireEvent.click(screen.getByRole("button", { name: /open menu/i }));

  expect(onMenuClick).toHaveBeenCalled();
});
test("navigates to dashboard when logo clicked", () => {
  renderHeader({
    user: { firstName: "Yash" },
    setUser: jest.fn(),
  });

  fireEvent.click(screen.getByText("Customer Portal"));

  expect(mockNavigate).toHaveBeenCalledWith("/dashboard");
});

test("signs out and navigates to signin", async () => {
  const setUser = jest.fn();
  signOut.mockResolvedValueOnce();

  renderHeader({
    user: { firstName: "Yash" },
    setUser,
  });

  fireEvent.click(screen.getByText("Sign out"));

  await waitFor(() => {
    expect(signOut).toHaveBeenCalledWith({ global: true });
    expect(setUser).toHaveBeenCalledWith(null);
    expect(mockNavigate).toHaveBeenCalledWith("/signin", { replace: true });
  });
});
