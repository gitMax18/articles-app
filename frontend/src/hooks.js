import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export const useCheckLocalStorageUser = () => {
  const [userState, setUserState] = useState(null);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.expireTime > Date.now()) {
      setUserState(user);
    } else {
      setUserState(null);
    }
  }, [user]);

  return userState;
};
