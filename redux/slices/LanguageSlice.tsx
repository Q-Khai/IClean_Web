import {createSlice} from "@reduxjs/toolkit";

interface ILanguageState {
  lang: string;
}

const initialState: ILanguageState = {
  lang: "vi",
};

const LanguageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    changeLang: (state, actions) => {
      state.lang = actions.payload;
    },
  },
});

export const {changeLang} = LanguageSlice.actions;

export default LanguageSlice.reducer;
