import React, { Component } from 'react';

export default class AboutUs extends Component {
    render() {
        return (
            <div className="content-wrapper">
                {/* Content Header */}
                <div className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1 className="m-0 text-dark">About Us</h1>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item"><a href="#">About Us</a></li>
                                    <li className="breadcrumb-item active">City Clique</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main content */}
                <section className="content">
                    <div className="container-fluid">
                        {/* About Us Section */}
                        <div className="row">
                            <div className="col-lg-8">
                                <div className="card">
                                    <div className="card-header">
                                        </div>
                                    <div className="card-body">
                                        <div className="about-us-image mb-4">
                                            <img
                                                src="/dist/img/cap1.png"
                                                alt="City Views"
                                                className="img-fluid rounded"
                                            />
                                        </div>
                                        <p className="lead">
                                            City Clique is your premier online destination for exploring the best tours, guides, and events in cities around the world. Our platform connects you with top-rated local guides and provides information on exciting events happening in your favorite destinations.
                                        </p>
                                        <p>
                                            Founded in 2024 by Rami Jamal, City Clique aims to make your travel experience seamless and enjoyable by offering comprehensive information and booking options for tours and events. Whether you’re looking for a cultural tour, adventure activities, or local events, City Clique has got you covered.
                                        </p>
                                        <p>
                                            Our mission is to bring you closer to the heart of the cities you visit, providing you with authentic experiences and memorable adventures. We are committed to offering exceptional service and ensuring that every journey you embark on is unforgettable.
                                        </p>
                                        <p>
                                            Thank you for choosing City Clique. We look forward to helping you explore and experience the best that each city has to offer!
                                        </p>

                                     </div>
                                    {/* /.card-body */}
                                </div>
                                {/* /.card */}
                                
                            </div>
                        
                        {/* /.row */}
                        <div className="col-lg-8">
                        <div className="card  ">
                                <div className="card-header"><h5>Contact Us:</h5></div>
                                <div classNamre="card-body">
                                    <p className="ml-2">Email: <a href="mailto:Cityclique@guide.com">Cityclique@guide.com</a></p>
                                    <p className="ml-2">Phone: <a href="tel:+96171717171">+961 71-717171</a></p>
                                    </div>
                        </div>
                         </div>
                     </div>
                    </div>
                </section>
                {/* /.content */}
            </div>
        );
    }
}
