import React from 'react';

import { useState, useEffect } from "react"
// import { useUpdateCroputation, useDeleteCroputation } from "./cropApiSlice"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faTrashCan } from "@fortawesome/free-solid-svg-icons"
// import { ROLES } from "../../config/roles"


const EditCropForm = ({ crop }) => {

    const [name, setName] = useState(crop.name)
    const [qualifier, setQualifier] = useState(crop.qualifier)
    const [daysUntilMature, setDaysUntilMature] = useState(crop.daysUntilMature)
    const onNameChanged = e => setName(e.target.value)
    const onQualifierChanged = e => setQualifier(e.target.value)
    const onDaysUntilMatureChanged = e => setDaysUntilMature(e.target.value)

    // const onDeleteCroplicked = async () => {
    //     await deleteCrop{ id: cropid })
    // }

    let canSave = true

    const content = (
        <>
            <form className="form" onSubmit={e => e.preventDefault()}>
                <div className="form__title-row">
                    <h2>Edit Crop</h2>
                    <div className="form__action-buttons">
                        <button
                            className="icon-button"
                            title="Save"
                            // onClick={onSaveCroplicked}
                            // disabled={!canSave}
                        >
                            <FontAwesomeIcon icon={faSave} />
                        </button>
                        <button
                            className="icon-button"
                            title="Delete"
                            // onClick={onDeleteCroplicked}
                        >
                            <FontAwesomeIcon icon={faTrashCan} />
                        </button>
                    </div>
                </div>
                <label className="form__label" htmlFor="name">
                    Crop name:
                </label>
                <input
                    className="form__input"
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="off"
                    value={name}
                    onChange={onNameChanged}
                />
                <br/>
                <label className="form__label" htmlFor="qualifier">
                    Qualifier:
                </label>
                <input
                    className="form__input"
                    id="qualifier"
                    name="qualifier"
                    type="text"
                    autoComplete="off"
                    value={qualifier}
                    onChange={onQualifierChanged}
                />
                <br/>
                <label className="form__label" htmlFor="daysUntilMature">
                    Days until mature:
                </label>
                <input
                    className="form__input"
                    id="daysUntilMature"
                    name="daysUntilMature"
                    type="text"
                    autoComplete="off"
                    value={daysUntilMature}
                    onChange={onDaysUntilMatureChanged}
                />
            </form>
        </>
    )

    return content
}

export default EditCropForm