import {createSlice} from "@reduxjs/toolkit";

interface IRememberAccount {
  isRemember: boolean;
}

const initialState: IRememberAccount = {
  isRemember: true,
};

const RememberAccountSlice = createSlice({
  name: "remember",
  initialState,
  reducers: {
    rememberAccount: (state) => {
      state.isRemember = true;
    },
    noRememberAccount: (state) => {
      state.isRemember = false;
    },
  },
});

export const {rememberAccount, noRememberAccount} =
  RememberAccountSlice.actions;

export default RememberAccountSlice.reducer;
