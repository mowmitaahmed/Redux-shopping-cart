import React from "react";
import CartItem from "./CartItem";
import {connect} from "react-redux";
import {CLEAR_CART, GET_TOTAL} from '../actions';
import { useEffect } from "react";

const CartContainer = ({ cart = [], total, dispatch }) => {
  useEffect(()=>{
    dispatch({type: GET_TOTAL});
  });
  if (cart.length === 0) {
    return (
      <section className="cart">
        {/* cart header */}
        <header>
          <h2>your Cart</h2>
          <h4 className="empty-cart">is currently empty</h4>
        </header>
      </section>
    );
  }
  return (
    <section className="cart">
      {/* cart header */}
      <header>
        <h2>your Cart</h2>
      </header>
      {/* cart items */}
      <article>
        {cart.map(item => {
          return <CartItem key={item.id} {...item} />;
        })}
      </article>
      {/* cart footer */}
      <footer>
        <hr />
        <div className="cart-total">
          <h4>
            total <span>${total}</span>
          </h4>
        </div>
        <button onClick={()=> dispatch({type: CLEAR_CART})} className="btn clear-btn">clear cart</button>
      </footer>
    </section>
  );
};

function mapStateToProps(store) {
  const {cart, total} = store;
  return {cart, total};
}
export default connect(mapStateToProps)(CartContainer);
