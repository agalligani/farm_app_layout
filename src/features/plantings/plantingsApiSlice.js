import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice"

// const plantingsAdapter = createEntityAdapter({
//     sortComparer: (a, b) => (a.completed === b.completed) ? 0 : a.completed ? 1 : -1
// })

const plantingsAdapter = createEntityAdapter({})

const initialState = plantingsAdapter.getInitialState()

export const plantingsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getPlantings: builder.query({
            query: () => '/plantings',
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            transformResponse: responseData => {
                const loadedPlantings = responseData.map(planting => {
                    planting.id = planting._id
                    return planting
                });
                return plantingsAdapter.setAll(initialState, loadedPlantings)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Planting', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'Planting', id }))
                    ]
                } else return [{ type: 'Planting', id: 'LIST' }]
            }
        }),
        addNewPlanting: builder.mutation({
            query: initialPlanting => ({
                url: '/plantings',
                method: 'POST',
                body: {
                    ...initialPlanting,
                }
            }),
            invalidatesTags: [
                { type: 'Planting', id: "LIST" }
            ]
        }),
        updatePlanting: builder.mutation({
            query: initialPlanting => ({
                url: '/plantings',
                method: 'PATCH',
                body: {
                    ...initialPlanting,
                }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Planting', id: arg.id }
            ]
        }),
        deletePlanting: builder.mutation({
            query: ({ id }) => ({
                url: `/plantings`,
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Planting', id: arg.id }
            ]
        }),
    }),
})

export const {
    useGetPlantingsQuery,
    useAddNewPlantingMutation,
    useUpdatePlantingMutation,
    useDeletePlantingMutation,
} = plantingsApiSlice

// returns the query result object
export const selectPlantingsResult = plantingsApiSlice.endpoints.getPlantings.select()

// creates memoized selector
const selectPlantingsData = createSelector(
    selectPlantingsResult,
    plantingsResult => plantingsResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllPlantings,
    selectById: selectPlantingById,
    selectIds: selectPlantingIds
    // Pass in a selector that returns the plantings slice of state
} = plantingsAdapter.getSelectors(state => selectPlantingsData(state) ?? initialState)
