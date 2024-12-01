import { Link } from 'react-router-dom';
import LinkButton from '../../ui/LinkButton';
import Button from '../../ui/Button';
import CartItem from './CartItem';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart, getCart } from './cartSlice';
import EmptyCart from './EmptyCart';

function Cart() {
  const dispatch = useDispatch()
  const userName = useSelector(state => state.user.userName)
  const cart = useSelector(getCart);

  if (!cart.length) return <EmptyCart />

  return (
    <div className='flex flex-col gap-5 px-10 py-6'>
      <LinkButton to='/menu'>&larr; Back to menu</LinkButton>
      <h2 className='text-2xl font-semibold tracking-wide'>Your cart, {userName}</h2>
      <ul className='flex flex-col divide-y-2'>
        {cart.map(item => (<CartItem item={item} key={item.pizzaId} />))}
      </ul>
      <div className='flex gap-2'>
        <Link to="/order/new">
          <Button className='uppercase font-semibold px-4 py-2'>
            Order pizzas
          </Button>
        </Link>
        <button
          onClick={() => dispatch(clearCart())}
          className='rounded-full uppercase bg-white border-2 border-gray-300 px-4 py-2 text-gray-400 font-semibold'>Clear cart</button>
      </div>
    </div>
  );
}

export default Cart;
