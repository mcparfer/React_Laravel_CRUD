import React, { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';

import { Link } from 'react-router-dom';

const SalesEndpoint = 'http://localhost:8000/api/sellings'
const OneSaleEndpoint = 'http://localhost:8000/api/sell'
const EventsEndpoint = 'http://localhost:8000/api/events'

const AdminTableSales = () => {

    const [isFetching, setIsFetching] = useState(true)
    const [sales, setSales] = useState([])
    const [events, setEvents] = useState([])

    const [show, setShow] = useState(false)
    const [delID, setDelID] = useState(false)
    const handleShow = (id) => {
        setShow(true)
        setDelID(id)
    }
    const handleClose = () => setShow(false)
    const handleDelete = () => {
        DeleteOneSale(delID)
        setShow(false)
    }

    const ShowAllSales = async () => {
        const [responseSales, responseEvents] = await Promise.all([
            axios.get(`${SalesEndpoint}`),
            axios.get(`${EventsEndpoint}`)
        ])
        setSales(responseSales.data)
        setEvents(responseEvents.data)
        setIsFetching(false);
    }

    const DeleteOneSale = async (id) => {
        handleShow()
        await axios.delete(`${OneSaleEndpoint}/${id}`)
        ShowAllSales()
    }

    useEffect(() => {
        ShowAllSales()
    }, [])

    const eventName = (id_event) => {
        const match = events.find(obj => obj['id'] === id_event)
        return match.name
    }

    if (isFetching) {
        return (
            <p className="loading">Cargando...</p>
        );
    }

    const getDate = (dateString) => {
        const date = new Date(dateString)
        const formattedDate = `${date.getDate() + 1 < 10 ? '0' : ''}${date.getDate()}-${date.getMonth() + 1 < 10 ? '0' : ''}${date.getMonth() + 1}-${date.getFullYear()} at ${date.getHours() - 1 < 10 ? '0' : ''}${date.getHours()}:${date.getMinutes() < 10 ? '0' : ''}${date.getMinutes()}`
        return formattedDate
    }

    return (
        <>
            <div className="col-12">
                <div className="my-4">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <p className="fs-5 fw-bold">Here are our last sellings . . .</p>
                    </div>
                    {sales.length === 0 ? "EMPTY" : (
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th className="col-1">ID</th>
                                    <th className="col-2">EVENT</th>
                                    <th className="col-auto">EMAIL</th>
                                    <th className="col-auto">PHONE</th>
                                    <th className="col-1">QTY</th>
                                    <th className="col-auto">TIMESTAMP</th>
                                    <th className="col-2"> </th>
                                </tr>
                            </thead>
                            <tbody className="table-group-divider">
                                {sales.map(sale => (
                                    <tr key={sale.id}>
                                        <td className="col-1"> {sale.id}</td>
                                        <td className="col-2"> {eventName(sale.id_event)}</td>
                                        <td className="col-auto"> {sale.email}</td>
                                        <td className="col-auto"> {sale.phone}</td>
                                        <td className="col-1"> {sale.qty}</td>
                                        <td className="col-auto"> {getDate(sale.created_at)}</td>
                                        <td className="col-2">
                                            <Link to={`/dashboard/sales/edit-sale/${sale.id}`} className='btn warning-color mb-1 me-2'>Edit</Link>
                                            <button onClick={() => {handleShow(sale.id)}} className='btn text-white mb-1 danger-color'>Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>ATTENTION!</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this sale?</Modal.Body>
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

export default AdminTableSales;