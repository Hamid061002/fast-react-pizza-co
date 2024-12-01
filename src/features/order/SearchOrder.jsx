import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const SearchOrder = () => {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault()
    if (!query) return
    navigate(`/order/${query}`)
    setQuery('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <input className='rounded-full py-3 px-5 outline-none bg-yellow-100 min-w-96' type="text" placeholder='Search order #' value={query} onChange={e => setQuery(e.target.value)} />
    </form>
  )
}

export default SearchOrder
