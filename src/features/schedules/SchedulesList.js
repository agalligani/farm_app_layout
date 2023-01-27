import { useGetSchedulesQuery } from "./schedulesApiSlice"
import { useNavigate } from "react-router-dom"
import MainBody from "../../layouts/MainDoubleColumn"
import Schedule from "./Schedule"
import GridLoader from "react-spinners/GridLoader"
import { Button } from "react-bootstrap"

const SchedulesList = () => {

    const navigate = useNavigate()
    const handleNewClick = () => {navigate('/schedules/new')}

    const { data: schedules,
        isLoading,
        isSuccess,
        isError,
        error,

    } = useGetSchedulesQuery(undefined, {
        pollingInterval: 95000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })

    let content

    if (isLoading) content = <><p>Loading...</p><p><GridLoader color="#36d7b7" /></p></>

    if (isError) {
        content = <><p>Error</p><p>{error?.data?.message}</p></>
        console.log(error.data)
    }
  
    if (isSuccess) {
        const { ids } = schedules
        const scheduleRows = ids?.length 
            ? ids.map((scheduleId, index)=>{return <Schedule key={index} scheduleId={scheduleId}></Schedule>})
            : null 
        content = scheduleRows
    }

    return (
        <MainBody>
            <>
            <Button onClick={handleNewClick}>New Schedule</Button>
            {content}
            </>
        </MainBody>
    )
}

export default SchedulesList