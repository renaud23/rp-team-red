import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BulletinIndividuel } from "../../api/api";
import { API } from "../../api/api";
import { RootState } from "../../store";

export interface RepriseState {
  bulletins?: Array<BulletinIndividuel>;
  bulletinCourant?: BulletinIndividuel;
  isLastBulletin?: boolean;
  isFirstBulletin?: boolean;
  nextId?: number;
  previousId?: number;
  status: "idle" | "pending" | "fulfilled" | "rejected";
}

const initialState: RepriseState = {
  bulletins: undefined,
  status: "idle",
  nextId: -1,
};

export const fetchBulletins: any = createAsyncThunk(
  "bulletins/fetchAll",
  async () => {
    const bulletins = await API.getBulletin();
    return bulletins;
  }
);

export const repriseSlice = createSlice({
  name: "reprise",
  initialState,
  reducers: {
    switchBulletin: (state, action: PayloadAction<number>) => {
      if (state.bulletins) {
        let selectedIndex = -1;
        const howMany = state?.bulletins?.length ?? 0;
        state.bulletinCourant = state.bulletins.find((b, index) => {
          selectedIndex = index;
          return b.id === action.payload;
        });

        state.isLastBulletin = selectedIndex === howMany - 1;
        state.isFirstBulletin = selectedIndex === 0;
        state.nextId =
          selectedIndex < howMany - 1
            ? state.bulletins[selectedIndex + 1].id
            : undefined;
        state.previousId =
          selectedIndex > 0 ? state.bulletins[selectedIndex - 1].id : undefined;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBulletins.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(fetchBulletins.fulfilled, (state, action) => {
      state.bulletins = action.payload;
      state.status = "fulfilled";
    });
    builder.addCase(fetchBulletins.rejected, (state) => {
      state.status = "rejected";
    });
  },
});

export const { switchBulletin } = repriseSlice.actions;
export const selectStatus = (state: RootState) => state.reprise.status;
export const selectIsLastBulletin = (state: RootState) =>
  state.reprise.isLastBulletin;
export const selectIsFirstBulletin = (state: RootState) =>
  state.reprise.isFirstBulletin;
export const selectBulletinCourant = (state: RootState) =>
  state.reprise.bulletinCourant;
export const selectNextId = (state: RootState) => state.reprise.nextId;
export const selectPreviousId = (state: RootState) => state.reprise.previousId;
