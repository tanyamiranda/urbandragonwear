import React from 'react';
import {createStructuredSelector} from 'reselect';
import {connect} from 'react-redux';
import {withRouter, Link} from 'react-router-dom';

import './account-info.styles.scss';

import CustomButton from '../custom-button/custom-button.component';
import {selectCurrentUser, selectOrderHistory} from '../../redux/user/user.selectors';
import {signOutStart, fetchCurrentUserOrdersStart} from '../../redux/user/user.actions';

const formatDate = (dateValue) => {
    let current_datetime = new Date(dateValue);
    let formatted_date = (current_datetime.getMonth() + 1) + "/" + current_datetime.getDate() + "/" +current_datetime.getFullYear() ;
    return formatted_date;
}

const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});

const AccountInfo = ({currentUser, history, signOutStart, orderHistory, fetchCurrentUserOrdersStart, match}) => {

    //useEffect(() => {
    //    fetchCurrentUserOrdersStart();
    //  }, [fetchCurrentUserOrdersStart]);

    return (
        <div className="account-info-wrapper">
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
                    
                </div>
                <div className="order-history">
                    <div className="title">OrderHistory</div>
                    <div className="detail" key="header">
                        <span><b>OrderId</b></span>
                        <span><b>Date</b></span>
                        <span><b>Total</b></span>
                        <span><b>Status</b></span>
                    </div>
                    {
                        orderHistory.length > 0 ?
                            orderHistory.map(order => (
                                <div className="detail" key={order.id} >
                                    <span><Link className="link" to={`/orderdetails/${order.id}`}>{order.id}</Link></span>
                                    <span>{formatDate(order.createdDate)}</span>
                                    <span>{currencyFormatter.format(order.orderTotal)}</span>
                                    <span>{order.orderStatus}</span>                                    
                                </div>
                            
                            ))
                        :
                            <div>You have no orders.</div>
                    }    
                    
                </div>
                <div className="buttons">
                    <CustomButton onClick={signOutStart}>SIGN OUT</CustomButton>
                    <CustomButton onClick={() => history.push('/shop')} isActionButton={true} >Continue Shopping</CustomButton>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = createStructuredSelector ({
    currentUser : selectCurrentUser,
    orderHistory : selectOrderHistory
});

const mapDispatchToProps = (dispatch) => ({
    signOutStart: () => dispatch(signOutStart()),
    fetchCurrentUserOrdersStart: () => dispatch(fetchCurrentUserOrdersStart())
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps) (AccountInfo));

