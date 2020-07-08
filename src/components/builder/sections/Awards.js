import { get } from "lodash";
import React from "react";
import Heading from "../../shared/Heading";
import List from "../lists/List";
import TripleFieldListItem from "../lists/triple/TripleFieldListItem";

const Awards = ({ id, name, event, state }) => {
  const path = `${id}.items`;
  const items = get(state, path, []);

  return (
    <section>
      <Heading>{name}</Heading>

      <List
        path={path}
        items={items}
        event={event}
        titlePath="title"
        subtitlePath="awarder"
        textPath="summary"
        listItemComponent={TripleFieldListItem}
      />
    </section>
  );
};

export default Awards;
