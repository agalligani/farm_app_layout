import React from 'react';

import { useGetCropsQuery } from "./cropsApiSlice"
import Crop from "./Crop"

const CropsList = () => {

    const {
        data: crops,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetCropsQuery(undefined, {
        pollingInterval: 15000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })

    let content

    if (isLoading) content = <p>Loading...</p>

    if (isError) {
        content = <p className="errmsg">{error?.data?.message}</p>
    }

    if (isSuccess) {
        const { ids } = crops

        const cropRows = ids?.length
        ? ids.map(cropId => <Crop key={cropId} cropId={cropId} />)
        : null
    

        content = (
            <main>
                <div>CropsList</div>
                    {cropRows}
            </main>
        )

    return content
  }
}
export default CropsList