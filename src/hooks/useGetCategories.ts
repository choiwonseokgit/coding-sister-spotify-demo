import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../apis/categoryApi";

const useGetCategories = () => {
  return useQuery({
    queryKey: ["category"],
    queryFn: getCategories,
  });
};

export default useGetCategories;
