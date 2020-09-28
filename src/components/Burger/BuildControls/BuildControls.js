import React from 'react';
import BuildControl from './BuildControl/BuildControl';
import './BuildControls.css'

const BuildControls = (props) => {
    // console.log(props.addIngredient)
    // console.log(props.disabled)
    // console.log(props.purchasable)
    const controls =[
        {label : 'Salad', type : 'salad'},
        {label : 'Bacon', type : 'bacon'},
        {label : 'Cheese', type : 'cheese'},
        {label : 'Meat', type : 'meat'}
    ]
    return (
        <div className='BuildControls'>
            <p>Current Price : <strong>{props.price.toFixed(2)}</strong></p>
            {controls.map(ctrl => (
                 <BuildControl 
                 key={ctrl.label} 
                 label={ctrl.label}
                 added={() => props.addIngredient(ctrl.type)}
                 removed={() => props.removeIngredient(ctrl.type)}
                 disabled={props.disabled[ctrl.type]}/>
            ))}
            <button className='OrderButton' disabled={!props.purchasable} onClick={props.ordered}>Order Now</button>
            
        </div>
    );
};

export default BuildControls;