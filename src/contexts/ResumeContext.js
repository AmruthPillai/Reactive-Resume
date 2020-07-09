import arrayMove from 'array-move';
import { clone, findIndex, get, isUndefined, setWith } from 'lodash';
import React, {
  createContext,
  memo,
  useCallback,
  useContext,
  useReducer,
} from 'react';
import leftSections from '../data/leftSections';
import DatabaseContext from './DatabaseContext';

const initialState = {
  name: '',
  metadata: {
    template: 'onyx',
    font: 'Montserrat',
    layout: [leftSections.map(({ id, name }) => ({ id, name }))],
    colors: {
      text: '#444444',
      primary: '#5875DB',
      background: '#FFFFFF',
    },
  },
};

const ResumeContext = createContext({});

const ResumeProvider = ({ children }) => {
  const { debouncedUpdateResume } = useContext(DatabaseContext);

  const memoizedReducer = useCallback(
    (state, { type, payload }) => {
      let newState;
      let index;
      let items;

      switch (type) {
        case 'on_add_item':
          delete payload.value.temp;
          items = get(state, payload.path, []);
          newState = setWith(
            clone(state),
            payload.path,
            [...items, payload.value],
            clone,
          );
          debouncedUpdateResume(newState);
          return newState;

        case 'on_edit_item':
          delete payload.value.temp;
          items = get(state, payload.path);
          index = findIndex(items, ['id', payload.value.id]);
          newState = setWith(
            clone(state),
            `${payload.path}[${index}]`,
            payload.value,
            clone,
          );
          debouncedUpdateResume(newState);
          return newState;

        case 'on_delete_item':
          items = get(state, payload.path);
          index = findIndex(items, ['id', payload.value.id]);
          items.splice(index, 1);
          newState = setWith(clone(state), payload.path, items, clone);
          debouncedUpdateResume(newState);
          return newState;

        case 'on_move_item_up':
          items = get(state, payload.path);
          index = findIndex(items, ['id', payload.value.id]);
          items = arrayMove(items, index, index - 1);
          newState = setWith(clone(state), payload.path, items, clone);
          debouncedUpdateResume(newState);
          return newState;

        case 'on_move_item_down':
          items = get(state, payload.path);
          index = findIndex(items, ['id', payload.value.id]);
          items = arrayMove(items, index, index + 1);
          newState = setWith(clone(state), payload.path, items, clone);
          debouncedUpdateResume(newState);
          return newState;

        case 'on_input':
          newState = setWith(clone(state), payload.path, payload.value, clone);
          debouncedUpdateResume(newState);
          return newState;

        case 'set_data':
          return payload;

        default:
          throw new Error();
      }
    },
    [debouncedUpdateResume],
  );

  const [state, dispatch] = useReducer(memoizedReducer, initialState);

  return (
    <ResumeContext.Provider value={{ state, dispatch }}>
      {children}
    </ResumeContext.Provider>
  );
};

const useSelector = (path, fallback) => {
  const { state } = useContext(ResumeContext);
  let value = get(state, path);

  if (isUndefined(value)) {
    value = isUndefined(fallback) ? state : fallback;
  }

  return value;
};

const useDispatch = () => {
  const { dispatch } = useContext(ResumeContext);
  return dispatch;
};

const memoizedProvider = memo(ResumeProvider);

export { memoizedProvider as ResumeProvider, useSelector, useDispatch };
