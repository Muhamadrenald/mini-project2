import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://randomuser.me/api/";

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async ({ page, results, gender, keyword }, { rejectWithValue }) => {
    try {
      // Fetch data dari API
      const response = await axios.get(API_URL, {
        params: {
          page: 1,
          results: 100, // Ambil banyak data untuk difilter di client
          seed: "fixedseed", // Seed tetap untuk konsistensi data
        },
      });

      // Filter data di client side
      let filteredData = response.data.results;

      // Filter berdasarkan gender
      if (gender && gender !== "all") {
        filteredData = filteredData.filter((user) => user.gender === gender);
      }

      // Filter berdasarkan keyword (nama atau email)
      if (keyword) {
        const lowerKeyword = keyword.toLowerCase();
        filteredData = filteredData.filter(
          (user) =>
            user.name.first.toLowerCase().includes(lowerKeyword) ||
            user.name.last.toLowerCase().includes(lowerKeyword) ||
            user.email.toLowerCase().includes(lowerKeyword)
        );
      }

      // Pagination di client side
      const startIndex = (page - 1) * results;
      const paginatedData = filteredData.slice(
        startIndex,
        startIndex + results
      );

      return {
        data: paginatedData,
        totalResults: filteredData.length,
      };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const userSlice = createSlice({
  name: "users",
  initialState: {
    data: [],
    loading: false,
    error: null,
    currentPage: 1,
    resultsPerPage: 10,
    totalResults: 0,
    sortConfig: {
      key: null,
      direction: "ascending",
    },
    currentGender: "all",
    currentKeyword: "",
  },
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setSortConfig: (state, action) => {
      state.sortConfig = action.payload;
    },
    setCurrentGender: (state, action) => {
      state.currentGender = action.payload;
    },
    setCurrentKeyword: (state, action) => {
      state.currentKeyword = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
        state.totalResults = action.payload.totalResults;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  setCurrentPage,
  setSortConfig,
  setCurrentGender,
  setCurrentKeyword,
} = userSlice.actions;
export default userSlice.reducer;
