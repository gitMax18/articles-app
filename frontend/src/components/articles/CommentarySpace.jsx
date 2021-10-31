import React from "react";
import { useSelector } from "react-redux";
import CommentaryForm from "./CommentaryForm";
import Commentary from "./Commentary";

const CommentarySpace = () => {
  const { paper } = useSelector((state) => state.paper);

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="mx-auto my-4 text-3xl font-bold border-b-4 border-indigo-900 w-max">
        Commentaires :
      </h1>
      {paper.reviews.map((review) => {
        return <Commentary review={review} key={review._id} />;
      })}
      <CommentaryForm />
    </div>
  );
};

export default CommentarySpace;
