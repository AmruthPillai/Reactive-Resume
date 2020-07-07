import { get } from "lodash";
import React, { useContext } from "react";
import ModalContext from "../../../contexts/ModalContext";
import Heading from "../../shared/Heading";
import List from "../lists/List";
import SmallListItem from "../lists/small/SmallListItem";

const Social = ({ state }) => {
  const { emitter, events } = useContext(ModalContext);

  const path = "social.items";
  const items = get(state, path, []);

  const handleAdd = () => emitter.emit(events.SOCIAL_MODAL);

  const handleEdit = (data) => emitter.emit(events.SOCIAL_MODAL, data);

  return (
    <section>
      <Heading>Social Network</Heading>

      <List items={items} onAdd={handleAdd}>
        {items.map((x, i) => (
          <SmallListItem
            key={x.id}
            data={x}
            path={path}
            title={x.network}
            isFirst={i === 0}
            subtitle={x.username}
            onEdit={() => handleEdit(x)}
            isLast={i === items.length - 1}
          />
        ))}
      </List>
    </section>
  );
};

export default Social;
