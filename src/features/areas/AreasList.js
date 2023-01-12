import { useGetAreasQuery } from "./areasApiSlice"
import Area from "./Area"
import MainBody from "../../layouts/MainDoubleColumn"
// import AreasMainBody from './AreasMainBody'

const AreasList = () => {

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
                    {areaRows}
            </MainBody>
        )

    return content
  }
}
export default AreasList