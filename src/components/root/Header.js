import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { FaSearch, FaEllipsisH, FaDoorOpen, FaShoppingCart } from 'react-icons/fa';
import { BiExit } from 'react-icons/bi';
import { FaStream } from 'react-icons/fa'
import Cookies from 'universal-cookie';

export default class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {
            searchTerm: ''
        }

        this.cookie = new Cookies();
        this.logOut = this.logOut.bind(this);
        this.redirectToAminPanel = this.redirectToAminPanel.bind(this);
        this.searchResults = this.searchResults.bind(this);
        this.handleInput = this.handleInput.bind(this);
    }

    logOut() {
        this.cookie.remove('usid');
        this.cookie.remove('username');
        window.location.href = '/';
    }

    redirectToAminPanel() {
        window.location.href = "http://localhost:3005/";
    }

    handleInput(e) {
        this.setState({ searchTerm: e.target.value })
    }

    searchResults(e) {
        e.preventDefault();
        if (this.state.searchTerm != '') {
            window.location.href = 'http://localhost:3000/search/' + this.state.searchTerm;
        }
    }

    render() {
        const isLogged = this.cookie.get('usid');
        return (
            <div className="fixed-top w-100">
                <div className="container-fluid light-nav pb-2" id="search-bar">
                    <div className="container">
                        <form onSubmit={this.searchResults} className="d-inline">
                            <input
                                type="text"
                                name="searchTerm"
                                id="search-box"
                                className="mt-2"
                                placeholder="Buscar"
                                value={this.state.searchTerm}
                                onChange={this.handleInput}
                            />
                            <button type="submit" id="searchbar-btn">
                                <FaSearch style={{ verticalAlign: 'baseline' }} className="blue-text" />
                            </button>
                        </form>
                    </div>
                </div>
                <nav className="navbar navbar-expand-md light-nav" id="main-nav">
                    <div className="container">
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <FaStream />
                        </button>
                        <Link className="navbar-brand " to="/">
                            <img 
                                width="55%" 
                                className="d-block ml-auto mr-auto"
                                src="https://phcmenudeo.s3.amazonaws.com/misc/logo-redone.png" 
                                alt="Nuestro logo" 
                            />
                        </Link>
                        <div className="collapse navbar-collapse justify-content-start" id="navbarNav">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <Link className="nav-link" to="/">Inicio <span className="sr-only">(current)</span></Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/search/all">Articulos</Link>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">Contáctanos</a>
                                </li>
                                {
                                    (isLogged == undefined || isLogged == null) ?
                                        <React.Fragment>
                                            <li className="nav-item">
                                                <Link className="nav-link" to="/login">Inicia sesión o</Link>
                                            </li>
                                            <li className="nav-item" id="cuenta-nav-item">
                                                <Link className="nav-link" id="cuenta-nav-link" to="/signup">Únete a nosotros</Link>
                                            </li>
                                        </React.Fragment> :
                                            <li>
                                                <div className="dropdown">
                                                    <button className="b dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                        {this.cookie.get('username')}
                                                    </button>
                                                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                        <a className="dropdown-item" onClick={this.redirectToAminPanel} >Admin panel</a>
                                                        <a className="dropdown-item" onClick={this.logOut}>Salir <BiExit /></a>
                                                    </div>
                                                </div>
                                            </li>
                                }
                                <li className="nav-item">
                                    <Link className="nav-link" to="/carrito">Carrito</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        )
    }
}
