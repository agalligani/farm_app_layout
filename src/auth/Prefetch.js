import { store } from '../app/store'
import { areasApiSlice } from '../features/areas/areasApiSlice'
import { cropsApiSlice } from '../features/crops/cropsApiSlice'
import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'


const Prefetch = () => {

    useEffect(() => {
        console.log("Subscribing");
        const areas = store.dispatch(areasApiSlice.endpoints.getAreas.initiate())
        const crops = store.dispatch(cropsApiSlice.endpoints.getCrops.initiate())

        return () => {
            console.log('unsubscribing')
            areas.unsubscribe()
            crops.unsubscribe()
        }
    }, [])

    return <Outlet />
}
export default Prefetch
