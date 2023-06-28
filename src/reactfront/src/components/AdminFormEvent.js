import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const endpoint = 'http://localhost:8000/api/event'

const AdminFormEvent = () => {

    const navigate = useNavigate()
    const { id } = useParams()
    const isAddMode = !id;

    const [name, setName] = useState('')
    const [date, setDate] = useState(new Date())
    const [description, setDescription] = useState('')
    const [total_tickets, setTotal] = useState(0)
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState(null)
    const [imageName, setImageName] = useState(null)

    const [minTickets, setMinTickets] = useState(0)

    useEffect(() => {
        const getEventById = async () => {
            const response = await axios.get(`${endpoint}/${id}`)
            setName(response.data.name)
            setDate(response.data.date)
            setDescription(response.data.description)
            setTotal(response.data.total_tickets)
            setPrice(response.data.price)
            setImageName(response.data.image)

            setMinTickets(parseInt(response.data.total_tickets)- parseInt(response.data.left_tickets))
        }
        !isAddMode && getEventById()

    }, [id, isAddMode])

    const store = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append('name', name);
        formData.append('date', date);
        formData.append('description', description);
        formData.append('total_tickets', total_tickets);
        formData.append('price', price);
        image && formData.append('image', image);

        if (isAddMode) {
            await axios.post(endpoint, formData);
        } else {
            formData.append('_method', 'patch');
            await axios.post(`${endpoint}/${id}`, formData);
        }

        navigate('/dashboard/events');
    };


    return (
        <div className="col-xl-7 col-lg-8 col-md-9 col-11">
            <div className="card shadow p-4 my-5">
                <h3 className="text-center mb-3 fw-bold">{isAddMode ? 'Add Event' : 'Edit Event'}</h3>
                <form onSubmit={store} encType="multipart/form-data">
                    <div className="row mb-3 justify-content-between">
                        <div className="form-group col-sm-6 flex-column d-flex">
                            <label className="form-control-label mb-1" htmlFor="inputName">Event Name <span className="text-danger">*</span></label>
                            <input required type="text" className="form-control" id="inputName" value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className="form-group col-sm-6 flex-column d-flex">
                            <label className="form-control-label mb-1" htmlFor="inputDate">Date <span className="text-danger">*</span></label>
                            <input required type="date" className="form-control" id="inputDate" value={date} onChange={(e) => setDate(e.target.value)} />
                        </div>
                    </div>
                    <div className="row g-2">
                        <div className="col mb-3 pe-3">
                            <label htmlFor="inputDescription" className="form-label">Description <span className="text-danger">*</span></label>
                            <textarea required
                                type="text-area"
                                className="form-control h-75"
                                id="inputDescription"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)} />
                        </div>
                        <div className="col mb-3">
                            <div className="mb-3">
                                <label htmlFor="inputTotal" className="form-label">Total Tickets <span className="text-danger">*</span></label>
                                <input required
                                    type="number"
                                    className="form-control"
                                    id="inputTotal"
                                    value={total_tickets}
                                    min={isAddMode ? 1 : minTickets}
                                    onChange={(e) => setTotal(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="inputPrice" className="form-label">Ticket Price <span className="text-danger">*</span></label>
                                <input required
                                    type="number"
                                    className="form-control"
                                    id="inputPrice"
                                    value={price}
                                    min="0.01"
                                    step="0.01"
                                    onChange={(e) => setPrice(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="inputImage" className="form-label">
                                    Image <span className="text-danger">*</span>
                                </label>
                                <input
                                    required={isAddMode}
                                    type="file"
                                    className="form-control"
                                    id="inputImage"
                                    accept="image/*"
                                    onChange={(e) => setImage(e.target.files[0])}
                                />
                                {!isAddMode && (
                                    <span><small className="text-muted">
                                        Stored: {imageName}
                                    </small></span>
                                )}
                            </div>

                        </div>
                    </div>
                    <button type="submit" className="btn primary-color w-100 mb-3 text-black">SUBMIT EVENT</button>
                    <button type="button" className="btn danger-color w-100 mb-3 text-white" onClick={() => navigate('/dashboard/events')}>BACK</button>
                </form>
            </div>
        </div>
    )
}

export default AdminFormEvent