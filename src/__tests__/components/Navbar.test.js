import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import { Navbar } from "../../components";
import { AppContext } from "../../context/context";


function renderNav(isLogged, user) {
  return render(
    <AppContext.Provider value={{
      user,
      isLogged
    }}>
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    </AppContext.Provider>
  );
}


it("If user is logged, shows dropdown with username", () => {
  const { getByText } = renderNav(true, "username");
  expect(getByText("username")).toBeInTheDocument();
});

it("If user is not logged, doesn't show dropdown with username", () => {
  const { queryByText } = renderNav(false);
  expect(queryByText("username")).toBeNull();
});