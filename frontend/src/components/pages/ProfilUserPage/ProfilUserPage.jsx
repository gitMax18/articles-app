import React, { useEffect, useState } from "react";
import { getUserProfil } from "../../../redux/actions.js/userAction";
import { useSelector, useDispatch } from "react-redux";
import { useCheckLocalStorageUser } from "../../../hooks";
import UserProfil from "../../user/UserProfil/UserProfil";
import BrefArticle from "../../articles/BrefArticle/BrefArticle";
import UpdateUserProfil from "../../user/UpdateUserProfil/UpdateUserProfil";
import UpdateUserPassword from "../../user/UpdateUserPassword/UpdateUserPassword";

const ProfilUserPage = () => {
  const [isOnUpdate, setIsOnUpdate] = useState(false);

  const dispatch = useDispatch();
  const { user, isLoading, error, papers } = useSelector((state) => state.user);

  const localUser = useCheckLocalStorageUser();

  useEffect(() => {
    if (localUser) {
      dispatch(getUserProfil(localUser.id));
    }
  }, [dispatch, localUser, user.isOnUpdate]);

  return (
    <div className="profilUser">
      <div className="profilUser_data">
        <h1 className="profilUser_title">Votre profil</h1>
        {isOnUpdate ? (
          <>
            <UpdateUserProfil user={user} />
            <UpdateUserPassword />
          </>
        ) : (
          <UserProfil user={user} />
        )}
        <button
          className="profilUser_btn"
          onClick={() => setIsOnUpdate((prevState) => !prevState)}>
          {isOnUpdate ? "Annuler" : "Modifier"}
        </button>
      </div>
      <div className="profilUser_article">
        <h1 className="profilUser_title">Vos articles :</h1>
        {papers.map((paper) => (
          <BrefArticle paper={paper} key={paper._id} />
        ))}
      </div>
    </div>
  );
};

export default ProfilUserPage;
