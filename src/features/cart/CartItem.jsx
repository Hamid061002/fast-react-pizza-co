import { formatCurrency } from "../../utils/helpers";
import DeleteItem from "./DeleteItem";
import UpdateItemQuantity from "./UpdateItemQuantity";

function CartItem({ item }) {
  const { pizzaId, name, quantity, totalPrice } = item;





  return (
    <li className="flex justify-between items-center py-3 w-full">
      <p className="font-semibold text-lg">
        {quantity}&times; {name}
      </p>
      <div className="flex items-center gap-10">
        <p className="font-bold text-lg">{formatCurrency(totalPrice)}</p>
        <UpdateItemQuantity pizzaId={pizzaId} />
        <div>
          <DeleteItem className='text-sm font-semibold px-4 py-1.5' pizzaId={pizzaId}>DELETE</DeleteItem>
        </div>
      </div>
    </li>
  );
}

export default CartItem;
