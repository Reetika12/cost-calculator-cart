import React from "react";
import { Detector } from "react-detect-offline";
import img from "../img/wifi.png";
const CheckConnection = (props) => {
  return (
    <>
      <Detector
        render={({ online }) =>
          online ? (
            props.children
          ) : (
            <div
              style={{
                paddingTop: "10px",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img src={img} alt="connection" />
              <h1 style={{ marginBottom: "5px" }}>No Connection</h1>
              <h4 style={{ margin: "0" }}>
                Please check your internet Connection
              </h4>
            </div>
          )
        }
      />
    </>
  );
};

export default CheckConnection;
