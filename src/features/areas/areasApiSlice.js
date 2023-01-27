import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice"

const areasAdapter = createEntityAdapter({})

const initialState = areasAdapter.getInitialState()

export const areasApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getAreas: builder.query({
            query: () => '/areas',
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            transformResponse: responseData => {
                const loadedAreas = responseData.map(area => {
                    area.id = area._id
                    return area
                });
                console.log(loadedAreas)
                return areasAdapter.setAll(initialState, loadedAreas)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Area', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'Area', id }))
                    ]
                } else return [{ type: 'Area', id: 'LIST' }]
            }
        }),
        addNewArea: builder.mutation({
            query: initialAreaData => ({
                url: '/areas',
                method: 'POST',
                body: {
                    ...initialAreaData,
                }
            }),
            invalidatesTags: [
                { type: 'Area', id: "LIST" }
            ]
        }),
        updateArea: builder.mutation({
            query: initialAreaData => ({
                url: '/areas',
                method: 'PATCH',
                body: {
                    ...initialAreaData,
                }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Area', id: arg.id }
            ]
        }),
        deleteArea: builder.mutation({
            query: ({ id }) => ({
                url: `/areas`,
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Area', id: arg.id }
            ]
        }),
    }),
})

export const {
    useGetAreasQuery,
    useAddNewAreaMutation,
    useUpdateAreaMutation,
    useDeleteAreaMutation,
} = areasApiSlice

// returns the query result object
export const selectAreasResult = areasApiSlice.endpoints.getAreas.select()

// creates memoized selector
const selectAreasData = createSelector(
    selectAreasResult,
    areasResult => areasResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllAreas,
    selectById: selectAreaById,
    selectIds: selectAreaIds
    // Pass in a selector that returns the areas slice of state
} = areasAdapter.getSelectors(state => selectAreasData(state) ?? initialState)