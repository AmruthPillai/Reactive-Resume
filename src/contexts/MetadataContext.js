import { clone, setWith } from 'lodash';
import React, {
  createContext,
  memo,
  useCallback,
  useContext,
  useReducer,
} from 'react';
import leftSections from '../data/leftSections';
import DatabaseContext from './DatabaseContext';
import { useSelector as useResumeSelector } from './ResumeContext';

const initialState = {
  template: 'Onyx',
  font: 'Montserrat',
  layout: [leftSections.map(({ id, name }) => ({ id, name }))],
  colors: {
    textColor: '#444444',
    primaryColor: '#5875DB',
    backgroundColor: '#FFFFFF',
  },
};

const MetadataContext = createContext({});

const MetadataProvider = ({ children }) => {
  const id = useResumeSelector((state) => state.id);
  const { debouncedUpdateMetadata } = useContext(DatabaseContext);

  const memoizedReducer = useCallback(
    (state, { type, payload }) => {
      let newState;

      switch (type) {
        case 'set_layout':
          newState = setWith(clone(state), 'layout', payload, clone);
          debouncedUpdateMetadata(id, newState);
          return newState;

        default:
          throw new Error();
      }
    },
    [id, debouncedUpdateMetadata],
  );

  const [state, dispatch] = useReducer(memoizedReducer, initialState);

  const selectValue = (callback) => callback(state);

  return (
    <MetadataContext.Provider value={{ selectValue, dispatch }}>
      {children}
    </MetadataContext.Provider>
  );
};

const useSelector = (callback) => {
  const { selectValue } = useContext(MetadataContext);
  return selectValue(callback);
};

const useDispatch = () => {
  const { dispatch } = useContext(MetadataContext);
  return dispatch;
};

const memoizedProvider = memo(MetadataProvider);

export { memoizedProvider as MetadataProvider, useSelector, useDispatch };
