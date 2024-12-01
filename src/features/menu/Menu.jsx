import { useLoaderData } from "react-router-dom";
import { getMenu } from "../../services/apiRestaurant";
import MenuItem from "./MenuItem";

function Menu() {
  const menuData = useLoaderData()

  return <ul className="flex flex-col divide-y-2 px-10 py-6">
    {
      menuData.map(item => <MenuItem pizza={item} key={item.id} />)
    }
  </ul>;
}

export async function loader() {
  return await getMenu()
}

export default Menu;
