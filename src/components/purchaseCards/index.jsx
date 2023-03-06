import React from "react";
import { getDate } from "../../services/getDate";
import "./style.scss";

const PurchaseCards = ({ data }) => {
    return (
        <div className="purchase-cards">
            <div className="cardno-type">
                <p>{data.cn}</p>
                <h4>{data.type}</h4>
            </div>
            <hr />
            <div className="date-amount">
                <h3 className="date">{getDate(data.ts)}</h3>
                <h1 style={{ color: "red" }} className="amount">{data.amt} <span>kr</span></h1>
            </div>
            <h4>{data.info}</h4>
        </div>
    )
}

export default PurchaseCards;
