import arrayMove from "array-move";
import { clone, findIndex, get, setWith } from "lodash";
import React, {
  createContext,
  useCallback,
  useContext,
  useReducer,
} from "react";
import DatabaseContext from "./DatabaseContext";

const initialState = {};

const ResumeContext = createContext(initialState);

const ResumeProvider = ({ children }) => {
  const { debouncedUpdate } = useContext(DatabaseContext);

  const memoizedReducer = useCallback(
    (state, { type, payload }) => {
      let newState, index, items;

      switch (type) {
        case "on_add_item":
          items = get(state, payload.path, []);
          newState = setWith(
            clone(state),
            payload.path,
            [...items, payload.value],
            clone
          );
          debouncedUpdate(newState);
          return newState;

        case "on_edit_item":
          items = get(state, payload.path);
          index = findIndex(items, ["id", payload.value.id]);
          newState = setWith(
            clone(state),
            `${payload.path}[${index}]`,
            payload.value,
            clone
          );
          debouncedUpdate(newState);
          return newState;

        case "on_delete_item":
          items = get(state, payload.path);
          index = findIndex(items, ["id", payload.value.id]);
          items.splice(index, 1);
          newState = setWith(clone(state), payload.path, items, clone);
          debouncedUpdate(newState);
          return newState;

        case "on_move_item_up":
          items = get(state, payload.path);
          index = findIndex(items, ["id", payload.value.id]);
          items = arrayMove(items, index, index - 1);
          newState = setWith(clone(state), payload.path, items, clone);
          debouncedUpdate(newState);
          return newState;

        case "on_move_item_down":
          items = get(state, payload.path);
          index = findIndex(items, ["id", payload.value.id]);
          items = arrayMove(items, index, index + 1);
          newState = setWith(clone(state), payload.path, items, clone);
          debouncedUpdate(newState);
          return newState;

        case "on_input":
          newState = setWith(clone(state), payload.path, payload.value, clone);
          debouncedUpdate(newState);
          return newState;

        case "set_data":
          return payload;

        default:
          throw new Error();
      }
    },
    [debouncedUpdate]
  );

  const [state, dispatch] = useReducer(memoizedReducer, initialState);

  return (
    <ResumeContext.Provider value={{ state, dispatch }}>
      {children}
    </ResumeContext.Provider>
  );
};

export default ResumeContext;

export { ResumeProvider };
