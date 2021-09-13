import { render, fireEvent, screen } from "../../configTests";

import { Button } from "../../components";


it("Button onClick props works fine", () => {
  const p = document.createElement("p");
  p.textContent = "Button onClick event called";

  const { container, getByText } = render(
    <Button
      text="test button"
      onClick={() => container.appendChild(p)}
    />
  );
  const btn = getByText("test button");
  expect(btn).toBeInTheDocument();

  fireEvent.click(btn);

  expect(screen.getByText(/call/i)).toBeInTheDocument();
});


it("Button with href props render LinkButton", () => {
  const { container } = render(
    <Button
      text="test link button"
      href="url.com"
    />
  );
  expect(container.querySelector("a")).toBeInTheDocument();
  expect(container.querySelector("button")).not.toBeInTheDocument();
});


it("Button bgColor works fine", () => {
  const { getByText } = render(
    <Button
      text="test button"
      bgColor="success"
    />
  );
  expect(getByText("test button")).toHaveClass("btn-success")
});


// test('should show login form', () => {
//   render(<Login />)
//   const input = screen.getByLabelText('Username')
//   // Events and assertions...
// })