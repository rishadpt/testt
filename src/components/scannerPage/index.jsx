import React, { useRef, useState } from 'react'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { LoadingContext } from '../../App'
import { getCards } from '../../services/Api'
import QrReader from "react-qr-reader";
import Menu from '../MenuBar'
import './style.scss'

const ScannerPage = ({ subHeading, to }) => {
    const [scanResultWebCam, setScanResultWebCam] = useState("");
    const { setLoading } = useContext(LoadingContext)
    const inputRef = useRef()
    const navigate = useNavigate()
    const handleErrorWebCam = (error) => {
        console.log(error);
    };
    const handleScanWebCam = (result) => {
        if (result) {
            setScanResultWebCam(result);
            console.log(result);
            if(result.length > 3 && result.length<6){
                nextPage(result)
            }
        }else{

        }
    };
    const handleRegister = () => {
        if (inputRef.current.value) {
            setLoading(true)
            nextPage(inputRef.current.value)
        }
    }
    const nextPage = (value) => {
        getCards().then(({ items }) => {
            const finding = items.find(item => {
                return item.cn === value
            })
            if (!finding) {
                if (to === "register") {
                    navigate(`/${to}/${value}`)
                } else {
                    alert("sorry card not found")
                    navigate("/")
                }
                setLoading(false)
            } else {
                if (to === "register") {
                    alert("sorry card already exist")
                    navigate("/")
                } else {
                    navigate(`/${to}/${value}`)
                }
                setLoading(false)
            }
        }).catch((data)=>{
            setLoading(false)
            alert("something went to wrong")
        })
    }
    return (
        < >
            <div className="scanner-part">
                <nav>
                    <h1>Scan your qrcode</h1>
                    <Menu />
                </nav>
                <div className="scanner">
                    <QrReader
                        delay={300}
                        style={{ width: "100%" ,height:"100%"}}
                        onError={handleErrorWebCam}
                        onScan={handleScanWebCam}
                        onResult={()=>{
                            
                        }}
                    />
                </div>
            </div>
            <div className="input-part">
                <h1>{subHeading}</h1>
                <div className="input-container">
                    <div onClick={handleRegister} className="icon">
                        <img src="/images/arrow.png" alt="" />
                    </div>
                    <input ref={inputRef} type="number" placeholder='Card Number' name="" id="" />
                </div>
            </div>
        </>
    )
}

export default ScannerPage