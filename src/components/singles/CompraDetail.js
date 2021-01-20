import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import $ from 'jquery'
import { FaThemeisle } from 'react-icons/fa';

export default class CompraDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            detalleid: this.props.Detalleid,
            articuloid: this.props.Articuloid,
            Articulo: {},
            Cantidad: this.props.Cantidad,
            Sucursal: this.props.Sucursalid,
            Sucursales: [],
            cantidadDisponible: '0',
            inventarioStatus: ' ',
            message: ''
        };
        this.onEditDetail = this.onEditDetail.bind(this);
        this.editDetalle = this.editDetalle.bind(this);
        this.getArticulo = this.getArticulo.bind(this);
        this.getSucursales = this.getSucursales.bind(this);
        this.checkInventario = this.checkInventario.bind(this);
        this.handleCantidadChange = this.handleCantidadChange.bind(this);
        this.handleSucursalChange = this.handleSucursalChange.bind(this);
    }
    componentDidMount() {
        this.getSucursales();
    }
    getArticulo(){
        $.ajax({
            method: 'GET',
            url: `https://pchproject-api.herokuapp.com/api/articulo/get/${this.state.articuloid}`,
            dataType: 'json',
            crossDomain: true,
            success: function (response) {
                console.log(response);
                this.setState({ Articulo: response }, () => {
                    this.checkInventario();
                });
            }.bind(this),
            fail: function (error) {
                console.log(error);
            }.bind(this)
        });
    }
    getSucursales(){
        $.ajax({
            method: 'GET',
            url: `https://pchproject-api.herokuapp.com/api/sucursal`,
            dataType: 'json',
            success: function (response) {
                this.setState({ Sucursales: [...response] }, ()=> {
                    this.getArticulo();
                });
            }.bind(this),
            fail: function (error) {
                console.log(error);
            }.bind(this)
        });
    }
    onEditDetail() {
        this.props.onEdit();
    }
    editDetalle() {
        const dataObject = {
            detalleid: this.state.detalleid,
            cantidad: this.state.Cantidad,
            sucursalid: this.state.Sucursal
        };

        $.ajax({
            url: 'http://localhost:8000/api/ventadetalles',
            method: 'PUT',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify(dataObject),
            success: function (response) {
                console.log(response);
                this.onEditDetail();
            }.bind(this),
            error: function (response) {
                console.log(response);
            }.bind(this)
        });
    }
    handleCantidadChange(e) {
        this.setState({ Cantidad: e.target.value }, () => {
            this.editDetalle();
        });
    }
    handleSucursalChange(e) {
        this.setState({ Sucursal: e.target.value }, () => {
            this.checkInventario();
        })
    }
    checkInventario() {
        const dataObject = {
            sucursalid: this.state.Sucursal,
            articuloid: this.state.articuloid
        };
        $.ajax({
            url: 'http://localhost:8000/api/inventario/check',
            method: 'POST',
            dataType: 'json',
            contentType: 'application/json',
            crossDomain: true,
            data: JSON.stringify(dataObject),
            success: function (response) {
                this.setState({
                    cantidadDisponible: response.cantidad,
                    inventarioStatus: response.message
                });
            }.bind(this),
            error: function (response) {
                console.log(response);
            }.bind(this)
        });
    }
    render() {
        return (
            <div className="row image-row-card">
                <div className="col-sm-12 col-md-4">
                    {
                        this.state.Articulo != undefined &&
                            this.state.Articulo.imagenes != undefined &&
                            this.state.Articulo.imagenes.length > 0 ?
                            <img src={this.state.Articulo.imagenes[0].Path} alt="" className="img-fluid" /> :
                            <img src="https://phcmenudeo.s3.amazonaws.com/misc/no-image.jpg" alt="" className="img-fluid" />
                    }
                </div>
                <div className="col-sm-12 col-md-4">
                    {
                        this.state.Articulo != undefined ?
                            <React.Fragment>
                                <h5>
                                    <Link to={`/product/${this.state.Articulo.id}`} className="blue-text">
                                        {this.state.Articulo.Nombre}
                                    </Link>
                                </h5>
                                <p>{this.state.Articulo.Descripcion}</p>
                                <h6>Precio: $ {this.state.Articulo.Precio}</h6>
                                <h6>Precio mayoreo: $ {this.state.Articulo.PrecioMayoreo}</h6>
                                <h6>Cantidad de mayoreo: {this.state.Articulo.CantidadMayoreo}</h6>
                            </React.Fragment> : null
                    }
                </div>
                <div className="col-sm-12 col-md-2">
                    <div className="form-group">
                        <label htmlFor="inputState">Almacen:</label>
                        <select
                            className="form-control"
                            name="Sucursal"
                            value={this.state.Sucursal}
                            onChange={this.handleSucursalChange}
                        >
                            <option value="0">{'--Seleccione--'}</option>
                            {
                                this.state.Sucursales.length > 0 ?
                                    this.state.Sucursales.map((sucursal, index) => {
                                        return <option value={sucursal.id} key={index}>{sucursal.Nombre}</option>;
                                    }) : null
                            }
                        </select>
                        <h6>{this.state.inventarioStatus}</h6>
                    </div>
                </div>
                <div className="col-sm-12 col-md-2">
                    <div className="form-group">
                        <label htmlFor="inputState">Cantidad:</label>
                        <input
                            className="form-control"
                            type="number"
                            name="cantidad"
                            onChange={this.handleCantidadChange}
                            max={this.state.cantidadDisponible}
                            min="1"
                            value={this.state.Cantidad}
                        />
                        <h6>Disponibles: {this.state.cantidadDisponible}</h6>
                    </div>
                </div>
            </div>
        )
    }
}
