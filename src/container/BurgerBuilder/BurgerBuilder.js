import React, {Component} from 'react'
import Auxiliary from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES ={
    salad : 0.3,
    cheese : 0.6,
    meat : 0.7,
    bacon : 0.8
}

class BurgerBuilder extends Component{
    state = {
        ingredients : {
            salad : 0,
            bacon : 0,
            cheese : 0,
            meat : 0
        },
        totalPrice : 4,
        purchasable : false,
        purchasing : false
    }

    updatePurchasableState = (ingredients) =>{
        const sum = Object.keys(ingredients)
        .map(igKey => {
            return ingredients[igKey]
        })
        .reduce((sum, el) =>{
            return sum + el
        }, 0);

        this.setState({purchasable : sum > 0})
    }
    purchaseHandler = () => {
        this.setState({purchasing : true})
    }
    addIngredientHandler = (type) =>{
        const oldCount = this.state.ingredients[type];
        const updateCount = oldCount + 1;
        const updateIngredients = {
            ...this.state.ingredients
        }
        updateIngredients[type] = updateCount;
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + INGREDIENT_PRICES[type];
        this.setState({
            ingredients : updateIngredients,
            totalPrice : newPrice
        });
        this.updatePurchasableState(updateIngredients)
    }

    removeIngredientHandler = (type) =>{
        const oldCount = this.state.ingredients[type];
        if(oldCount <= 0){
            return;
        }
        const updateCount = oldCount - 1;
        const updateIngredients = {
            ...this.state.ingredients
        }
        updateIngredients[type] = updateCount;
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - INGREDIENT_PRICES[type];
        this.setState({
            ingredients : updateIngredients,
            totalPrice : newPrice
        });
        this.updatePurchasableState(updateIngredients)
     }
     purchaseCancelHandler = () =>{
         this.setState({purchasing : false})
     }
     purchaseContinueHandler = () => {
         alert('You are Continued!');
     }
    render () {
        const disableInfo = {
            ...this.state.ingredients
        }
        for(let key in disableInfo){
            disableInfo[key] = disableInfo[key] <= 0;
            // console.log(disableInfo[key])
        }
        return (
            <Auxiliary>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    <OrderSummary ingredients ={this.state.ingredients}
                    price={this.state.totalPrice}
                    purchaseCancelled={this.purchaseCancelHandler}
                    purchaseContinued={this.purchaseContinueHandler}/>
                </Modal>
                <Burger ingredients = {this.state.ingredients}></Burger>
                <BuildControls 
                removeIngredient={this.removeIngredientHandler} 
                addIngredient = {this.addIngredientHandler}
                disabled={disableInfo}
                price={this.state.totalPrice}
                purchasable ={this.state.purchasable}
                ordered ={this.purchaseHandler}/>
            </Auxiliary>
        );
    }
}
export default BurgerBuilder;

