import React, { Component } from 'react'
import $ from 'jquery';
import Cookie from 'universal-cookie';
import jwt from 'jsonwebtoken';


import TextFormGroup from '../singles/TextFormGroup';

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            usermail: '',
            userpass: '',
            success: false,
            errors: false,
            isNotSending: false
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    }

    handleInputChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleLoginSubmit(e) {
        e.preventDefault();
        this.setState({isNotSending: true});

        const dataObject = {
            email: this.state.usermail,
            password: this.state.userpass
        };
        console.log(dataObject);
        $.ajax({
            url: 'https://pchproject-api.herokuapp.com/api/loginuser',
            type: 'POST',
            data: JSON.stringify(dataObject),
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            success: function(response){
                console.log(response);
                this.setState({isNotSending: false});
                if (response.success != undefined) {
                    this.setState({errors: false, success: true}, () => {
                        const username = response.user_name.split(" ")[0];
                        const cookie = new Cookie();
                        cookie.set('usid', response.user_id, { path: '/', maxAge: 21600000 });
                        cookie.set('username', username, { path: '/', maxAge: 21600000 });
                        setTimeout(() => {
                            window.location.href = '/';
                        }, 1500);
                    });
                } 
                else {
                    this.setState({errors: true, success: false});
                }
            }.bind(this),
            error: function(response) {
                this.setState({isNotSending: false});
                console.log(response);
            }.bind(this)
        });
    }

    render() {
        return (
            <div className="container">
                <div className="shadow-box auth-container">
                    <form onSubmit={this.handleLoginSubmit}>
                        <div className="container">
                            <h4 className="text-center p-2 m-4">Iniciar sesión</h4>
                            <TextFormGroup labelname="Correo" inputname="usermail" inputtype="email" handleChange={this.handleInputChange} />
                            <TextFormGroup labelname="Password" inputname="userpass" inputtype="password" handleChange={this.handleInputChange} />
                            <div className="form-group">
                                <div className={`alert alert-success text-center ${this.state.success ? 'd-block' : 'd-none'}`}>
                                    Bienvenido!
                                </div>
                                <div className={`alert alert-danger text-center ${this.state.errors ? 'd-block' : 'd-none'}`}>
                                    Por favor revise sus credenciales.
                                </div>
                                <button type="submit" className="blue-button" disabled={this.state.isNotSending}>
                                    Login
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}
