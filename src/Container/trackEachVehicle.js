import React, { useState } from "react";
import { HomeFilled, ExclamationCircleOutlined } from "@ant-design/icons";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import Lottie from "lottie-react";
import "./trackVehicle.css";
import blinking from "./blinking.json";

function TrackEachVehicle(props) {
  const { withdelay } = props;
  const [activeStep, setActiveStep] = useState(3);

  const getTheStationForRoute = (num) => {
    return [...new Array(num)].map((el, index) => {
      return (
        <div className="individualRoute">
          <div className="pTwo">
            <h1 className="upperText">Vijaywada</h1>
            <h2 className="distanceInKm">0 km</h2>
            {index == activeStep - 1 ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <LocalShippingIcon width="30px" height="30px" />
                <div
                  style={{
                    width: "30px",
                    height: "30px",
                    marginBottom: "15px",
                  }}
                >
                  <Lottie animationData={blinking} />
                </div>
              </div>
            ) : (
              <HomeFilled className="wSixHSix" />
            )}
            <h1 className="belowText">Vijaywada</h1>
            <h2 className="distanceInKm">0 km</h2>
          </div>
          {index !== num - 1 && (
            <div
              className="underLine"
              style={{
                backgroundColor: index < activeStep - 1 ? "#81C8DE" : "#D1D5DB",
              }}
            ></div>
          )}
        </div>
      );
    });
  };

  const getChangedRoute = (num, ind, noLoading) => {
    return [...new Array(num)].map((el, index) => {
      return (
        <div className="individualRoute">
          <div className="pTwo">
            <h1 className="upperText">Vijaywada</h1>
            <h2 className="distanceInKm">0 km</h2>
            {index == activeStep - 1 && index != ind && !noLoading ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <LocalShippingIcon width="30px" height="30px" />
                <div style={{ width: "30px", height: "30px" }}>
                  <Lottie animationData={blinking} />
                </div>
              </div>
            ) : index == ind ? (
              <div>
                <ExclamationCircleOutlined
                  style={{
                    color: "#AC1F27",
                    fontSize: "16px",
                    width: "30px",
                    height: "30px",
                    // marginRight: "25px",
                  }}
                />
              </div>
            ) : (
              <HomeFilled className="wSixHSix" />
            )}
            <h1 className="belowText">Vijaywada</h1>
            <h2 className="distanceInKm">0 km</h2>
          </div>
          {index !== num - 1 && <div className="underLine"></div>}
        </div>
      );
    });
  };

  return (
    <div>
      <div className="body1">
        <div className="body2">
          <div className="wrapFirstRow">
            <div className="wrapVehicleRoute">
              <LocalShippingIcon width="30px" height="30px" className="WSev" />
              <div style={{ marginLeft: "10px" }}>BLR_KA1222</div>
              <div style={{ marginLeft: "10px" }}>Route : ELURU - BLRAA</div>
            </div>
            <div className="viewTripEdit">
              <button className="viewTrip">View Trip</button>
              <button className="edit">Edit</button>
            </div>
          </div>
          <div className="pyFour">
            {!withdelay && (
              <div className="individualRoute">{getTheStationForRoute(9)}</div>
            )}
            {withdelay && (
              <div>
                <div className="individualRoute">
                  {getChangedRoute(6, 3, "noLoadingVehicle")}
                </div>
                <div
                  className="destinationChangeStyle"
                  style={{ width: "53%" }}
                >
                  <div
                    className="inclinedStyle"
                    style={{ rotate: "45deg", width: "130px" }}
                  >
                    <div
                      className="destinationChangeText"
                      style={{ rotate: "-45deg" }}
                    >
                      <div className="destinationHasChanged">
                        <h1 className="" style={{ fontSize: "10px" }}>
                          Detination has Changed
                        </h1>
                      </div>
                    </div>
                    <div className="delayWrap" style={{ rotate: "-45deg" }}>
                      <div className="wrapDelayNIcon">
                        <h1 className="delayText" style={{ fontSize: "8px" }}>
                          4 hrs Delay
                        </h1>
                        <LocalShippingIcon
                          width="30px"
                          height="30px"
                          className="WSev"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="individualRoute">{getChangedRoute(3)}</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TrackEachVehicle;
