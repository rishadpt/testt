import React, { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { LoadingContext } from "../../App";
import Card from "../../components/cards";
import Menu from "../../components/MenuBar";
import { getCards } from "../../services/Api";
import "./style.scss";

function CardsPage() {
  const { setLoading } = useContext(LoadingContext);
  const [cardData, setCardData] = useState([]);

  useEffect(() => {
    setLoading(true);
    getCards()
      .then((data) => {
        setCardData(data.items);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);
  console.log(cardData);
  return (
    <div className="Home-page">
      <div className="top-bar">
        <h1>Registered Cards</h1>
        <Menu />
      </div>
      <div className="card-container">
        {cardData.map((item, i) => (
          <Link key={i} to={`/purchases?id=${item.cn}&type=credit`}>
            <Card data={item} />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default CardsPage;
