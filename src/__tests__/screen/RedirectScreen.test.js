import { screen, render } from "../../configTests";

import { RedirectScreen } from "../../screens";
import { AppContext } from "../../context/context";


function renderRedirect(isLogged) {
  return render(
    <AppContext.Provider value={{
      isLogged
    }}>
      <RedirectScreen />
    </AppContext.Provider>
  );
}


it("Conditional render 'isLogged'", () => {
  renderRedirect(true);
  expect(screen.getByText("Logged In")).toBeInTheDocument();
});