import { render } from "../../configTests";

import { Deal } from "../../components";


function renderDeal(title, header) {
  return render(
    <Deal
      storeId="1"
      title={ title }
      imgUrl="url.jpg"
      headerImg={ header }
      salePrice={ 2.49 }
      normalPrice={ 9.99 }
    />
  );
}


it("Deal card show props", () => {
  const { container, getByText } = renderDeal("game title", "header.jpg");

  const img = container.querySelector("img");
  expect(img.attributes["src"].value).toBe("header.jpg");
  expect(getByText("2.49 $")).toBeInTheDocument();
  expect(getByText("9.99$")).toBeInTheDocument();
  expect(getByText("game title")).toBeInTheDocument();
});


it("Deal game title slice", () => {
  const title = "game deals with a very long title: more than 40 characters"
  const { getByText, queryByText } = renderDeal(title);

  expect(getByText(/game deals with/)).toBeInTheDocument();
  expect(queryByText(/characters/)).toBeNull();
});


it("Deal color success from storeId", () => {
  const { getByText } = renderDeal("deal title");

  expect(getByText("9.99$").closest("p")).toHaveClass("text-success");
});


it("Img src is imgUrl if headerImg is null", () => {
  const { container } = renderDeal("deal title");

  const img = container.querySelector("img");
  expect(img.attributes["src"].value).toBe("url.jpg");
});