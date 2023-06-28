import React from "react";

function Footer() {
    return (
        <footer className="footer miku text-black mt-4 pb-3 pt-4">
            <div className="container">
                <div className="row">
                    <div className="col-lg-4">
                        <h4>Contact</h4>
                        <ul className="list-unstyled">
                            <li><i className="bi bi-geo-alt"></i>512 Lakeshore St. Rockville Centre, NY 11570</li>
                            <li><i className="bi bi-phone"></i> +34 676011974</li>
                            <li><i className="bi bi-envelope"></i> hello@iamabussiness.com</li>
                        </ul>
                    </div>
                    <div className="col-lg-4">
                        <h4>Links</h4>
                        <ul className="list-unstyled">
                            <li>Home</li>
                            <li>Events</li>
                            <li>Contact</li>
                        </ul>
                    </div>
                    <div className="col-lg-4">
                        <h4>Follow Us</h4>
                        <ul className="list-unstyled">
                            <li>Facebook</li>
                            <li>Twitter</li>
                            <li>Instagram</li>
                        </ul>
                    </div>
                </div>
                <div className="row mt-1">
                    <div className="col-12">
                        <p className="text-center">&copy; 2023 Project Sekai Circus. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
