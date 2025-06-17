import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../apis/categoryApi";
import useClientCredentialToken from "./useClientCredentialToken";

const useGetCategories = () => {
  const clientCredentialToken = useClientCredentialToken();

  return useQuery({
    queryKey: ["category"],
    queryFn: () => {
      if (!clientCredentialToken) throw new Error("No token available");

      return getCategories(clientCredentialToken);
    },
  });
};

export default useGetCategories;
