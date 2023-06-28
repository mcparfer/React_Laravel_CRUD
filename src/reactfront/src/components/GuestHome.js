import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';

const EventsEndpoint = 'http://localhost:8000/api/events'
const ImagesEndpoint = 'http://localhost:8000/images'

const GuestHome = () => {

    const [cards, setEvents] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isFetching, setIsFetching] = useState(true);

    const cardsPerPage = 2;
    const totalPages = Math.ceil(cards.length / cardsPerPage);
    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    const startIndex = (currentPage - 1) * cardsPerPage;
    const endIndex = startIndex + cardsPerPage;
    const cardsToShow = cards.slice(startIndex, endIndex);

    const handlePageClick = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    useEffect(() => {
        const ShowAllEvents = async () => {
            const response = await axios.get(`${EventsEndpoint}`)
            setEvents(response.data)
            setIsFetching(false);
        }
        ShowAllEvents()
    }, [])

    if (isFetching) {
        return (
            <p className="loading">Cargando...</p>
        );
    }


    return (
        <div className="col-12">
            <div className="container-fluid p-0">
                <div className="hero ps-2 pt-4 pb-2">
                    <h3 className="fs-3 fw-bold">Upcoming Events</h3>
                    <p>Welcome to the Project SEKAI Circus!</p>
                </div>
                <div className="event-cards">
                    <div className="container">
                        <div className="row">
                            {cardsToShow.map((card) => (
                                <div className="col-md-6 mb-4" key={card.id}>
                                    <div className="card h-100">
                                        <img src={`${ImagesEndpoint}/${card.image}`} className="card-img-top" alt={card.name} />
                                        <div className="card-body">
                                            <h5 className="card-title">{card.name}</h5>
                                            <p className="card-text">{card.description}</p>
                                            <Link to={`/ticket/${card.id}`} className='btn primary-color mb-1 me-2'>View Details</Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="row">
                            <div className="col-12 text-center mt-4">
                                <nav aria-label="Page navigation">
                                    <ul className="pagination">
                                        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                            <button className="page-link grey-color text-black border-0" onClick={() => handlePageClick(currentPage - 1)} aria-label="Previous">
                                                &laquo;
                                            </button>
                                        </li>
                                        {pageNumbers.map((pageNumber) => {
                                            if (pageNumber === 1 || pageNumber === totalPages || (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)) {
                                                return (
                                                    <li key={pageNumber} className={`page-item ${currentPage === pageNumber ? 'active' : ''}`}>
                                                        <button className={`page-link ${currentPage === pageNumber ? 'primary-color' : 'grey-color'} text-black border-0`} onClick={() => handlePageClick(pageNumber)}>
                                                            {pageNumber}
                                                        </button>
                                                    </li>
                                                );
                                            }
                                            return null;
                                        })}
                                        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                            <button className="page-link grey-color text-black border-0" onClick={() => handlePageClick(currentPage + 1)} aria-label="Next">
                                                &raquo;
                                            </button>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GuestHome;