import axios from "axios"

// const BaseUrl = "https://bgdqi9yhlb.execute-api.eu-north-1.amazonaws.com/Prod/"
const BaseUrl = "https://23fuu3bhr6.execute-api.eu-north-1.amazonaws.com/Prod/"
export const getCards = () => {
    return new Promise((resolve,reject)=>{
        axios.post(`${BaseUrl}vendor/cards`,{},{
            headers:{
                Authorization: localStorage.getItem("token"),
                'Content-Type': 'application/json'
            }
        }).then((data)=>{
            resolve(data.data)
        }).catch((err)=>{
            reject(err);
        })
    })
}

export const getPurchases = (data) => {
    return new Promise((resolve,reject)=>{
        axios.post(`${BaseUrl}vendor/purchases`,data,{
            headers:{
                Authorization: localStorage.getItem("token"),
                'Content-Type': 'application/json'
            },
        
        }).then((data)=>{
            resolve(data.data)
        }).catch((err)=>{
            reject(err);
        })
    })
}

export const addCards = (data) => {
    return new Promise((resolve,reject)=>{
        axios.post(`${BaseUrl}vendor/card`,data,{
            headers:{
                Authorization: localStorage.getItem("token"),
                'Content-Type': 'application/json'
            }
        }).then((data)=>{
            resolve(data.data)
        }).catch((err)=>{
            reject(err);
        })
    })
}

export const addPurchase = (data) => {
    return new Promise((resolve,reject)=>{
        axios.post(`${BaseUrl}vendor/purchase`,data,{
            headers:{
                Authorization :localStorage.getItem("token"),
                'Content-Type': 'application/json'
            }
        }).then((data)=>{
            resolve(data.data)
        }).catch((err)=>{
            reject(err);
        })
    })
}

export const rechargeCard = (data)=>{
    return new Promise((resolve,reject)=>{
        axios.post(`${BaseUrl}vendor/recharge`,data,{
            headers:{
                Authorization: localStorage.getItem("token"),
                'Content-Type': 'application/json'
            }
        }).then((data)=>{
            resolve(data.data)
        }).catch((err)=>{
            reject(err);
        })
    })
}

export const SignupVendor = (data,token)=>{
    return new Promise((resolve,reject) => {
      const baseUrl = "http://localhost:3000/"
      // const baseUrl = "https://23fuu3bhr6.execute-api.eu-north-1.amazonaws.com/Prod/";
      let url = `${baseUrl}vendor/signup`
     axios.post(
      url,JSON.stringify(data),{
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }
     ).then((data)=>{
      resolve(data);
     }).catch((err)=>{
      reject(err);
     })
  
    })
  }