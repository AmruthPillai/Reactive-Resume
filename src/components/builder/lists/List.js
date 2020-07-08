import { get, isEmpty } from "lodash";
import moment from "moment";
import React, { useContext } from "react";
import { MdAdd } from "react-icons/md";
import ModalContext from "../../../contexts/ModalContext";
import { useSelector } from "../../../contexts/ResumeContext";
import Button from "../../shared/Button";
import EmptyList from "./EmptyList";
import styles from "./List.module.css";
import ListItem from "./ListItem";

const List = ({
  path,
  title,
  titlePath,
  subtitle,
  subtitlePath,
  text,
  textPath,
  event,
}) => {
  const items = useSelector((state) => get(state, path, []));
  const { emitter } = useContext(ModalContext);

  const handleAdd = () => emitter.emit(event);

  const handleEdit = (data) => emitter.emit(event, data);

  const formatDateRange = (x) =>
    `${moment(x.startDate).format("MMMM Y")} — ${
      moment(x.endDate).isValid()
        ? moment(x.endDate).format("MMMM Y")
        : "Present"
    }`;

  return (
    <div className="flex flex-col">
      <div className={styles.list}>
        {isEmpty(items) ? (
          <EmptyList />
        ) : (
          items.map((x, i) => (
            <ListItem
              key={x.id}
              data={x}
              path={path}
              title={title || get(x, titlePath, "")}
              subtitle={
                subtitle || get(x, subtitlePath, "") || formatDateRange(x)
              }
              text={text || get(x, textPath, "")}
              className={styles.listItem}
              onEdit={() => handleEdit(x)}
              isFirst={i === 0}
              isLast={i === items.length - 1}
            />
          ))
        )}
      </div>

      <Button
        outline
        icon={MdAdd}
        title="Add New"
        onClick={handleAdd}
        className="mt-8 ml-auto"
      />
    </div>
  );
};

export default List;
