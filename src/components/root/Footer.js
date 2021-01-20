import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import $ from 'jquery'
import { FaFacebookF, FaFacebookSquare, FaTwitter, FaLinkedin } from 'react-icons/fa';

export default class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sucursales: []
        }
    }
    componentDidMount() {
        $.ajax({
            url: 'https://pchproject-api.herokuapp.com/api/sucursal',
            method: 'GET',
            dataType: 'json',
            crossDomain: true,
            success: function (response) {
                this.setState({ sucursales: [...response] });
            }.bind(this),
            error: function (response) {
                console.log(response);
            }.bind(this)
        });
    }

    render() {
        return (
            <footer className="page-footer font-small unique-color-dark">
                <hr />
                <h4 className="text-center">Conozca nuestras sucursales</h4>
                <div className="container text-center text-md-left mt-5 d-flex justify-content-center">
                    {
                        this.state.sucursales &&
                        this.state.sucursales.map((sucursal, index) => {
                            return (
                                <div className="col-md-4 col-lg-3 mb-4" key={index}>
                                    <div className="container">
                                        <h5>{sucursal.Nombre}</h5>
                                        <h5>{sucursal.Clave}</h5>
                                        <h6 className="blue-text">{sucursal.Telefono}</h6>
                                        <p>Direccion: {sucursal.Direccion}</p>
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>
                <p className="text-center mt-4">
                    Copyright PCH Mayorista en Tecnología. Todos los derechos reservados
                </p>
            </footer>
        )
    }
}
