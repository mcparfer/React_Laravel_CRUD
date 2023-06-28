import React, { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';

import { Link } from 'react-router-dom';
import AuthUser from "./AuthUser";

const EventsEndpoint = 'http://localhost:8000/api/events'
const OneEventEndpoint = 'http://localhost:8000/api/event'
const imagesEndpoint = 'http://localhost:8000/images'

const AdminTableEvents = () => {

    const { user } = AuthUser();
    const [isFetching, setIsFetching] = useState(true);

    const [events, setEvents] = useState([])

    const [show, setShow] = useState(false)
    const [delID, setDelID] = useState(false)
    const handleShow = (id) => {
        setShow(true)
        setDelID(id)
    }
    const handleClose = () => setShow(false)
    const handleDelete = () => {
        DeleteOneEvent(delID)
        setShow(false)
    }

    const ShowAllEvents = async () => {
        const response = await axios.get(`${EventsEndpoint}`)
        setEvents(response.data)
        setIsFetching(false);
    }

    const DeleteOneEvent = async (id) => {
        await axios.delete(`${OneEventEndpoint}/${id}`)
        ShowAllEvents()
    }

    useEffect(() => {
        ShowAllEvents()
    }, [])

    if (isFetching) {
        return (
            <p className="loading">Cargando...</p>
        );
    }

    return (
        <>
            <div className="col-12">
                <div className="alert alert-success mt-4 fw-bold" role="alert">
                    ♡〜٩ Welcome back, {user.name}! ( ╹▿╹ )۶〜♡
                </div>
                <div className="my-4">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <p className="fs-5 fw-bold">Here are the upcoming events . . .</p>
                        <Link to="/dashboard/add-event" className='btn primary-color'>New Event</Link>
                    </div>
                    {events.length > 0 ?
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th className="col-2">NAME</th>
                                    <th className="col-auto">UNIT'S SONGS</th>
                                    <th className="col-auto">DATE</th>
                                    <th className="col-2">TICKETS</th>
                                    <th className="col-1">PRICE</th>
                                    <th className="col-3"> </th>
                                </tr>
                            </thead>
                            <tbody className="table-group-divider">
                                {events.map(event => (
                                    <tr key={event.id}>
                                        <td className="col-2">
                                            {event.name}
                                        </td>
                                        <td className="col-auto">
                                            {event.units && event.units.map(collab => (
                                                <span className="ms-2">{collab.number_of_songs}
                                                    <img
                                                        src={`${imagesEndpoint}/${collab.logo}`}
                                                        className="ms-2 mb-1"
                                                        width="20px"
                                                        title={`${collab.unit_name}`}
                                                        alt={`${collab.unit_name}`}></img>
                                                </span>
                                            ))}
                                        </td>
                                        <td className="col-auto">
                                            {event.date}
                                        </td>
                                        <td className="col-2">
                                            {event.total_tickets} tickets / {event.left_tickets} left
                                        </td>
                                        <td className="col-1">
                                            {event.price}€
                                        </td>
                                        <td className="col-3">
                                            <Link to={`/dashboard/edit-event/set-units/${event.id}`} className='btn primary-color my-1 me-2'>Choose Units</Link>
                                            <Link to={`/dashboard/edit-event/${event.id}`} className='btn warning-color mb-1 me-2'>Edit</Link>
                                            <button onClick={() => {handleShow(event.id)}} className='btn text-white mb-1 danger-color'>Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        :
                        <div className="alert alert-warning" role="alert">
                            There are still no events. Be the first one to create an event!
                        </div>
                    }
                </div>
            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>ATTENTION!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    You will erase all event's unit records and all event's sales from database.
                    </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        No, bring me back
                    </Button>
                    <Button variant="danger" onClick={handleDelete}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default AdminTableEvents;