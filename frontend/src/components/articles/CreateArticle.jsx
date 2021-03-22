import marked from "marked";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { resetNewPaperState } from "../../redux/actions.js/paperAction";
import Loader from "../layouts/Loader";

import { toast } from "react-toastify";

const CreateArticle = ({ handleSubmit, initialPaperValue, pageTitle }) => {
  const resultText = (txt) => marked(txt, { sanitize: true });

  const [dataPaper, setDataPaper] = useState(initialPaperValue);
  const history = useHistory();
  const dispatch = useDispatch();

  const { isValidated, error, message, isLoading } = useSelector(
    (state) => state.newPaper
  );

  useEffect(() => {
    if (isValidated) {
      console.log(message);
      toast.dark(message);
      history.goBack();
    }
    return () => {
      dispatch(resetNewPaperState());
    };
  }, [isValidated, history, dispatch]);

  const handleChange = (e) => {
    setDataPaper({ ...dataPaper, [e.target.name]: e.target.value });
  };

  const handleSubmitform = (e) => {
    e.preventDefault();
    handleSubmit(dataPaper);
  };

  return (
    <div className="p-6 2xl:space-x-5 2xl:flex">
      <div className="2xl:flex-auto ">
        <h1 className="mx-auto mb-8 text-2xl font-bold text-indigo-900 border-b-4 border-indigo-900 w-max">
          {pageTitle}
        </h1>
        <form className="" onSubmit={handleSubmitform}>
          <div className="mb-6">
            <label htmlFor="title" className="label">
              Titre :
            </label>
            <input
              className="input"
              type="text"
              name="title"
              value={dataPaper.title}
              placeholder="Titre qui définit votre article"
              onChange={handleChange}
            />
            <p className="formError">{error && error.title}</p>
          </div>
          <div className="mb-6">
            <label htmlFor="object" className="label">
              Objet :
            </label>
            <input
              className="input"
              type="text"
              name="object"
              value={dataPaper.object}
              placeholder="Rapide résumé de l'article"
              onChange={handleChange}
            />
            <p className="formError">{error && error.object}</p>
          </div>
          <div className="mb-6">
            <label htmlFor="category" className="mr-2 text-lg text-indigo-900">
              Catégorie :
            </label>
            <select
              className="p-1 mt-1 text-lg text-center rounded outline-none w-72 bg-gray-50 focus:bg-indigo-50"
              name="category"
              id="category"
              value={dataPaper.category}
              onChange={handleChange}
            >
              <option value="">Choisisez une options</option>
              <option value="société">Société</option>
              <option value="environnement">Environnement</option>
              <option value="politique">Politique</option>
              <option value="économie">Economie</option>
              <option value="autres">Autres</option>
            </select>
            <p className="formError">{error && error.category}</p>
          </div>
          <textarea
            className="w-full h-screen p-2 bg-gray-50"
            value={dataPaper.content}
            name="content"
            onChange={handleChange}
          ></textarea>
          <p className="formError">{error && error.content}</p>

          <button className="block px-16 mx-auto my-8 text-white bg-indigo-900 btn">
            Créer
          </button>
          {isLoading && (
            <div className="flex justify-center w-full">
              <Loader />
            </div>
          )}
        </form>
      </div>

      <div className="2xl:flex-auto">
        <h3 className="mb-2 text-xl font-bold text-indigo-900 border-b-2 border-indigo-900 w-max 2xl:text-2xl 2xl:mx-auto 2xl:mb-12 2xl:border-b-4">
          Visionner le résultat :
        </h3>
        <div
          dangerouslySetInnerHTML={{ __html: resultText(dataPaper.content) }}
          className="p-2 bg-gray-50 markdown"
        ></div>
      </div>
    </div>
  );
};

export default CreateArticle;
