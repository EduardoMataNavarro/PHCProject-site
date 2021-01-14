import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import Cookies from 'universal-cookie';
import { FaThumbsDown } from 'react-icons/fa';
import CartDetail from '../singles/CartDetail';

export default class Cart extends Component {
    constructor(props) {
        super(props);

        this.state = {
            detalles: [],
            almacenes: [],
            userId: '',
            isLogged: false,
            hasMessage: false,
            message: '',
            hasError: false,
            errorMessage: ''
        };

        this.cookies = new Cookies();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getDetalles = this.getDetalles.bind(this);
        this.comprarCarrito = this.comprarCarrito.bind(this);
    }

    componentDidMount() {
        if (this.cookies.get('usid') !== undefined) {
            const userid = this.cookies.get('usid');
            this.setState({ isLogged: true, userId: userid });

            $.ajax({
                url: `https://pchproject-api.herokuapp.com/api/carrito/user/${userid}`,
                method: 'GET',
                dataType: 'json',
                success: function (response) {
                    console.log(response);
                    if (response.message) {
                        this.setState({ hasMessage: true, message: response.message });
                    }
                    else {
                        this.setState({ detalles: [...response] });
                    }
                }.bind(this),
                error: function (response) {
                    console.log(response);
                }.bind(this)
            });
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        window.location.href = '/compra';
    }
    getDetalles() {
        $.ajax({
            url: `https://pchproject-api.herokuapp.com/api/carrito/`,
            method: 'GET',
            dataType: 'json',
            success: function (response) {
                if (response.message) {
                    this.setState({ hasError: true, errorMessage: response.message });
                }
                else {
                    window.location.href = '/venta/' + response.id;
                }
            }.bind(this),
            error: function (response) {
                console.log(response);
            }.bind(this)
        });
    }

    comprarCarrito() {
        $.ajax({
            url: 'http://localhost:8000/api/venta/carrito',
            method: 'POST',
            dataType: 'json',
            success: function (response) {
                if (response.message) {
                    this.setState({ hasError: true, errorMessage: response.message });
                }
                else {
                    window.location.href = '/venta/' + response.id;
                }
            }.bind(this),
            error: function (response) {
                console.log(response);
            }.bind(this)
        });
    }

    deleteDetalle(id) {
        $.ajax({
            url: `http://localhost:8000/api/carrito/detalle/${id}`,
            method: 'DELETE',
            dataType: 'json',
            success: function (response) {
                console.log(response);
                this.getDetalles();
            },
            error: function (response) {
                console.log(response);
            }
        });
    }
    render() {
        return (
            <div>
                <div className="container shadow-box">
                    <div className="row">
                        <div className="mr-4 p-4"></div>
                        <h4 className="w-100 text-center">Carrito de compras</h4>
                        <hr />
                        {
                            this.state.hasMessage ?
                                <div className="container mt-4">
                                    <h4 className="text-center blue-text mt-4">{this.state.message}</h4>
                                </div>
                                : null
                        }
                        {
                            this.state.isLogged ?
                                <div className="container">
                                    {
                                        this.state.detalles.length > 0 && (
                                            this.state.detalles.map((detalle, index) => {
                                                return (
                                                    <div key={index}>
                                                        <CartDetail
                                                            isLogged={this.state.isLogged}
                                                            detalleid={detalle.id}
                                                            articuloid={detalle.articulo_id}
                                                        />
                                                        <hr />
                                                    </div>
                                                );
                                            })
                                        )
                                    }
                                </div>
                                :
                                <div className="container">
                                    <h3 className="blue-text text-center m-4">Inicie sesión para utilizar su carrito</h3>
                                </div>
                        }
                    </div>
                </div>
            </div>
        )
    }
}
