import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCommentary, deleteCommentary } from "../../redux/actions.js/reviewAction";
import { GrUpdate, GrClose } from "react-icons/gr";

const Commentary = ({ review }) => {
  const { commentary, user, _id } = review;
  const [isUpdated, setIsUpdated] = useState(false);
  const [updatedCommentary, setUpdatedCommentary] = useState(commentary);

  const dispatch = useDispatch();
  const { user: currentUser } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newReview = {
      commentary: updatedCommentary,
      _id,
    };
    dispatch(updateCommentary(review.paper, newReview));
    setIsUpdated((boolean) => !boolean);
  };

  const handleDelete = () => {
    dispatch(deleteCommentary(review.paper, review._id));
  };

  return (
    <div className="relative p-2 my-2 bg-blue-300 rounded shadow-2">
      <div className="mb-1 font-bold">{user.pseudo}</div>
      {isUpdated ? (
        <form onSubmit={handleSubmit}>
          <textarea
            name="commentary"
            className="w-11/12 p-2 break-words rounded"
            value={updatedCommentary}
            onChange={(e) => setUpdatedCommentary(e.target.value)}
          ></textarea>
          <button className="block mx-auto bg-indigo-400 btn">Valider</button>
        </form>
      ) : (
        <p className="pl-2 break-words">{commentary}</p>
      )}
      {currentUser?.id === user._id && (
        <div className="absolute top-2 right-2">
          <div
            className="inline-block mr-3 transform cursor-pointer hover:scale-x-110"
            onClick={() => setIsUpdated((b) => !b)}
          >
            <GrUpdate className="text-sm" />
          </div>
          <div
            className="inline-block transform hover:scale-x-110"
            onClick={handleDelete}
          >
            <GrClose className="text-red-500 cursor-pointer " />
          </div>
        </div>
      )}
    </div>
  );
};

export default Commentary;
