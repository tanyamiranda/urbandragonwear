import React, {useState} from 'react';
import {createStructuredSelector} from 'reselect';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

import './order-search.styles.scss';

import FormInput from '../../components/form-input/form-input.component';
import CustomButton from '../../components/custom-button/custom-button.component';
import OrderDetails from '../../components/order-details/order-details.component';
import {searchByOrderIdStart} from '../../redux/order/order.actions';
import {selectOrderFromSearch} from '../../redux/order/order.selectors'

const OrderSearchPage = ({order,searchByOrderIdStart}) => {
    
    const [searchCriteria, setSearchCriteria] = useState({orderId:"", email: ""});
    const [searchConducted, setSearchConducted] = useState(false);

    const {orderId, email} = searchCriteria;

    const handleSubmit = async event => {
        event.preventDefault();    
        setSearchConducted(true);
        searchByOrderIdStart(orderId, email);
    }

    const handleChange = event => {
        const {value, name} = event.target;
        setSearchCriteria({...searchCriteria, [name]: value});
    }

    return (
        <div className="order-search-wrapper">
            <div className="order-search">
                <h1 className="title">Order Search</h1>
                <form className="search-form" onSubmit={handleSubmit}>
                    <FormInput 
                        name="orderId" 
                        type="text"  
                        value={orderId}
                        onChangeEvent={handleChange} 
                        required 
                        label="Order Id"
                    />
                    <FormInput 
                        name="email" 
                        type="text"
                        value={email}
                        onChangeEvent={handleChange} 
                        required
                        label="Email"
                        autoComplete="email"
                    />
                    <div className="buttons">
                        <CustomButton type="submit">Search</CustomButton>
                    </div>
                </form>
            </div>
            {
            !order || order.length === 0 ? (
                <div className="no-orders">{!searchConducted ? null : "No order matches the required criteria."}</div>
            ) : (
                <div className="search-results">
                    <h1 className="title">Order Details</h1>
                    <OrderDetails key={order[0].id} order={order[0]} /> 
                </div>
                )
            }
        </div>
    );
}

const mapStateToProps = createStructuredSelector ({
    order : selectOrderFromSearch
});

const mapDispatchToProps = (dispatch) => ({
    searchByOrderIdStart: (orderId, email) => dispatch(searchByOrderIdStart(orderId, email))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OrderSearchPage)); 
