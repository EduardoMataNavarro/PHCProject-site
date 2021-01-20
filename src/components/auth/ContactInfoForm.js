import React, { Component } from 'react'
import TextFormGroup from '../singles/TextFormGroup';

export default class ContactInfoForm extends Component {
    render() {
        return (
            <form onSubmit={this.props.onSubmit}>
                <div className="container">
                    <h4 className="text-center p-2 m-4">Información de contacto (opcional)</h4>
                    <div className="row">
                        <div className="col-md-6">
                            <TextFormGroup labelname="Nombre" inputname="nombrecontacto" handleChage={this.props.handleChange} />
                        </div>
                        <div className="col-md-6">
                            <TextFormGroup labelname="Puesto" inputname="puestocontacto" handleChange={this.props.handleChange} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <TextFormGroup labelname="Direccion" inputname="direccioncontacto" handleChange={this.props.handleChange} />
                        </div>
                        <div className="col-md-6">
                            <TextFormGroup labelname="Correo" inputname="correocontacto" handleChange={this.props.handleChange} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <TextFormGroup labelname="Telefono" inputname="telefonocontacto" handleChange={this.props.handleChange} />
                        </div>
                        <div className="col-md-6">
                            <TextFormGroup labelname="Telefono móvil" inputname="movilcontacto" handleChange={this.props.handleChange} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <p className="text-center text-small">
                                Al dar click en "Registrarse" da por hecho que usted está de acuerdo con los
                                 <a href="https://phcmenudeo.s3.amazonaws.com/business-files/privacidad.pdf" target="_blank" rel="noopener noreferrer">
                                    &nbsp;TERMINOS Y CONDICIONES
                                </a>
                            </p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <div className={`alert alert-success text-center ${this.props.successRegister ? 'd-block' : 'd-none'}`}>
                                Registro exitoso, puede revise su correo para poder iniciar sesión
                            </div>
                            <button type="submit" className={`blue-button ${!this.props.successRegister ? 'd-block' : 'd-none'}`}>
                                Registrarse
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        )
    }
}
