import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import infoRequest from "../../data/infoRequest";

export const fetchInfoRequest = createAsyncThunk(
    'info/fetchInfoRequest',
    async ({ page, limit, filters, sorts }) => {
        // Получаем значения get
       return await infoRequest.list(page, limit, filters, sorts);
    }
)

const slice = createSlice({
    name: 'infoSlice',
    initialState: {
        data:[],
        count: 0,
        page:1,
        limit: 10,
        filters: {},
        sorts: {},
        errors: null,
        loading: false,
    },
    reducers: {
        setSort: (state, action) => {
            const { payload: { column, sortSelected } } = action;
            state.sorts = { [column]: sortSelected };
        },
        setPage: (state, action) => {
            const { payload } = action;
            state.page = payload;
        },
        setFilter: (state, action) => {
            const { payload } = action;
            state.filters[payload.column] = payload.effect;
        }

    },
    extraReducers: (builder) => {
        builder.addCase(fetchInfoRequest.fulfilled, (state, action) => {
            const { payload: {info, count} } = action;
            state.data = info;
            state.loading = false;
            state.count = count;
        })
        builder.addCase(fetchInfoRequest.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(fetchInfoRequest.rejected, (state) => {
            state.loading = false;
            state.errors = "Ошибка работы с таблицей";
        })
    }
});

export const { setPage, setFilter, setSort } = slice.actions;

export default slice.reducer;