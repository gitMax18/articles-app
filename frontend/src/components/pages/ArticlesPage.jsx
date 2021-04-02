import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPapers, resetNewPaperState } from "../../redux/actions.js/paperAction";
import BrefArticle from "../articles/BrefArticle";
import Loader from "../layouts/Loader";
import Pagination from "../layouts/Pagination";
import { IoIosArrowBack } from "react-icons/io";
import { resetLikeState } from "../../redux/actions.js/likeActions";

const enumCategory = ["Environnement", "Société", "Politique", "Économie", "Autres"];

const ArticlesPage = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [limit, setLimit] = useState(6);
  const [page, setPage] = useState(1);

  const dispatch = useDispatch();

  const { isLoading, papers, resPerPage, totalResultCount, error } = useSelector(
    (state) => state.papers
  );
  const { isValidated } = useSelector((state) => state.newPaper);

  const { user } = useSelector((state) => state.auth);
  const { isUpdated } = useSelector((state) => state.like);

  const refShowCategory = useRef();
  const refCategory = useRef();

  useEffect(() => {
    dispatch(getAllPapers({ title: search, category, page, limit }));
    if (isValidated) {
      dispatch(resetNewPaperState());
    }
    if (isUpdated) {
      dispatch(resetLikeState());
    }
  }, [dispatch, category, page, limit, isValidated, isUpdated]); // isValidated and isUpdated create two REQUEST

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(getAllPapers({ title: search, category, page, limit }));
  };

  const handleClickPagination = (page) => {
    setPage(page);
  };

  const handleClickCategory = (e) => {
    setPage(1);
    setCategory(e.target.id.toLowerCase());
  };

  const handleShowCategory = () => {
    refCategory.current.classList.toggle("hidden");
    refShowCategory.current.classList.toggle("rotate-180");
  };

  const displayArticles = isLoading ? (
    <div className="flex justify-center w-full my-32">
      <Loader />
    </div>
  ) : papers.length < 1 ? (
    <h1>Aucun article disponible...</h1>
  ) : (
    papers.map((paper) => <BrefArticle paper={paper} key={paper._id} user={user} />)
  );

  return (
    <div className="relative">
      <div className="p-2 ml-6 xl:ml-52 2xl:p-6">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center justify-center py-6 text-xl"
        >
          <input
            className="max-w-2xl input"
            type="text"
            id="search"
            value={search}
            placeholder="Entrer un titre d'article"
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="block mt-4 text-base text-white bg-green-500 btn w-max">
            Rechercher
          </button>
        </form>

        <div className="relative">{displayArticles}</div>

        <Pagination
          activePage={page}
          itemsCountPerPage={resPerPage}
          totalItemsCount={totalResultCount}
          pageRangeDisplayed="3"
          onChange={handleClickPagination}
        />
      </div>

      {/* category navigation */}
      <div
        className="fixed hidden text-white bg-green-500 left-6 top-16 xl:ml-0 h-almost w-52 xl:block xl:left-0"
        ref={refCategory}
      >
        <div className="w-full ">
          <h3 className="my-4 text-2xl text-center">Categories</h3>
          <ul className="text-lg">
            <li
              className="block h-full py-2 pl-2 cursor-pointer hover:bg-green-400"
              onClick={() => setCategory("")}
            >
              Tous
            </li>
            {enumCategory.map((cat, index) => {
              let className = "block h-full py-2 pl-2 cursor-pointer hover:bg-green-400";
              if (cat.toLowerCase() === category) {
                className += " bg-green-400";
              }
              return (
                <li
                  className={className}
                  key={index}
                  id={cat}
                  onClick={handleClickCategory}
                >
                  {cat}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div
        className="fixed left-0 flex items-center justify-center w-6 bg-green-500 border-r cursor-pointer top-16 h-almost xl:hidden"
        onClick={handleShowCategory}
      >
        <div className="transform rotate-180 " ref={refShowCategory}>
          <IoIosArrowBack className="text-white" />
        </div>
      </div>
    </div>
  );
};

export default ArticlesPage;
