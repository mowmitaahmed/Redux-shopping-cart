
import {DECREASE, INCREASE, CLEAR_CART, REMOVE, GET_TOTAL, TOGGLE_AMOUNT} from './actions';
// reducer
function reducer(state, action) {

    // console.log({state, action});
    if (action.type === DECREASE) {
        let tempCart = [];
        if (action.payload.amount === 1) {
            tempCart = state.cart.filter(cartItem=> cartItem.id !== action.payload.id);
        } else {
            tempCart = state.cart.map(cartItem => {
                if (cartItem.id === action.payload.id) {
                  cartItem = { ...cartItem, amount: cartItem.amount - 1 };
                }
                return cartItem;
            });
        }
          return { ...state, cart: tempCart };
    }
    else if(action.type === CLEAR_CART){
      return {...state, cart: []};
    }
    else if(action.type === INCREASE){
        let tempCart = state.cart.map(cartItem => {
            if (cartItem.id === action.payload.id) {
              cartItem = { ...cartItem, amount: cartItem.amount + 1 };
            }
            return cartItem;
          });
          return { ...state, cart: tempCart };
    }
    else if(action.type === REMOVE){
      return {...state,cart: state.cart.filter(cartItem=> cartItem.id !== action.payload.id)}
    }
    else if(action.type === GET_TOTAL){
      let {total, amount} = state.cart.reduce((cartTotal, cartItem)=>{
          const {price, amount} = cartItem;
          const itemTotal = price*amount;

          cartTotal.total += itemTotal;
          cartTotal.amount += amount;
          return cartTotal;
      },{
          total: 0,
          amount: 0
      });
      total = parseFloat(total.toFixed(2));
      return {...state, total, amount};
    }
    else if(action.type === TOGGLE_AMOUNT){
        return {...state, cart: state.cart.map(cartItem =>{
            if (cartItem.id === action.payload.id) {
                if (action.payload.toggle === 'inc') {
                    return cartItem = {...cartItem, amount: cartItem.amount+1};
                }
                if (action.payload.toggle === 'dec') {
                    return cartItem = {...cartItem, amount: cartItem.amount-1};
                }
            }
            return cartItem;
        })};
    }
    else{
      return state;
    }
    return state;
  }

  export default reducer;