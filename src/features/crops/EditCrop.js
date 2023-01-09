import React from 'react';

import EditCropForm from "./EditCropForm"
import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import { selectCropById } from "./cropsApiSlice"

const EditCrop = () => {

    const { id } = useParams()
    const crop = useSelector((state) => selectCropById(state, id))
    const content = crop ? <EditCropForm crop={crop}/> : <p>Crop {id} not found</p>    
    return content
}
export default EditCrop