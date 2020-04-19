import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {compose} from 'redux';

import CollectionsOverview from './collections-overview.component';
import WithSpinner from '../../components/spinner/with-spinner.component';
import {selectIsCollectionFetching} from '../../redux/shop/shop.selectors';

const mapStateToProps = createStructuredSelector({
    isLoading : selectIsCollectionFetching
});

const CollectionsOverviewContainer = compose (
    connect(mapStateToProps),
    WithSpinner
)(CollectionsOverview);

export default CollectionsOverviewContainer;
