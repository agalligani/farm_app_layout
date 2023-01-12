import React from 'react';

import { useState, useEffect } from "react"
import { useUpdateAreaMutation, useDeleteAreaMutation } from "./areasApiSlice"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faTrashCan } from "@fortawesome/free-solid-svg-icons"
import '../../style/buttons.scss'
// import { ROLES } from "../../config/roles"


const EditAreaForm = ({ area }) => {

    const [updateArea, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useUpdateAreaMutation()

    const [deleteArea, {
        isSuccess: isDelSuccess,
        isError: isDelError,
        error: delerror
    }] = useDeleteAreaMutation()

    const navigate = useNavigate()

    const [title, setTitle] = useState(area.title)
    const [description, setDescription] = useState(area.description)
    const [active, setActive] = useState(area.active)

    useEffect(() => {

        if (isSuccess || isDelSuccess) {
            setTitle('')
            setDescription('')
            setActive(null)
            navigate('/areas')
        }

    }, [isSuccess, isDelSuccess, navigate])

    const onTitleChanged = e => setTitle(e.target.value)
    const onDescriptionChanged = e => setDescription(e.target.value)
    const onActiveChanged = e => setActive(e.target.value)

    const onSaveAreaClicked = async () => {
        if(canSave) {
            await updateArea({ id: area.id, title: title, description: description, active: active})
        }
    }

    const onDeleteAreaClicked = async () => {
        await deleteArea({ id: area.id })
    }

    let canSave = true

    const content = (
        <>
            <form className="form" onSubmit={e => e.preventDefault()}>
                <div className="form__title-row">
                    <h2>Edit Area</h2>
                </div>
                <label className="form__label" htmlFor="title">Title:</label>
                <input
                    className={`form__input`}
                    id="title"
                    name="title"
                    type="text"
                    autoComplete="off"
                    value={title}
                    onChange={onTitleChanged}
                />

                <label className="form__label" htmlFor="description">Text:</label>
                <textarea
                    className={`form__input form__input--text`}
                    id="description"
                    name="description"
                    value={description}
                    onChange={onDescriptionChanged}
                />

                <label className="form__label form__checkbox-container" htmlFor="active">
                    Active:</label>
                <select
                    id="active"
                    name="active"
                    className="form__select"
                    value={active}
                    onChange={onActiveChanged}
                >
                    <option key='true' value='true'>Active</option>
                    <option key='false' value='false'>Inactive</option>
                </select>

                <div className="form__action-buttons">
                    <button
                        className="icon-button"
                        title="Save"
                        onClick={onSaveAreaClicked}
                        disabled={!canSave}
                >
                        <FontAwesomeIcon icon={faSave} />
                    </button>
                     <button
                        className="icon-button"
                        title="Delete"
                        onClick={onDeleteAreaClicked}
                    >
                        <FontAwesomeIcon icon={faTrashCan} />
                    </button>
                </div>
            </form>
        </>
    )

    return content
}

export default EditAreaForm