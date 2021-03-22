import React, { useEffect } from "react";
import CreateArticle from "../articles/CreateArticle";
import { getOnePapers } from "../../redux/actions.js/paperAction";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updatePaper } from "../../redux/actions.js/paperAction";
import Loader from "../layouts/Loader";

const UpdateArticlePage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const paper = useSelector((state) => state.paper);

  useEffect(() => {
    dispatch(getOnePapers(id));
  }, [dispatch, id]);

  const handleSubmit = (paperValue) => {
    dispatch(updatePaper(paperValue, id));
  };

  return (
    <div>
      {!paper.isLoading ? (
        <CreateArticle
          handleSubmit={handleSubmit}
          initialPaperValue={paper.paper}
          pageTitle="Modifier votre article"
        />
      ) : (
        <div className="flex justify-center w-full my-32">
          <Loader />
        </div>
      )}
    </div>
  );
};

export default UpdateArticlePage;
