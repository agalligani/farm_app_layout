import React from 'react';

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAddNewAreaMutation } from "./areasApiSlice"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave } from "@fortawesome/free-solid-svg-icons"

const NewAreaForm = () => {

    const [addNewArea, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useAddNewAreaMutation()

    const navigate = useNavigate()

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [active, setActive] = useState(true)
    // const [userId, setUserId] = useState(users[0].id)

    useEffect(() => {
        if (isSuccess) {
            setTitle('')
            setDescription('')
            setActive(null)
            navigate('/dash/areas')
        }
    }, [isSuccess, navigate])

    const onTitleChanged = e => setTitle(e.target.value)
    const onDescriptionChanged = e => setDescription(e.target.value)
    const onActiveChanged = e => setActive(e.target.value)
    const canSave = [title].every(Boolean) && !isLoading

    const onSaveAreaClicked = async (e) => {
        e.preventDefault()
        if (canSave) {
            await addNewArea({ "title": title, "description": description, "active": active })
        }
    }

    // const options = users.map(user => {
    //     return (
    //         <option
    //             key={user.id}
    //             value={user.id}
    //         > {user.username}</option >
    //     )
    // })

    const errClass = isError ? "errmsg" : "offscreen"
    const validTitleClass = !title ? "form__input--incomplete" : ''

    const content = (
        <>
            <p className={errClass}>{error?.data?.message}</p>

            <form className="form" onSubmit={onSaveAreaClicked}>
                <div className="form__title-row">
                    <h2>New Field or Greenhouse Area</h2>
                </div>
                <label className="form__label" htmlFor="title">Title:</label>
                <input
                    className={`form__input ${validTitleClass}`}
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
                        disabled={!canSave}
                    >
                    <FontAwesomeIcon icon={faSave} />
                    </button>
                </div>
            </form>
        </>
    )

    return content
}

export default NewAreaForm