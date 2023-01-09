import React from 'react';

import EditAreaForm from "./EditAreaForm"
import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import { selectAreaById } from "./areasApiSlice"

const EditArea = () => {

    const { id } = useParams()
    const area = useSelector((state) => selectAreaById(state, id))
    const content = area ? <EditAreaForm area={area}/> : <p>Area {id} not found</p>    
    return content
}
export default EditArea