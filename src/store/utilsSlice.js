import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createFetchOptions } from "./utils/createFetchOptions";

export const getGenresForSelectMUI = createAsyncThunk(
  "utils/getGenresForSelectMUI",
  async function (_, { rejectWithValue }) {
    const errorMessage =
      "Запрос жанров для селекта в MUI: Произошла ошибка при запросе к серверу! Статус:";
    try {
      const options = createFetchOptions("GET");
      const response = await fetch(
        "https://api.themoviedb.org/3/genre/movie/list?language=ru",
        options
      );
      if (!response.ok) {
        throw new Error(`${errorMessage} ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      rejectWithValue(error.message);
    }
  }
);

const utilsSlice = createSlice({
  name: "utils",
  initialState: {
    genresForSelect: {
      genres: [],
      status: null,
      error: null,
      isLoading: true,
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(getGenresForSelectMUI.pending, (state, action) => {
        state.genresForSelect.status = "pending";
        state.genresForSelect.error = null;
        state.genresForSelect.isLoading = true;
      })
      .addCase(getGenresForSelectMUI.fulfilled, (state, action) => {
        state.genresForSelect.status = "resolved";
        state.genresForSelect.error = null;
        state.genresForSelect.isLoading = false;
        state.genresForSelect.genres = action.payload;
      })
      .addCase(getGenresForSelectMUI.rejected, (state, action) => {
        state.genresForSelect.status = "rejected";
        state.genresForSelect.error = action.payload;
        state.genresForSelect.isLoading = false;
      }),
});

export default utilsSlice.reducer;
