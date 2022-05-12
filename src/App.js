import { BrowserRouter, Routes, Route } from "react-router-dom";
import BasicCounter from "./pages/basic/Counter/classComponent";
import BasicReact from "./pages/basic/React/index";
import BasicLogin from "./pages/basic/Login/index";
import BasicHome from "./pages/basic/Home/index";
import BasicOrder from "./pages/basic/order/order";
import SignUp from "./pages/signUp";
import SignIn from "./pages/signIn";
import Home from "./pages/Home/index";
import Detail from "./pages/detail/index";
import Order from "./pages/order/index";
import Payment from "./pages/payment/index";
import ViewAll from "./pages/viewall/index";
import ManageMovie from "./pages/managemovie";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="basic/counter" element={<BasicCounter />} />
        <Route path="basic/react" element={<BasicReact />} />
        <Route path="basic/login" element={<BasicLogin />} />
        <Route path="basic/home" element={<BasicHome />} />
        <Route path="basic/order" element={<BasicOrder />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="signin" element={<SignIn />} />
        <Route path="home" element={<Home />} />
        <Route path="detail" element={<Detail />} />
        <Route path="order" element={<Order />} />
        <Route path="payment" element={<Payment />} />
        <Route path="viewall" element={<ViewAll />} />
        <Route path="managemovie" element={<ManageMovie />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
