import React, { useState } from "react";
import TrackEachVehicle from "./trackEachVehicle";
import "./trackVehicle.css";

function TrackFile() {
  return (
    <div>
      <TrackEachVehicle withdelay="3" />
      <TrackEachVehicle />
      <TrackEachVehicle />
    </div>
  );
}

export default TrackFile;
