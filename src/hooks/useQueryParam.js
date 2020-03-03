import { useLocation } from "react-router-dom";

// Simple hook that returns the value pf the query param passed in. 
export const useQueryParam = param => {
  return new URLSearchParams(useLocation().search).get(param);
};
