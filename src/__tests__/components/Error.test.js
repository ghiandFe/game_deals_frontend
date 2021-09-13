import { render } from "../../configTests";

import { Error } from "../../components";
import { AppProvider } from "../../context/context";


function renderErr(msg) {
  return render(
    <AppProvider>
      <Error err={ msg } />
    </AppProvider>
  );
}


it("Error component show error message", () => {
  const { getByText } = renderErr("error message");
  expect(getByText("error message")).toBeInTheDocument();
});


it("Error show link to homepage", () => {
  const { getByText } = renderErr("error message");
  expect(getByText("Go to Homepage")).toBeInTheDocument();
});


it("Error 'signature has expired' show link to login", () => {
  const { getByText } = renderErr("signature has expired");
  expect(getByText("Go to Homepage")).toBeInTheDocument();
});
