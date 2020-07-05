import React, { useContext } from "react";
import TemplateContext from "../../../contexts/TemplateContext";
import styles from "./Artboard.module.css";

const Artboard = () => {
  const { blocks } = useContext(TemplateContext);

  return (
    <div className={styles.container}>
      <div className={`grid gap-8 grid-cols-${blocks.length}`}>
        {blocks.map((block, ind) => (
          <div key={ind} className="col-span-1">
            {block.map((x) => (
              <div key={x.id}>{x.name}</div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Artboard;
