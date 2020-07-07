import React, { useContext } from "react";
import { Helmet } from "react-helmet";
import ResumeContext from "../../../contexts/ResumeContext";
import TemplateContext from "../../../contexts/TemplateContext";
import Onyx from "../../../templates/Onyx";
import styles from "./Artboard.module.css";

const Artboard = () => {
  const { blocks, colors } = useContext(TemplateContext);
  const { state } = useContext(ResumeContext);

  return (
    <div>
      <Helmet>
        <title>{state.name} | Reactive Resume</title>
        <link
          rel="canonical"
          href={`https://rxresu.me/app/builder/${state.id}`}
        />
      </Helmet>

      <div id="artboard" className={styles.container}>
        <Onyx data={state} layout={blocks} colors={colors} />
      </div>
    </div>
  );
};

export default Artboard;
