import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import $ from 'jquery'
import Cookies from 'universal-cookie';

export default class CartDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            articuloid: this.props.articuloid,
            iddetalle: this.props.detalleid,
            isLogged: this.props.isLogged,
            articulo: {},
            sucursales: [],
            cantidadDisponible: 0,
            cantidad: 0,
            sucursal: '0',
            message: ''
        }
        this.cookies = new Cookies();
        this.handleSucursalChange = this.handleSucursalChange.bind(this);
        this.handleCantidadChange = this.handleCantidadChange.bind(this);
        this.createCompra = this.createCompra.bind(this);
    }
    componentDidMount() {
        $.ajax({
            url: `https://pchproject-api.herokuapp.com/api/articulo/get/${this.state.articuloid}`,
            method: 'GET',
            dataType: 'json',
            success: function (response) {
                this.setState({ articulo: response }, () => console.log(response));
            }.bind(this),
            error: function (response) {
                console.log(response);
            }
        });
        $.ajax({
            url: 'https://pchproject-api.herokuapp.com/api/sucursal',
            method: 'GET',
            dataType: 'json',
            success: function (response) {
                this.setState({ sucursales: [...response] });
            }.bind(this),
            error: function (response) {
                console.log(response);
            }
        })
    }
    handleCantidadChange(e) {
        this.setState({ cantidad: e.target.value });
    }
    handleSucursalChange(e) {
        //const prevSucursal = this.state.sucursal;
        this.setState({ sucursal: e.target.value }, () => {
            const dataObject = {
                sucursalid: this.state.sucursal,
                articuloid: this.state.articuloid
            };
            console.log(dataObject);
            $.ajax({
                url: 'https://pchproject-api.herokuapp.com/api/inventario/check',
                method: 'POST',
                dataType: 'json',
                contentType: 'application/json',
                data: JSON.stringify(dataObject),
                success: function (response) {
                    console.log(response);
                    this.setState({
                        message: response.message,
                        cantidadDisponible: response.cantidad,
                        cantidad: 0
                    });
                }.bind(this),
                error: function (response) {
                    console.log(response);
                }.bind(this)
            });
        });
    }
    createCompra() {
        if (this.cookies.get('usid') != undefined) {
            const userid = this.cookies.get('usid');
            $.ajax({
                url: 'https://pchproject-api.herokuapp.com/api/venta',
                method: 'POST',
                dataType: 'json',
                contentType: 'application/json',
                data: JSON.stringify(),
                success: function (response) {
                    
                }.bind(this),
                error: function (response) {
                    console.log(response);
                }
            })
        }
    }
    render() {
        return (
            <div className="row image-row-card">
                <div className="col-sm-12 col-md-2">
                    {
                        this.state.articulo != undefined ?
                            this.state.articulo.imagenes != undefined ?
                                <img src={this.state.articulo.imagenes[0].Path} alt="" className="img-fluid" />
                                :
                                <img src="https://phcmenudeo.s3.amazonaws.com/misc/no-image.jpg" alt="" className="img-fluid" />
                            : null
                    }
                </div>
                <div className="col-sm-12 col-md-4">
                    {
                        this.state.articulo != undefined ?
                            <React.Fragment>
                                <h5>
                                    <Link className="blue-text" to={`/product/${this.state.articuloid}`}>
                                        {this.state.articulo.Nombre}
                                    </Link>
                                </h5>
                                <p>{this.state.articulo.Descripcion}</p>
                            </React.Fragment>
                            : null
                    }
                </div>
                <div className="col-sm-12 col-md-2">
                    <div className="form-group">
                        <label htmlFor="inputState">Sucursal:</label>
                        <select
                            className="form-control"
                            name="sucursal"
                            value={this.state.sucursal}
                            onChange={this.handleSucursalChange}
                        >
                            <option value='0'>{'--Seleccione--'}</option>
                            {
                                this.state.sucursales &&
                                this.state.sucursales.map((sucursal, index) => {
                                    return <option value={sucursal.id} key={index}>{sucursal.Nombre}</option>;
                                })
                            }
                        </select>
                        <h6 className="mt-1 ml-1">{this.state.message}</h6>
                    </div>
                </div>
                <div className="col-sm-12 col-md-2">
                    <div className="form-group">
                        <label htmlFor="inputState">Cantidad:</label>
                        <input
                            className="form-control"
                            type="number"
                            max={this.state.cantidadDisponible}
                            min="0"
                            onChange={this.handleCantidadChange}
                            disabled={!(this.state.cantidadDisponible > 0)}
                            value={this.state.cantidad}
                        />
                        <h6 className="mt-1 ml-1">Disponibles: {this.state.cantidadDisponible}</h6>
                    </div>
                </div>
                <div className="col-sm-12 col-md-2">
                    {
                        this.state.isLogged ?
                            <React.Fragment>
                                <button
                                    type="button"
                                    className="btn blue-standard-button btn-block"
                                    disabled={!(this.state.cantidadDisponible > 0 && this.state.cantidad > 0)}
                                    onClick={this.createCompra}
                                >
                                    Comprar
                                </button>
                                <button
                                    type="button"
                                    className="btn blue-standard-button btn-block" onClick={this.props.deleteDetalle}>
                                    Quitar
                                </button>
                            </React.Fragment>
                            :
                            <span>Inicie sesión para comprar</span>
                    }
                </div>
            </div>
        )
    }
}
