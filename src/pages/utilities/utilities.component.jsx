import React from 'react';
import {createStructuredSelector} from 'reselect';
//import {auth, createUserProfileDocument, addCollectionAndDocuments} from './firebase/firebase.utils';
import {connect} from 'react-redux';

import {selectCurrentUser} from '../../redux/user/user.selectors';
import {addCollectionAndDocuments} from '../../firebase/firebase.utils';
import CustomButton from '../../components/custom-button/custom-button.component';

import SHOP_DATA from './shop.data';

import './utilities.styles.scss';

class UtilitiesPage extends React.Component {


    refreshCollections = event => {

        const newShopData = Object.keys(SHOP_DATA).map(key => SHOP_DATA[key]); 

        console.log("newShopData=", newShopData);
        
        addCollectionAndDocuments('collections', newShopData.map( ({sortOrder, title, items}) => ({sortOrder, title, items}) ))

        alert('Shop Collections Refreshed.')
        
    }

    render () {
        
        const {currentUser} = this.props;

        const isAuthorized = currentUser && currentUser.isAdmin;

        console.log("isAuthorized", isAuthorized);

        return (
    
            isAuthorized ?  (
                <div className="utilities">
                    <div className="utility">
                        <h1 className="title">Refresh Shop Data</h1>
                        <div className="details">Reloads data from the ../redux/shop/shop.data.js file into firebase. First you must go into firebase and deleted the "collections" tree.</div>
                        <CustomButton onClick={this.refreshCollections}>Reload Shop Data</CustomButton>
                    </div>
                </div>

            ) : (
                <div className="utilities">
                    <div className="utility">
                        <h1 className="title">You are not authorized.</h1>
                    </div>
                </div>
            )

        );
    }

}

// This adds the currenUser object to be accessible by the app
const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
});

export default connect(mapStateToProps) (UtilitiesPage); 