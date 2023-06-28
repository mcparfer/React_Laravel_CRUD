import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const SaleEndpoint = 'http://localhost:8000/api/sell'
const EventEndpoint = 'http://localhost:8000/api/events'

const AdminFormSale = () => {

    const { id } = useParams()
    const navigate = useNavigate()

    const [idEvent, setIdEvent] = useState('')
    const [newIdEvent, setNewIdEvent] = useState('')

    const [email, setEmail] = useState(new Date())
    const [phone, setPhone] = useState('')
    const [qty, setQty] = useState(0)
    const [date, setDate] = useState('')
    const [events, setEvents] = useState([])

    useEffect(() => {
        const getSell = async () => {
            const responseSale = await axios.get(`${SaleEndpoint}/${id}`)

            setIdEvent(responseSale.data.id_event)
            setNewIdEvent(responseSale.data.id_event)
            setEmail(responseSale.data.email)
            setPhone(responseSale.data.phone)
            setQty(responseSale.data.qty)
            const date = new Date(responseSale.data.created_at);
            const formattedDate = date.toISOString().slice(0, 16);
            setDate(formattedDate)

            const responseEvent = await axios.get(`${EventEndpoint}`)
            setEvents(responseEvent.data)
        }
        getSell()
    }, [id, idEvent])

    const store = async (e) => {
        e.preventDefault()

        const formData = { newIdEvent, email, phone, qty }
        console.log(idEvent)
        await axios.put(`${SaleEndpoint}/${id}`, formData)
        navigate('/dashboard/sales')
    };

    return (
        <div className="col-xl-7 col-lg-8 col-md-9 col-11">
            <div className="card shadow p-4 my-5">
                <h3 className="text-center mb-3 fw-bold">Edit Sale</h3>
                <form onSubmit={store}>
                    <div className="form-group flex-column d-flex mb-3">
                        <label className="form-control-label mb-1" htmlFor="inputID">Event</label>
                        <select class="form-select" value={newIdEvent} onChange={(e) => setNewIdEvent(e.target.value)}>
                            {events.map(event => (
                                <option key={event.id} value={event.id}> {event.name} </option>
                            ))}
                        </select>
                    </div>

                    <div className="row mb-3 justify-content-between">
                        <div className="form-group col-sm-6 flex-column d-flex mb-2">
                            <label className="form-control-label mb-1" htmlFor="inputEmail">Email <span className="text-danger">*</span></label>
                            <input required type="text" className="form-control" id="inputEmail" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="form-group col-sm-6 flex-column d-flex">
                            <label className="form-control-label mb-1" htmlFor="inputPhone">Phone <span className="text-danger">*</span></label>
                            <input required type="text" className="form-control" id="inputPhone" value={phone} onChange={(e) => setPhone(e.target.value)} />
                        </div>
                    </div>

                    <div className="row mb-3 justify-content-between">
                        <div className="form-group col-sm-6 flex-column d-flex">
                            <label className="form-control-label mb-1" htmlFor="inputQty">Tickets <span className="text-danger">*</span></label>
                            <input required type="number" className="form-control" id="inputQty" min="1" value={qty} onChange={(e) => setQty(e.target.value)} />
                        </div>
                        <div className="form-group col-sm-6 flex-column d-flex">
                            <label className="form-control-label mb-1" htmlFor="inputDate">Created at</label>
                            <input disabled type="datetime-local" className="form-control" id="inputDate" value={date} />
                        </div>
                    </div>
                    <button type="submit" className="btn primary-color w-100 mb-3 text-black">SUBMIT EVENT</button>
                    <button type="button" className="btn danger-color w-100 mb-3 text-white" onClick={() => navigate('/dashboard/sales')}>BACK</button>
                </form>
            </div>
        </div>
    )
}

export default AdminFormSale