import React, { useEffect } from "react";
import { getOnePapers } from "../../../redux/actions.js/paperAction";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../layouts/Loader/Loader";
import FullArticle from "../../articles/FullArticle/FullArticle";

const ArticlePage = () => {
  const params = useParams();

  const dispatch = useDispatch();

  const { isLoading, paper, error } = useSelector((state) => state.paper);

  useEffect(() => {
    dispatch(getOnePapers(params.id));
  }, [dispatch, params.id]);

  return isLoading ? <Loader /> : <FullArticle paper={paper} />;
};
export default ArticlePage;
