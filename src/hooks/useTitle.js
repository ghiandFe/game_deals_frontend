import { useEffect } from "react";

import { MAIN_TITLE } from "../utils/constants";


function useTitle(title) {
  useEffect(() => {
    document.title = `${MAIN_TITLE} - ${title}`;
  }, [title]);
  return;
};


export default useTitle;