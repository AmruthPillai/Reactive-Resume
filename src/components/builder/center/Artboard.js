import React, { useContext } from "react";
import ResumeContext from "../../../contexts/ResumeContext";
import TemplateContext from "../../../contexts/TemplateContext";
import Onyx from "../../../templates/Onyx";
import styles from "./Artboard.module.css";

const Artboard = () => {
  const { blocks, colors } = useContext(TemplateContext);
  const { state } = useContext(ResumeContext);

  return (
    <div id="artboard" className={styles.container}>
      <Onyx data={state} layout={blocks} colors={colors} />
    </div>
  );
};

export default Artboard;
