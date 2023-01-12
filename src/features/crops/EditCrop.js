import React from 'react';

import EditCropForm from "./EditCropForm"
import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import { selectCropById } from "./cropsApiSlice"
import MainBody from '../../layouts/MainDoubleColumn'

const EditCrop = () => {

    const { id } = useParams()
    const crop = useSelector((state) => selectCropById(state, id))
    const content = crop ? <EditCropForm crop={crop}/> : <p>Crop {id} not found</p>    
    return (<MainBody>
        {content}
    </MainBody>)
}
export default EditCrop