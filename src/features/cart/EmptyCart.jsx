import LinkButton from '../../ui/LinkButton';

function EmptyCart() {
  return (
    <div className='flex flex-col gap-5 px-10 py-6'>
      <LinkButton to='/menu'>&larr; Back to menu</LinkButton>

      <p className='font-medium text-lg'>Your cart is still empty. Start adding some pizzas :)</p>
    </div>
  );
}

export default EmptyCart;
