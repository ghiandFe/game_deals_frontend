import { render } from "@testing-library/react";

import { HomeFooter } from "../../components";
import { AppContext } from "../../context/context";


function renderHF(isLogged, allDeals, noMoreDeals) {
  return render(
    <AppContext.Provider value={{
      allDeals,
      isLogged,
      noMoreDeals
    }}>
      <HomeFooter />
    </AppContext.Provider>
  );
}


it("Load more button render if noMoreDeals==false", () => {
  const { getByText } = renderHF(true, new Array(10), false);
  const loadButton = getByText(/load more/i);
  expect(loadButton).toBeInTheDocument();
});

it("Render auth link if user is not logged", () => {
  const {getByText, queryByText} = renderHF(false);
  expect(getByText(/register or login/i)).toBeInTheDocument();
  expect(queryByText(/load more/i)).toBeNull();
});

it("render no [more] deals to show", () => {
  const { getByText, queryByText } = renderHF(true, new Array(0), true);
  expect(getByText("No deals to show")).toBeInTheDocument();
  expect(queryByText("No more deals to show")).toBeNull();
})

it("render no more deals to show", () => {
  const { getByText, queryByText } = renderHF(true, new Array(10), true);
  expect(getByText("No more deals to show")).toBeInTheDocument();
  expect(queryByText("No deals to show")).toBeNull();
})