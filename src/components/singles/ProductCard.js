import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router-dom'
import $ from 'jquery'
import Cookies from 'universal-cookie';
import '../../ProductCardStyle.css'

export default class ProductCard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoggedIn: false
        };

        this.cookies = new Cookies();
        this.addToCart = this.addToCart.bind(this);
    }
    addToCart(){
        if (this.cookies.get('usid') != undefined) {
            const usid = this.cookies.get('usid');
            $.ajax({
                url: 'http://localhost:8000/api/carrito',
                method: 'POST',
                dataType: 'json',
                contentType: 'application/json',
                data: JSON.stringify({userid: usid, articuloid: this.props.id}),
                success: function (response) {
                    console.log(response);
                },
                error: function (response) {
                    console.log(response);
                }
            });
        }
    }
    render() {
        return (
            <div className="product-card">
                <img src={this.props.img} alt="" className="product-card-img" />
                <p className="product-card-name">
                    <Link to={`/product/${this.props.id}`} className="blue-text font-weight-lighter">
                        {this.props.nombre}
                    </Link>
                </p>
                <h6 className="product-card-price">$ {this.props.precio}</h6>
                <div className="product-card-action">
                    <div className="container">
                    {
                        this.cookies.get('usid') != undefined ?
                            <React.Fragment>
                                <button type="button" onClick={this.addToCart}>Agregar al carrito</button>
                            </React.Fragment>
                            :
                            <p>Inicie sesión para poder comprar</p>
                    }
                    </div>
                </div>
            </div>
        )
    }
}
