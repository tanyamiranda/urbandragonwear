import React from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {withRouter} from 'react-router-dom';

import './directory.styles.css'

import MenuItem from '../menu-item/menu-item.component';

import {selectDirectorySections} from '../../redux/directory/directory.selectors'

const Directory = ({sections}) => (
            
    <div className="directory-menu">
        
        {                
            sections.map(
                ({id, ...sectionProps}) => (
                    <MenuItem key={id} {...sectionProps}/>
                )
            )
        }
    </div>
    
        
    /*

    The "...sectionProps" notation above means that each value in the section objects 
    will be passed as parameters in the MenuItem coponent. It is equivalent to spilling
    out each name={value} pair as the code below:
    
    this.state.sections.map(
        ({title, imageUrl, id, size}) => (
            <MenuItem key={id} title={title} imageUrl={imageUrl} size={size} linkUrl={linkUrl}/>
        )
    )


    The above code is a short way of listing name/value pairs in the collection,
    but cleaner since the function definition deconstructs the values 
    from the sections object and there is no need to prefix the 
    parameters (section.id, section.title, section.imageUrl) with 
    the section object instance variable.  

    this.state.sections.map( 
        section => (
            <MenuItem key={section.id} title={section.title} imageUrl={section.imageUrl} />
        )
    )

    

    */
        
)

const mapStateToProps = createStructuredSelector ({
    sections : selectDirectorySections
});

export default withRouter(connect(mapStateToProps)(Directory)); 