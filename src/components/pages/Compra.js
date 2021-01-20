import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import $ from 'jquery'
import { FaLongArrowAltLeft } from 'react-icons/fa'
import Cookies from 'universal-cookie';
import CompraDetail from '../singles/CompraDetail';

export default class Compra extends Component {
    constructor(props) {
        super(props);

        this.state = {
            compraid: this.props.match.params.id != undefined ? this.props.match.params.id : '',
            MetodoEnvioid: '0',
            MetodoPagoid: '0',
            MetodoPago: {},
            MetodoEnvio: {},
            Usuario: {},
            Folio: '',
            Subtotal: '',
            Total: '',
            Detalles: [],
            DireccionEnvio: '',
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
        this.editVenta = this.editVenta.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.getMetodosEnvio = this.getMetodosEnvio.bind(this);
        this.getMetodosPgo = this.getMetodosPago.bind(this);
        this.getDetalles = this.getDetalles.bind(this);
        this.confirmCompra = this.confirmCompra.bind(this);
    }

    componentDidMount() {
        if (this.cookies.get('usid') != undefined) {
            const usid = this.cookies.get('usid');
            const dataObject = {
                compraid: this.state.compraid,
                usuarioid: usid
            };
            $.ajax({
                url: 'http://localhost:8000/api/venta/check',
                method: 'POST',
                dataType: 'json',
                contentType: 'application/json',
                data: JSON.stringify(dataObject),
                success: function (response) {
                    if (response.message) {
                        console.log(response.message);
                    }
                    else {
                        this.setState({
                            Folio: response.Folio,
                            MetodoPagoid: response.metodopago_id,
                            MetodoEnvioid: response.metodoenvio_id,
                            Subtotal: response.Subtotal,
                            Total: response.Total,
                            Estatus: response.Estatus,
                            MetodoPago: response.metodo_pago,
                            MetodoEnvio: response.metodo_envio,
                            Usuario: response.usuario
                        }, () => { 
                            if (this.state.Usuario) {
                                this.setState({DireccionEnvio: this.state.Usuario.Direccion});
                            } else {
                                this.setState({DireccionEnvio: " "});
                            }
                            this.getDetalles() 
                        });
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
    getDetalles() {
        $.ajax({
            url: `http://localhost:8000/api/ventadetalles/${this.state.compraid}`,
            method: 'GET',
            dataType: 'json',
            success: function (response) {
                console.log(response);
                this.setState({ Detalles: [...response] });
            }.bind(this),
            error: function (response) {
                console.log(response);
            }.bind(this)
        });
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

    confirmCompra() {
        const dataObject = {
            ventaid: this.state.compraid
        };
        console.log(dataObject);
        $.ajax({
            url: 'http://localhost:8000/api/venta/confirm',
            method: 'POST',
            dataType: 'json',
            contentType: 'application/json',
            crossDomain: true,
            data: JSON.stringify(dataObject),
            success: function (response) {
                console.log(response);
                window.location.href = '/graciasporcomprar';
            }.bind(this),
            error: function (response) {
                console.log(response);
            }.bind(this)
        });
    }
    editVenta(e) {
        e.preventDefault();
        const dataObject = {
            ventaid: this.state.compraid,
            metodoenvioid: this.state.MetodoEnvioid != undefined ? this.state.MetodoEnvioid : '',
            metodopagoid: this.state.MetodoPagoid != undefined ? this.state.MetodoPagoid : '',
            direccionEnvio: this.state.DireccionEnvio != undefined ? this.state.DireccionEnvio : '',
            estatus: this.state.Estatus != undefined ? this.state.Estatus : ''
        };
        console.log(dataObject);
        $.ajax({
            url: 'http://localhost:8000/api/venta',
            method: 'PUT',
            dataType: 'json',
            contentType: 'application/json',
            crossDomain: true,
            data: JSON.stringify(dataObject),
            success: function (response) {
                console.log(response);
                this.changeSlide("front");
                this.setState({
                    Subtotal: response.Subtotal,
                    Total: response.Total,
                    MetodoPago: response.metodo_pago,
                    MetodoEnvio: response.metodo_envio
                }, () => console.log(this.state));
            }.bind(this),
            error: function (response) {
                console.log(response);
            }.bind(this)
        });
    }
    handleInput(e) {
        this.setState({ [e.target.name]: e.target.value });
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
                <div className="row">
                    <div className="col-md-6 col-lg-7">
                        <div className="shadow-box slide-container h-100">
                            <div className="row">
                                <div className={`col-lg-12  ${this.state.slider.currentslide < 1 ? 'hidden' : 'fade-in'}`}>
                                    <button
                                        type="button"
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
                                        this.state.Detalles &&
                                            this.state.Detalles.length > 0 ?
                                            this.state.Detalles.map((detalle, index) => {
                                                return (
                                                    <div key={index}>
                                                        <CompraDetail
                                                            key={index}
                                                            Detalleid={detalle.id}
                                                            Articuloid={detalle.articulo_id}
                                                            Sucursalid={detalle.sucursal_id}
                                                            Cantidad={detalle.Cantidad}
                                                            onEdit={this.getDetalles}
                                                        />
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
                                    <form onSubmit={this.editVenta}>
                                        <h4 className="p-4 m-2">Método de envío</h4>
                                        <hr />
                                        {
                                            this.state.MetodosEnvio &&
                                                this.state.MetodosEnvio.length > 0 ?
                                                this.state.MetodosEnvio.map((metodoenvio, index) => {
                                                    return (
                                                        <div className="form-check m-4 p-4" key={index}>
                                                            <input
                                                                className="form-check-input"
                                                                type="radio"
                                                                name="MetodoEnvioid"
                                                                checked={this.state.MetodoEnvioid == metodoenvio.id}
                                                                value={metodoenvio.id}
                                                                onChange={this.handleInput}
                                                                id={`radio-metenv-${index}`}
                                                            />
                                                            <label className="form-check-label" htmlFor={`radio-metenv-${index}`}>
                                                                {metodoenvio.Nombre} - {metodoenvio.Descripcion} - ${metodoenvio.Cuota}
                                                            </label>
                                                        </div>
                                                    );
                                                }) : null
                                        }
                                        {
                                            this.state.Usuario != undefined ?
                                                <div className="form-group">
                                                    <label htmlFor="direccionEnvioInput">Dirección de envio:</label>
                                                    <input
                                                        type="text"
                                                        id="direccioEnvioInput"
                                                        className="form-control"
                                                        name="DireccionEnvio"
                                                        value={this.state.DireccionEnvio}
                                                        onChange={this.handleInput}
                                                        placeholder="Dirección de entrega" />
                                                </div> : null
                                        }
                                        <button
                                            className="blue-button"
                                            type="submit"
                                        >
                                            Next
                                    </button>
                                    </form>
                                </div>
                            </div>
                            <div className="slide d-none" ref={this.slides[2]}>
                                <div className="container">
                                    <h4 className="p-4 m-2">Método de pago</h4>
                                    <form onSubmit={this.editVenta}>
                                        {
                                            this.state.MetodosPago &&
                                                this.state.MetodosPago.length > 0 ?
                                                this.state.MetodosPago.map((metodopago, index) => {
                                                    return (
                                                        <div className="form-check m-4 p-4" key={index}>
                                                            <input
                                                                className="form-check-input"
                                                                type="radio"
                                                                value={metodopago.id}
                                                                checked={this.state.MetodoPagoid == metodopago.id}
                                                                name="MetodoPagoid"
                                                                onChange={this.handleInput}
                                                                id={`radio-metpag-${index}`}
                                                            />
                                                            <label className="form-check-label" htmlFor={`radio-metpag-${index}`}>
                                                                {metodopago.Nombre} - {metodopago.Descripcion} - ${metodopago.Cuota}
                                                            </label>
                                                        </div>
                                                    );
                                                }) : null
                                        }
                                        <button
                                            className="blue-button"
                                            type="submit">
                                            Next
                                        </button>
                                    </form>
                                </div>
                            </div>
                            <div className="slide d-none" ref={this.slides[3]}>
                                <div className="container">
                                    <h4 className="p-4 m-2">Gracias!</h4>
                                    <h2 className="p-4 m-2 blue-text text-center">Confirme su pedido para continuar</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-5">
                        <div className="container-fluid">
                            <div className="shadow-box h-100">
                                <div className="table-container">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th scope="col">
                                                    <h4>Folio</h4>
                                                </th>
                                                <th scope="col" colSpan="2">
                                                    <h4 className="blue-text">{this.state.Folio}</h4>
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
                                            {
                                                this.state.Detalles != undefined &&
                                                    this.state.Detalles.length > 0 ?
                                                    this.state.Detalles.map((detalle, index) => {
                                                        return (
                                                            <tr key={index}>
                                                                <td>{detalle.articulo.SKU}</td>
                                                                <td>{detalle.Cantidad}</td>
                                                                <td>{detalle.Monto}</td>

                                                            </tr>
                                                        );
                                                    }) : null
                                            }
                                            <tr>
                                                <td colSpan="2"><strong>Metodo de envío</strong></td>
                                                <td><strong>Cuota</strong></td>
                                            </tr>
                                            <tr className="blue-text">
                                                {
                                                    this.state.MetodoEnvio != undefined ?
                                                        <React.Fragment>
                                                            <td colSpan="2">{this.state.MetodoEnvio.Nombre}</td>
                                                            <td>$ {this.state.MetodoEnvio.Cuota}</td>
                                                        </React.Fragment> :
                                                        <React.Fragment>
                                                            <td colSpan="2">No disponible</td>
                                                            <td>$0.00</td>
                                                        </React.Fragment>
                                                }
                                            </tr>
                                            <tr className="blue-text">
                                                {
                                                    this.state.DireccionEnvio != undefined ?
                                                        <React.Fragment>
                                                            <td colSpan="3">{this.state.DireccionEnvio}</td>
                                                        </React.Fragment> :
                                                        <React.Fragment>
                                                            <td colSpan="3">Sin direccion de envio</td>
                                                        </React.Fragment>
                                                }
                                            </tr>
                                            <tr>
                                                <td colSpan="2"><strong>Metodo de pago</strong></td>
                                                <td><strong>Cuota</strong></td>
                                            </tr>
                                            <tr className="blue-text">
                                                {
                                                    this.state.MetodoPago != undefined ?
                                                        <React.Fragment>
                                                            <td colSpan="2">{this.state.MetodoPago.Nombre}</td>
                                                            <td>$ {this.state.MetodoPago.Cuota}</td>
                                                        </React.Fragment> :
                                                        <React.Fragment>
                                                            <td colSpan="2">No disponible</td>
                                                            <td>$0.00</td>
                                                        </React.Fragment>
                                                }
                                            </tr>
                                            <tr>
                                                <td>
                                                    <h5>Subtotal:</h5>
                                                </td>
                                                <td colSpan="2">
                                                    <h5 className="blue-text">$ {this.state.Subtotal}</h5>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <h4>Total:</h4>
                                                </td>
                                                <td colSpan="2">
                                                    <h4 className="blue-text">$ {this.state.Total}</h4>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan="3">
                                                    {
                                                        this.state.reachedEnd == true ?
                                                            <button
                                                                className="blue-button btn-lg btn-block"
                                                                onClick={this.confirmCompra}>
                                                                Confirmar!
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
