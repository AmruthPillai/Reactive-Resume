import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import cloneDeep from 'lodash/cloneDeep';
import get from 'lodash/get';
import merge from 'lodash/merge';
import pick from 'lodash/pick';
import set from 'lodash/set';
import { ListItem, Profile, Resume, Section, SectionType } from 'schema';
import { v4 as uuidv4 } from 'uuid';

import { getSectionsByType } from '@/config/sections';

type SetResumeStatePayload = { path: string; value: unknown };

type AddItemPayload = { path: string; value: ListItem };

type EditItemPayload = { path: string; value: ListItem };

type DuplicateItemPayload = { path: string; value: ListItem };

type DeleteItemPayload = { path: string; value: ListItem };

type AddSectionPayload = { value: Section; type: SectionType };

type DeleteSectionPayload = { path: string };

type DeletePagePayload = { page: number };

const initialState: Resume = {} as Resume;

export const resumeSlice = createSlice({
  name: 'resume',
  initialState,
  reducers: {
    setResume: (_state: Resume, action: PayloadAction<Resume>) => action.payload,
    setResumeState: (state: Resume, action: PayloadAction<SetResumeStatePayload>) => {
      const { path, value } = action.payload;

      set(state, path, value);
    },
    addItem: (state: Resume, action: PayloadAction<AddItemPayload>) => {
      const { path, value } = action.payload;
      const id = uuidv4();
      const list: ListItem[] = get(state, path, []);
      const item = merge(value, { id });

      list.push(item);

      set(state, path, list);
    },
    editItem: (state: Resume, action: PayloadAction<EditItemPayload>) => {
      const { path, value } = action.payload;
      const list: ListItem[] = get(state, path, []);
      const index = list.findIndex((item) => item.id === value.id);

      list[index] = value;

      set(state, path, list);
    },
    duplicateItem: (state: Resume, action: PayloadAction<DuplicateItemPayload>) => {
      const { path, value } = action.payload;
      const list: ListItem[] = get(state, path, []);
      const index = list.findIndex((item) => item.id === value.id);
      const newItem = cloneDeep(list[index]);

      newItem.id = uuidv4();
      list.push(newItem);

      set(state, path, list);
    },
    deleteItem: (state: Resume, action: PayloadAction<DeleteItemPayload>) => {
      const { path, value } = action.payload;
      let list = get(state, path, []);

      list = list.filter((item: Profile) => item.id !== value.id);

      set(state, path, list);
    },
    addSection: (state: Resume, action: PayloadAction<AddSectionPayload>) => {
      const id = uuidv4();
      const { value } = action.payload;

      state.sections[id] = value;
      state.metadata.layout[0][0].push(id);
    },
    duplicateSection: (state: Resume, action: PayloadAction<AddSectionPayload>) => {
      const { value, type } = action.payload;

      const id = getSectionsByType(state.sections, type).length + 1;
      value.name = value.name + '-' + id;

      state.sections[`${type}-${id}`] = value;
      state.metadata.layout[0][0].push(`${type}-${id}`);
    },
    deleteSection: (state: Resume, action: PayloadAction<DeleteSectionPayload>) => {
      const { path } = action.payload;
      const id = path.split('.')[1];

      const sections = Object.keys(state.sections).filter((x) => x !== id);
      const layout = state.metadata.layout.map((pages) => pages.map((list) => list.filter((x) => x !== id)));

      set(state, 'sections', pick(state.sections, sections));
      set(state, 'metadata.layout', layout);
    },
    addPage: (state: Resume) => {
      state.metadata.layout.push([[], []]);
    },
    deletePage: (state: Resume, action: PayloadAction<DeletePagePayload>) => {
      const { page } = action.payload;

      // Do not delete the first page
      if (page === 0) return;

      // Get Sections defined in Page X
      const [main, sidebar] = state.metadata.layout[page];

      // Add sections to page 0 as a default
      state.metadata.layout[0][0].push(...main);
      state.metadata.layout[0][1].push(...sidebar);

      state.metadata.layout.splice(page, 1);
    },
  },
});

export const {
  setResume,
  setResumeState,
  addItem,
  editItem,
  duplicateItem,
  deleteItem,
  addSection,
  duplicateSection,
  deleteSection,
  addPage,
  deletePage,
} = resumeSlice.actions;

export default resumeSlice.reducer;
