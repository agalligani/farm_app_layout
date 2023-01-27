import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAddNewPlantingMutation } from "./plantingsApiSlice"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave } from "@fortawesome/free-solid-svg-icons"

/************************  NewPlantingForm *************************/

const NewPlantingForm = ({areas, crops}) => {

    const [addNewPlanting, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useAddNewPlantingMutation()

    const navigate = useNavigate()

    useEffect(() => {
        if (isSuccess) {
            setSeason('')
            setAreaId('')
            setCropId('')
            setMethod('')
            setSpacing('')
            setBeds('')
            setDaysUntilMature('')
            setBedLength('')
            setRowsPerBed('')
            setPlantsNeeded('')
            setTraySize('')
            setTraysNeeded('')
            setTraysIndoor('')
            setFertilizerType('')
            setActive(true)
            setAreaTitle('')
            setCropName('')
            navigate('/plantings')
        }
    }, [isSuccess, navigate])

    const [season, setSeason] = useState('')
    const [areaId, setAreaId] = useState('')
    const [cropId, setCropId] = useState('')
    const [method, setMethod] = useState('')
    const [spacing, setSpacing] = useState('')
    const [beds, setBeds] = useState('')
    const [daysUntilMature, setDaysUntilMature] = useState('')
    const [bedLength, setBedLength] = useState('')
    const [rowsPerBed, setRowsPerBed] = useState('')
    const [plantsNeeded, setPlantsNeeded] = useState('')
    const [traySize, setTraySize] = useState('')
    const [traysNeeded, setTraysNeeded] = useState('')
    const [traysIndoor, setTraysIndoor] = useState('')
    const [daysIndoor, setDaysIndoor] = useState('')
    const [fertilizerType, setFertilizerType] = useState('')
    const [active, setActive] = useState(true)
    const [areatitle, setAreaTitle] = useState('')
    const [cropname, setCropName] = useState('')
    // const [areaId, setAreaId] = useState(areas[0].id)
    const onSeasonChanged = e => setSeason(e.target.value)
    const onAreaIdChanged = e => setAreaId(e.target.value)
    const onCropIdChanged = e => setCropId(e.target.value)
    const onMethodChanged = e => setMethod(e.target.value)
    const onSpacingChanged = e => setSpacing(e.target.value)
    const onBedsChanged = e => setBeds(e.target.value)
    const onDaysUntilMatureChanged = e => setDaysUntilMature(e.target.value)
    const onBedLengthChanged = e => setBedLength(e.target.value)
    const onRowsPerBedChanged = e => setRowsPerBed(e.target.value)
    const onPlantsNeededChanged = e => setPlantsNeeded(e.target.value)
    const onTraySizeChanged = e => setTraySize(e.target.value)
    const onTraysNeededChanged = e => setTraysNeeded(e.target.value)
    const onDaysIndoorChanged = e => setTraysIndoor(e.target.value)
    const onActiveChanged = e => setActive(e.target.value)
    const onFertilizerTypeChanged = e => setFertilizerType(e.target.value)
    const onAreaTitleChanged = e => setAreaTitle(e.target.value)
    const onCropNameChanged = e => setCropName(e.target.value)


    const canSave = [season].every(Boolean) && !isLoading

    const onSavePlantingClicked = async (e) => {
        e.preventDefault()
        console.log(` ${season}... ${cropId} ... ${areaId}`)
        if (canSave) {
            await addNewPlanting({ 
              "season": season,
              "area": areaId, 
              "crop": cropId,
              "method": method,
              "spacing": spacing,
              "beds": beds,
              "daysUntilMature": daysUntilMature,
              "bedLength": bedLength,
              "rowsPerBed": rowsPerBed,
              "plantsNeeded": plantsNeeded,
              "traySize": traySize,
              "traysNeeded": traysNeeded,
              "traysIndoor": traysIndoor,
              "daysIndoor": daysIndoor,
              "fertilizerType": fertilizerType,
              "active": active,
              "areatitle": areatitle,
              "cropname": cropname
            })
        }
    }

    const areaOptions = areas.map(area => {
        return (
            <option
                key={area._id}
                value={area._id}
            > {area.title}</option >
        )
    })

    const cropOptions = crops.map(crop => {
        return (
            <option
                key={crop._id}
                value={crop._id}
            > {crop.name}</option >
        )
    })


    const errClass = isError ? "errmsg" : "offscreen"
    const validTitleClass = !season ? "form__input--incomplete" : ''

    const content = (
        <>
            <p className={errClass}>{error?.data?.message}</p>

            <form className="form" onSubmit={onSavePlantingClicked}>
                <div className="form__title-row">
                    <h2>New Planting</h2>
                </div>
                <label className="form__label" htmlFor="season">Season:</label>
                <input
                    className={`form__input ${validTitleClass}`}
                    id="season"
                    name="season"
                    type="text"
                    autoComplete="off"
                    value={season}
                    onChange={onSeasonChanged}
                />

                <label className="form__label form__checkbox-container" htmlFor="areaname">
                    AREA PLANTED:</label>
                <select
                    id="areaId"
                    name="areaId"
                    className="form__select"
                    value={areaId}
                    onChange={onAreaIdChanged}
                >
                    {areaOptions}
                </select>

                <select
                    id="cropId"
                    name="cropId"
                    className="form__select"
                    value={cropId}
                    onChange={onCropIdChanged}
                >
                    {cropOptions}
                </select>

                {/* <label className="form__label" htmlFor="description">Text:</label>
                <textarea
                    className={`form__input form__input--text`}
                    id="description"
                    name="description"
                    value={description}
                    onChange={onDescriptionChanged}
                /> */}

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
                        season="Save"
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

export default NewPlantingForm