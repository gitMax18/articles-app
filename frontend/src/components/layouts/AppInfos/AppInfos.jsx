import React from "react";

const appInfos = ({ value, txt }) => {
  return (
    <div className="infos_nb">
      <div className="infos_nb_value">{value}</div>
      <div className="infos_nb_txt">{txt}</div>
    </div>
  );
};

export default appInfos;
