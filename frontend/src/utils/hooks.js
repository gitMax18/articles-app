import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { manageLike } from "../redux/actions.js/likeActions";

export const useLike = (usersLike, paperId) => {
  const [isLiked, setIsLiked] = useState(false);

  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    if (usersLike.includes(user.id)) {
      setIsLiked(true);
    } else {
      setIsLiked(false);
    }
  }, [usersLike, user.id]);

  const handleChangeLike = (e) => {
    e.stopPropagation();
    dispatch(manageLike(paperId));
  };
  return { isLiked, handleChangeLike };
};

export const useIsSamePasswords = () => {
  const [isSamePassword, setIsSamePassword] = useState(false);
  const [passwordError, setPasswordError] = useState(null);

  const checkPassword = (password1, password2) => {
    if (password1 !== password2) {
      setIsSamePassword(false);
      setPasswordError("Mot de passe non identique...");
    } else {
      setIsSamePassword(true);
      setPasswordError(null);
    }
    return isSamePassword;
  };

  return { isSamePassword, passwordError, checkPassword };
};
