import React, {useEffect, lazy, Suspense} from 'react';
import {Route} from 'react-router-dom';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';

import './shop.styles.scss';

import {selectIsCollectionsLoaded} from '../../redux/shop/shop.selectors';
import {fetchCollectionsStart} from '../../redux/shop/shop.actions';
import ErrorBoundary from '../../components/error-boundary/error-boundary.component';
import Spinner from '../../components/spinner/spinner.component';

const CollectionsOverviewContainer = lazy(() => import('../collections/collections-overview.container'));
const CollectionFullViewContainer = lazy(() => import('../collections/collection.container'));

const ShopPage = ({isCollectionsLoaded,fetchCollectionsStart, match }) => {

    useEffect(() => {
        //Only load collection upon app refresh, not each time this component loads.
        if (!isCollectionsLoaded) {
            fetchCollectionsStart();
        }           
    }, [fetchCollectionsStart,isCollectionsLoaded]);

    return (
        <ErrorBoundary>
            <Suspense fallback={<Spinner />} >
                <div className="shop-page">
                    <Route exact path ={`${match.path}`} component= {CollectionsOverviewContainer} />
                    <Route path={`${match.path}:collectionId`} component = {CollectionFullViewContainer} />
                </div>
            </Suspense>
            
        </ErrorBoundary>
    )
}

const mapStateToProps = createStructuredSelector({
    isCollectionsLoaded: selectIsCollectionsLoaded
});

const mapDispatchToProps = dispatch => ({
    fetchCollectionsStart : () => dispatch(fetchCollectionsStart())
});

export default connect(mapStateToProps, mapDispatchToProps)(ShopPage); 
