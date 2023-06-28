import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";

const UnitsEndpoint = 'http://localhost:8000/api/units'
const GetSongsEndpoint = 'http://localhost:8000/api/get-songs'
const SetSongsEndpoint = 'http://localhost:8000/api/set-songs'

const AdminFromSetUnits = () => {

    const { id } = useParams()
    const navigate = useNavigate()

    const [formData, setFormData] = useState([])

    useEffect(() => {
        const ShowUnits = async () => {
            const [responseUnits, responseSongs] = await Promise.all([
                axios.get(`${UnitsEndpoint}`),
                axios.get(`${GetSongsEndpoint}/${id}`)
            ])
            const completeResponse = responseUnits.data.map(obj1 => {
                const match = responseSongs.data.find(obj2 => obj2['id_unit'] === obj1['id'])
                const almostThere = { id_event: id, ...obj1, ...match }
                const { id_unit, ...newObject } = almostThere
                const newFormData = { ...newObject, id_unit: newObject.id };
                delete newFormData.id;
                return newFormData
            })
            setFormData(completeResponse)
        }
        ShowUnits();
    }, [id]);

    const handleInputChange = (id_unit, new_value) => {
        const updatedFormData = formData.map(obj => {
            return obj.id_unit === id_unit ? { ...obj, number_of_songs: parseInt(new_value) } : obj
        });
        setFormData(updatedFormData);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const updatedFormData = formData.map(obj => {
            return obj.number_of_songs !== undefined ? obj : { ...obj, number_of_songs: 0 }
        });

        axios.post(`${SetSongsEndpoint}`, updatedFormData)
        navigate('/dashboard/events')
    }

    return (
        <div className="col-xl-7 col-lg-8 col-md-9 col-11">
            <div className="card shadow p-4 my-5">
                <h3 className="text-center mb-3 fw-bold">Set Units</h3>
                <form onSubmit={handleSubmit}>
                    <h5 className="mb-4">Select the participating units for this event.</h5>
                    {formData.length !== 0 && formData.map(unit => (
                        <div className="row mb-3 justify-content-between" key={unit.id_unit}>
                            <div className="form-group col-sm-6 ps-5 flex-column d-flex align-self-center">
                                <label htmlFor={`unit-${unit.id_unit}`}><img src={`http://localhost:8000/images/${unit.logo}`} className="me-3 mb-1" width="20px" title={`${unit.name}`} alt="Project SEKAI Wiki"></img>{unit.name}</label>
                            </div>
                            <div className="form-group col-sm-4 flex-column d-flex">
                                <input type="number" className="form-control" min="0" max="20" value={unit.number_of_songs || 0} id={`unit-${unit.id_unit}`} onChange={(e) => handleInputChange(unit.id_unit, e.target.value)} />
                            </div>
                            <div className="col-sm-2 flex-column d-flex align-self-center">song(s)</div>
                        </div>
                    ))}
                    <button type="submit" className="btn primary-color w-100 mb-3 text-black">SUBMIT</button>
                    <button className="btn danger-color w-100 mb-3 text-white" onClick={() => navigate('/dashboard/events')}>BACK</button>
                </form>
            </div>
        </div>
    )
}

export default AdminFromSetUnits