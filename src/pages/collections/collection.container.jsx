import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {compose} from 'redux';

import CollectionFullPage from './collection.component';
import WithSpinner from '../../components/spinner/with-spinner.component';
import {selectIsCollectionFetching} from '../../redux/shop/shop.selectors';

const mapStateToProps = createStructuredSelector({
    isLoading : selectIsCollectionFetching
});

const CollectionFullViewContainer = compose (
    connect(mapStateToProps),
    WithSpinner
)(CollectionFullPage);

export default CollectionFullViewContainer;
