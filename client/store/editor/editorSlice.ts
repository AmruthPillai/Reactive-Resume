import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type CurrentResume = { slug: string; username: string };

type Editor = { currentResume: CurrentResume };

const initialState: Editor = {} as Editor;

export const editorSlice = createSlice({
  name: 'editor',
  initialState,
  reducers: {
    setCurrentResume: (state: Editor, action: PayloadAction<CurrentResume>) => {
      const { slug, username } = action.payload;
      state.currentResume = {
        slug,
        username,
      };
    },
  },
});

export const { setCurrentResume } = editorSlice.actions;

export default editorSlice.reducer;
