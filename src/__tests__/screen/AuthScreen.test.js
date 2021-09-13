import { act, screen, render, fireEvent } from "../../configTests";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

import { AuthScreen } from "../../screens";
import { AppContext } from "../../context/context";


function renderAuth(isLoginForm, isLogged) {
  return render(
    <AppContext.Provider value={{
      isLogged
    }}>
      <BrowserRouter>
        <AuthScreen isLoginForm={isLoginForm} />
      </BrowserRouter>
    </AppContext.Provider>
  );
}


it("Login fields are required", async() => {
  act(() => {
    renderAuth(true, false);
  });
  const username = screen.getByLabelText("Username:");
  const password = screen.getByLabelText("Password:");
  const submit = screen.getByText("login");

  userEvent.type(username, "federico");

  await act(async() => {
    fireEvent.click(submit);
  });
  expect(screen.getByText("password required")).toBeInTheDocument();

  userEvent.clear(username);
  userEvent.type(password, "pa55word");

  await act(async() => {
    fireEvent.click(submit);
  });
  expect(screen.getByText("username required")).toBeInTheDocument();
});


it("Register username and password validation", async() => {
  act(() => {
    renderAuth(false, false);
  });
  const username = screen.getByLabelText("Username:");
  const password = screen.getByLabelText("Password:");
  const password2 = screen.getByLabelText("Repeat password:");
  const submit = screen.getByText("register");

  userEvent.type(username, "fed");

  await act(async() => {
    fireEvent.click(submit);
  });
  expect(screen.queryAllByText(/at least 4 char/i).length).toBe(2);

  userEvent.type(username, "erico");

  await act(async() => {
    fireEvent.click(submit);
  });
  expect(screen.queryAllByText(/at least 8 characters/i).length).toBe(3);

  userEvent.type(password, "password");
  userEvent.type(password2, "password");

  await act(async() => {
    fireEvent.click(submit);
  });
  expect(screen.queryAllByText(/at least 1 uppercase/i).length).toBe(3);

  userEvent.type(password, "A");
  userEvent.type(password2, "A");

  await act(async() => {
    fireEvent.click(submit);
  });
  expect(screen.queryAllByText(/at least 1 number/i).length).toBe(3);

  userEvent.type(password, "A");
  userEvent.type(password2, "A");

  await act(async() => {
    fireEvent.click(submit);
  });
  expect(screen.queryAllByText(/at least 1 number/i).length).toBe(3);

  userEvent.type(password, "1");
  userEvent.type(password2, "1");

  await act(async() => {
    fireEvent.click(submit);
  });
  expect(screen.queryAllByText(/at least 1 symbol/i).length).toBe(3);

  userEvent.type(password, "_");

  await act(async() => {
    fireEvent.click(submit);
  });
  expect(screen.queryAllByText("passwords must match").length).toBe(2);
});