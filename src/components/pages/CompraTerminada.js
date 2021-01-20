import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class CompraTerminada extends Component {
    render() {
        return (
            <div className="container-fluid">
                <div className="shadow-box">
                    <div className="m-4 p-4">
                        <h1 className="blue-text text-center mt-4 mb-4">Gracias por su compra</h1>
                        
                        <h2 className="blue-text text-center mt-4">
                            <Link to="/" className="blue-text">Regresar a la pagina de inicio</Link>
                        </h2>
                    </div>
                </div>
            </div>
        )
    }
}
