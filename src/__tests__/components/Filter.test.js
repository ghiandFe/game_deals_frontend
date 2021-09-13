import { render } from "../../configTests";

import { Filters } from "../../components";
import { AppProvider } from "../../context/context";


function renderFilters() {
  return render(
    <AppProvider>
      <Filters />
    </AppProvider>
  );
}

it("'Filters' renders 3 'FormSelect'", () => {
  const { getByLabelText } = renderFilters();
  expect(getByLabelText("Store:")).toBeInTheDocument();
  expect(getByLabelText("Price:")).toBeInTheDocument();
  expect(getByLabelText("Sort:")).toBeInTheDocument();
});