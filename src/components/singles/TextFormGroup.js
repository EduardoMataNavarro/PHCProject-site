import React, { Component } from 'react'

export default class TextFormGroup extends Component {
    constructor(props) {
        super(props);
        this.text = React.createRef();

        this.state = {
            isLabelVisible: false
        };

        this.showLabel = this.showLabel.bind(this);
    }

    showLabel() {
        if (!this.state.isLabelVisible) {
            this.setState({ isLabelVisible: true });
        }
        else {
            if (!this.text.current.value || this.text.current.value.length < 1) {
                this.setState({ isLabelVisible: false });
            }
        }
    }
    render() {
        return (
            <div className="form-group">
                <label
                    htmlFor={this.props.inputname}
                    className={`text-center input-label ${this.state.isLabelVisible ? 'fade-in' : 'hidden'}`}
                    ref={this.label}>
                    {this.props.labelname}
                </label>
                <input
                    type={this.props.inputtype}
                    name={this.props.inputname}
                    className="text-control"
                    onChange={this.props.handleChange}
                    onFocus={this.showLabel}
                    onBlur={this.showLabel}
                    placeholder={this.props.labelname}
                    ref={this.text}
                    { ...this.props.required }
                />
            </div>
        )
    }
}
