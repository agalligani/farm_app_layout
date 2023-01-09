import React from 'react';

import { useState, useEffect } from "react"
// import { useUpdateAreaMutation, useDeleteAreaMutation } from "./areasApiSlice"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faTrashCan } from "@fortawesome/free-solid-svg-icons"
// import { ROLES } from "../../config/roles"


const EditAreaForm = ({ area }) => {

    const [title, setTitle] = useState(area.title)
    const onTitleChanged = e => setTitle(e.target.value)

    // const onDeleteAreaClicked = async () => {
    //     await deleteArea({ id: area.id })
    // }

    let canSave = true

    const content = (
        <>
            <form className="form" onSubmit={e => e.preventDefault()}>
                <div className="form__title-row">
                    <h2>Edit Area</h2>
                    <div className="form__action-buttons">
                        <button
                            className="icon-button"
                            title="Save"
                            // onClick={onSaveAreaClicked}
                            // disabled={!canSave}
                        >
                            <FontAwesomeIcon icon={faSave} />
                        </button>
                        <button
                            className="icon-button"
                            title="Delete"
                            // onClick={onDeleteAreaClicked}
                        >
                            <FontAwesomeIcon icon={faTrashCan} />
                        </button>
                    </div>
                </div>
                <label className="form__label" htmlFor="title">
                    Areaname: <span className="nowrap">[3-20 letters]</span></label>
                <input
                    className="form__input"
                    id="title"
                    name="title"
                    type="text"
                    autoComplete="off"
                    value={title}
                    onChange={onTitleChanged}
                />
            </form>
        </>
    )

    return content
}

export default EditAreaForm