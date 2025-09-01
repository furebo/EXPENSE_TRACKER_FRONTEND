import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

const Logout = () => {
  const { clearUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    // clear auth info
    localStorage.clear();
    clearUser();
    // redirect to login
    navigate("/login", { replace: true });
  }, [clearUser, navigate]);

  return null; // nothing visible on screen
};

export default Logout;
