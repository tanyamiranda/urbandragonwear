import React from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';

import './cart-icon.styles.scss';

import {ReactComponent as ShoppingBagIcon} from '../../assets/shopping-bag.svg';
import {toggleCartHidden} from '../../redux/cart/cart.actions';
import {selectCartItemsCount} from '../../redux/cart/cart.selectors';

const CartIcon = ({toggleCartHidden, cartItemCount}) => (
    
    <div className="cart-icon" onClick={toggleCartHidden}>
        <ShoppingBagIcon className="shopping-icon"/>
        <span className="item-count">{cartItemCount}
        </span>
    </div>

);

const mapStateToProps = createStructuredSelector ({
    cartItemCount: selectCartItemsCount
});

const mapDispatchToProps = dispatch => ({
    toggleCartHidden: () => dispatch(toggleCartHidden())
  });
   

export default connect(mapStateToProps, mapDispatchToProps) (CartIcon);