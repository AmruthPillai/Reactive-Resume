import React, { memo } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from '../../../contexts/MetadataContext';
import { move, reorder } from '../../../utils';
import Heading from '../../shared/Heading';
import styles from './Layout.module.css';

const Layout = () => {
  const blocks = useSelector((state) => state.layout);
  const dispatch = useDispatch();

  const onDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }
    const sInd = +source.droppableId;
    const dInd = +destination.droppableId;

    if (sInd === dInd) {
      const items = reorder(blocks[sInd], source.index, destination.index);
      const newState = [...blocks];
      newState[sInd] = items;
      dispatch({ type: 'set_layout', payload: newState });
    } else {
      const newResult = move(blocks[sInd], blocks[dInd], source, destination);
      const newState = [...blocks];
      newState[sInd] = newResult[sInd];
      newState[dInd] = newResult[dInd];
      dispatch({ type: 'set_layout', payload: newState });
    }
  };

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
              {(dropProvided) => (
                <div
                  ref={dropProvided.innerRef}
                  className={styles.droppable}
                  {...dropProvided.droppableProps}
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
                        {(dragProvided) => (
                          <div
                            ref={dragProvided.innerRef}
                            className={styles.draggable}
                            {...dragProvided.draggableProps}
                            {...dragProvided.dragHandleProps}
                          >
                            {item.name}
                          </div>
                        )}
                      </Draggable>
                    ))}
                  </div>
                  {dropProvided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </DragDropContext>
      </div>
    </section>
  );
};

export default memo(Layout);
