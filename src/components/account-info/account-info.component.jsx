import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import './account-info.styles.scss';

import CustomButton from '../custom-button/custom-button.component';
import {selectCurrentUser} from '../../redux/user/user.selectors';
import {signOutStart} from '../../redux/user/user.actions';

const AccountInfo = ({currentUser, history, signOutStart}) => (

    <div className="account-info">
        <h1 className="title">Account Details :</h1>
        <div className="details">
            <span className="detail">
                <span className="label">Name:</span>
                <span className="data">{currentUser.displayName}</span>
            </span>
            <span className="detail">
                <span className="label">Email:</span>
                <span className="data">{currentUser.email}</span>
            </span>
        </div>
        <div className="buttons">
            <CustomButton onClick={signOutStart}>SIGN OUT</CustomButton>
            <CustomButton onClick={() => history.push('/shop')} isActionButton={true} >Continue Shopping</CustomButton>
        </div>
    </div>
)


const mapStateToProps = state => ({
    currentUser : selectCurrentUser(state)
});

const mapDispatchToProps = (dispatch) => ({
    signOutStart: () => dispatch(signOutStart())
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps) (AccountInfo));

