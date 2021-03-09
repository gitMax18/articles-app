import React from "react";
import { useHistory } from "react-router-dom";

const BrefArticle = ({ paper }) => {
  const history = useHistory();

  const { author, category, createdAt, likeNb, object, title, _id } = paper;

  const handleClick = () => {
    history.push(`/article/${_id}`);
  };

  return (
    <div onClick={handleClick} className="brefArticle">
      <h1 className="brefArticle_title">{title}</h1>
      <p className="brefArticle_object">{object}</p>
      <div className="brefArticle_infos">
        <span>Autheur : {author.pseudo}</span>,<span>category : {category}</span>,
        <span>créer le : {createdAt}</span>,<span> nb de like : {likeNb}</span>
      </div>
    </div>
  );
};

export default BrefArticle;
