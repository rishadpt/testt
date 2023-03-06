import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LoadingContext } from "../../App";
import Card from "../../components/cards";
import Menu from "../../components/MenuBar";
import { getCards, getPurchases, rechargeCard } from "../../services/Api";
import { useContext } from "react";
import { getDate } from "../../services/getDate";

const RechargeForm = () => {
  const { loading, setLoading } = useContext(LoadingContext);
  const [amount, setAmount] = useState();
  const [params, setParams] = useState("");
  const [message, setMessage] = useState();
  const [notes, setNotes] = useState();
  const [validity, setValidity] = useState();
  const [cardData, setCardData] = useState([]);
  const [balance, setBalance] = useState(0);
  const getparams = useParams();

  const navigate = useNavigate();

  const handlePurchase = () => {
    const inputDate = new Date()
    inputDate.setMonth(inputDate.getMonth() + Number(validity));

    let data = {
      amount: amount,
      cardNumber: getparams.id,
      expiry: `${inputDate.getTime()/1000}`,
      info: notes,
    };

    rechargeCard(data).then(() => {
      
      navigate("/");
    });
  };

  useEffect(() => {
    getCards().then(({ items }) => {
      console.log(items, "cardrecharge");
      const finding = items.find((item) => {
        return item.cn == getparams.id;
      });
      if (!finding) {
        setLoading(false);
        alert("sorry card not found");
      } else {
        setLoading(false);
        setCardData(finding);
      }
    });
  }, []);

  useEffect(() => {
    setBalance(Number(cardData?.amt).toFixed(2));
  }, [cardData]);

  return (
    <div className="purchase-form">
      <nav>
        <Menu />
      </nav>
      <Card data={cardData} />
      <div className="purchase-form-container">
        <div>
          <p className="balance-label"> Balance :</p>
          <h2>{balance}</h2>
        </div>

        <div>
          <p className="purchase-label">Recharge Amount :</p>
          <input
            onChange={(e) => setAmount(e.target.value)}
            value={amount}
            placeholder="Enter amount"
            type="number"
          />
          <div className="error">{message}</div>
        </div>
        <div>
          <p className="purchase-label">Validity in Months :</p>
          <input
            onChange={(e) => setValidity(e.target.value)}
            value={validity}
            placeholder="Enter Validity"
            type="number"
          />
          <div className="error">{message}</div>
        </div>
        <div>
          <input
            onChange={(e) => setNotes(e.target.value)}
            value={notes}
            placeholder="Add Notes"
            type="text"
          />
          <div className="error">{message}</div>
        </div>
        <button
          onClick={handlePurchase}
          style={{ background: amount <= 0 && "#837e7e" }}
        >
          Recharge
        </button>
      </div>
    </div>
  );
};

export default RechargeForm;
