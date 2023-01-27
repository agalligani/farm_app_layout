import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAddNewCropMutation } from "./cropsApiSlice"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave } from "@fortawesome/free-solid-svg-icons"

const NewCropForm = () => {

    const [addNewCrop, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useAddNewCropMutation()

    const navigate = useNavigate()

    const [name, setName] = useState('')
    const [qualifier, setQualifier] = useState('')
    const [daysUntilMature, setDaysUntilMature] = useState(50)
    // const [userId, setUserId] = useState(users[0].id)

    useEffect(() => {
        if (isSuccess) {
            setName('')
            setQualifier('')
            setDaysUntilMature(null)
            navigate('/crops')
        }
    }, [isSuccess, navigate])

    const onNameChanged = e => setName(e.target.value)
    const onQualifierChanged = e => setQualifier(e.target.value)
    const onDaysUntilMatureChanged = e => setDaysUntilMature(e.target.value)
    const canSave = [name].every(Boolean) && !isLoading

    const onSaveCropClicked = async (e) => {
        e.preventDefault()
        if (canSave) {
            await addNewCrop({ "name": name, "qualifier": qualifier, "daysUntilMature": daysUntilMature })
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
    const validNameClass = !name ? "form__input--incomplete" : ''

    const content = (
        <>
            <p className={errClass}>{error?.data?.message}</p>

            <form className="form" onSubmit={onSaveCropClicked}>
                <div className="form__name-row">
                    <h2>New Crop</h2>
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
                <div className="form__action-buttons">
                    <button
                        className="icon-button"
                        name="Save"
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

export default NewCropForm