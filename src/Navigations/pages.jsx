import React from "react";
import { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { LoadingContext } from "../App";
import RequiredAuth from "../components/Protected/RequiredAuth";
import CardsPage from "../pages/cards";
import Home from "../pages/Home";
import Loading from "../pages/loading";
import PurchaseForm from "../pages/PurchaseForm";
import MakePurchase from "../pages/Purchases";
import Purchase from "../pages/purchasesDetails";
import Recharge from "../pages/recharge";
import RechargeForm from "../pages/rechargeForm";
import RegisterForm from "../pages/RegiseterForm";
import Register from "../pages/register";
import Auth from "../submodule/Auth/Auth";

const Pages = () => {
  const { loading } = useContext(LoadingContext);

  return (
    <div>
      {loading && <Loading />}

      <Routes>
        <Route
          path="/signin"
          element={
            <Auth
              head="Welcome to Giftly" //form heading
              para="Login to enjoy the services" //form paragraph
              logo="/images/ios icon.png"
              bg="#fff" //background color
              formbg="#fff" //form Background color
              type={0} //Type 0 means login
            />
          }
        />
        <Route
          path="/signup"
          element={
            <Auth
              head="Welcome to Giftly" //form heading
              para="signup to enjoy the services" //form paragraph
              logo="/images/ios icon.png"
              bg="#fff"
              formbg="#fff" //form Background color
              type={1} // type 1 means signup
            />
          }
        />
        <Route
          path="/forgot"
          element={
            <Auth
              head="Forgot Password" //form heading
              para="Forgot your Password easy" //form paragraph
              logo="/images/ios icon.png"
              bg="#fff"
              formbg="#fff" //form Background color
              type={2} // type 1 means signup
            />
          }
        />

        <Route
          path="/"
          element={
            <RequiredAuth>
              <Home />
            </RequiredAuth>
          }
        />

        <Route
          path="/cards"
          element={
            <RequiredAuth>
              <CardsPage />
            </RequiredAuth>
          }
        />

        <Route
          path="/purchases"
          element={
            <RequiredAuth>
              <Purchase />
            </RequiredAuth>
          }
        />

        <Route
          path="/register"
          element={
            <RequiredAuth>
              <Register />
            </RequiredAuth>
          }
        />

        <Route
          path="/addpurchase"
          element={
            <RequiredAuth>
              <MakePurchase />
            </RequiredAuth>
          }
        />

        <Route
          path="/addpurchase/:id"
          element={
            <RequiredAuth>
              <PurchaseForm />
            </RequiredAuth>
          }
        />

        <Route
          path="/register/:id"
          element={
            <RequiredAuth>
              <RegisterForm />
            </RequiredAuth>
          }
        />
        <Route
          path="/recharge"
          element={
            <RequiredAuth>
              <Recharge />
            </RequiredAuth>
          }
        />
        <Route
          path="/recharge/:id"
          element={
            <RequiredAuth>
              <RechargeForm />
            </RequiredAuth>
          }
        />
      </Routes>
    </div>
  );
};

export default Pages;
