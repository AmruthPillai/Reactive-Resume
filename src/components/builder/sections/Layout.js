import React, { useContext } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import TemplateContext from "../../../contexts/TemplateContext";
import Heading from "../../shared/Heading";
import styles from "./Layout.module.css";

const Layout = () => {
  const { blocks, onDragEnd } = useContext(TemplateContext);

  return (
    <section>
      <Heading>Layout</Heading>

      <p>
        This template supports {blocks.length} blocks. You can re-order or move
        sections by dragging/dropping the section names across lists.
      </p>

      <div className={`grid gap-8 grid-cols-${blocks.length}`}>
        <DragDropContext onDragEnd={onDragEnd}>
          {blocks.map((el, ind) => (
            <Droppable key={ind} droppableId={`${ind}`}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  className={styles.droppable}
                  {...provided.droppableProps}
                >
                  <div className="grid gap-3">
                    <span className="uppercase font-semibold text-xs">
                      Block {ind + 1}
                    </span>
                    {el.map((item, index) => (
                      <Draggable
                        key={item.id}
                        draggableId={item.id}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            className={styles.draggable}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            {item.name}
                          </div>
                        )}
                      </Draggable>
                    ))}
                  </div>
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </DragDropContext>
      </div>
    </section>
  );
};

export default Layout;
