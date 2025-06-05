import { useQuery } from "@tanstack/react-query";
import { getClientCredentialToken } from "../apis/authApi";

const useClientCredentialToken = () => {
  const { data } = useQuery({
    queryKey: ["client-credential=token"],
    queryFn: getClientCredentialToken,
  });

  return data?.access_token;
};

export default useClientCredentialToken;
