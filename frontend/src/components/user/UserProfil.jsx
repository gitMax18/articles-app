import React, { useState } from "react";
import { deleteUser } from "../../redux/actions.js/userAction";
import { logoutUser } from "../../redux/actions.js/authUserAction";
import { useSelector } from "react-redux";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { FiMail } from "react-icons/fi";
import { AiTwotoneCalendar } from "react-icons/ai";
import { CgBoy } from "react-icons/cg";
import Modal from "../layouts/Modal";
import { transformDate } from "../../utils/transformDate";

const UserProfil = () => {
  const [isShowModal, setIsShowModal] = useState(false);

  const handleManageModal = () => setIsShowModal((boolean) => !boolean);

  const { _id, createdAt, pseudo, email } = useSelector((state) => state.user.user);

  const date = transformDate(createdAt);

  const handleClick = () => {
    handleManageModal();
  };

  return (
    <div className="space-y-2 ">
      <div className="flex items-center">
        <CgBoy className="inline-block mr-2 text-2xl" />{" "}
        <strong className="mr-2 text-lg">Pseudo : </strong>
        {pseudo}
      </div>
      <div className="flex items-center">
        <FiMail className="inline-block mr-2 text-2xl" />{" "}
        <strong className="mr-2 text-lg">Email :</strong>
        {email}
      </div>
      <div className="flex items-center">
        <AiTwotoneCalendar className="inline-block mr-2 text-2xl" />{" "}
        <strong className="mr-2 text-lg">Compte créer le :</strong> {date}
      </div>
      <RiDeleteBin2Fill
        onClick={handleClick}
        className="absolute top-0 right-0 text-4xl text-red-400 transform cursor-pointer hover:scale-110"
      />
      {isShowModal && (
        <Modal
          message="Cette action supprimera votre compte ainsi que tous les articles que vous avez publiés. Etes vous sur de vouloir continuer ?"
          toastMessage="Votre compte a été supprimé"
          action1={deleteUser(_id)}
          action2={logoutUser(_id)}
          close={handleManageModal}
        />
      )}
    </div>
  );
};

export default UserProfil;
