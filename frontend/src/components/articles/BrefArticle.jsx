import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { deletePaper } from "../../redux/actions.js/paperAction";
import { RiDeleteBack2Fill } from "react-icons/ri";
import { HiDocumentAdd } from "react-icons/hi";
import Modal from "../layouts/Modal";
import { transformDate } from "../../utils/transformDate";
import LikeBtn from "../layouts/LikeBtn";

const BrefArticle = ({ paper, user }) => {
  const [isShowModal, setIsShowModal] = useState(false);

  const history = useHistory();

  const {
    author,
    category,
    createdAt,
    likesNb,
    reviewsNb,
    object,
    title,
    _id,
    usersLike,
  } = paper;

  const date = transformDate(createdAt);

  const handleClick = () => {
    history.push(`/article/${_id}`);
  };

  const handleManageModal = () => setIsShowModal((boolean) => !boolean);

  const handleClickUpdate = (e) => {
    e.stopPropagation();
    history.push(`/article/update/${_id}`);
  };

  const handleClickDelete = (e) => {
    e.stopPropagation();
    handleManageModal();
  };

  return (
    <>
      <div
        onClick={handleClick}
        className="relative w-full p-2 my-2 transform rounded cursor-pointer shadow-1 hover:shadow-2"
      >
        <div className="text-gray-400 capitalize ">{category}</div>
        <h1 className="pt-1 pb-2 text-xl font-bold">{title}</h1>
        <p className="pb-3 text-sm">{object}</p>
        <hr className="border-gray-300" />
        <div className="flex justify-between py-2 text-sm">
          <div>Autheur : {author.pseudo}</div>
          <div>{date}</div>
        </div>
        <div className="flex items-center justify-center pt-2 space-x-12">
          {user?.id === author._id && (
            <>
              <div className="z-10 text-3xl cursor-pointer" onClick={handleClickUpdate}>
                <HiDocumentAdd className="text-blue-600" />
              </div>
              <div className="z-10 text-3xl cursor-pointer" onClick={handleClickDelete}>
                <RiDeleteBack2Fill className="text-red-500" />
              </div>
            </>
          )}
        </div>
        <div className="absolute z-10 right-5 top-2">
          <LikeBtn
            likesNb={likesNb}
            paperId={_id}
            author={author}
            usersLike={usersLike}
          />
        </div>
      </div>
      {isShowModal && (
        <Modal
          message="Etes vous sur de vouloir supprimer cet article ?"
          toastMessage="Votre article a été supprimé"
          action={deletePaper(_id)}
          close={handleManageModal}
        />
      )}
    </>
  );
};

export default BrefArticle;
