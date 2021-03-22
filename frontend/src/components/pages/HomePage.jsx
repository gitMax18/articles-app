import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { getAppInfos } from "../../redux/actions.js/appAction";
import { useDispatch, useSelector } from "react-redux";
import AppInfos from "../layouts/AppInfos";
import heroImg from "../../images/hero_1.png";

const HomePage = () => {
  const { papersNb, usersNb } = useSelector((state) => state.app);
  const { isAuthenticate } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAppInfos());
  }, [dispatch]);

  return (
    <>
      <section className="mx-auto bg-indigo-900 bg-bottom bg-no-repeat bg-contain bg-hero ">
        <div className="flex flex-col items-center justify-between mx-auto xl:flex-row xl:h-almost max-w-screen-2xl">
          <div className="flex flex-col items-center justify-center pt-40 pb-20 ml-6 text-white xl:pt-0 xl:items-start 2xl:mx-16">
            <h1 className="mb-2 text-5xl text-center whitespace-nowrap md:text-7xl xl:text-left 2xl:text-8xl">
              Partagez votre <br />
              vision du monde
            </h1>
            <h2 className="text-3xl md:text-4xl 2xl:text-5xl">
              Confrontez vos opinions...
            </h2>
            <div className="pt-6">
              {!isAuthenticate ? (
                <Link to="/inscription" className="mr-4 text-2xl bg-green-500 btn">
                  S'inscrire
                </Link>
              ) : (
                <Link to="/article/nouveau" className="mr-4 text-2xl bg-green-500 btn">
                  Créer un article
                </Link>
              )}
              <Link to="/articles" className="text-2xl bg-green-500 btn">
                Articles
              </Link>
            </div>
          </div>
          <div className="w-4/5 pb-20 xl:max-w-3xl 2xl:mx-16">
            <img src={heroImg} alt="illustration" className="w-full mx-auto" />
          </div>
        </div>
      </section>
      <section className="pt-4 -mt-0.5 bg-white ">
        <div className="max-w-4xl mx-auto">
          <h1 className="flex justify-center pb-1 mx-auto mb-8 text-3xl font-bold align-middle border-b-4 border-indigo-500 w-max mt-14 2xl:text-5xl">
            Qu'est-ce que Thot ?
          </h1>
          <div className="text-center">
            <p className="p-6 2xl:text-lg">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio
              architecto, temporibus sed quod hic vero commodi excepturi tempora
              consequuntur eaque molestiae voluptatem recusandae eligendi possimus aut
              atque earum perferendis perspiciatis accusantium nam repellat. Non ducimus
              impedit,
            </p>
            <Link
              to="/a-propos"
              className="block mx-auto text-white bg-indigo-900 btn w-max"
            >
              A-propos
            </Link>
            <div className="flex items-center w-full justify-evenly">
              <AppInfos value={papersNb} txt="Articles" />
              <AppInfos value={usersNb} txt="Utilisateurs" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
