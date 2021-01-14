import React, { Component } from 'react'
import $ from 'jquery';
import { Link } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

import Carousel from '../singles/Carousel';
import ProductCard from '../singles/ProductCard'

export default class Homepage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            novedades: [],
            hottest: []
        };
        this.sliderImages = [
            {Path: 'https://phcmenudeo.s3.amazonaws.com/front-slider-images/bc_gamer_48.jpg'},
            {Path: 'https://phcmenudeo.s3.amazonaws.com/front-slider-images/bc_gamer_48.jpg'},
            {Path: 'https://phcmenudeo.s3.amazonaws.com/front-slider-images/bc_getttech_102.jpg'},
            {Path: 'https://phcmenudeo.s3.amazonaws.com/front-slider-images/bc_logi_14.jpg'},
            {Path: 'https://phcmenudeo.s3.amazonaws.com/front-slider-images/bc_stylos_108.jpg'}
        ];
    }

    componentDidMount() {
        $.ajax({
            url: 'https://pchproject-api.herokuapp.com/api/home/latest/4',
            method: 'GET',
            dataType: 'json',
            success: function (response) {
                this.setState({ novedades: [...response] }, () => { console.log(response) });
            }.bind(this),
            error: function (response) {
                console.log(response);
            }.bind(this)
        })
    }
    addToCart(value) {
        $.ajax({

        });
    }
    render() {
        return (
            <div>
                <div className="row" id="slider-container">
                    <div className="col-lg-12">
                        <Carousel Images={this.sliderImages}/>
                    </div>
                </div>
                <div className="row">
                    <div className="container">
                        <h3>Conoce las novedades!</h3>
                        <hr />
                        <div className="row justify-content-center">
                            {
                                this.state.novedades &&
                                this.state.novedades.map((articulo, index) => {
                                    return (
                                        <div className="col-md-6 col-lg-3" key={index}>
                                            <ProductCard 
                                                id={articulo.id}
                                                nombre={articulo.Nombre}
                                                precio={articulo.PrecioMayoreo}
                                                img={articulo.imagenes[0].Path}
                                            />
                                        </div>
                                    );
                                })
                            }
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="container">
                        <hr />
                        <h3 className="text-center blue-text">Nuestro compromiso es</h3>
                        <h1 className="text-center mb-4 blue-text">CRECER JUNTOS!</h1>
                        <div className="row mb-4">
                            <div className="col-md-6">
                                <div className="container">
                                    <div className="shadow-box">
                                        <p className="blue-text">Catalogo virtual</p>
                                        <p>
                                            Los mejores productos de nuestras destacadas marcas en tecnología.
                                        </p>
                                        <a
                                            target="_blank"
                                            className="mt-4 blue-text"
                                            href="http://catalogo.pchmayoreo.com/">
                                            Vea más aquí {'>'}
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="container">
                                    <div className="shadow-box">
                                        <p className="blue-text">Registro de distribuidor</p>
                                        <p>
                                            Sea parte a nuestra red de distribuidores y mayoristas para tener acceso a precios especiales, ofertas y otros servicios.
                                        </p>
                                        <Link
                                            className="mt-4 blue-text"
                                            to="/signup">
                                            Comience su registro ahora {'>'}
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="container">
                        <h3>Únete a nosotros y disfruta!</h3>
                        <hr />
                        <div className="row">
                            {
                            this.state.novedades &&
                                this.state.novedades.map((articulo, index) => {
                                    return (
                                        <div className="col-md-6 col-lg-3" key={index}>
                                            <ProductCard 
                                                id={articulo.id}
                                                nombre={articulo.Nombre}
                                                precio={articulo.PrecioMayoreo}
                                                img={articulo.imagenes[0].Path}
                                            />
                                        </div>
                                    );
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
