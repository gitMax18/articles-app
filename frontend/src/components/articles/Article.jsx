import React from "react";

const Article = ({ paper }) => {
  const { author, category, content, createdAt, likeNb, object, reviews, title } = paper;
  return (
    <div>
      <h1>{title}</h1>
      <p>{object}</p>
      <p>{content}</p>
      <div>
        autheur : {author.pseudo}, ctegory : {category}, créer le : {createdAt}, nb de
        like : {likeNb}
      </div>
    </div>
  );
};

export default Article;
