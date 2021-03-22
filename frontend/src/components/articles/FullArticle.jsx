import React from "react";
import marked from "marked";
import { transformDate } from "../../utils/transformDate";

const FullArticle = ({ paper }) => {
  const { title, object, content, author, category, createdAt } = paper;

  const date = transformDate(createdAt);

  const resultText = (txt) => marked(txt, { sanitize: true });

  return (
    <div className="p-4 mx-auto max-w-7xl">
      <div className="mb-6">
        <div className="flex flex-col items-center justify-center">
          <div>
            <strong>Ecrit par : </strong>
            {author.pseudo}
          </div>
          <div>
            <strong> Catégorie : </strong>
            {category}
          </div>
          <div>
            <strong>Créer le : </strong> {date}
          </div>
        </div>
      </div>
      <div
        className="p-4 border markdown"
        dangerouslySetInnerHTML={{ __html: resultText(content) }}
      ></div>
    </div>
  );
};

export default FullArticle;
