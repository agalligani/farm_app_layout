import { useGetAreasQuery, selectAllAreas } from "./areasApiSlice"
import { useNavigate } from "react-router-dom"
import Area from "./Area"
import MainBody from "../../layouts/MainDoubleColumn"
import { Button } from "react-bootstrap"
import { useSelector } from "react-redux"

// import AreasMainBody from './AreasMainBody'

const AreasList = () => {

    const navigate = useNavigate()
    const handleNewClick = () => {navigate('/areas/new')}

    const {
        data: areas,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetAreasQuery(undefined, {
        pollingInterval: 45000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })

    const selectAreas = useSelector(selectAllAreas)
    const ids = selectAreas.map(a => {return a.id})

    let content

    if (isLoading) content = <p>Loading...</p>

    if (isError) {
        content = <p className="errmsg">{error?.data?.message}</p>
    }

    if (isSuccess) {
        const { ids } = areas
        const areaRows = ids?.length
        ? ids.map(areaId => <Area key={areaId} areaId={areaId} />)
        : null
    


        content = (
            <MainBody title='Areas'>
            <>
                <div>{ids}</div>
                <Button onClick={handleNewClick}>New Area</Button>
                {areaRows}
            </>
            </MainBody>

        )

    return content
  }
}
export default AreasList