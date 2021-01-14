import React, { Component } from 'react'
import $ from 'jquery';
import SelFormGroup from '../singles/SelFormGroup';
import TextFormGroup from '../singles/TextFormGroup';
import { FaThList } from 'react-icons/fa';

export default class SignupForm extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            estados: [],
            sucursales: [],
            sucursal: '0',
            estado: '0'
        };
        this.handleEstadoSelectChange = this.handleEstadoSelectChange.bind(this);
    }

    componentDidMount() {
        $.ajax({
            url: 'https://pchproject-api.herokuapp.com/api/estado',
            method: 'GET',
            success: function (response) {
                this.setState({ estados: [...response] }, () => {
                    console.log(this.state);
                });
            }.bind(this),
            error: function (response) {
                console.log(response);
            }.bind(this)
        });

        $.ajax({
            url: 'https://pchproject-api.herokuapp.com/api/sucursal',
            method: 'GET',
            success: function (response) {
                this.setState({ sucursales: [...response] }, () => {
                    console.log(this.state);
                });
            }.bind(this),
            error: function (response) {
                console.log(response);
            }.bind(this)
        });
    }

    handleEstadoSelectChange(e){
        this.props.handleChange(e);
        let value = e.target.value;
        this.setState({ estado: value });
        $.ajax({
            url: `https://pchproject-api.herokuapp.com/api/estado/${value}`,
            method: 'GET',
            success: function(response) {
                this.setState({sucursal: response.sucursal_id});
                let event = new Event('input', {bubbles: true});
                this.sucursalInput.dispatchEvent(event);
            }.bind(this),
            fail: function(response) {
                console.log(response);
            }.bind(this)
        });
    }
    render() {
        return (
            <form onSubmit={this.props.onSubmit}>
                <div className="container">
                    <h4 className="text-center p-2 m-4">Información del solicitante</h4>

                    <div className="row">
                        <div className="col-md-6">
                            <TextFormGroup required="required" labelname="Nombre o razón social*" inputname="nombre" handleChange={this.props.handleChange} />
                        </div>
                        <div className="col-md-6">
                            <TextFormGroup labelname="RFC*" inputname="rfc" handleChange={this.props.handleChange} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <TextFormGroup labelname="Dirección" inputname="direccion" handleChange={this.props.handleChange} />
                        </div>
                        <div className="col-md-6">
                            <TextFormGroup labelname="Correo electrónico*" inputname="email" handleChange={this.props.handleChange} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4">
                            <TextFormGroup labelname="Telefono*" inputname="telefono" handleChange={this.props.handleChange} />
                        </div>
                        <div className="col-md-4">
                            <SelFormGroup 
                                labelname="Estado*" 
                                inputname="estado" 
                                values={[...this.state.estados]} 
                                valuename="id"
                                value={this.state.estado}
                                displayname="Nombre"
                                handleChange={this.props.handleChange} />
                        </div>
                        <div className="col-md-4">
                            <SelFormGroup 
                            labelname="Sucursal*" 
                            inputname="sucursal" 
                            valuename="id"
                            displayname="Nombre"
                            value={this.state.sucursal}
                            values={[...this.state.sucursales]} 
                            handleChange={this.props.handleChange} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="div col-lg-12">
                            <p className="text-center">* Requerido</p>
                            <div className={`alert alert-danger text-center ${this.props.canSubmit ? 'd-none' : 'd-block'}`} role="alert">
                                Por favor no deje campos vacíos.
                            </div>
                            <button type="submit" className={this.props.canSubmit ? 'blue-button' : 'red-button'}>
                                Continuar
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        )
    }
}
