import React, { createContext, useState } from "react";

const defaultState = {
  selected: "Pikachu",
  setSelected: () => {},
  blocks: [
    [
      { id: "1", name: "Profile" },
      { id: "2", name: "Work" },
    ],
    [
      { id: "3", name: "Education" },
      { id: "4", name: "Skills" },
      { id: "5", name: "Hobbies" },
    ],
  ],
  setBlocks: () => {},
};

const TemplateContext = createContext(defaultState);

const TemplateProvider = ({ children }) => {
  const [selected, setSelected] = useState(defaultState.selected);
  const [blocks, setBlocks] = useState(defaultState.blocks);

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
  };

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
      setBlocks(newState);
    } else {
      const result = move(blocks[sInd], blocks[dInd], source, destination);
      const newState = [...blocks];
      newState[sInd] = result[sInd];
      newState[dInd] = result[dInd];
      setBlocks(newState);
    }
  };

  return (
    <TemplateContext.Provider
      value={{
        selected,
        setSelected,
        blocks,
        setBlocks,
        onDragEnd,
      }}
    >
      {children}
    </TemplateContext.Provider>
  );
};

export default TemplateContext;

export { TemplateProvider };
