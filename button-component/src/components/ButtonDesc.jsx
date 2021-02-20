import React from 'react';
import Button from './Button'

export default function ButtonDesc(props) {
    let description = '<Button ';
    let descClass;

    // &:hover, &:focus
    if (props.state === 'hover-focus') {
        description = '&:hover, &:focus';
        descClass = 'hover-focus';

        if (props.desc === '') {
            description = '';
        }
    } else if (!(props.state === 'hover-focus')) {
        description += `${props.desc}`;
        description += ' />';
    }
    return (
        <figure>
            <figcaption className={descClass}>
                {description}
            </figcaption>
            <Button 
                color={props.color}
                state={props.state}
                variant={props.variant}
                isDisabled={props.isDisabled}
                iconPosition={props.iconPosition}
                size={props.size}
            />
        </figure>
    );
}