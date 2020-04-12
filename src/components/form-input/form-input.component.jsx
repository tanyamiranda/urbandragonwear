import React from 'react';

import './form-input.styles.scss';

const FormInput = ({onChangeEvent, label, ...otherProps}) => (

    <div className="group">
        <input className="form-input" onChange={onChangeEvent} {...otherProps} />

        {
            /* The code below is as follows:
                if label exists then
                    Display label
                    If user types anything in this input, use shrink style on the label
                else
                    Display no label
                end if
            */ 

            label ? // if label exists
            (
                <label className={`${
                    otherProps.value.length ? 'shrink' : ''} 
                    form-input-label`} 
                    >
                    {label}
                </label>
            ):
            null //else display nothing
        }
    </div>
);

export default FormInput;