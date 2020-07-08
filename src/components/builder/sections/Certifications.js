import React from "react";
import Heading from "../../shared/Heading";
import List from "../lists/List";

const Certifications = ({ id, name, event, state }) => {
  const path = `${id}.items`;

  return (
    <section>
      <Heading>{name}</Heading>

      <List
        path={path}
        event={event}
        titlePath="title"
        subtitlePath="issuer"
        textPath="summary"
      />
    </section>
  );
};

export default Certifications;
