import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { LoadingContext } from "../../App";
import Menu from "../../components/MenuBar";
import PurchaseCards from "../../components/purchaseCards";
import { getPurchases } from "../../services/Api";
import "./style.scss";

const Purchase = () => {
  const [cardId, setCardId] = useState("");
  const [purchaseData, setPurchaseData] = useState([]);
  const [searchPrams] = useSearchParams();
  const { setLoading } = useContext(LoadingContext);
  var typeP =  searchPrams.get("type")
  const [type,setType] = useState(typeP === "credit" ? "credit" : "debit")
  const Navigate = useNavigate();


  const handleCredit = ()=>{
  
  setType("credit")
  if(searchPrams.get("id")){
    return Navigate(`?id=${searchPrams.get("id")}&type=credit`);
  }
  Navigate('?type=credit');
  }

  const handleDebit = ()=>{
    setType("debit")
    if(searchPrams.get("id")){
      return Navigate(`?id=${searchPrams.get("id")}&type=debit`);
    }
    Navigate('?type=debit')
  }
  

  useEffect(() => {
   
    let body = {type: typeP === "credit" ? "credit" : "debit"};

    if (searchPrams.get("id")) {
      body = { cardNumber: searchPrams.get("id"),type: typeP === "credit" ? "credit" : "debit" };
      setCardId(searchPrams.get("id"));
    }
    setLoading(true);
    getPurchases(body)
      .then((data) => {
        setLoading(false);
        setPurchaseData(data.items);
      })
      .catch(() => {
        setLoading(false);
        return Navigate("/signin");
      });
  }, [type]);

  return (
    <div className="purchases">
      <div className="top-bar">
        <h1>
          Transactions : <span>{cardId}</span>
        </h1>
       
        <Menu />
      </div>
      <div className="credit_container">
        <div className={type === 'credit' ? 'type__active' :''} >
        <h3  onClick={handleCredit}>CREDIT</h3>
        </div>
        <div className={type === 'debit' ? 'type__active' :''}   >
        <h3  onClick={handleDebit}>DEBIT</h3>
        </div>

        </div>
      <div className="cards">
        {purchaseData.map((item, i) => (
          <PurchaseCards key={i} data={item} />
        ))}
      </div>
    </div>
  );
};

export default Purchase;
