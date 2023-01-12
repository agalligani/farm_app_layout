import { createSelector, createEntityAdapter } from "@reduxjs/toolkit"
import { apiSlice } from "../../app/api/apiSlice"

const schedulesAdapter = createEntityAdapter({})
const initialState = schedulesAdapter.getInitialState()

export const schedulesApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getSchedules: builder.query({
            query: () => '/schedules',
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError   
            },
            transformResponse: responseData => {
                const loadedSchedules = responseData.map(schedule => {
                    schedule.id = schedule._id
                    return schedule
                });
                console.log(loadedSchedules)
                return schedulesAdapter.setAll(initialState, loadedSchedules)
            }
        }),
        addNewSchedule: builder.mutation({
            query: initialSchedule => ({
                url: '/schedules',
                method: 'POST',
                body: {
                    ...initialSchedule,
                }
            }),
            invalidatesTags: [
                { type: 'Schedule', id: "LIST" }
            ]
        }),
        updateSchedule: builder.mutation({
            query: initialSchedule => ({
                url: '/schedules',
                method: 'PATCH',
                body: {
                    ...initialSchedule,
                }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Schedule', id: arg.id}
            ]
        }),
        deleteSchedule: builder.mutation({
            query: ({id}) => ({
                url: '/schedules',
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: (result, error, arg) => [
                {type: 'Schedule', id: arg.id}
            ]
        })
    })
})

export const {
    useGetSchedulesQuery,
    useAddNewScheduleMutation,
    useUpdateScheduleMutation,
    useDeleteScheduleMutation
} = schedulesApiSlice

//returns the query result object
export const selectSchedulesResult = schedulesApiSlice.endpoints.getSchedules.select()

//creates memoized selector
const selectSchedulesData = createSelector(
    selectSchedulesResult,
    schedulesResult => schedulesResult.data // normalized state object
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllSchedules,
    selectById: selectScheduleById,
    selectIds: selectScheduleIds
    // Pass in a selector that returns the schedules slice of state
} = schedulesAdapter.getSelectors(state => selectSchedulesData(state) ?? initialState)

