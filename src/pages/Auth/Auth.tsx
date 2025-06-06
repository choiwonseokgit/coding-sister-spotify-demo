import { useEffect } from "react";
import LoadingSpinner from "../../common/components/LoadingSpinner";
import useExchangeToken from "../../hooks/useExchangeToken";
import { useNavigate } from "react-router";

const Auth = () => {
  const navigate = useNavigate();
  const urlParams = new URLSearchParams(window.location.search);
  let code = urlParams.get("code");
  const codeVerifier = localStorage.getItem("code_verifier");

  const { mutate: exchangeTokenMutate } = useExchangeToken();

  useEffect(() => {
    if (code && codeVerifier) {
      exchangeTokenMutate({ code, codeVerifier });
      navigate("/");
    }
  }, [code, codeVerifier, exchangeTokenMutate]);

  return <LoadingSpinner />;
};

export default Auth;
