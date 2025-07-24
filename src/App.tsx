import Home from "./containers/Home/Home.tsx";
import NewDish from "./containers/NewDish/NewDish.tsx";
import {Route, Routes} from "react-router-dom";
import Checkout from "./containers/Checkout/Checkout.tsx";
import CustomerForm from "./containers/CustomerForm/CustomerForm.tsx";
import EditDish from "./containers/EditDish/EditDish.tsx";
import Orders from "./containers/Orders/Orders.tsx";
import Layout from "./components/Layout/Layout.tsx";
import './App.css'

const App = () => {

  return (
    <Layout>
      <Routes>
        {
          ['/', '/dishes'].map(path => (
            <Route path={path} element={(<Home/>)}/>
          ))
        }
        <Route path="/new-dish" element={(<NewDish/>)}/>
        <Route path="/dishes/edit/:id" element={<EditDish/>}/>
        <Route path="/checkout" element={<Checkout/>}>
          <Route path="continue" element={<CustomerForm/>}/>
        </Route>
        <Route path="/orders" element={<Orders/>}/>
        <Route path="*" element={<h1>Not Found</h1>}/>
      </Routes>
    </Layout>
  )
};

export default App;
