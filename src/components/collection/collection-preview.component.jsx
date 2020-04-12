import React from 'react';
import {withRouter} from 'react-router-dom';
import './collection-view.styles.scss';

import CollectionItem from '../collection-item/collection-item.component';

const CollectionPreview = ({title, routeName, items, match, history}) => (

    <div className="collection-view">
        <h1 className="title">{title.toUpperCase()}
        <span className="viewAllLink" onClick={() => history.push(`${match.url}/${routeName}`)}>view all</span> 
        </h1>
        <div className="preview">
            {
                items
                .filter( (item,index) => index < 4) // Shows only short list for preview page
                .map(
                    (item) => (
                        <CollectionItem key={item.id} item={item}/>                    
                    )
                )
            }
        </div>

    </div>

);

export default withRouter(CollectionPreview);