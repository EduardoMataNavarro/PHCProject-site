import React, { Component } from 'react'
import $ from 'jquery'
import { Link } from 'react-router-dom'
import queryString from 'querystring'
import { FaTheRedYeti } from 'react-icons/fa';

export default class SearchResult extends Component {
    constructor(props) {
        super(props);

        this.state = {
            term: this.props.match.params.term,
            products: []
        };
        this.updateFilters = this.updateFilters.bind(this);
    }
    componentDidMount() {
        $.ajax({
            url: `http://localhost:8000/api/articulo/find/${this.state.term}`,
            method: 'GET',
            dataType: 'json',
            success: function (response) {
                this.setState({ products: [...response] }, () => { console.log(response) });
            }.bind(this),
            error: function (response) {
                console.log(response);
            }.bind(this)
        })
    }

    updateFilters(e) {
        e.preventDefault();
    }

    render() {
        return (
            <div className="container min-vh-100">
                <h4>Resultados de búsqueda: <span className="blue-text">{this.state.term}</span></h4>
                <hr />
                {
                    
                }
                <div className="row h-100">
                    <div className="col-md-3">
                        <div className="w-100 shadow-box h-100">
                            <h6 className="text-center">Filtros</h6>
                            <h6>Precio</h6>
                            <hr />
                            <form onSubmit={this.updateFilters}>
                                <div class="container text-center">
                                    <small className="form-text">Min.</small>
                                    <input
                                        className="form-control"
                                        type="number"
                                        value="option1"
                                    />
                                    <small className="form-text">Max.</small>
                                    <input
                                        className="form-control"
                                        type="number"
                                        value="option1"
                                    />
                                </div>
                            </form>
                            <hr />
                            <h6>Marca</h6>
                            <hr />
                            <form onSubmit={this.updateFilters}>
                                <div className="form-group form-check">
                                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                    <label className="form-check-label" htmlFor="exampleCheck1">Asus</label>
                                </div>
                            </form>
                            <h6>Categoria</h6>
                            <hr />
                            <form onSubmit={this.updateFilters}>
                                <div className="form-group form-check">
                                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                    <label className="form-check-label" htmlFor="exampleCheck1">Audio</label>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="col-md-9 h-100">
                        <div className="w-100 h-100">
                            <div className="container">
                                {
                                    this.state.products &&
                                    this.state.products.length > 0 ?
                                    this.state.products.map((product, index) => {
                                        return (
                                            <div className="row image-row-card shadow-box" key={index}>
                                                <div className="col-sm-12 col-md-6 col-lg-2">
                                                    {
                                                        product.imagenes[0] != undefined ?
                                                            <img
                                                                src={product.imagenes[0].Path}
                                                                alt="Imagen del producto"
                                                                className="img-fluid"
                                                            />
                                                            :
                                                            <img
                                                                src="https://phcmenudeo.s3.amazonaws.com/misc/noimage.jpg"
                                                                alt="Sin imagen"
                                                                className="img-fluid"
                                                            />
                                                    }
                                                </div>
                                                <div className="col-sm-12 col-md-6 col-lg-8">
                                                    <div className="row">
                                                        <div className="col-sm-12">
                                                            <Link to={`/product/${product.id}`}>
                                                                <h6 className="blue-text">{product.Nombre}</h6>
                                                            </Link>
                                                            <h6> {product.Descripcion} </h6>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-sm-12 col-md-12 col-lg-2">
                                                    <h6>Precio mayoreo:</h6>
                                                    <h6>$ {product.PrecioMayoreo} </h6>
                                                </div>
                                            </div>
                                        );
                                    })
                                    :
                                    <React.Fragment>
                                        <h3>No hay resultados todavía...</h3>
                                    </React.Fragment>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
