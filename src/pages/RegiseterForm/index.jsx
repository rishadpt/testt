import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LoadingContext } from "../../App";
import Menu from "../../components/MenuBar";
import { addCards } from "../../services/Api";
import "./style.scss";

const RegisterForm = () => {
  const [params, setParams] = useState("");
  const getparams = useParams();
  const navigate = useNavigate();
  const { setLoading } = useContext(LoadingContext);
  console.log(params);
  useEffect(() => {
    setParams(getparams.id);
  }, []);

  const cnRef = useRef();
  const cstnmRef = useRef();
  const amtRef = useRef();
  const expRef = useRef();

  const registerHandler = () => {
    const cn = cnRef.current.value;
    const cstnm = cstnmRef.current.value;
    const amt = amtRef.current.value;
    const exp = expRef.current.value;
    if (cn && cstnm && amt && exp) {
      setLoading(true);
      const inputDate = new Date();
      inputDate.setMonth(inputDate.getMonth() + Number(exp));
      const data = {
        card: {
          customerName: cstnm,
          cardNumber: cn,
          amount: Number(amt),
          expiry: `${inputDate.getTime() / 1000}`,
        },
        transaction: {
          cardNumber: cn,
          amount: Number(amt),
          expiry: `${inputDate.getTime() / 1000}`,
        },
      };
      addCards(JSON.stringify(data))
        .then((data) => {
          setLoading(false);
          alert("card registerd");
          navigate("/cards");
        })
        .catch((err) => {
          setLoading(false);
          alert("something went to wrong");
        });
    }
  };
  return (
    <div className="reg-form-page">
      <nav>
        <h1>Register</h1>
        <Menu />
      </nav>
      <div>
        <form>
          <p>Card Number</p>
          <input
            ref={cnRef}
            defaultValue={params}
            type="number"
            placeholder="card number"
            name=""
            id=""
          />
          <p>Customer Name</p>
          <input ref={cstnmRef} type="text" placeholder="name" name="" id="" />
          <p>Amount</p>
          <input
            ref={amtRef}
            type="number"
            placeholder="amount"
            name=""
            id=""
          />
          <p>Validity</p>
          <div className="input-container">
            <span>in Months</span>
            <input
              ref={expRef}
              defaultValue={3}
              type="number"
              placeholder="in month"
              name=""
              id=""
            />
          </div>
          <div onClick={registerHandler} className="button">
            Register
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
