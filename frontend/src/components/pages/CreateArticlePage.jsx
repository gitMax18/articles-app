import React from "react";
import CreateArticle from "../articles/CreateArticle";
import { markdownRules } from "../../markdownRules";
import { useDispatch } from "react-redux";
import { createNewPaper } from "../../redux/actions.js/paperAction";

const CreateArticlePage = () => {
  const initialPaperValue = {
    title: "",
    object: "",
    category: "",
    content: markdownRules,
  };

  const dispatch = useDispatch();

  const handleSubmit = (paperValue) => {
    dispatch(createNewPaper(paperValue));
  };
  return (
    <div>
      <CreateArticle
        handleSubmit={handleSubmit}
        initialPaperValue={initialPaperValue}
        pageTitle="Créer votre article"
      />
    </div>
  );
};

export default CreateArticlePage;
