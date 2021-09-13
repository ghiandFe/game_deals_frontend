import { render } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";


const ApolloMock = ({children}) => {
  return (
    <MockedProvider>
      {children}
    </MockedProvider>
  )
}

const customRender = (ui, options) => {
  return render(ui, {wrapper: ApolloMock, ...options})
}


// re-export everything
export * from '@testing-library/react'
// override render method
export {customRender as render}