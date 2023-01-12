import { createSelector, createEntityAdapter } from "@reduxjs/toolkit"
import { apiSlice } from "../../app/api/apiSlice"

const cropsAdapter = createEntityAdapter({})
const initialState = cropsAdapter.getInitialState()

export const cropsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getCrops: builder.query({
            query: () => '/crops',
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError   
            },
            transformResponse: responseData => {
                const loadedCrops = responseData.map(crop => {
                    crop.id = crop._id
                    return crop
                });
                console.log(loadedCrops)
                return cropsAdapter.setAll(initialState, loadedCrops)
            }
        }),
        addNewCrop: builder.mutation({
            query: initialCrop => ({
                url: '/crops',
                method: 'POST',
                body: {
                    ...initialCrop,
                }
            }),
            invalidateTags: [
                { type: 'Crop', id: "LIST"}
            ]
        }),
        updateCrop: builder.mutation({
            query: initialCrop => ({
                url: '/crops',
                method: 'PATCH',
                body: {
                    ...initialCrop
                }
            }),
            invalidateTags: (result, error, arg) => [
                { type: 'Crop', id: arg.id }
            ]
        }),
        deleteCrop: builder.mutation({
            query: ({id}) => ({
                url: '/crops',
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: (result, error, arg) => [
                {type: 'Crop', id: arg.id}
            ]
        })    
    })
})

export const {
    useGetCropsQuery,
    useAddNewCropMutation,
    useUpdateCropMutation,
    useDeleteCropMutation
} = cropsApiSlice

//returns the query result object
export const selectCropsResult = cropsApiSlice.endpoints.getCrops.select()

//creates memoized selector
const selectCropsData = createSelector(
    selectCropsResult,
    cropsResult => cropsResult.data // normalized state object
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllCrops,
    selectById: selectCropById,
    selectIds: selectCropIds
    // Pass in a selector that returns the crops slice of state
} = cropsAdapter.getSelectors(state => selectCropsData(state) ?? initialState)

