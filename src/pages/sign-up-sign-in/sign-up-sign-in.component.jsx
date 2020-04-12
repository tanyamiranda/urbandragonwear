import React from 'react';

import './sign-up-sign-in.styles.scss';

import SignIn from '../../components/sign-in/sign-in.component';

import SignUp from '../../components/sign-up/sign-up.component';

const SignUpSignInPage = () => (
    
    <div className="sign-in-and-sign-up">
        <SignIn />
        <SignUp />
    </div>
    
);

export default SignUpSignInPage;
