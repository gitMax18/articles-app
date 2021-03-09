import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { getAppInfos } from "../../../redux/actions.js/appAction";
import { useDispatch, useSelector } from "react-redux";
import AppInfos from "../../layouts/AppInfos/AppInfos";

const HomePage = () => {
  const { papersNb, usersNb } = useSelector((state) => state.app);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAppInfos());
  }, [dispatch]);

  return (
    <>
      <section className="hero">
        <div className="hero_content">
          <h1 className="hero_title">
            Partagez votre <br />
            vision du monde
          </h1>
          <h2 className="hero_subTitle">Confrontez vos opinions...</h2>
          <div className="hero_btns">
            <Link to="/inscription" className="hero_link">
              S'inscrire
            </Link>
            <Link to="/articles" className="hero_link">
              Articles
            </Link>
          </div>
        </div>
      </section>
      <section className="infos">
        <h1 className="infos_title">Qu'est-ce que Thot ?</h1>
        <div className="infos_box">
          <p className="infos_content">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio
            architecto, temporibus sed quod hic vero commodi excepturi tempora
            consequuntur eaque molestiae voluptatem recusandae eligendi possimus aut atque
            earum perferendis perspiciatis accusantium nam repellat. Non ducimus impedit,
          </p>
          <Link to="/a-propos" className="infos_btn">
            A-propos
          </Link>
          <div className="infos_nb_container">
            <AppInfos value={papersNb} txt="Articles" />
            <AppInfos value={usersNb} txt="Utilisateurs" />
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
