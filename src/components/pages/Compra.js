import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import $ from 'jquery'
import { FaLongArrowAltLeft } from 'react-icons/fa'
import Cookies from 'universal-cookie';

export default class Compra extends Component {
    constructor(props) {
        super(props);

        this.state = {
            compraid: this.props.match.params.id != undefined ? this.props.match.params.id : '',
            MetodoEnvio: '',
            MetodoPago: '',
            Compra: {},
            MetodosPago: [],
            MetodosEnvio: [],
            reachedEnd: false,
            slider: {
                currentslide: 0,
                maxslides: 4
            }
        }
        this.slides = [];
        this.slides[0] = React.createRef();
        this.slides[1] = React.createRef();
        this.slides[2] = React.createRef();
        this.slides[3] = React.createRef();

        this.cookies = new Cookies();
        this.changeSlide = this.changeSlide.bind(this);
        this.terminarCompra = this.terminarCompra.bind(this);
        this.getMetodosEnvio = this.getMetodosEnvio.bind(this);
        this.getMetodosPgo = this.getMetodosPago.bind(this);
    }

    componentDidMount() {
        if (this.cookies.get('usid') != undefined) {
            const usuarioid = this.cookies.get('usid');
            $.ajax({
                url: 'https://pchproject-api.herokuapp.com/api/venta/check',
                method: 'POST',
                dataType: 'json',
                contentType: 'application/javascript',
                success: function (response) {
                    if (response.message) {
                        window.location.href = '/';
                    }
                    else {
                        this.setState({ Compra: response }, () => console.log(response));
                    }
                }.bind(this),
                error: function (response) {
                    console.log(response);
                }.bind(this)
            })
            this.getMetodosEnvio();
            this.getMetodosPago();
        }
        else {
            window.location.href = '/';
        }
    }
    getMetodosEnvio() {
        $.ajax({
            url: 'https://pchproject-api.herokuapp.com/api/metodoenvio',
            method: 'GET',
            dataType: 'json',
            success: function (response) {
                this.setState({ MetodosEnvio: [...response] }, () => console.log(this.state));
            }.bind(this),
            error: function (response) {
                console.log(response);
            }.bind(this)
        });
    }
    getMetodosPago() {
        $.ajax({
            url: 'https://pchproject-api.herokuapp.com/api/metodopago',
            method: 'GET',
            dataType: 'json',
            success: function (response) {
                this.setState({ MetodosPago: [...response] }, () => console.log(this.state));
            }.bind(this),
            error: function (response) {
                console.log(response);
            }.bind(this)
        });
    }

    terminarCompra() {

    }

    changeSlide(dir) {

        let sum = (dir == "front") ? 1 : -1;
        let current = this.state.slider.currentslide;
        let max = this.state.slider.maxslides - 1;
        let next = current + sum;

        next = (next < 1) ? 0 : next;
        next = (next > max) ? max : next;

        this.setState({ slider: { currentslide: next, maxslides: 4 } }, () => {
            this.slides.forEach(slide => {
                slide.current.classList.remove("fade-in");
                slide.current.classList.add("d-none");
            });
            this.slides[next].current.classList.remove("d-none");
            this.slides[next].current.classList.add("fade-in");
            if (this.state.slider.currentslide == this.state.slider.maxslides - 1) {
                this.setState({ reachedEnd: true });
            }
            else {
                this.setState({ reachedEnd: false });
            }
        });
    }

    render() {
        return (
            <div className="container-fluid">
                <h4>Compra</h4>
                <hr />
                <div className="row">
                    <div className="col-md-7">
                        <div className="shadow-box slide-container">
                            <div className="row">
                                <div className={`col-lg-12  ${this.state.slider.currentslide < 1 ? 'hidden' : 'fade-in'}`}>
                                    <button
                                        className={`back-arrow-btn ${this.state.slider.currentslide == 0 ? 'd-none' : 'fade-in'}`}
                                        onClick={() => this.changeSlide("back")} >
                                        <FaLongArrowAltLeft />
                                    </button>
                                </div>
                            </div>
                            <div className="slide fade-in" ref={this.slides[0]}>
                                <div className="container">
                                    <h4 className="p-4 m-2">Artículos a comprar</h4>
                                    {
                                        this.state.Compra &&
                                            this.state.Compra.detalles != undefined ?
                                            this.state.Compra.detalles.map((detalle, index) => {
                                                return (
                                                    <div className="row image-row-card" key={index}>
                                                        <div className="col-sm-12 col-md-4">
                                                            <img src="https://lh3.googleusercontent.com/proxy/Nghlp2qe11c8B4zMwPM_8Mk2442tjb2WxZtz1dIT2HqIzV52Q3ddaUGh8E0kSGPlsfJNrRtcHXZhF4JOsCjCCLhENOSb3JUZGCz49_WRtX6RTDRPSPDF6s-rq-WHvW3torTLchZr9AOqIwMMxYn1" alt="" className="img-fluid" />
                                                        </div>
                                                        <div className="col-sm-12 col-md-4">
                                                            <h5><Link to="/product/asdasd">Nombre del producto</Link></h5>
                                                            <p>Esta es la descripcion del producto, la verdad es que esto no es nada más que vista</p>
                                                        </div>
                                                        <div className="col-sm-12 col-md-2">
                                                            <div class="form-group">
                                                                <label for="inputState">Almacen:</label>
                                                                <select id="inputState" class="form-control">
                                                                    <option selected>{'--Seleccione--'}</option>
                                                                    <option>...</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div className="col-sm-12 col-md-2">
                                                            <div class="form-group">
                                                                <label for="inputState">Cantidad:</label>
                                                                <input
                                                                    className="form-control"
                                                                    type="number" />
                                                                <h6>Disponibles: 5</h6>
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })
                                            : null
                                    }
                                    <button
                                        className="blue-button"
                                        onClick={() => this.changeSlide("front")}
                                    >
                                        Next
                        </button>
                                </div>
                            </div>
                            <div className="slide d-none" ref={this.slides[1]}>
                                <div className="container">
                                    <h4 className="p-4 m-2">Método de envío</h4>
                                    <hr />
                                    {
                                        this.state.MetodosEnvio &&
                                            this.state.MetodosEnvio.length > 0 ?
                                            this.state.MetodosEnvio.map((metodoenvio, index) => {
                                                return (
                                                    <div className="form-check m-4 p-4" key={index}>
                                                        <input className="form-check-input" type="checkbox" value="" id="defaultCheck1" />
                                                        <label className="form-check-label" for="defaultCheck1">
                                                            {metodoenvio.Nombre} - {metodoenvio.Descripcion} - ${metodoenvio.Cuota}
                                                        </label>
                                                    </div>
                                                );
                                            }) : null
                                    }
                                    <button
                                        className="blue-button"
                                        onClick={() => this.changeSlide("front")}
                                    >
                                        Next
                                    </button>
                                </div>
                            </div>
                            <div className="slide d-none" ref={this.slides[2]}>
                                <div className="container">
                                    <h4 className="p-4 m-2">Método de pago</h4>
                                    {
                                        this.state.MetodosPago &&
                                            this.state.MetodosPago.length > 0 ?
                                            this.state.MetodosPago.map((metodopago, index) => {
                                                return (
                                                    <div className="form-check m-4 p-4" key={index}>
                                                        <input className="form-check-input" type="checkbox" value="" id="defaultCheck1" />
                                                        <label className="form-check-label" for="defaultCheck1">
                                                            {metodopago.Nombre} - {metodopago.Descripcion} - ${metodopago.Cuota}
                                                        </label>
                                                    </div>
                                                );
                                            }) : null
                                    }
                                    <button
                                        className="blue-button"
                                        onClick={() => this.changeSlide("front")}
                                    >
                                        Next
                                    </button>
                                </div>
                            </div>
                            <div className="slide d-none" ref={this.slides[3]}>
                                <div className="container">
                                    <h4 className="p-4 m-2">Resumen del pedido</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-5">
                        <div className="container-fluid">
                            <div className="shadow-box">
                                <div className="table-container">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th scope="col">
                                                    <h4>Folio</h4>
                                                </th>
                                                <th scope="col" colSpan="2">
                                                    <h4>878454</h4>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>Articulos:</td>
                                                <td colSpan="2">1</td>
                                            </tr>
                                            <tr>
                                                <td><strong>Articulo</strong></td>
                                                <td><strong>Cantidad</strong></td>
                                                <td><strong>Monto</strong></td>
                                            </tr>
                                            <tr>
                                                <td colSpan="2"><strong>Metodo de pago</strong></td>
                                                <td><strong>Cuota</strong></td>
                                            </tr>
                                            <tr className="blue-text">
                                                <td colSpan="2">PayPal</td>
                                                <td>$0</td>
                                            </tr>
                                            <tr>
                                                <td colSpan="2"><strong>Metodo de envío</strong></td>
                                                <td><strong>Cuota</strong></td>
                                            </tr>
                                            <tr className="blue-text">
                                                <td colSpan="2">Terrestre local</td>
                                                <td>$59</td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <h4>Total:</h4>
                                                </td>
                                                <td colSpan="2">
                                                    <h4 className="blue-text">$14454.00</h4>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan="3">
                                                    {
                                                        this.state.reachedEnd == true ?
                                                            <button className="blue-button btn-lg btn-block">
                                                                Terminar!
                                                            </button>
                                                            : null
                                                    }
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
