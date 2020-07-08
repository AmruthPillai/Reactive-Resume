import { get } from "lodash";
import React from "react";
import Heading from "../../shared/Heading";
import List from "../lists/List";

const Social = ({ id, name, event, state }) => {
  const path = `${id}.items`;
  const items = get(state, path, []);

  return (
    <section>
      <Heading>{name}</Heading>

      <List
        path={path}
        items={items}
        event={event}
        titlePath="network"
        subtitlePath="username"
      />
    </section>
  );
};

export default Social;
