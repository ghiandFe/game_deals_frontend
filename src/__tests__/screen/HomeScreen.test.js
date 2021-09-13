import { screen, render } from "../../configTests";
import { BrowserRouter } from "react-router-dom";

import { HomeScreen } from "../../screens";
import { AppContext } from "../../context/context";


function renderHome(isLogged, error) {
  return render(
    <AppContext.Provider value={{
      isLogged,
      error,
      allDeals: new Array(10),
      defaultSelect: {
        storeFilter: 0,
        priceFilter: 0,
        orderBy: 0
      }
    }}>
      <BrowserRouter>
        <HomeScreen />
      </BrowserRouter>
    </AppContext.Provider>
  );
}


it("Home screen doesn't show filters if user is not logged", () => {
  renderHome(false, false);
  expect(screen.queryByText(/Price/)).toBeNull();
});

it("Home screen shows filters if user is logged", () => {
  renderHome(true, false);
  expect(screen.getByLabelText(/Price/)).toBeInTheDocument();
});

it("Render error screen", () => {
  renderHome(true, true);
  expect(screen.queryByText(/Price/)).toBeNull();
  expect(screen.getByText(/ops/i)).toBeInTheDocument();
});

// If passed, also the custom hook useTitle works fine
it("If user is logged, home document title contains dashboard", () => {
  renderHome(true, false);
  expect(document.title).toBe("GAME DEALS - Dashboard");
});