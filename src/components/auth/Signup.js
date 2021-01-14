import React, { Component } from 'react'
import { FaLongArrowAltLeft } from 'react-icons/fa'
import { browserHistory } from 'react-router-dom'
import $ from 'jquery';

import TextFormGroup from '../singles/TextFormGroup';
import SelFormGroup from '../singles/SelFormGroup';
import SignupForm from './SignupForm';
import ContactInfoForm from './ContactInfoForm';

export default class Signup extends Component {
    constructor(props) {
        super(props);

        this.state = {
            nombre: '',
            rfc: '',
            direccion: '',
            email: '',
            telefono: '',
            estado: '',
            sucursal: '',
            nombrecontacto: '',
            puestocontacto: '',
            direccioncontacto: '',
            correocontacto: '',
            telefonocontacto: '',
            movilcontacto: '',
            slider: {
                currentslide: 0,
                maxslides: 4
            },
            canSubmitUserinfo: true,
            registerSucceeded: false
        };

        this.slides = [];
        this.slides[0] = React.createRef();
        this.slides[1] = React.createRef();
        this.slides[2] = React.createRef();
        this.slides[3] = React.createRef();

        this.handleInput = this.handleInput.bind(this);
        this.changeSlide = this.changeSlide.bind(this);
        this.onSignupSubmit = this.onSignupSubmit.bind(this);
        this.onContactInfoSubmit = this.onContactInfoSubmit.bind(this);
    }
    handleInput(e) {
        this.setState({ [e.target.name]: e.target.value }, () => console.log(this.state));
    }

    onSignupSubmit(e) {
        e.preventDefault();

        console.log(this.state);
        if (this.state.nombre != '' &&
            this.state.rfc != '' &&
            this.state.telefono != '' &&
            this.state.email != '' &&
            this.state.estado != '0' &&
            this.state.sucursal != '0') {
            this.setState({ canSubmitUserinfo: true });
            this.changeSlide("front");
        }
        else {
            this.setState({ canSubmitUserinfo: false });
        }
    }

    onContactInfoSubmit(e) {
        e.preventDefault();
        const dataObject = {
            nombre: this.state.nombre,
            rfc: this.state.rfc,
            direccion: this.state.direccion,
            email: this.state.email,
            telefono: this.state.telefono,
            estado: this.state.estado,
            sucursal: this.state.sucursal,
            infocontacto: {
                nombre: this.state.nombrecontacto,
                telefono: this.state.telefonocontacto,
                puesto: this.state.puestocontacto,
                direccion: this.state.direccioncontacto,
                correo: this.state.correocontacto,
                movil: this.state.movilcontacto
            }
        };
        console.log("data object: ");
        console.log(dataObject);
        $.ajax({
            url: 'https://pchproject-api.herokuapp.com/api/signupuser',
            method: 'POST',
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            data: JSON.stringify(dataObject),
            success: function (reponse) {
                this.setState({registerSucceeded: true}, ()=> {
                    setTimeout(() => {
                        window.location.href = '/login';
                    }, 2500);
                });
                console.log(reponse);
            }.bind(this),
            error: function (response) {
                console.log(response);
            }.bind(this)
        });
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
        });
    }

    render() {
        return (
            <div className="container">
                <div className="shadow-box slide-container auth-container">
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
                        <div className="container text-center">
                            <h4 className="p-2 m-4">Conoce los beneficios</h4>
                            <div className="row">
                                <div className="col-md-4">
                                    <div className="card">
                                        <img
                                            className="card-img-top"
                                            src="https://phcmenudeo.s3.amazonaws.com/misc/shoping.png"
                                            alt="Card image cap" />
                                        <div className="card-body">
                                            <h6 className="text-center">Negocio en línea</h6>
                                            <p className="card-text text-center">
                                                Realiza tus pedidos en lìnea de manera fácil, rápida y segura.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="card">
                                        <img
                                            className="card-img-top"
                                            src="https://phcmenudeo.s3.amazonaws.com/misc/microcredi.png"
                                            alt="Card image cap" />
                                        <div className="card-body">
                                            <h6 className="text-center">Micro crédito</h6>
                                            <p className="card-text text-center">
                                                Dale el impulso que tu empresa necesita con los creditos de PHC.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="card">
                                        <img
                                            className="card-img-top"
                                            src="https://phcmenudeo.s3.amazonaws.com/misc/capacitaciones.png"
                                            alt="Card image cap" />
                                        <div className="card-body">
                                            <h6 className="text-center">Capacitación</h6>
                                            <p className="card-text text-center">
                                                Actualiza tus conocimientos del mercado y de los productos.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-4">
                                    <div className="card">
                                        <img
                                            className="card-img-top"
                                            src="https://phcmenudeo.s3.amazonaws.com/misc/cogs.png"
                                            alt="Card image cap" />
                                        <div className="card-body">
                                            <h6 className="text-center">Ensamble gratuito</h6>
                                            <p className="card-text text-center">
                                                No batalles, nosotros lo ensamblamos por ti.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="card">
                                        <img
                                            className="card-img-top"
                                            src="https://phcmenudeo.s3.amazonaws.com/misc/truck.png"
                                            alt="Card image cap" />
                                        <div className="card-body">
                                            <h6 className="text-center">Flete gratuito</h6>
                                            <p className="card-text text-center">
                                                Tienes envíos locales gratis desde 1,500 y nacionales desde 5,000
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="card">
                                        <img
                                            className="card-img-top"
                                            src="https://phcmenudeo.s3.amazonaws.com/misc/wrench.png"
                                            alt="Card image cap"></img>
                                        <div className="card-body">
                                            <h6 className="text-center">Servicio técnico</h6>
                                            <p className="card-text text-center">
                                                Realiza tus pedidos en lìnea de manera fácil, rápida y segura.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-12">
                                    <button className="blue-button" onClick={() => this.changeSlide("front")} data-sum="1">
                                        Comenzar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="slide d-none" ref={this.slides[1]}>
                        <div className="container text-center">
                            <h4 className="p-2 m-4">Restricciones</h4>
                            <h5 className="text-center">La venta de nuestros productos es única y exclusivamente para la reventa.</h5>
                            <div className="row mt-5">
                                <div className="col-md-1 d-md-block"></div>
                                <div className="col-md-11">
                                    <p className="text-left">
                                        Para hacer válido tu registro se requiere lo siguiente:<br />
                                        - Contar con un negocio, local o profesionista independiente en el área de tecnología <br />
                                        - Estar registrado en el SAT como persona física o moral. <br />
                                        - Leer las políticas de comercialización (desde aquí) <br />
                                    </p>
                                    <p className="text-left">
                                        Es importante contar con la documentación cuando se te solicite en un segundo correo o de lo contrario la solicitud no se aprobará:
                                        <br />
                                        - Cédula fiscal, con actividades económicas de venta de equipo de computo. <br />
                                        - Comprobante de domicilio, tiene que ser idéntico al que esta registrado en el SAT. <br />
                                        - Identificación oficial y también de las personas que están autorizadas para comprar. <br />
                                        - Estado de cuenta bancario (solo si se requiere solicitar un crédito) <br />
                                    </p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-12">
                                    <button className="blue-button" onClick={() => this.changeSlide("front")} data-sum="1">
                                        Continuar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="slide d-none" ref={this.slides[2]}>
                        <SignupForm onSubmit={this.onSignupSubmit} handleChange={this.handleInput} canSubmit={this.state.canSubmitUserinfo} />
                    </div>
                    <div className="slide d-none" ref={this.slides[3]}>
                        <ContactInfoForm onSubmit={this.onContactInfoSubmit} handleChange={this.handleInput} successRegister={this.state.registerSucceeded}/>
                    </div>
                </div>
            </div>
        )
    }
}
