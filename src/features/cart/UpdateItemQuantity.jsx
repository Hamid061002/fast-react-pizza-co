import React from 'react'
import Button from '../../ui/Button'
import { decreaseItemQuantity, deleteItem, getCart, increaseItemQuantity } from './cartSlice'
import { useDispatch, useSelector } from 'react-redux'

const UpdateItemQuantity = ({ pizzaId }) => {
  const dispatch = useDispatch()

  const pizza = useSelector(state => state.cart.cart.find(item => item.pizzaId == pizzaId))
  
  function handleIncreaseItem() {
    dispatch(increaseItemQuantity(pizzaId))
  }

  function handleDecreaseItem() {
    pizza.quantity > 1 ? dispatch(decreaseItemQuantity(pizzaId)) : dispatch(deleteItem(pizzaId))
  }

  return (
    <div className="flex items-center gap-3 self-end text-xl">
      <Button onClick={handleDecreaseItem} className='px-3 text-2xl font-medium'>-</Button>
      <span className="font-semibold">{pizza?.quantity}</span>
      <Button onClick={handleIncreaseItem} className='px-3 text-2xl font-medium'>+</Button>
    </div>
  )
}

export default UpdateItemQuantity
