import React from 'react'

const Loading = () => {
    const style = {
        opacity: ".95",
        position: "fixed",
        background: "#fff",
        width: "100vw",
        height: "100vh",
        display: "grid",
        placeItems: "center",
        zIndex:"9999"
    }

    return (
        <div style={style}>
            <img style={{ width: "50px", height: "50px", objectFit: "cover" }} src="/images/loading.gif" alt="" />
        </div>
    )
}

export default Loading