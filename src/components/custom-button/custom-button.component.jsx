import React from 'react';

import './custom-button.styles.scss';

const CustomButton = ({children, isGoogleSignIn, inverted, isActionButton, ...otherProps}) => (

    <button 
        className={`${inverted ? "inverted": ""}
        ${isActionButton ? "action-button" : ""} 
        ${isGoogleSignIn ? "google-sign-in": ""} 
        custom-button`} 
        {...otherProps}
    >
        {children}
    </button>

);

export default CustomButton;