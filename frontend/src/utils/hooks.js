import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addLike, removeLike } from "../redux/actions.js/likeActions";
import { toast } from "react-toastify";

export const useLike = (usersLike, paperId, author) => {
  const [isLiked, setIsLiked] = useState(false);

  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    if (usersLike.includes(user?.id)) {
      setIsLiked(true);
    } else {
      setIsLiked(false);
    }
  }, [usersLike, user]);

  const handleChangeLike = (e) => {
    e.stopPropagation();
    if (user === null) {
      return toast.dark("Vous devez vous conneter pour liké un article");
    }
    if (author._id !== user.id) {
      if (isLiked) {
        dispatch(removeLike(paperId));
      } else {
        dispatch(addLike(paperId));
      }
    } else {
      toast.dark("Vous ne pouvez pas liké vos articles");
    }
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
