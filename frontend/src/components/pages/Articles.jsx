import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPapers } from "../../redux/actions.js/paperAction";
import Article from "../articles/Article";
import Loader from "../layouts/Loader";
const Articles = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const dispatch = useDispatch();
  const { isLoading, papersData, error } = useSelector((state) => state.papers);

  //   const { resPerPage, totalResultCount, papers } = papersData;

  const enumCategory = ["Environnement", "Société", "Politique", "Economie", "Autres"];

  useEffect(() => {
    dispatch(getAllPapers({ title: search, category }));
  }, [dispatch, category]);

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(getAllPapers({ title: search, category }));
  };

  const displayArticles = isLoading ? (
    <Loader />
  ) : papersData.papers.length < 1 ? (
    <h1>Aucun article disponible...</h1>
  ) : (
    papersData.papers.map((paper) => <Article paper={paper} key={paper._id} />)
  );

  return (
    <div className="articles">
      <form onSubmit={handleSubmit}>
        <label htmlFor="search">Rechercher</label>
        <input
          type="text"
          id="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </form>

      {displayArticles}

      <div className="navCategory">
        <h3 className="navCategory_title">Categories</h3>
        <ul className="navCategory_items">
          <li className="navCategory_item" onClick={() => setCategory("")}>
            Tous
          </li>
          {enumCategory.map((cat, index) => (
            <li
              //   className="navCategory_item"
              className={
                category === cat.toLocaleLowerCase()
                  ? "navCategory_item navCategory_item-active"
                  : "navCategory_item"
              }
              key={index}
              id={cat}
              onClick={(e) => setCategory(e.target.id.toLowerCase())}>
              {cat}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Articles;
