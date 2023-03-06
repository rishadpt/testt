import React from 'react'
const Loading = () => {
    return (
        <div style={{ width: '100%', height: "100%", display: "grid", placeItems: "center" }}>
            <div style={{display:"grid","justifyItems":"center","gap":"15px"}}>
                <img style={{ width: "100px", borderRadius: "50%", border: "2px solid white" }} src='Assets/Images/loading gif.gif' alt="" />
                <h3 style={{color:"white"}}>Loading ...</h3>
            </div>
        </div>
    )
}

export default Loading