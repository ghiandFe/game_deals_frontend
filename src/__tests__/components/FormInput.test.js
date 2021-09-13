import { render, fireEvent } from "../../configTests";
import userEvent from "@testing-library/user-event";

import { FormInput, FormRules, FormSelect } from "../../components";


function renderInput(type, error, handleChange) {
  return render(
    <FormInput
      type={ type }
      name="username"
      label="Username"
      handleChange={ handleChange }
      error={ error ? error : false }
    />
  );
}

it("Form input render props and label", () => {
  const { getByLabelText } = renderInput("text");
  const input = getByLabelText("Username:");
  expect(input).toBeInTheDocument();
  expect(input.attributes.type.value).toBe("text");
});

it("Form input handleChange works fine", () => {
  const handleChange = jest.fn();
  const { getByLabelText } = renderInput("text", false, handleChange);
  const input = getByLabelText("Username:");
  expect(input).toBeInTheDocument();

  userEvent.type(input, "user");
  expect(handleChange).toBeCalledTimes(4);
})

it("From renders an error", () => {
  const { getByText } = renderInput("text", "error username");
  const err = getByText("error username")
  expect(err).toBeInTheDocument();
  expect(err).toHaveClass("form-error");
});

// ---------------------------------------------------------------

function renderSelect(handleChange) {
  return render(
    <FormSelect 
      name="storeFilter"
      label="Store"
      options={{
        0: "Any",
        1: "Steam",
        7: "GOG",
        11: "Humble Store"
      }}
      onChange={ handleChange }
      defaultValue={ null }
    />  
  );
}

it("Select onChange works fine", () => {
  const handleChange = jest.fn();
  const { getByLabelText } = renderSelect(handleChange);
  const sel = getByLabelText("Store:");
  expect(sel).toBeInTheDocument();

  fireEvent.change(sel, {target: {value: 7}})
  expect(handleChange).toBeCalledTimes(1);

  fireEvent.change(sel, {target: {value: 11}})
  expect(handleChange).toBeCalledTimes(2);
})

// ---------------------------------------------------------------

it("Form rules render with type user", () => {
  const { getByText } = render(<FormRules type="user" />);
  expect(getByText(/username must be/i)).toBeInTheDocument();
});

it("Form rules render with type password", () => {
  const { getByText } = render(<FormRules type="password" />);
  expect(getByText(/lowercase/i)).toBeInTheDocument();
});