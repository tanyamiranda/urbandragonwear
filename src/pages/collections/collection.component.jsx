import React from 'react';
import {connect} from 'react-redux';

import CollectionFullView from '../../components/collection/collection-fullview.component';
import {selectAllItemsInCollection} from '../../redux/shop/shop.selectors';

const CollectionFullPage = ({collection}) => (
           
    <div className="shop-page">
        <CollectionFullView collection={collection} />
    </div>
)

const mapStateToProps = (state, ownProps) => ({
    collection: selectAllItemsInCollection(ownProps.match.params.collectionId)(state)
})

export default connect(mapStateToProps)(CollectionFullPage); 