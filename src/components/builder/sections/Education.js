import React from "react";
import Heading from "../../shared/Heading";
import List from "../lists/List";

const Education = ({ id, name, event, state }) => {
  const path = `${id}.items`;

  return (
    <section>
      <Heading>{name}</Heading>

      <List
        path={path}
        event={event}
        titlePath="institution"
        textPath="field"
      />
    </section>
  );
};

export default Education;
