import React from 'react';
import {createStructuredSelector} from 'reselect';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import './account-info.styles.scss';

import CustomButton from '../custom-button/custom-button.component';
import {selectCurrentUser, selectOrderHistory} from '../../redux/user/user.selectors';
import {signOutStart} from '../../redux/user/user.actions';


const formatDate = (dateValue) => {
    let current_datetime = new Date(dateValue);
    let formatted_date = (current_datetime.getMonth() + 1) + "/" + current_datetime.getDate() + "/" +current_datetime.getFullYear() ;
    return formatted_date;
}

const AccountInfo = ({currentUser, history, signOutStart, orderHistory}) => {
    
    console.log("orderHistory=",orderHistory);
    
    return (

        <div className="account-info">
            <h1 className="title">Account Details :</h1>
            <div className="details">
            <span className="detail">
                    <span className="label">Account Id:</span>
                    <span className="data">{currentUser.createdDate.seconds}</span>
                </span>
                <span className="detail">
                    <span className="label">Name:</span>
                    <span className="data">{currentUser.displayName}</span>
                </span>
                <span className="detail">
                    <span className="label">Email:</span>
                    <span className="data">{currentUser.email}</span>
                </span>
                <span className="detail">
                    <span className="label">Date Created:</span>
                    <span className="data">{formatDate(currentUser.createdDate.seconds)}</span>
                </span>
                <span className="detail">
                    <span className="label">Order History:</span>
                    <span className="data">
                    {
                        orderHistory.length ?
                            orderHistory.map(order => (
                                <div key={order.id} >{order.id}</div>
                            ))
                        :
                            <div>You have no orders.</div>
                    }

                    </span>
                </span>
            </div>
            <div className="buttons">
                <CustomButton onClick={signOutStart}>SIGN OUT</CustomButton>
                <CustomButton onClick={() => history.push('/shop')} isActionButton={true} >Continue Shopping</CustomButton>
            </div>
        </div>
    );
}

const mapStateToProps = createStructuredSelector ({
    currentUser : selectCurrentUser,
    orderHistory : selectOrderHistory
});

const mapDispatchToProps = (dispatch) => ({
    signOutStart: () => dispatch(signOutStart())
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps) (AccountInfo));

