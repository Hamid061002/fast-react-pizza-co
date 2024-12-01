import { useDispatch, useSelector } from "react-redux";
import Button from "../../ui/Button";
import { formatCurrency } from "../../utils/helpers";
import { addItem, getCart, increaseItemQuantity } from "../cart/cartSlice";
import DeleteItem from "../cart/DeleteItem";
import UpdateItemQuantity from "../cart/UpdateItemQuantity";

function MenuItem({ pizza }) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;

  
  const cart = useSelector(getCart)
  const thisPizza = cart?.find(item => item.pizzaId == id)

  const dispatch = useDispatch()

  function handleAddItemToCart() {
    const newPizza = {
      pizzaId: id,
      name,
      quantity: 1,
      unitPrice,
      totalPrice: unitPrice * 1
    }

    if (!cart.find(item => item.pizzaId == newPizza.pizzaId)) {
      dispatch(addItem(newPizza))
    } else dispatch(increaseItemQuantity(newPizza.pizzaId))
  }

  return (
    <li className={`flex gap-4 p-3 ${thisPizza ? 'bg-amber-50 ' : ''}`}>
      <img className={`size-32 ${soldOut ? 'grayscale opacity-80' : ''}`} src={imageUrl} alt={name} />
      <div className="grow flex flex-col">
        <p className="text-lg font-semibold">{name}</p>
        <p className="text-sm italic text-stone-500 capitalize">{ingredients.join(', ')}</p>
        <div className="mt-auto">
          {!soldOut ? <p>{formatCurrency(unitPrice)}</p> : <p>Sold out</p>}
        </div>
      </div>
      {
        !soldOut ?
          thisPizza ?
          <UpdateItemQuantity pizzaId={id} /> :
          <Button onClick={handleAddItemToCart} className='h-fit justify-self-end text-sm px-4 py-2 font-semibold self-end'>ADD TO CART</Button> : ''
      }
    </li>
  );
}

export default MenuItem;
