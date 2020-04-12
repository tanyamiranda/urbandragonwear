import React from 'react';
import {withRouter} from 'react-router-dom';
import './menu-item.styles.scss';


/* history, match, location are properties sent upon each request when using react-router-dom*/

const MenuItem = ({title, imageUrl, size, linkUrl, match, history}) => (

    <div 
        className={`menu-item ${size}`} 
        onClick={() => history.push(`${match.url}${linkUrl}`)}> 
        
        {/* Created separate div to control hover zoom action without affecting content zoom*/}
        <div className="background-image" 
            style={{
                backgroundImage: `url( ${imageUrl})` 
            }}
        />
        
        <div className="content">
            <h1 className="title">{title}</h1>
            <span className="subtitle">shop now</span>
        </div>  
    </div>

);
/*
withRouter() returns an HOC - Higher Order Component
Read more about HOC here-> https://reactjs.org/docs/higher-order-components.html
*/

export default withRouter(MenuItem);  