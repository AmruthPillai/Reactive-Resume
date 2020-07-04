import { navigate } from "gatsby";
import { useEffect } from "react";

const NotFound = () => {
  useEffect(() => {
    navigate("/");
  }, []);

  return null;
};

export default NotFound;
