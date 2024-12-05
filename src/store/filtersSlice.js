import { createSlice } from "@reduxjs/toolkit";

const DEFAULT_VALUES = {
  PAGINATION_PAGE: 1,
  SORT_BY: "По популярности",
  YEARS_RANGE: [1950, 2024],
  GENRES: [],
};

const filtersSlice = createSlice({
  name: "filters",
  initialState: {
    paginationPage: DEFAULT_VALUES.PAGINATION_PAGE,
    sortBy: DEFAULT_VALUES.SORT_BY,
    yearsRange: DEFAULT_VALUES.YEARS_RANGE,
    genres: DEFAULT_VALUES.GENRES,
  },
  reducers: {
    setSortBy(state, action) {
      state.paginationPage = DEFAULT_VALUES.PAGINATION_PAGE;
      state.sortBy = action.payload.sortBy;
    },
    setYearsRange(state, action) {
      state.paginationPage = DEFAULT_VALUES.PAGINATION_PAGE;
      state.yearsRange = action.payload.yearsRange;
    },
    setGenres(state, action) {
      state.paginationPage = DEFAULT_VALUES.PAGINATION_PAGE;
      state.genres = action.payload.genres;
    },
    setFiltersPaginationPage(state, action) {
      state.paginationPage = action.payload.page;
    },
    resetFilters(state) {
      state.sortBy = DEFAULT_VALUES.SORT_BY;
      state.yearsRange = DEFAULT_VALUES.YEARS_RANGE;
      state.genres = DEFAULT_VALUES.GENRES;
      state.paginationPage = DEFAULT_VALUES.PAGINATION_PAGE;
    },
  },
});

export const {
  setSortBy,
  setYearsRange,
  setGenres,
  setFiltersPaginationPage,
  resetFilters,
} = filtersSlice.actions;

export default filtersSlice.reducer;
