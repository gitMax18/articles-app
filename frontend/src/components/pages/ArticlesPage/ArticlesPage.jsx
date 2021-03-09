import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPapers } from "../../../redux/actions.js/paperAction";
import BrefArticle from "../../articles/BrefArticle/BrefArticle";
import Loader from "../../layouts/Loader/Loader";
import Pagination from "../../layouts/Pagination/Pagination";

const ArticlesPage = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [limit, setLimit] = useState(6);
  const [page, setPage] = useState(1);

  const dispatch = useDispatch();

  const { isLoading, papers, resPerPage, totalResultCount, error } = useSelector(
    (state) => state.papers
  );

  const enumCategory = ["Environnement", "Société", "Politique", "Économie", "Autres"];

  useEffect(() => {
    dispatch(getAllPapers({ title: search, category, page, limit }));
  }, [dispatch, category, page, limit]);

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(getAllPapers({ title: search, category, page, limit }));
  };

  const handleClickPagination = (page) => {
    console.log(page);
    setPage(page);
  };

  const handleClickCategory = (e) => {
    setPage(1);
    setCategory(e.target.id.toLowerCase());
  };

  const displayArticles = isLoading ? (
    <Loader />
  ) : papers.length < 1 ? (
    <h1>Aucun article disponible...</h1>
  ) : (
    papers.map((paper) => <BrefArticle paper={paper} key={paper._id} />)
  );

  return (
    <div className="articlesPage">
      <form onSubmit={handleSubmit} className="articles_search">
        <input
          className="articles_search_input"
          type="text"
          id="search"
          value={search}
          placeholder="Entrer un titre d'article"
          onChange={(e) => setSearch(e.target.value)}
        />
      </form>

      <div className="articles">{displayArticles}</div>

      <Pagination
        activePage={page}
        itemsCountPerPage={resPerPage}
        totalItemsCount={totalResultCount}
        pageRangeDisplayed="3"
        onChange={handleClickPagination}
      />

      <div className="navCategory">
        <h3 className="navCategory_title">Categories</h3>
        <ul className="navCategory_items">
          <li className="navCategory_item" onClick={() => setCategory("")}>
            Tous
          </li>
          {enumCategory.map((cat, index) => (
            <li
              className={
                category === cat.toLowerCase()
                  ? "navCategory_item navCategory_item-active"
                  : "navCategory_item"
              }
              key={index}
              id={cat}
              onClick={handleClickCategory}>
              {cat}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ArticlesPage;
