import React, { Children, Component } from 'react'

export default class SelFormGroup extends Component {
    constructor(props){
        super(props);
        this.select = React.createRef();
    }
    render() {
        return (
            <div className="form-group">
                <label 
                    htmlFor={this.props.inputname} 
                    className={'text-center input-label fade-in'}  
                    ref={this.label}>
                        { this.props.labelname }
                </label>
                <select 
                    className="custom-select"
                    name={ this.props.inputname } 
                    ref={ this.select }
                    value={this.props.value}
                    onChange={ this.props.handleChange }
                    ref={this.props.reference}    
                >
                        <option value="0" key={'0'}> {'--- Seleccione una opcion ---'} </option>
                    {
                        this.props.values && this.props.values.map((opt, index) => {
                            return <option key={index} value={opt[this.props.valuename]}> { opt[this.props.displayname] } </option>
                        })
                    }
                </select>
            </div>
        )
    }
}
