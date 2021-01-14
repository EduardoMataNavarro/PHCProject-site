import React, { Component } from 'react'
import { ToastProvider } from 'react-toast-notifications';

export default class Toast extends Component {
    constructor(props){
        super(props);
        
    }

    render() {
            <ToastProvider
                autoDismiss
                autoDismissTimeout={ 4000 }
                placement='bottom-left'
            >
                { this.props.message }
            </ToastProvider>
        );
    }
}
