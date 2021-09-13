import { useContext } from "react";

import { AppContext } from "../context/context";


function useGlobalContext() {
  return useContext(AppContext);
}


export default useGlobalContext;