import arrayMove from 'array-move';
import { v4 as uuidv4 } from 'uuid';
import {
  clone,
  findIndex,
  get,
  isUndefined,
  merge,
  setWith,
  set,
  has,
} from 'lodash';
import React, {
  createContext,
  memo,
  useCallback,
  useContext,
  useReducer,
} from 'react';
import i18next from 'i18next';
import demoState from '../data/demoState.json';
import initialState from '../data/initialState.json';
import DatabaseContext from './DatabaseContext';

const ResumeContext = createContext({});

const ResumeProvider = ({ children }) => {
  const { debouncedUpdateResume } = useContext(DatabaseContext);

  const memoizedReducer = useCallback(
    (state, { type, payload }) => {
      let newState;
      let index;
      let items;
      let temp;

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

        case 'change_language':
          newState = set(clone(state), 'metadata.language', payload);
          items = get(
            i18next.getDataByLanguage(payload),
            'translation.builder.sections',
          );
          Object.keys(items).forEach((key) => {
            has(newState, `${key}.heading`) &&
              set(newState, `${key}.heading`, items[key]);
          });
          debouncedUpdateResume(newState);
          return newState;

        case 'reset_layout':
          temp = get(state, 'metadata.template');
          items = get(initialState, `metadata.layout.${temp}`);
          newState = setWith(
            clone(state),
            `metadata.layout.${temp}`,
            items,
            clone,
          );
          debouncedUpdateResume(newState);
          return newState;

        case 'on_input':
          newState = setWith(clone(state), payload.path, payload.value, clone);
          debouncedUpdateResume(newState);
          return newState;

        case 'on_import':
          temp = clone(state);
          newState = payload;
          newState.id = temp.id;
          newState.user = temp.user;
          newState.name = temp.name;
          newState.createdAt = temp.createdAt;
          newState.updatedAt = temp.updatedAt;
          debouncedUpdateResume(newState);
          return newState;

        case 'on_import_jsonresume':
          temp = clone(state);
          newState = initialState;
          newState.id = temp.id;
          newState.user = temp.user;
          newState.name = temp.name;
          newState.preview = temp.preview;
          newState.createdAt = temp.createdAt;
          newState.updatedAt = temp.updatedAt;
          newState.profile = {
            address: {
              city: payload.basics.location.city,
              line1: payload.basics.location.address,
              line2: payload.basics.location.region,
              pincode: payload.basics.location.postalCode,
            },
            email: payload.basics.email,
            firstName: payload.basics.name,
            phone: payload.basics.phone,
            photograph: payload.basics.picture,
            subtitle: payload.basics.label,
            website: payload.basics.website,
          };
          newState.social.items = payload.basics.profiles.map((x) => ({
            id: uuidv4(),
            network: x.network,
            username: x.username,
            url: x.url,
          }));
          newState.objective.body = payload.basics.summary;
          newState.work.items = payload.work.map((x) => ({
            id: uuidv4(),
            company: x.company,
            endDate: x.endDate,
            position: x.position,
            startDate: x.startDate,
            summary: x.summary,
            website: x.website,
          }));
          newState.education.items =
            payload.education &&
            payload.education.map((x) => ({
              id: uuidv4(),
              degree: x.studyType,
              endDate: x.endDate,
              field: x.area,
              gpa: x.gpa,
              institution: x.institution,
              startDate: x.startDate,
              summary: x.courses.join('\n'),
            }));
          newState.awards.items = payload.awards.map((x) => ({
            id: uuidv4(),
            awarder: x.awarder,
            date: x.date,
            summary: x.summary,
            title: x.title,
          }));
          newState.skills.items = payload.skills.map((x) => ({
            id: uuidv4(),
            level: 'Fundamental Awareness',
            name: x.name,
          }));
          newState.hobbies.items = payload.interests.map((x) => ({
            id: uuidv4(),
            name: x.name,
          }));
          newState.languages.items = payload.languages.map((x) => ({
            id: uuidv4(),
            name: x.language,
            fluency: x.fluency,
          }));
          newState.references.items = payload.references.map((x) => ({
            id: uuidv4(),
            name: x.name,
            summary: x.reference,
          }));
          debouncedUpdateResume(newState);
          return newState;

        case 'set_data':
          newState = payload;
          debouncedUpdateResume(newState);
          return newState;

        case 'reset_data':
          temp = clone(state);
          newState = initialState;
          newState.id = temp.id;
          newState.user = temp.user;
          newState.name = temp.name;
          newState.createdAt = temp.createdAt;
          newState.updatedAt = temp.updatedAt;
          debouncedUpdateResume(newState);
          return newState;

        case 'load_demo_data':
          newState = merge(clone(state), demoState);
          newState.metadata.layout = demoState.metadata.layout;
          debouncedUpdateResume(newState);
          return newState;

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

export {
  ResumeContext,
  memoizedProvider as ResumeProvider,
  useSelector,
  useDispatch,
};
