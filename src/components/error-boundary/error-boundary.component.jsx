import React from 'react';

import {ErrorImageContainer, ErrorImageOverlay, ErrorImageText} from './error-boundary.styles';

class ErrorPage extends React.Component {

    constructor() {
        super();
        this.state = {
            hasError: false
        }
    }

    static getDerivedStateFromError(error) {
        return {hasError: true}
    }

    componentDidCatch(error, info) {
        console.log("ErrorPage error:", error);
    }

    render() {

        console.log("this.state.hasError=",this.state.hasError);

        if (this.state.hasError) {
            return (
                <ErrorImageOverlay>
                    <ErrorImageContainer imageUrl="https://i.ibb.co/v3qSGm0/sad-Dragon.jpg"/>
                    <ErrorImageText>Ooops!<br/>One of our dragons broke your page.<br/>We'll try and not let that happen again.<br/>He's been warned.</ErrorImageText>
                </ErrorImageOverlay>
            )
        }

        return this.props.children;

    }

}

export default ErrorPage;