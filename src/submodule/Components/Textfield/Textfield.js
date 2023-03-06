import React from "react";
import "./Textfield.scss";

export default function Textfield({ name ,reg,type}) {
  return (
    <div className="text-container">
      <label>{name}</label>
      <input {...reg(name,{required: (type === 0 && name === 'email' || 'password') ? true :false})} type={name.includes('password') ? 'password' : 'text'}  placeholder={name} />
    </div>
  );
}
