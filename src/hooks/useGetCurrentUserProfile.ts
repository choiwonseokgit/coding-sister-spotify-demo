import { useQuery } from "@tanstack/react-query";
import { getCurrentUserProfile } from "../apis/userApi";

const useGetCurrentUserProfile = () => {
  const accessToken = localStorage.getItem("access_token");

  return useQuery({
    queryKey: ["current-user-profile"],
    queryFn: getCurrentUserProfile,
    // enabled: !!accessToken,
    staleTime: 0,
  });
};

export default useGetCurrentUserProfile;
