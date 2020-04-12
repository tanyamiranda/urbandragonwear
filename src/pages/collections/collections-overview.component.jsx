import React from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {withRouter} from 'react-router-dom';

//import './collections-overview.styles.scss';

import CollectionPreview from '../../components/collection/collection-preview.component';

import {selectCollectionsPreview} from '../../redux/shop/shop.selectors';

const CollectionsOverview = ({collections}) => (

    <div className="collections-overview">
        { 
            collections.map(
                ({id, ...collectionProps}) => (
                    <CollectionPreview key={id} {...collectionProps} />
                )
            )
        }
    </div>
);
    
const mapStateToProps = createStructuredSelector ({
    collections : selectCollectionsPreview
});

export default withRouter(connect(mapStateToProps)(CollectionsOverview)); 