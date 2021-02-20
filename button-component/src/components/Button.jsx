import React from 'react';
import './Button.css'


export default function Button(props) {
    let btnClassArray = [];
    let text = 'Default';

    // https://flaviocopes.com/how-to-uppercase-first-letter-javascript/
    function capitalize(word) {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }


    // variant
    if (props.variant === 'outline' || props.variant === 'text') {
        btnClassArray = [...btnClassArray, props.variant];
    } else if (props.variant === 'disable-shadow') {
        btnClassArray = [...btnClassArray, props.variant];
    }

    // &:hover, &:focus
    if (props.state === 'hover-focus') {
        btnClassArray = [...btnClassArray, props.state];
    }
    
    // text
    if (props.isDisabled) {
        text = 'Disabled';
    } else if (props.color === 'secondary' || props.color === 'danger') {
        text = capitalize(props.color);
    }
    
    // icon position
    if (props.iconPosition === 'start' || props.iconPosition === 'end') {
        btnClassArray = [...btnClassArray, 'icon-' + props.iconPosition];
    }
    
    // size
    if (props.size === 'sm' || props.size === 'md' || props.size === 'lg') {
        btnClassArray = [...btnClassArray, props.size];
    }
    
    // color
    if (!(props.color === undefined)) {
        btnClassArray = [...btnClassArray, props.color];
    }

    btnClassArray = btnClassArray.join(' '); // creates a string from array items

    
    return (
        <button className={`${btnClassArray}`} disabled={props.isDisabled}>
            {text}
        </button>
    );
}