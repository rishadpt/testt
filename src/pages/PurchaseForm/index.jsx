import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Card from "../../components/cards";
import "./style.scss";
import { addPurchase, getCards } from "../../services/Api";
import { useRef } from "react";
import { LoadingContext } from "../../App";
import { useContext } from "react";
import Menu from "../../components/MenuBar";

const PurchaseForm = () => {
  const { loading, setLoading } = useContext(LoadingContext);
  const [cardData, setCardData] = useState([]);
  const [balance, setBalance] = useState(0);
  const [amount, setAmount] = useState();
  const [notes, setNotes] = useState("");
  const [message, setMessage] = useState("");
  const params = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    setLoading(true);
    getCards().then(({ items }) => {
      const finding = items.find((item) => {
        return item.cn == params.id;
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

  const inputHandler = (e) => {
    if (e.target.value > Number(cardData.amt)) {
      setMessage("insufficient balance in your card");
      setBalance(0);
    } else {
    
      setMessage("");
      const blnc = Number(cardData.amt) - e.target.value;
      setBalance(blnc);
    }
    setAmount(e.target.value);
  };


  const handlePurchase = () => {
    console.log(typeof cardData.cn);
    if (message === "" && amount) {
      setLoading(true);
      const body = {
        cardNumber: cardData.cn,
        amount: Number(amount),
        info: notes? notes : ''
      };
      addPurchase(JSON.stringify(body))
        .then((data) => {
          navigate("/purchases");
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          alert("something went to wrong!!!");
        });
    }
  };
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
          <p className="purchase-label">Purchase Amount :</p>
          <input
            onChange={(e) => inputHandler(e)}
            value={amount}
            placeholder="Enter amount"
            type="number"
          />
          <div className="notes_container">
            <input
              onChange={(e) => {
                setNotes(e.target.value);
              }}
              value={notes}
              placeholder="Add a note"
              type="text"
            />
          </div>
          <div className="error">{message}</div>
        </div>

        <button
          onClick={handlePurchase}
          style={{ background: (message !== "" || !amount) && "#837e7e" }}
        >
          Purchase
        </button>
      </div>
    </div>
  );
};

export default PurchaseForm;
