import React, {useState} from 'react';
import {connect} from 'react-redux';

import './sign-up.styles.scss';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import {signUpStart} from '../../redux/user/user.actions'

const SignUp = ({signUpStart}) => {

    const [userSignUpInfo, setUserSignUpInfo] = 
        useState({
            displayName: "",
            email: "",
            password: "",
            confirmPassword:""
        });

    const {displayName, email, password, confirmPassword} = userSignUpInfo;

    const handleSubmit = async event => {
        event.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords don't match.");
            return;
        }
        signUpStart({email, password, displayName});
    }

    // As a user types in, this function will set the state 
    const handleChange = event => {
        const {value, name} = event.target;
        setUserSignUpInfo({...userSignUpInfo, [name]: value});
    }

    return(
        <div className="sign-up">
            <h2>I don't have an account.</h2>
            <span>Sign up with your email and password:</span>
            <form onSubmit={handleSubmit}>
                <FormInput 
                    name="displayName" 
                    type="text" 
                    value={displayName} 
                    onChangeEvent={handleChange} 
                    required 
                    label="Display Name"
                    autoComplete="display-name"
                />
                <FormInput 
                    name="email" 
                    type="email" 
                    value={email} 
                    onChangeEvent={handleChange} 
                    required 
                    label="Email"
                    autoComplete="email"
                />
                <FormInput 
                    name="password" 
                    type="password" 
                    value={password} 
                    onChangeEvent={handleChange} 
                    required
                    label="Password"
                    autoComplete="new-password"
                />
                <FormInput 
                    name="confirmPassword" 
                    type="password" 
                    value={confirmPassword} 
                    onChangeEvent={handleChange} 
                    required
                    label="Confirm Password"
                    autoComplete="new-password-confirmation"
                />
                <div className="buttons">
                    <CustomButton type="submit">Create Account</CustomButton>
                </div>
            </form>
        </div>
    )
};

const mapDispatchToProps = (dispatch) => ({
    signUpStart : (singUpInfo) => dispatch(signUpStart(singUpInfo))
});

export default connect(null, mapDispatchToProps) (SignUp);