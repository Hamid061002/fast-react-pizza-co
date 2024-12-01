// Test ID: IIDSAT

import { useFetcher, useLoaderData } from "react-router-dom";
import { getOrder } from "../../services/apiRestaurant";
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from "../../utils/helpers";
import OrderItem from "./OrderItem";
import { useEffect } from "react";
import UpdateOrder from "./UpdateOrder";

function Order() {
  const fetcher = useFetcher()

  useEffect(() => {
    if (!fetcher.data && fetcher.state == 'idle') fetcher.load('/menu')
  }, [fetcher])

  const order = useLoaderData()
  // Everyone can search for all orders, so for privacy reasons we're gonna gonna exclude names or address, these are only for the restaurant staff
  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = order;
  const deliveryIn = calcMinutesLeft(estimatedDelivery);

  return (
    <div className="flex flex-col gap-5 px-10 py-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Order #{id} status</h2>

        <div className="space-x-2">
          {priority && <span className="rounded-full px-4 py-1 uppercase bg-red-500 text-white">Priority</span>}
          <span className="rounded-full px-4 py-1 uppercase bg-green-500 text-white">{status} order</span>
        </div>
      </div>

      <div className="flex flex-wrap justify-between items-center gap-4 bg-stone-200 p-4">
        <p className="font-medium">
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : "Order should have arrived"}
        </p>
        <p className="text-sm text-stone-500">(Estimated delivery: {formatDate(estimatedDelivery)})</p>
      </div>

      <ul className='divide-y'>
        {
          cart.map(item =>
            <OrderItem
              item={item}
              key={item.id}
              ingredients={fetcher.data?.find(el => el.id == item.pizzaId).ingredients}
              isLoadingIngredients={fetcher.state == 'loading'}
            />)
        }
      </ul>

      <div className="flex flex-col gap-3 bg-stone-200 p-4">
        <p className="text-sm">Price pizza: {formatCurrency(orderPrice)}</p>
        {priority && <p className="text-sm">Price priority: {formatCurrency(priorityPrice)}</p>}
        <p className="font-semibold">To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}</p>
      </div>

      {!priority && <UpdateOrder />}
    </div>
  );
}

export async function loader({ params }) {
  return await getOrder(params.orderId)
}

export default Order;
