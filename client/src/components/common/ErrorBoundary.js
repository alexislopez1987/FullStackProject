import React, { Component } from 'react';

class ErrorBoundary extends Component {

    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
            errorMessage: ''
        };
    }

    componentDidCatch(error, info) {
        console.error("Info Error Boundary", info);
        this.setState({ hasError: true, errorMessage: error});
    }

    render() {
        if (this.state.hasError) {
            return <h1>Something went wrong.</h1>;
        }
        return this.props.children;
    }
}

export default ErrorBoundary;