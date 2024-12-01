import { useSelector } from "react-redux";
import CreateUser from "../features/user/CreateUser";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

function Home() {
  const userName = useSelector(state => state.user.userName)
  const navigate = useNavigate()

  return (
    <div className="flex flex-col items-center justify-center gap-10 h-full">
      <h1 className="flex flex-col text-center">
        <span className="text-3xl font-semibold">The best pizza.</span>
        <span className="text-3xl font-semibold text-yellow-500">Straight out of the oven, straight to you.</span>
      </h1>
      {
        userName ? <Button onClick={() => navigate('/menu')} to className='px-4 py-2 font-medium text-lg'>Continue ordering, {userName}</Button> : <CreateUser /> 
      }
      
    </div>
  );
}

export default Home;
