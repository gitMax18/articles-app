import React, { useState } from "react";

const CommentaryForm = () => {
  const [commentary, setCommentary] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <form onSubmit={handleSubmit}>
      <label className="label" htmlFor="commentary">
        Commentaire
      </label>
      <textarea
        className=""
        name="commentary"
        id="commentary"
        cols="50"
        rows="3"
        value={commentary}
        onChange={(e) => setCommentary(e.target.value)}
      ></textarea>
      <button className="btn">Commenter</button>
    </form>
  );
};

export default CommentaryForm;
