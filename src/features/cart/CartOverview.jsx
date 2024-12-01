import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { formatCurrency } from "../../utils/helpers";
import { getTotalPriceCart, getTotalQuantityCart } from "./cartSlice";

function CartOverview() {
  const totalCartPrice = useSelector(getTotalPriceCart)
  const totalCartQuantity = useSelector(getTotalQuantityCart)

  if (!totalCartQuantity) return 

  return (
    <div className="sticky bottom-0 w-full flex justify-between bg-stone-800 text-white px-10 py-5">
      <p className="flex gap-2 capitalize text-lg">
        <span>{totalCartQuantity} pizzas</span>
        <span>{formatCurrency(totalCartPrice)}</span>
      </p>
      <Link to="/cart" className="text-xl uppercase">Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
