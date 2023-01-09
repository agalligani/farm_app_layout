import React from 'react';

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
        })
    })
})

export const {
    useGetCropsQuery
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

