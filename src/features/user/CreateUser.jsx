import { useState } from 'react';
import Button from '../../ui/Button';
import { useDispatch } from 'react-redux';
import { updateName } from './userSlice';
import { useNavigate } from 'react-router-dom';

function CreateUser() {
  const [username, setUsername] = useState('');

  const dispatch = useDispatch()
  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault();
    if(username) dispatch(updateName(username))
    setUsername('')
    navigate('/menu')
  }

  return (
    <form className='flex flex-col items-center gap-3' onSubmit={handleSubmit}>
      <p className='text-2xl font-semibold'>👋 Welcome! Please start by telling us your name:</p>

      <input
        className='px-5 py-2 rounded-full border text-lg outline-none'
        type="text"
        placeholder="Your full name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      {username !== '' && (
        <div>
          <Button className='text-base px-4 py-2 font-semibold'>Start ordering</Button>
        </div>
      )}
    </form>
  );
}

export default CreateUser;
