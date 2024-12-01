import React from 'react'
import Button from '../../ui/Button'
import { useFetcher } from 'react-router-dom'
import { updateOrder } from '../../services/apiRestaurant'

const UpdateOrder = () => {
  const fetcher = useFetcher()

  return <fetcher.Form method='PATCH' className='text-end'>
    {
      fetcher.state == 'loading' ? <Button className='px-4 py-2 font-medium'>Loading...</Button> :
      <Button className='px-4 py-2 w-fit font-medium'>Make prority</Button>
    }
  </fetcher.Form>
}

export async function action({ request, params }) {
  const data = { priority: true }
  await updateOrder(params.orderId, data)
  return null
}

export default UpdateOrder
