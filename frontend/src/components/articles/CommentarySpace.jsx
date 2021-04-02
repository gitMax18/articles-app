import React from "react";
import { useSelector } from "react-redux";
import CommentaryForm from "./CommentaryForm";

const CommentarySpace = () => {
  const { reviews } = useSelector((state) => state.paper);

  return (
    <div>
      <h1>Commentaires :</h1>
      <CommentaryForm />
    </div>
  );
};

export default CommentarySpace;
