import { flatten } from "lodash";
import React, { createContext, useState } from "react";
import leftSections from "../data/leftSections";

const defaultState = {
  selected: "Pikachu",
  setSelected: () => {},
  colors: {
    textColor: "#212121",
    primaryColor: "#f44336",
    backgroundColor: "#FFFFFF",
  },
  blocks: [leftSections.map((x) => x.id)],
  setBlocks: () => {},
  setFixedBlocks: () => {},
  setSupportedBlocks: () => {},
};

const TemplateContext = createContext(defaultState);

const TemplateProvider = ({ children }) => {
  const [selected, setSelected] = useState(defaultState.selected);
  const [colors, setColors] = useState(defaultState.colors);
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

  const setFixedBlocks = (fixedBlocks) => {
    const newBlocks = blocks.map((x) =>
      x.filter((y) => !fixedBlocks.includes(y))
    );
    setBlocks(newBlocks);
  };

  const setSupportedBlocks = (number) => {
    if (number === blocks.length) return;

    if (number > blocks.length) {
      setBlocks([...blocks, []]);
    }

    if (number < blocks.length) {
      setBlocks([flatten(blocks)]);
    }
  };

  return (
    <TemplateContext.Provider
      value={{
        colors,
        blocks,
        selected,
        setColors,
        setBlocks,
        onDragEnd,
        setSelected,
        setFixedBlocks,
        setSupportedBlocks,
      }}
    >
      {children}
    </TemplateContext.Provider>
  );
};

export default TemplateContext;

export { TemplateProvider };
