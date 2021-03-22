// import { useState, useEffect } from "react";
// import { useSelector } from "react-redux";

// export const useCheckLocalStorageUser = () => {
//   const [userState, setUserState] = useState({ pseudo: null, id: "" });
//   const auth = useSelector((state) => state.auth);

//   useEffect(() => {
//     const user = JSON.parse(localStorage.getItem("user"));
//     if (user && user.expireTime > Date.now()) {
//       setUserState(user);
//     } else {
//       setUserState(null);
//     }
//   }, [auth]);

//   return userState;
// };
