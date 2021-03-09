import React, { useState } from "react";
import { markdownRules } from "../../../markdownRules";
import marked from "marked";
import { useSelector, useDispatch } from "react-redux";
import { createNewPaper } from "../../../redux/actions.js/paperAction";

const CreateArticle = () => {
  const [article, setArticle] = useState({
    title: "",
    object: "",
    category: "",
    content: markdownRules,
  });

  const dispatch = useDispatch();
  const { paper, isLoading, error, isCreated } = useSelector((state) => state.newPaper);

  const resultText = (txt) => marked(txt, { sanitize: true });

  const handleChange = (e) => {
    setArticle({ ...article, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createNewPaper(article));
  };

  return (
    <>
      <form className="createArticle" onSubmit={handleSubmit}>
        <div className="createArticle_field">
          <label htmlFor="title" className="createArticle_label">
            Titre :
          </label>
          <input
            className="createArticle_input"
            type="text"
            name="title"
            value={article.title}
            placeholder="Veuillez entrer un titre"
            onChange={handleChange}
          />
        </div>
        <div className="createArticle_field">
          <label htmlFor="object" className="createArticle_label">
            Object :
          </label>
          <input
            className="createArticle_input"
            type="text"
            name="object"
            value={article.object}
            placeholder="Veuillez entrer un object"
            onChange={handleChange}
          />
        </div>
        <div className="createArticle_field">
          <label htmlFor="category" className="createArticle_label">
            Catégorie :
          </label>
          <select
            className="createArticle_input"
            name="category"
            id="category"
            value={article.category}
            onChange={handleChange}>
            <option value="">--Choisisez une options--</option>
            <option value="société">Société</option>
            <option value="environnement">Environnement</option>
            <option value="politique">Politique</option>
            <option value="économie">Economie</option>
            <option value="autres">Autres</option>
          </select>
        </div>
        <textarea
          className="c"
          value={article.content}
          name="content"
          onChange={handleChange}></textarea>

        <button>Créer</button>
      </form>

      <div className="createArticle_result">
        <div
          dangerouslySetInnerHTML={{ __html: resultText(article.content) }}
          className="fullArticle"></div>
      </div>
    </>
  );
};

export default CreateArticle;
