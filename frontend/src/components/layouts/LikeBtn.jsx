import React from "react";
import { AiFillLike } from "react-icons/ai";
import { useLike } from "../../utils/hooks";
import { useSelector } from "react-redux";

const LikeBtn = ({ likesNb, paperId, usersLike, author }) => {
  const { isLiked, handleChangeLike } = useLike(usersLike, paperId, author);

  const { user } = useSelector((state) => state.auth);

  const className = isLiked ? "text-2xl text-indigo-500" : "text-2xl text-indigo-200";

  return (
    <div
      className="flex items-center justify-center w-10 h-10 transform rounded-full hover:scale-110 hover:bg-indigo-50"
      onClick={(e) => handleChangeLike(e)}
    >
      <div className="relative">
        <AiFillLike className={className} />
        <div className="absolute text-sm font-bold text-indigo-800 -top-1 left-full">
          {likesNb}
        </div>
      </div>
    </div>
  );
};

export default LikeBtn;
