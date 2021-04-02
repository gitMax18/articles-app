import React, { useEffect } from "react";
import { getOnePapers } from "../../redux/actions.js/paperAction";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../layouts/Loader";
import FullArticle from "../articles/FullArticle";
import CommentarySpace from "../articles/CommentarySpace";

const ArticlePage = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const { isLoading, paper, error } = useSelector((state) => state.paper);

  useEffect(() => {
    dispatch(getOnePapers(id));
  }, [dispatch, id]);

  return isLoading ? (
    <div className="flex justify-center w-full my-32">
      <Loader />
    </div>
  ) : (
    <div>
      <FullArticle paper={paper} />
      <CommentarySpace />
    </div>
  );
};
export default ArticlePage;
