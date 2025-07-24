import Dishes from "../Dishes/Dishes.tsx";
import Cart from "../Cart/Cart.tsx";

const Home = () => {

  return (
    <div className="row mt-2">
      <div className="col-7">
        <Dishes/>
      </div>
      <div className="col-5">
        <Cart/>
      </div>
    </div>
  );
};

export default Home;