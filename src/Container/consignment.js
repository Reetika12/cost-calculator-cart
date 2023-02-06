import React, { useState, useEffect } from "react";
import Filter from "../../Component/Common/FilterComp/filterPage";
import Spinner from "../../Component/Common/Spinner/spinner";
import { useNavigate } from "react-router-dom";
import { Table, Button, Tag } from "antd";
import PageHeader from "../../Component/Common/PageHeader/pageHeader";
import "react-datepicker/dist/react-datepicker.css";
import "../commonFile.scss";
import axios from "axios";
import moment from "moment";
import PermissionCheck from "../../Component/Common/PermissionCheck/index";
import { capitalizeString, DATE_FORMAT_WITH_TIME } from "../../util";
import { CAN_DOWNLOAD_CONSIGNMENT } from "../../permissionList";

let FileSaver = require("file-saver");
function ViewAllConsignment() {
  const [allConsignmentList, setAllConsignmentList] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [changedParam, setChangedParam] = useState("");

  const navigate = useNavigate();
  let isFilterApplied = window.location.search;

  const columns = [
    {
      key: "createdAt",
      title: "Created At",
      dataIndex: "createdAt",
      render: function timeFormat(date, obj) {
        return (
          <div>
            <div>{moment(date).format(DATE_FORMAT_WITH_TIME)}</div>
          </div>
        );
      },
      align: "center",
      width: 180,
    },
    {
      key: "source",
      title: "Source",
      dataIndex: "source",
      width: 200,
      align: "center",
    },
    {
      key: "destination",
      title: "Destination",
      dataIndex: "destination",
      width: 200,
      align: "center",
    },
    {
      key: "quantity",
      title: "Quantity",
      dataIndex: "quantity",
      align: "center",
    },
    {
      key: "vehicles",
      title: "Vehicles",
      dataIndex: "vehicles",
      align: "center",
    },
    {
      key: "drivers",
      title: "Drivers",
      dataIndex: "drivers",
      align: "center",
    },
    {
      key: "strStatus",
      title: "Status",
      dataIndex: "strStatus",
      render(text, record) {
        return {
          children: <Tag color={getStyle(text)}>{text}</Tag>,
        };
      },
      align: "center",
    },
    {
      key: "tripId",
      dataIndex: "tripId",
      title: "Trip",
      render: (row, record) => (
        <div>
          <a
            onClick={() => {
              navigate(`../viewAllTrips?_id:${record?.tripId}`);
            }}
          >
            View
          </a>
        </div>
      ),
      width: 75,
      align: "center",
    },
  ];
  let filterDropdownList = [
    {
      Label: "Creation Date",
      Type: "date",
      id: "creation_date",
      remote: false,
      remoteOptions: {},
      values: [],
    },
    {
      Label: "Source",
      Type: "dropdown3",
      remote: true,
      remoteOptions: {
        url: `${process.env.API_URL}/address/api/v1/addresses`,
        filterType: `,address:`,
        method: "get",
        parseStrategy: {
          values: {
            key: "refName",
            value: "_id",
          },
          rootElement: "data.body.data",
        },
        type: "dropdown3",
      },
      values: [],
      id: "source",
    },
    {
      Label: "Destination",
      Type: "dropdown4",
      remote: true,
      remoteOptions: {
        url: `${process.env.API_URL}/address/api/v1/addresses`,
        filterType: `,address:`,
        method: "get",
        parseStrategy: {
          values: {
            key: "refName",
            value: "_id",
          },
          rootElement: "data.body.data",
        },
        type: "dropdown4",
      },
      values: [],
      id: "destination",
    },
    {
      Label: "Status",
      Type: "dropdownStatic1",
      id: "status",
      remote: false,
      remoteOptions: {},
      values: [
        {
          key: "Scheduled",
          value: "SCHEDULED",
        },
        {
          key: "Created",
          value: "CREATED",
        },
        {
          key: "Delivered",
          value: "DELIVERED",
        },
      ],
    },
    {
      Label: "Vehicle",
      Type: "dropDownList2",
      remote: true,
      remoteOptions: {
        url: `${process.env.API_URL}/lms-qa/api/v1/vehicles`,
        method: "get",
        parseStrategy: {
          values: {
            key: "number",
            value: "number",
          },
          rootElement: "data.body.data",
        },
        type: "dropdown2",
      },
      values: [],
      id: "vehicle",
    },
  ];

  const getStyle = (status) => {
    status = status.toUpperCase();
    switch (status) {
      case "CREATED":
        return "#134685";
      case "SCHEDULED":
        return "#FFC000";
      case "IN TRANSIT":
        return "#1893F8";
      case "DELIVERED":
        return "#2dc36e";
      case "CANCELLED":
        return "#cd201f";
      case "BLOCKED":
        return "#BBBBBB";
    }
  };

  useEffect(() => {
    let params = window.location.search;
    if (!params) {
      window.scrollTo(0, 0);
      fetchTheData();
    } else {
      showAppliedFilter();
    }
  }, []);
  useEffect(() => {
    // console.log("url changed on applying of filter", changedParam);
    showAppliedFilter();
  }, [changedParam]);

  const fetchTheData = (page = 1, pageSize = 10) => {
    setLoading(true);
    axios
      .get(
        `consignments?include=trip,str,source,drivers,destination&sortBy=createdAt.desc&limit=${pageSize}&offset=${
          (page - 1) * pageSize
        }`
      )
      .then((res) => {
        setLoading(false);
        convertIntoData(res?.data?.body?.data);
        setTotalPages(res?.data?.body?.total);
      })
      .catch((err) => {
        console.log("errorrrr", err);
      });
  };

  const getParams = (filterList) => {
    let params = "";
    Object.keys(filterList).map((key, index) => {
      if (key === "source") {
        params = params + "str.sourceAddress._id:";
      }
      if (key === "creation_date") {
        params = params + "createdAt[gte]:";
      }
      if (key === "delivery_date") {
        params = params + "str.plannedDeliveryDate[gte]:";
      }
      if (key === "destination") {
        params = params + `str.destinationAddress._id:`;
      }
      if (key === "vehicle") {
        params = params + `vehicle.number:`;
      }
      if (key === "customer") {
        params = params + `str.customer.name:`;
      }
      if (key === "status") {
        params = params + `str.strStatus.name:`;
      }
      let value = "";
      filterList[key].map((el, index) => {
        if (key === "creation_date") {
          value =
            moment(el).format() +
            ",createdAt[lt]:" +
            moment(el).add(1, "days").format() +
            ",";
        }
        if (key === "delivery_date") {
          value =
            moment(el).format() +
            ",str.plannedDeliveryDate[lt]:" +
            moment(el).add(1, "days").format() +
            ",";
        } else if (key !== "creation_date" && key !== "delivery_date") {
          value = value + el + "|";
        }
      });
      params = params + value?.substring(0, value.length - 1) + ",";
    });
    return params;
  };
  const showAppliedFilter = (page, pageSize) => {
    let listObj = {};
    let params = window.location.search;
    if (params) {
      listObj = getTheListObj(params);

      if (Object.keys(listObj).length >= 1) {
        applyFilters(listObj, page, pageSize);
      }
    } else {
      fetchTheData();
    }
  };
  const convertIntoData = (data) => {
    let new_data =
      data?.map((el) => {
        let drivers = [];
        let vehicles = [];
        el?.vehicles?.map((el, index) => {
          vehicles = [...vehicles, el?.number];
        });
        el?.drivers?.map((el, index) => {
          drivers = [...drivers, el?.name];
        });
        let srcAddress =
          el?.str?.sourceAddress?.refType === "VENDOR"
            ? el?.str?.sourceAddress?.addressLine1 +
              ", " +
              el?.str?.sourceAddress?.city +
              ", " +
              el?.str?.sourceAddress?.state
            : el?.str?.sourceAddress?.refName;
        return {
          key: el._id,
          _id: el._id,
          createdAt: el.createdAt,
          quantity: el.totalWeight,
          drivers: drivers.join(", "),
          source: srcAddress,
          destination: el?.str?.destinationAddress?.refName,
          strStatus: el?.str?.strStatus?.name
            ? capitalizeString(el?.str?.strStatus?.name)
            : "",
          tripId: el?.trip?._id,
          vehicles: vehicles.join(", "),
        };
      }) || [];
    setAllConsignmentList(new_data);
  };

  const applyFilters = (filterList, page = 1, pageSize = 10) => {
    let params = getParams(filterList);
    axios
      .get(
        `consignments?include=trip,str,source,drivers,destination&sortBy=createdAt.desc&limit=${pageSize}&offset=${
          (page - 1) * pageSize
        }&filter=${params?.substring(0, params.length - 1)}`
      )
      .then((res) => {
        setTotalPages(res?.data?.body?.total);
        convertIntoData(res?.data?.body?.data);
      })
      .catch((err) => {
        console.log("errorrrr", err);
      });
  };
  const getTheListObj = (params) => {
    let listObj = {};
    if (params) {
      let arr = params?.split("?")[1]?.split("&");
      arr?.map((el) => {
        let strlist = el.split(":");
        if (strlist[0] === "creation_date" || strlist[0] === "delivery_date") {
          let valueArray = el?.split(`${strlist[0]}:`)[1]?.split(",");
          listObj[strlist[0]] = valueArray || [];
        } else {
          let valueArray = strlist[1].split(",");
          listObj[strlist[0]] = valueArray || [];
        }
      });
      return listObj;
    }
  };
  const downloadCsv = () => {
    let listObj = {};
    let params = window.location.search;
    let csvparam = "";
    if (params) {
      listObj = getTheListObj(params);
      csvparam = getParams(listObj);
    }
    let path = csvparam
      ? `csv/consignment/download?filter=${csvparam?.substring(
          0,
          csvparam.length - 1
        )}&sortBy=createdAt.desc`
      : "csv/consignment/download?sortBy=createdAt.desc";
    axios
      .get(path)
      .then((res) => {
        var file = new File([res?.data], "consignment.csv");
        FileSaver.saveAs(file);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const filterEventChanged = (val) => {
    // console.log("url changed on applying of filter", changedParam);
    setChangedParam(val);
    setCurrentPage(1);
  };
  return (
    <div>
      <PageHeader
        title={"All Consignments"}
        onBack={() => window.history.back()}
      />
      <div>
        <div>
          <div className="wrapFilterAndDownloadCsv">
            <Filter
              drpDwnList={filterDropdownList}
              isFilterApplied={filterEventChanged}
              routeUrl={"/viewAllConsignments"}
            />
            <PermissionCheck permission={CAN_DOWNLOAD_CONSIGNMENT}>
              <Button onClick={() => downloadCsv()}>Download CSV</Button>
            </PermissionCheck>
          </div>
        </div>
      </div>
      {!allConsignmentList ? (
        <Spinner />
      ) : (
        <Table
          columns={columns}
          dataSource={[...allConsignmentList]}
          size="small"
          loading={loading}
          pagination={{
            pageSize: pageSize,
            current: currentPage,
            total: totalPages,
            onChange: (page, pageSize) => {
              setPageSize(pageSize);
              setCurrentPage(page);
              if (isFilterApplied) {
                showAppliedFilter(page, pageSize);
              } else {
                fetchTheData(page, pageSize);
              }
            },
          }}
        ></Table>
      )}
    </div>
  );
}

export default ViewAllConsignment;
