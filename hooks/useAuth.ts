import axios from "axios";
import { useContext } from "react";
import { AuthenticationContext } from "../app/context/AuthContext";
const useAuth = () => {
  const { data, error, loading, setAuthState } = useContext(
    AuthenticationContext
  );
  const signin = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    setAuthState({ loading: true, data: null, error: null });
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/signin",
        {
          email,
          password,
        }
      );
      console.log(response);
      setAuthState({ loading: false, data: response.data, error: null });
    } catch (error: any) {
      console.log(error.response.data.errorMessage);
      setAuthState({
        loading: false,
        data: null,
        error: error.response.data.errorMessage,
      });
    }
  };

  const signup = async () => {};

  return { signin, signup };
};

export default useAuth;
