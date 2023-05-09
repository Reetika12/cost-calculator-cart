import React from "react";
import { CheckCircleOutlined } from "@ant-design/icons";

function TrackVehicle() {
  const getTheStationForRoute = (num) => {
    return [...new Array(num)].map((el, index) => {
      return (
        <div className="flex justify-between items-center my-2">
          <div className="p-2">
            <h1 className="text-sm font-medium">Vijaywada</h1>
            <h2 className="text-xs font-semibold my-1">0 km</h2>
            <CheckCircleOutlined className="w-6 h-6" />

            {/* <BellIcon className="w-6 h-6" /> */}
            <h1 className="text-xs font-medium mt-1">Vijaywada</h1>
            <h2 className="text-xs font-semibold my-1">0 km</h2>
          </div>
          <div className="h-1 w-full bg-gray-300 -ml-8"></div>
        </div>
      );
    });
  };

  return (
    <div className="shadow m-4 rounded-md bg-white">
      <div className="w-full container mx-auto">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3 py-2 font-medium text-sm">
            {/* <BellIcon className="w-7 h-7" /> */}
            <CheckCircleOutlined className="w-7 h-7" />
            <h1>BLR_KA1222</h1>
            <h2>Route : ELURU - BLRAA</h2>
          </div>
          <div className="flex items-center gap-3">
            <button className="border-2 border-red-700 py-1 px-4 rounded text-sm">
              View Trip
            </button>
            <button className="border-2 border-red-700 bg-red-700 text-white py-1 px-4 rounded text-sm">
              Edit
            </button>
          </div>
        </div>
        <div className="py-4">
          <div className="flex justify-between items-center my-2">
            <div className="p-2">
              <h1 className="text-sm font-medium">Vijaywada</h1>
              <h2 className="text-xs font-semibold my-1">0 km</h2>
              {/* <BellIcon className="w-6 h-6" /> */}
              <CheckCircleOutlined className="w-6 h-6" />
              <h1 className="text-xs font-medium mt-1">Vijaywada</h1>
              <h2 className="text-xs font-semibold my-1">0 km</h2>
            </div>
            <div className="h-1 w-full bg-gray-300 -ml-8"></div>
            <div className="p-2">
              <h1 className="text-sm font-medium">Vijaywada</h1>
              <h2 className="text-xs font-semibold my-1">0 km</h2>
              {/* <BellIcon className="w-6 h-6" /> */}
              <CheckCircleOutlined className="w-6 h-6" />
              <h1 className="text-xs font-medium mt-1">Vijaywada</h1>
              <h2 className="text-xs font-semibold my-1">0 km</h2>
            </div>
            <div className="h-1 w-full bg-gray-300 -ml-8"></div>
            <div className="p-2">
              <h1 className="text-sm font-medium">Vijaywada</h1>
              <h2 className="text-xs font-semibold my-1">0 km</h2>
              {/* <BellIcon className="w-6 h-6" /> */}
              <CheckCircleOutlined className="w-6 h-6" />
              <h1 className="text-xs font-medium mt-1">Vijaywada</h1>
            </div>
            <div className="h-1 w-full bg-gray-300 -ml-8"></div>
            <div className="p-2">
              <h1 className="text-sm font-medium">Vijaywada</h1>
              <h2 className="text-xs font-semibold my-1">0 km</h2>
              {/* <BellIcon className="w-6 h-6" /> */}
              <CheckCircleOutlined className="w-6 h-6" />
              <h1 className="text-xs font-medium mt-1">Vijaywada</h1>
            </div>
            <div className="h-1 w-full bg-gray-300 -ml-8"></div>
            <div className="p-2">
              <h1 className="text-sm font-medium">Vijaywada</h1>
              <h2 className="text-xs font-semibold my-1">0 km</h2>
              {/* <BellIcon className="w-6 h-6" /> */}
              <CheckCircleOutlined className="w-6 h-6" />
              <h1 className="text-xs font-medium mt-1">Vijaywada</h1>
            </div>
          </div>
          <div
            className="relative flex justify-between items-center my-2 ml-auto"
            style={{ width: "53%" }}
          >
            <div
              className="absolute h-1 bg-gray-300 -ml-8 -left-36 -top-0"
              style={{ rotate: "45deg", width: "190px" }}
            >
              <div
                className="w-7 h-7 rounded-full bg-red-600 absolute -top-4 -left-5 border-4 border-white"
                style={{ rotate: "-45deg" }}
              >
                <div className="absolute -top-16 -left-12 shadow rounded-md p-2 w-28 text-center">
                  <h1 className="" style={{ fontSize: "10px" }}>
                    Detination has Changes
                  </h1>
                </div>
              </div>
              <div
                className="w-7 h-7 rounded-full bg-red-600 absolute right-20 -top-3 border-4 border-white"
                style={{ rotate: "-45deg" }}
              >
                <div className="absolute left-0 -top-6 text-center w-20 flex items-center justify-center gap-1 flex-col">
                  <h1
                    className="bg-red-700 text-white px-2 py-0.5 rounded-full"
                    style={{ fontSize: "8px" }}
                  >
                    4 hrs Delay
                  </h1>
                  <CheckCircleOutlined className="w-4 h-4" />
                  {/* <BellIcon className="w-4 h-4" /> */}
                </div>
              </div>
            </div>
            <div className="p-2">
              <h1 className="text-sm font-medium">Vijaywada</h1>
              <h2 className="text-xs font-semibold my-1">0 km</h2>
              {/* <BellIcon className="w-6 h-6" /> */}
              <CheckCircleOutlined className="w-6 h-6" />
              <h1 className="text-xs font-medium mt-1">Vijaywada</h1>
              <h2 className="text-xs font-semibold my-1">0 km</h2>
            </div>
            <div className="h-1 w-full bg-gray-300 -ml-8"></div>
            <div className="p-2">
              <h1 className="text-sm font-medium">Vijaywada</h1>
              <h2 className="text-xs font-semibold my-1">0 km</h2>
              <CheckCircleOutlined className="w-6 h-6" />
              {/* <BellIcon className="w-6 h-6" /> */}
              <h1 className="text-xs font-medium mt-1">Vijaywada</h1>
              <h2 className="text-xs font-semibold my-1">0 km</h2>
            </div>
            <div className="h-1 w-full bg-gray-300 -ml-8"></div>
            <div className="p-2">
              <h1 className="text-sm font-medium">Vijaywada</h1>
              <h2 className="text-xs font-semibold my-1">0 km</h2>
              {/* <BellIcon className="w-6 h-6" /> */}
              <CheckCircleOutlined className="w-6 h-6" />
              <h1 className="text-xs font-medium mt-1">Vijaywada</h1>
              <h2 className="text-xs font-semibold my-1">0 km</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TrackVehicle;
