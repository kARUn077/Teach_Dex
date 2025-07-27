import React from "react";
import { useLoadUserQuery } from "../features/api/authApi";
import LoadingSpinner from "./LoadingSpinner";

const CustomLoader = ({ children }) => {
  const { isLoading } = useLoadUserQuery();
  return <>{isLoading ? <LoadingSpinner className="text-[#537D5D] dark:text-[#D8F3DC]" /> : <>{children}</>}</>;
};

export default CustomLoader;