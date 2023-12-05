import { useContext } from "react";
import { CartContext } from "../store/shopping-cart-context";

export default function Cart() {
  const { shoppingCart, handleUpdateCartItemQuantity } = useContext(CartContext);

  const totalPrice = shoppingCart.items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const formattedTotalPrice = `$${totalPrice.toFixed(2)}`;

  return (
    // a more legacy way to consume context is with CartContext.Consumer, not implemented below
    <div id="cart">
      {shoppingCart.items.length === 0 && <p>No items in cart!</p>}
      {shoppingCart.items.length > 0 && (
        <ul id="cart-items">
          {shoppingCart.items.map((item) => {
            const formattedPrice = `$${item.price.toFixed(2)}`;

            return (
              <li key={item.id}>
                <div>
                  <span>{item.name}</span>
                  <span> ({formattedPrice})</span>
                </div>
                <div className="cart-item-actions">
                  <button onClick={() => handleUpdateCartItemQuantity(item.id, -1)}>
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button onClick={() => handleUpdateCartItemQuantity(item.id, 1)}>
                    +
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
      <p id="cart-total-price">
        Cart Total: <strong>{formattedTotalPrice}</strong>
      </p>
    </div>
  );
}
