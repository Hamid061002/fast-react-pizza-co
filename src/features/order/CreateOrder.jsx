import { useState } from "react";
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, getCart, getTotalPriceCart } from "../cart/cartSlice";
import store from '../../store'
import LinkButton from "../../ui/LinkButton";
import { fetchAddress } from "../user/userSlice";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

function CreateOrder() {
  const dispatch = useDispatch()

  const { userName, status: addressStatus, address, error: errorAddress } = useSelector(state => state.user)
  const navigation = useNavigation()
  const isSubmitting = navigation.state == 'submitting'
  const isLoadingAddress = addressStatus === 'loading'
  const formErrors = useActionData()
  const [withPriority, setWithPriority] = useState(false);
  const cart = useSelector(getCart);
  const totalPriceCart = useSelector(getTotalPriceCart)

  return (
    <div className="flex flex-col gap-5 px-10 py-6">
      <LinkButton to='-1'>&larr; Back</LinkButton>
      <h2 className="text-3xl font-semibold">Ready to order? Let's go!</h2>
      {/* <ul className='flex flex-col gap-1'>
        {cart?.map(item => (<div className="text-lg font-semibold" item={item} key={item.pizzaId}>{`${item.quantity}x ${item.name}`}</div>))}
      </ul> */}
      <Form className="flex flex-col gap-3" method="POST">
        <div className="flex items-center gap-2">
          <label className="text-lg font-semibold basis-32">First Name</label>
          <input
            className="font-semibold shadow inputStyle grow"
            type="text"
            name="customer"
            defaultValue={userName}
            required
          />
        </div>
        <div className="flex items-center gap-2">
          <label className="text-lg font-semibold basis-32">Phone number</label>
          <div className="grow flex flex-col">
            <input className="font-semibold shadow inputStyle w-full" type="tel" name="phone" required />
            {formErrors?.phone && <p className="mt-2 text-sm text-red-500 bg-red-100 px-4 py-1 rounded-full w-fit">{formErrors.phone}</p>}
          </div>
        </div>
        <div className="flex gap-2">
          <label className="text-lg font-semibold basis-32">Address</label>
          <div className="basis-[640px]">
            <input
              className="font-semibold shadow inputStyle w-full"
              type="text"
              name="address"
              defaultValue={address}
              required
              disabled={isLoadingAddress}
            />
            {addressStatus == 'error' && <p className="mt-2 text-sm text-red-500 bg-red-100 px-4 py-1 rounded-full w-fit">{errorAddress} error!</p>}
          </div>
          {!address.latitude && !address.longitude &&
            <Button
              onClick={e => { e.preventDefault(); dispatch(fetchAddress()) }}
              className='self-start px-4 py-2 font-medium'
              disabled={isLoadingAddress}
            >
              Get position
            </Button>}
        </div>
        <div className="flex items-center gap-2">
          <input
            className="shadow accent-yellow-400 size-5"
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label className="font-semibold" htmlFor="priority">Want to yo give your order priority?</label>
        </div>
        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <Button disabled={isSubmitting} className='px-4 py-2 font-semibold'>{isSubmitting ? 'Placing order ...' : 'Order now'}</Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  /* recive data from form */
  const formData = await request.formData()
  /* convert data to object */
  const data = Object.fromEntries(formData)

  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority == 'true'
  }

  const errors = {}

  if (!isValidPhone(order.phone)) {
    errors.phone = 'Invalid phone number!'
  }

  if (Object.keys(errors).length > 0) return errors

  /* post request */
  const newOrder = await createOrder(order)

  store.dispatch(clearCart())

  return redirect(`/order/${newOrder.id}`)
}

export default CreateOrder;
