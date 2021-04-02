import React, { useEffect, useState } from "react";
import { getUserProfil, resetUserError } from "../../redux/actions.js/userAction";
import { useSelector, useDispatch } from "react-redux";
import UserProfil from "../user/UserProfil";
import BrefArticle from "../articles/BrefArticle";
import UpdateUserProfil from "../user/UpdateUserProfil";
import UpdateUserPassword from "../user/UpdateUserPassword";
import { IoMdClose } from "react-icons/io";
import { toast } from "react-toastify";
import Loader from "../layouts/Loader";
import { resetLikeState } from "../../redux/actions.js/likeActions";

const ProfilUserPage = () => {
  const [isOnUpdate, setIsOnUpdate] = useState(false);

  const dispatch = useDispatch();
  const { isLoading, papers, isUpdated, message } = useSelector((state) => state.user);

  const { user } = useSelector((state) => state.auth);

  const { isValidated } = useSelector((state) => state.newPaper);
  const { isUpdated: isLikeUpdated } = useSelector((state) => state.like);

  useEffect(() => {
    if (user) {
      dispatch(getUserProfil(user.id));
    }
    if (isLikeUpdated) {
      dispatch(getUserProfil(user.id));
      dispatch(resetLikeState());
    }
  }, [dispatch, user, isValidated, isLikeUpdated]); // a revoir

  useEffect(() => {
    if (isUpdated) {
      toast.dark(message);
      dispatch(resetUserError());
    }
  }, [isUpdated, dispatch]);

  const btnClassName = isOnUpdate
    ? "absolute right-0 top-10 transform text-red-500 text-4xl outline-none focus:outline-none hover:scale-110 "
    : "block mx-auto my-4 text-white bg-indigo-900 btn w-max";

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center w-full my-32">
          <Loader />
        </div>
      ) : (
        <div className="p-2">
          <div className="relative">
            <h1 className="my-5 text-2xl font-bold text-indigo-900 border-b-4 border-indigo-900 w-max">
              Votre profil :
            </h1>
            {isOnUpdate ? (
              <>
                <UpdateUserProfil />
                <UpdateUserPassword />
              </>
            ) : (
              <UserProfil />
            )}
            <button
              className={btnClassName}
              onClick={() => setIsOnUpdate((prevState) => !prevState)}
            >
              {isOnUpdate ? <IoMdClose /> : "Modifier"}
            </button>
          </div>
          <div className="profilUser_article">
            <h1 className="my-5 text-2xl font-bold text-indigo-900 border-b-4 border-indigo-900 w-max">
              Vos articles :
            </h1>
            {papers.map((paper) => (
              <BrefArticle paper={paper} key={paper._id} user={user} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default ProfilUserPage;
