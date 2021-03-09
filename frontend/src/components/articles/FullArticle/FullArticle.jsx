import React from "react";

const FullArticle = ({ paper }) => {
  const { title, object, content, author, category, createdAt } = paper;

  return (
    <div>
      <h1>{title}</h1>
      <h4>{object}</h4>
      <p>{content}</p>
      <div>
        autheur : {author.pseudo}, categorie : {category}, créer le :{createdAt}
      </div>
    </div>
  );
};

export default FullArticle;
