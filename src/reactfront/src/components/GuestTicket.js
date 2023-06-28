import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const endpoint = 'http://localhost:8000/api/event'
const imagesEndpoint = 'http://localhost:8000/images'
const songsEndpoint = 'http://localhost:8000/api/get-songs'
const unitsEndpoint = 'http://localhost:8000/api/units'

const Evento = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const [isFetching, setIsFetching] = useState(true);

    const [name, setName] = useState('')
    const [date, setDate] = useState(new Date())
    const [description, setDescription] = useState('')
    const [left_tickets, setLeft] = useState(0)
    const [price, setPrice] = useState(0)
    const [imageName, setImageName] = useState('')
    const backgroundImage = `${imagesEndpoint}/${imageName}`;

    const [songs, setSongs] = useState([])
    const [units, setUnits] = useState([])

    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [qty, setQty] = useState(0)

    useEffect(() => {
        const getEventById = async () => {
            const response = await axios.get(`${endpoint}/${id}`)
            setName(response.data.name)
            setDate(response.data.date)
            setDescription(response.data.description)
            setLeft(response.data.left_tickets)
            setPrice(response.data.price)
            setImageName(response.data.image)

            const songsResponse = await axios.get(`${songsEndpoint}/${id}`)
            setSongs(songsResponse.data)

            const unitsResponse = await axios.get(`${unitsEndpoint}`)
            setUnits(unitsResponse.data)

            setIsFetching(false);
        }
        getEventById()
    }, [id])

    const store = async (e) => {
        e.preventDefault();

        const formData = {
            email,
            phone,
            qty
        }
        await axios.post(`http://localhost:8000/api/sell/${id}`, formData);
        navigate('/');
    };

    const unitSongs = () => {
        const getAll = songs.map(song => {
            return units.find(unit => unit['id'] === song['id_unit'])
        })

        return getAll
    }

    if (isFetching) {
        return (
            <p className="loading">Cargando...</p>
        );
    }

    return (
        <div className="w-100 h-100">
            <div
                style={{
                    backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${backgroundImage})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                }}
            >
                <div className="row mx-auto justify-content-center py-5">
                    <div className="text-center">
                        <h1 className="text-white">{name}</h1>
                    </div>
                </div>
            </div>

            <div className="py-5">
                <div className="row align-items-stretch">
                    <div className="col-md-8">
                        <div className="card p-3 mb-3 h-100">
                            <div className="card-body">
                                <h3 className="fs-3 mb-3">Event Information</h3>
                                <div className="px-3">
                                    <p><span className="fw-bold">Description:</span> {description}</p>
                                    <p><span className="fw-bold">Date:</span> {date.toString()}</p>
                                    <p><span className="fw-bold">Price:</span> {price}€</p>
                                </div>
                                <h3 className="fs-3 mb-3">Units</h3>
                                <div className="px-3">
                                    <div className="row justify-content-center">
                                        {unitSongs()[0] && unitSongs().map(unit => (
                                            <img className="col-4" src={`${imagesEndpoint}/human${unit.logo}`} alt="" />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="evento-formulario">
                            <h3 className="fs-3 mt-4">Buy Tickets!</h3>
                            <form onSubmit={store}>
                                <div className="form-group mb-3">
                                    <label htmlFor="email" className="form-label">Email:</label>
                                    <input type="email" id="email" name="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
                                </div>
                                <div className="form-group mb-3">
                                    <label htmlFor="telefono" className="form-label">Phone Number:</label>
                                    <input type="tel" id="telefono" name="telefono" className="form-control" value={phone} onChange={(e) => setPhone(e.target.value)} />
                                </div>
                                <div className="d-flex align-items-end">
                                    <div className="form-group mb-3 w-50">
                                        <label htmlFor="entradas" className="form-label">Tickets:</label>{left_tickets === 0 && <span className="text-danger fw-bold"> SOLD OUT</span>}
                                        <input type="number" id="entradas" name="entradas" className="form-control" min={left_tickets === 0 ? 0 : 1} max={left_tickets} value={qty} onChange={(e) => setQty(e.target.value)} />
                                    </div>
                                    <p className="ms-3 w-50">TOTAL: {(qty * price).toFixed(2)} €</p>
                                </div>
                                <button type="submit" className="btn btn-primary border-0 w-100">Buy!</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Evento;