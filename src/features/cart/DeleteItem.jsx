import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { decreaseItemQuantity, deleteItem, getCart } from "./cartSlice";
import Button from '../../ui/Button';


const DeleteItem = ({ pizzaId, children, className }) => {
  // const cart = useSelector(getCart)
  const dispatch = useDispatch()

  // function handleDeleteItem() {
  //   const thisCartId = cart?.find(item => item.pizzaId == pizzaId)
  //   thisCartId.quantity > 1 ? dispatch(decreaseItemQuantity(pizzaId)) : dispatch(deleteItem(pizzaId))
  // }

  return <Button onClick={() => dispatch(deleteItem(pizzaId))} className={className}>{children}</Button>
}

export default DeleteItem
