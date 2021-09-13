import { render } from "@testing-library/react";

import { BrowserRouter } from "react-router-dom";

import { Deals } from "../../components";
import { AppContext } from "../../context/context";


function renderDeals(allDeals, isLogged) {
  return render(
    <AppContext.Provider value={{allDeals, isLogged}}>
      <BrowserRouter>
        <Deals />
      </BrowserRouter>
    </AppContext.Provider>
  );
}

const allDeals = [
  {
    id: 1,
    title: "game",
    store: {
      id: 1
    }
  },
  {
    id: 2,
    title: "game2",
    store: {
      id: 1
    }
  }
];


it("Deals render allDeals", () => {
  const { getByText } = renderDeals(allDeals, true);
  expect(getByText("game")).toBeInTheDocument();
  expect(getByText("game2")).toBeInTheDocument();
});

it("Deal card is a link if user is logged", () => {
  const { container } = renderDeals(allDeals, true);
  expect(container.querySelectorAll("a").length).toBe(2);
});

it("Deal card isn't a link if user is not logged", () => {
  const { container } = renderDeals(allDeals, false);
  expect(container.querySelectorAll("a").length).toBe(0);
});

