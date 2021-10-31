import React, { useState } from "react";
import { addCommentary } from "../../redux/actions.js/reviewAction";
import { useDispatch, useSelector } from "react-redux";

const CommentaryForm = () => {
  const [commentary, setCommentary] = useState("");
  const [isActivate, setIsActivate] = useState(false);
  const { user } = useSelector((state) => state.auth);

  const { paper } = useSelector((state) => state.paper);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addCommentary(paper._id, { commentary }, user));
    setCommentary("");
    setIsActivate(false);
  };
  return (
    <div>
      {isActivate && (
        <form onSubmit={handleSubmit} className="mt-4">
          <textarea
            className="w-full p-2 border"
            name="commentary"
            id="commentary"
            placeholder="Entrer votre commentaire"
            rows="3"
            value={commentary}
            onChange={(e) => setCommentary(e.target.value)}
          ></textarea>
          <button className="block mx-auto bg-green-500 btn">Commenter</button>
        </form>
      )}
      {user && (
        <button
          className="block mx-auto my-4 text-white bg-indigo-600 btn"
          onClick={() => setIsActivate((b) => !b)}
        >
          {isActivate ? "Annuler" : "Ajouter un commentaire"}
        </button>
      )}
    </div>
  );
};

export default CommentaryForm;
