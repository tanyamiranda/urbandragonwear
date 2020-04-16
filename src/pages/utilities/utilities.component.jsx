import React from 'react';
import {createStructuredSelector} from 'reselect';
import {connect} from 'react-redux';

import {selectCurrentUser} from '../../redux/user/user.selectors';
import {addCollectionAndDocuments} from '../../firebase/firebase.utils';
import CustomButton from '../../components/custom-button/custom-button.component';

import SHOP_DATA from './shop.data';
import SAMPLE_ORDER from './sample-order';

import './utilities.styles.scss';

class UtilitiesPage extends React.Component {

    refreshCollections = event => {

        const newShopData = Object.keys(SHOP_DATA).map(key => SHOP_DATA[key]); 

        console.log("newShopData=", newShopData);
        
        addCollectionAndDocuments('collections', newShopData.map( ({sortOrder, title, items}) => ({sortOrder, title, items}) ))

        alert('Shop Collections Refreshed.')
    
    }

    loadSampleOrder = event => {

        const sampleOrderData = Object.keys(SAMPLE_ORDER).map(key => SAMPLE_ORDER[key]); 
        
        const now = Date.now();
        let current_datetime = new Date(now);
        let formatted_date = current_datetime.getFullYear() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getDate() + " " + current_datetime.getHours() + ":" + current_datetime.getMinutes() + ":" + current_datetime.getSeconds();

        sampleOrderData[0].id = now;
        sampleOrderData[0].createdDate = formatted_date;

        console.log("sampleOrderData=", sampleOrderData);
        
        addCollectionAndDocuments('orders', sampleOrderData);

        alert("New Sample Order Added.");
        
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
                        <div className="details">Reloads data from the ../pages/utilities/shop.data.js file into firebase. First you must go into firebase and deleted the "collections" tree.</div>
                        <CustomButton onClick={(event) => { if (window.confirm('Please remove existing collections, otherwise there will be duplicates. Are you ready to load collections?')) this.refreshCollections(event) } }
                        >Reload Shop Data</CustomButton>
                    </div>
                    <div className="utility">
                        <h1 className="title">Load Sample Order</h1>
                        <div className="details">Loads data from the ../pages/utilities/sample-order.js file into firebase. A new orderId, and date/time stamp is generated.</div>
                        <CustomButton onClick={this.loadSampleOrder}>Load Sample Order</CustomButton>
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