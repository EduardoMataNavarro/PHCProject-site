import React, { Component } from 'react'
import $ from 'jquery';
import ProductImgSlider from '../singles/ProductImgSlider';
import Cookies from 'universal-cookie';
import ProductCard from '../singles/ProductCard';
import Carousel from '../singles/Carousel';

export default class ProductPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productId: this.props.match.params.id,
            producto: {},
            imagenes: [],
            relacionados: []
        };

        this.cookies = new Cookies();
        this.getProductosRelacionados = this.getProductosRelacionados.bind(this);
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.match.params.id !== prevState.productId) {
            const currentid = nextProps.match.params.id;
            return { productId: currentid };
        }
        else {
            return null;
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.match.params.id != this.state.productId) {
            $.ajax({
                url: 'https://pchproject-api.herokuapp.com/api/articulo/' + this.state.productId,
                method: 'GET',
                dataType: 'json',
                success: function (response) {
                    console.log(response);
                    this.setState({ producto: response }, () => {
                        this.getProductosRelacionados(this.state.producto.id)
                    });
                }.bind(this),
                error: function (error) {
                    console.log(error)
                }.bind(this)
            });
            $.ajax({
                url: `https://pchproject-api.herokuapp.com/api/articulo/${this.state.productId}/media`,
                method: 'GET',
                dataType: 'json',
                success: function (response) {
                    this.setState({ imagenes: [...response] }, () => { console.log(this.state); });
                }.bind(this),
                error: function (response) {
                    console.log(response);
                }.bind(this)
            });
        }
    }
    componentDidMount() {
        $.ajax({
            url: 'https://pchproject-api.herokuapp.com/articulo/get/' + this.state.productId,
            method: 'GET',
            dataType: 'json',
            success: function (response) {
                console.log(response);
                this.setState({ producto: response }, () => {
                    this.getProductosRelacionados(this.state.producto.id)
                });
            }.bind(this),
            error: function (error) {
                console.log(error)
            }.bind(this)
        });
        $.ajax({
            url: `https://pchproject-api.herokuapp.com/api/articulo/${this.state.productId}/media`,
            method: 'GET',
            dataType: 'json',
            success: function (response) {
                this.setState({ imagenes: [...response] }, () => { console.log(this.state); });
            }.bind(this),
            error: function (response) {
                console.log(response);
            }.bind(this)
        });
    }

    getProductosRelacionados(id) {
        $.ajax({
            url: `http://localhost:8000/api/articulo/related/${id}`,
            method: 'GET',
            dataType: 'json',
            success: function (response) {
                this.setState({ relacionados: [...response] }, () => console.log(response));
            }.bind(this),
            error: function (response) {
                console.log(response);
            }.bind(this)
        })
    }

    render() {
        return (
            <div className="container">
                <hr />
                <div className="row">
                    <div className="col-md-6 col-sm-12">
                        <div className="w-100" id="product-img-container">
                            {
                                this.state.imagenes.length > 0 ?
                                    <Carousel Images={this.state.imagenes} />
                                    :
                                    <img src="https://phcmenudeo.s3.amazonaws.com/misc/no-image.jpg"
                                        alt="Imagenes no disponibles"
                                        className="position-relative img-fluid product-image-main"
                                    />

                            }
                        </div>
                    </div>
                    <div className="col-md-6 col-sm-12">
                        <h4 className="blue-text"> {this.state.producto.Nombre}</h4>
                        <h6> SKU: {this.state.producto.SKU} </h6>
                        {
                            this.state.producto.marca != undefined ?
                                <h6> Marca: <span>{this.state.producto.marca.Nombre}</span></h6>
                                : null
                        }
                        <hr />
                        <h4>Precio de mayoreo:</h4>
                        <h2 className="blue-text">$ {this.state.producto.PrecioMayoreo}</h2>
                        <h4>A partir de <span className="blue-text" >{this.state.producto.CantidadMayoreo}</span> piezas</h4>
                        <br />
                        <h5>Precio de menudeo: <span className="blue-text" >${this.state.producto.Precio}</span> </h5>
                        {
                            this.cookies.get('usid') != undefined ?
                                <div className="row">
                                    <div className="col-sm-12">
                                        <button className="btn blue-button btn-lg btn-block mb-4">
                                            Comprar ahora
                                        </button>
                                    </div>
                                    <div className="col-sm-12">
                                        <button className="btn light-button btn-lg btn-block">
                                            Agregar al carrito
                                        </button>
                                    </div>
                                </div>
                                :
                                <h6>Inicie sesión para comprar</h6>

                        }
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12 col-lg-6 mt-4 mb-2">
                        <h5 className="blue-text">Descripción:</h5>
                        <p>
                            {this.state.producto.Descripcion}
                        </p>
                        <h5 className="blue-text">Ficha técnica: </h5>
                        {
                            this.state.producto.ficheTecnicaUrl != undefined ?
                                <div>
                                    Revise la ficha técnica de este producto &nbsp;
                                <a href={this.state.producto.ficheTecnicaUrl} target="_blank" rel="noopener noreferrer" className="blue-text">
                                        aquí {'>'}
                                    </a>
                                </div>
                                :
                                <div>
                                    <h6>Ficha técnica no disponible</h6>
                                </div>
                        }
                    </div>
                    {
                        this.state.producto.categoria != undefined ?
                            <div className="col-sm-12 col-lg-6 mt-4 mb-2">
                                <h5 className="blue-text">Detalles</h5>
                                <p>Color: {this.state.producto.Color}</p>
                                <p>Tecnologia: {this.state.producto.Tecnologia}</p>
                                <p>Categoria: {this.state.producto.categoria.Nombre}</p>
                            </div>
                            : null
                    }
                </div>
                <h4 className="mt-4">Productos relacionados: 
                    <span className="blue-text"> {this.state.producto.categoria != undefined ? this.state.producto.categoria.Nombre : null}</span>
                </h4>
                <hr />
                <div className="row justify-content-center">
                    {
                        this.state.relacionados &&
                            this.state.relacionados.length > 0 ?
                            this.state.relacionados.map((articulo, index) => {
                                return (
                                    <div className="col-sm-12 col-md-6 col-lg-3" key={index}>
                                        <ProductCard
                                            img={articulo.imagenes[0] != undefined ?
                                                articulo.imagenes[0].Path :
                                                'https://phcmenudeo.s3.amazonaws.com/misc/no-image.jpg'}
                                            id={articulo.id}
                                            nombre={articulo.Nombre}
                                            precio={articulo.PrecioMayoreo}
                                        />
                                    </div>
                                );
                            })
                            : null
                    }
                </div>
            </div >
        )
    }
}
