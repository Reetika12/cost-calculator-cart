import React, { useState, useEffect, useCallback } from "react";
import { Input, Select, DatePicker } from "antd";
import { useNavigate } from "react-router-dom";
import { CloseOutlined } from "@ant-design/icons";
import "./filter.scss";
import axios from "axios";
const _ = require("lodash");

const FilterComp = (props) => {
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedKey, setSelectedKey] = useState("");
  const [addressIdKeyMap, setAddressIdKeyMap] = useState({});
  const [keyValueList, setKeyValueList] = useState({});
  const [appliedFilterValue, setAppliedFilterValue] = useState({});
  const [dynamicDropDownList, setDynamicDropdownList] = useState({});
  const navigate = useNavigate();
  const [dropDownList1, setdropDownList1] = useState([]);
  const [dropDownList2, setdropDownList2] = useState([]);
  const [dropDownList3, setdropDownList3] = useState([]);
  const [dropDownList4, setdropDownList4] = useState([]);
  const [staticdropDownList1, setStaticdropDownList1] = useState([]);
  const [staticdropDownList2, setStaticdropDownList2] = useState([]);
  const [staticdropDownList3, setStaticdropDownList3] = useState([]);
  const { Option } = Select;

  useEffect(() => {
    props?.drpDwnList.map((el) => {
      if (el?.Type === "dropdownStatic2") {
        setStaticdropDownList2(el?.values);
      }
      if (el?.Type === "dropdownStatic3") {
        setStaticdropDownList3(el?.values);
      }
      if (!el.remote && el?.Type === "dropdownStatic1") {
        setStaticdropDownList1(el?.values);
      }
      if (el?.Type === "dropdown3") {
        updateDropDownForAddress(el?.remoteOptions, "", el?.Type);
      }
      if (el?.Type === "dropdown1") {
        updateDropDown(el?.remoteOptions, "", el?.Type);
      }
      if (el?.Type === "dropdown4") {
        updateDropDownForAddress(el?.remoteOptions, "", el?.Type);
      }
      if (el?.Type === "dropDownList2") {
        updateDropDown(el?.remoteOptions, "", el?.Type);
      }
    });
  }, []);

  useEffect(() => {
    paramUpdate();
    showAppliedFilter();
  }, [appliedFilterValue]);

  // This function is triggered when the select changes

  const selectAppliedFilter = (value) => {
    let obj = JSON.parse(value);
    if (obj?.remote) {
      localStorage.setItem("remoteDetails", JSON.stringify(obj?.remoteOptions));
    }
    localStorage.setItem("slectedKey", obj?.id);
    setSelectedKey(obj?.id);
    setSelectedOption(obj?.Type);
  };
  const handleChange = (newValue) => {
    let parsedObj = JSON.parse(newValue);
    let obj = {
      selectedKey: selectedKey,
      value: parsedObj?.value,
    };
    toggleClickHandler(JSON.stringify(obj));
  };
  const removeKeyEvent = (key) => {
    let params = window.location.search;
    let firstHalf = params.split(key);
    let param;
    if (firstHalf[1].includes("&")) {
      let secondHalf = firstHalf[1].split("&");
      param = firstHalf[0] + secondHalf[1];
    } else {
      let str = "&" + key;
      if (params.includes(str)) {
        param = params.split(str)[0];
      } else {
        let query = "?" + key;
        param = params.split(query)[0];
      }
    }
    props.isFilterApplied(param);
    navigate(param);
    showAppliedFilter();
  };
  const handleSearch = (newValue) => {
    let item = localStorage.getItem("remoteDetails");
    let items = "";
    if (item && newValue) {
      items = JSON.parse(item);
      updateDropDown(items, newValue, items?.type);
    }
  };

  const handleSearchAddress = (newValue) => {
    let item = localStorage.getItem("remoteDetails");
    let items = "";
    if (item && newValue) {
      items = JSON.parse(item);
      updateDropDownForAddress(items, newValue, items?.type);
    }
  };
  const toggleClickHandler = (appliedFilter) => {
    let filterObj = JSON.parse(appliedFilter);
    if (
      filterObj?.selectedKey &&
      filterObj?.value !== "Tundefined" &&
      filterObj?.value !== "undefined"
    ) {
      setAppliedFilterValue(filterObj);
    }
  };

  const selectOptionInDropDown1 = (value) => {
    let parsedObj = JSON.parse(value);
    let obj = {
      selectedKey: selectedKey,
      value: parsedObj?.value,
    };
    toggleClickHandler(JSON.stringify(obj));
  };

  const selectOptionInDropDown2 = (value) => {
    let parsedObj = JSON.parse(value);
    let obj = {
      selectedKey: selectedKey,
      value: parsedObj?.value,
    };
    toggleClickHandler(JSON.stringify(obj));
  };
  const selectOptionInDropDown3 = (value) => {
    let parsedObj = JSON.parse(value);
    let obj = {
      selectedKey: selectedKey,
      value: parsedObj?.value,
    };
    toggleClickHandler(JSON.stringify(obj));
  };

  const selectedOptionInInputField = (event) => {
    const value = event.target.value;
    let selectedKey = localStorage.getItem("slectedKey");
    let obj = {
      selectedKey: selectedKey,
      value: value,
    };
    toggleClickHandler(JSON.stringify(obj));
  };
  const showAppliedFilter = () => {
    let listObj = {};
    let params = window.location.search;
    let arr = params?.split("?")[1]?.split("&");
    let dropdown3list = JSON.parse(localStorage.getItem("drpDownlist3"));
    let dropdownlist4 = JSON.parse(localStorage.getItem("drpDownlist4"));
    let destArr = {};

    arr?.map((el) => {
      let strlist = el.split(":");
      let valueArray = strlist[1].split(",");
      if (strlist[0] === "destination") {
        dropdownlist4?.map((ele) => {
          if (valueArray.includes(ele?.value)) {
            destArr[ele?.value] = ele?.key;
          }
        });
      }
      if (strlist[0] === "source") {
        dropdown3list?.map((ele) => {
          if (valueArray.includes(ele?.value)) {
            destArr[ele?.value] = ele?.key;
          }
        });
      }
      listObj[strlist[0]] = valueArray || [];
    });
    setAddressIdKeyMap({ ...destArr });
    if (listObj) {
      setKeyValueList(listObj);
    }
  };
  const updateDropDown = (remoteoption, newValue, type) => {
    let arrList = Array();
    let Url = "";
    Url = newValue
      ? remoteoption?.url + `?filter=number:${newValue}%25`
      : remoteoption?.url;
    // const options = {
    //   method: remoteoption?.method,
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // };
    axios
      .get(Url)
      .then((res) => {
        let data = _.get(res, remoteoption?.parseStrategy?.rootElement) || [];
        if (!remoteoption?.parseStrategy?.rootElement) {
          data = res;
        }
        data?.map((el) => {
          if (_.get(el, remoteoption?.parseStrategy?.values?.key)) {
            arrList.push({
              key: _.get(el, remoteoption?.parseStrategy?.values?.key),
              value: _.get(el, remoteoption?.parseStrategy?.values?.value),
            });
          }
        });
        if (type === "dropdown1") {
          setdropDownList1(arrList);
        } else {
          setdropDownList2(arrList);
        }
      })
      .catch((err) => console.log(err));
  };

  const updateDropDownForAddress = (remoteoption, newValue, type) => {
    let arrList = Array();
    let Url = "";
    let firstHalf = "";
    firstHalf =
      type === "dropdown4"
        ? remoteoption?.url + `?filter=refType:OPERATION_CENTER|CUSTOMER`
        : type === "dropdown3"
        ? remoteoption?.url + `?filter=refType:OPERATION_CENTER|VENDOR`
        : remoteoption?.url;
    Url = newValue
      ? firstHalf + remoteoption?.filterType + `%25${newValue}%25`
      : firstHalf;
    // const options = {
    //   method: remoteoption?.method,
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // };

    axios
      .get(Url)
      .then((res) => {
        let data = _.get(res, remoteoption?.parseStrategy?.rootElement);
        data?.map((el) => {
          if (_.get(el, remoteoption?.parseStrategy?.values?.key)) {
            arrList.push({
              key: _.get(el, remoteoption?.parseStrategy?.values?.key),
              value: _.get(el, remoteoption?.parseStrategy?.values?.value),
            });
          }
        });
        if (type === "dropdown3") {
          let srcListArr = [];
          data?.map((el) => {
            if (_.get(el, remoteoption?.parseStrategy?.values?.key)) {
              let srcAddress =
                el?.refType === "VENDOR"
                  ? el?.addressLine1 + ", " + el?.city + ", " + el?.state
                  : el?.refName;
              srcListArr.push({
                key: srcAddress,
                value: _.get(el, remoteoption?.parseStrategy?.values?.value),
              });
            }
          });
          localStorage.setItem("drpDownlist3", JSON.stringify(arrList));
          setdropDownList3(srcListArr);
        } else {
          localStorage.setItem("drpDownlist4", JSON.stringify(arrList));
          setdropDownList4(arrList);
        }
      })
      .catch((err) => console.log("errorrrr", err));
  };
  const debounce = (func) => {
    let timer;
    return function (...args) {
      let context = this;
      clearTimeout(timer);
      timer = setTimeout(() => func.apply(context, args), 200);
    };
  };
  const inputValueEvent = (e) => {
    selectedOptionInInputField(e);
  };
  const optimisedVersion = useCallback(debounce(inputValueEvent), []);
  const optimsedFilterComp = useCallback(debounce(handleSearch), []);
  const optimsedAddressFilterComp = useCallback(
    debounce(handleSearchAddress),
    []
  );

  const handleDatePickerChange = (date, dateString) => {
    let value = dateString?.split(" ")[0];
    let selectedKey = localStorage.getItem("slectedKey");
    let obj = {
      selectedKey: selectedKey,
      value: value,
    };
    toggleClickHandler(JSON.stringify(obj));
  };

  const paramUpdate = () => {
    let params = window.location.search;
    let param = "";
    if (Object.keys(appliedFilterValue).length >= 1) {
      if (
        selectedOption === "dropdown1" ||
        selectedOption === "dropdownStatic1" ||
        selectedOption === "dropdown3" ||
        selectedOption === "dropdown4" ||
        selectedOption === "dropDownList2" ||
        selectedOption === "dropdownStatic2" ||
        selectedOption === "dropdownStatic3"
      ) {
        if (!params) {
          if (appliedFilterValue.selectedKey === "source") {
            param = `?${appliedFilterValue.selectedKey}:${appliedFilterValue.value}`;
          } else {
            param = `?${appliedFilterValue.selectedKey}:${appliedFilterValue.value}`;
          }
        } else if (params.includes(appliedFilterValue?.selectedKey)) {
          let key = appliedFilterValue?.selectedKey + ":";
          if (!params.split(key)[1].includes(appliedFilterValue?.value)) {
            let arr = appliedFilterValue?.value + "," + params.split(key)[1];
            param =
              params.split(key)[0] +
              appliedFilterValue?.selectedKey +
              ":" +
              arr;
          } else {
            let arr = params.split(key)[1];
            param =
              params.split(key)[0] +
              appliedFilterValue?.selectedKey +
              ":" +
              arr;
          }
        } else if (
          params &&
          !params.includes(appliedFilterValue?.selectedKey)
        ) {
          param =
            params +
            "&" +
            appliedFilterValue.selectedKey +
            ":" +
            appliedFilterValue.value;
        }
      }
      if (
        !params &&
        selectedOption !== "dropdown1" &&
        selectedOption !== "dropDownList2" &&
        selectedOption !== "dropdownStatic1" &&
        selectedOption !== "dropdownStatic2" &&
        selectedOption !== "dropdownStatic3" &&
        selectedOption !== "dropdown3" &&
        selectedOption !== "dropdown4"
      ) {
        param = `?${appliedFilterValue?.selectedKey}:${appliedFilterValue?.value}`;
      }
      if (
        params &&
        selectedOption !== "dropdown1" &&
        selectedOption !== "dropDownList2" &&
        selectedOption !== "dropdownStatic1" &&
        selectedOption !== "dropdownStatic2" &&
        selectedOption !== "dropdownStatic3" &&
        selectedOption !== "dropdown3" &&
        selectedOption !== "dropdown4"
      ) {
        if (!params.includes(appliedFilterValue?.selectedKey)) {
          param =
            params +
            "&" +
            appliedFilterValue?.selectedKey +
            ":" +
            appliedFilterValue?.value;
        } else if (params.includes(appliedFilterValue?.selectedKey)) {
          let list = params.split(appliedFilterValue?.selectedKey + ":");
          if (list[1].includes("&")) {
            param =
              list[0] +
              appliedFilterValue?.selectedKey +
              ":" +
              appliedFilterValue?.value +
              "&" +
              list[1]?.split("&")[1];
          } else if (!list[1].includes("&")) {
            param =
              list[0] +
              appliedFilterValue?.selectedKey +
              ":" +
              appliedFilterValue?.value;
          }
        }
      }
      navigate(param);
      props.isFilterApplied(param);
    }
  };

  const selected_filter_display = (key) => {
    let final_data = [];
    keyValueList[key].map((el, index) => {
      if (el) {
        final_data.push(
          <div className="keyStyle" key={`desti_${index}`}>
            <div
              className={key === selectedKey ? "selectedBulletKey" : "tagBox"}
            >
              {dynamicDropDownList && key === "facilityName"
                ? dynamicDropDownList[el]
                : decodeURIComponent(addressIdKeyMap[el] || el)}
            </div>
            <div
              className={key === selectedKey ? "selectedBulletKey" : "tagBox"}
              onClick={() => individualCrossEvent(key, el)}
            >
              <CloseOutlined />
            </div>
          </div>
        );
      }
    });
    return final_data;
  };

  const individualCrossEvent = (key, el) => {
    let params = window.location.search;
    let param = "";
    if (
      key === "creation_date" ||
      key === "delivery_date" ||
      key === "customer"
    ) {
      let firstHalf = params.split(key);
      if (firstHalf[0] === "?" && !firstHalf[1]?.includes("&")) {
        navigate(props.routeUrl);
      } else if (firstHalf[1].includes("&") && firstHalf[0] === "?") {
        const [first, ...rest] = firstHalf[1].split("&");
        param = firstHalf[0] + rest?.join("&");
      } else if (!firstHalf[1].includes("&") && firstHalf[0].includes("&")) {
        param = firstHalf[0]?.substring(0, firstHalf[0]?.length - 1);
      } else {
        let str = "&" + key;
        let arrList3 = params.split(str);
        let secondHalf = arrList3[1].split("&");
        param = arrList3[0] + "&" + secondHalf[1];
      }
      navigate(param);
      showAppliedFilter();
    } else {
      let str = key + ":";
      let arrlist = params.split(str);
      let findKey = "," + el;
      let datalist;
      if (
        !arrlist[1].includes("&") &&
        !arrlist[1].includes(",") &&
        !arrlist[0].includes(",") &&
        !arrlist[0].includes("&")
      ) {
        navigate(props.routeUrl);
      } else if (!arrlist[1].includes("&") && !arrlist[1].includes(",")) {
        const lastIndex = arrlist[0]?.lastIndexOf("&");
        param = arrlist[0]?.slice(0, lastIndex);
      } else if (
        arrlist[1]?.split("&")[0] &&
        !arrlist[1]?.split("&")[0].includes(",")
      ) {
        param = arrlist[0] + arrlist[1]?.split("&")[1];
      } else if (arrlist[1].includes(findKey)) {
        datalist = arrlist[1].split(findKey);
        param = arrlist[0] + str + datalist[0] + datalist[1];
      } else if (!arrlist[1].includes(findKey) && arrlist[1].includes(el)) {
        datalist = arrlist[1].split(el + ",");
        param = arrlist[0] + str + datalist[1];
      }
      navigate(param);
      showAppliedFilter();
    }
    if (key === "_id") {
      props.isFilterApplied(param);
    }
    props.isFilterApplied(param);
  };
  return (
    <div>
      <div className="WrapPage">
        <Select
          style={{ width: "150px", marginLeft: "20px" }}
          onChange={selectAppliedFilter}
          defaultValue={"Apply filters"}
        >
          {props.drpDwnList.map((name, index) => {
            return (
              <Option key={index} value={JSON.stringify(name)}>
                {name.Label}
              </Option>
            );
          })}
        </Select>
        {selectedOption === "input" && (
          <Input
            style={{ marginLeft: "15px" }}
            placeholder="Enter the value"
            onChange={(e) => {
              optimisedVersion(e);
            }}
          />
        )}
        {selectedOption === "dropdown1" && (
          <Select
            showSearch
            placeholder="Search to Select"
            filterOption={false}
            showArrow={false}
            value={null}
            onSearch={optimsedFilterComp}
            onChange={handleChange}
            style={{ width: "200px", marginLeft: "20px" }}
          >
            {dropDownList1?.map((el, index) => {
              return (
                <Option value={JSON.stringify(el)} key={index}>
                  {el.key}
                </Option>
              );
            })}
          </Select>
        )}
        {selectedOption === "dropDownList2" && (
          <Select
            showSearch
            placeholder="Search to Select"
            filterOption={false}
            showArrow={false}
            value={null}
            onSearch={optimsedFilterComp}
            onChange={handleChange}
            style={{ width: "200px", marginLeft: "20px" }}
          >
            {dropDownList2?.map((el, index) => {
              return (
                <Option value={JSON.stringify(el)} key={index}>
                  {el.key}
                </Option>
              );
            })}
          </Select>
        )}
        {selectedOption === "dropdown3" && (
          <Select
            showSearch
            placeholder="Search to Select"
            filterOption={false}
            showArrow={false}
            value={null}
            onSearch={optimsedAddressFilterComp}
            onChange={handleChange}
            style={{ width: "200px", marginLeft: "20px" }}
          >
            {dropDownList3?.map((el, index) => {
              return (
                <Option value={JSON.stringify(el)} key={index}>
                  {el.key}
                </Option>
              );
            })}
          </Select>
        )}
        {selectedOption === "dropdown4" && (
          <Select
            showSearch
            placeholder="Search to Select"
            filterOption={false}
            showArrow={false}
            value={null}
            onSearch={optimsedAddressFilterComp}
            onChange={handleChange}
            style={{ width: "200px", marginLeft: "20px" }}
          >
            {dropDownList4?.map((el, index) => {
              return (
                <Option value={JSON.stringify(el)} key={index}>
                  {el.key}
                </Option>
              );
            })}
          </Select>
        )}

        {selectedOption === "dropdownStatic1" && (
          <Select
            onChange={selectOptionInDropDown1}
            style={{ width: "150px", marginLeft: "20px" }}
            value={null}
          >
            {staticdropDownList1?.map((el, index) => {
              return (
                <Option value={JSON.stringify(el)} key={index}>
                  {el.key}
                </Option>
              );
            })}
          </Select>
        )}
        {selectedOption === "dropdownStatic2" && (
          <Select
            onChange={selectOptionInDropDown2}
            style={{ width: "150px", marginLeft: "20px" }}
            value={null}
          >
            {staticdropDownList2?.map((el, index) => {
              return (
                <Option value={JSON.stringify(el)} key={index}>
                  {el.key}
                </Option>
              );
            })}
          </Select>
        )}
        {selectedOption === "dropdownStatic3" && (
          <Select
            onChange={selectOptionInDropDown3}
            style={{ width: "150px", marginLeft: "20px" }}
            value={null}
          >
            {staticdropDownList3?.map((el, index) => {
              return (
                <Option value={JSON.stringify(el)} key={index}>
                  {el.key}
                </Option>
              );
            })}
          </Select>
        )}
        {selectedOption === "date" && (
          <DatePicker
            style={{ width: "200px", marginLeft: "20px" }}
            onChange={(date, dateString) =>
              handleDatePickerChange(date, dateString)
            }
          />
        )}
      </div>
      <div className="filterRow">
        <div className="filterRow">
          {keyValueList &&
            Object.keys(keyValueList).map((key, index) => {
              return (
                <div
                  key={index}
                  className={key === selectedKey ? "selectedBox" : "tagBox"}
                >
                  <div className="keyStyle">
                    <div className={key === selectedKey ? "seKey" : "key"}>
                      {decodeURIComponent(key)}
                    </div>
                    <div
                      className={key === selectedKey ? "seKey" : "key"}
                      onClick={() => removeKeyEvent(key)}
                    >
                      <CloseOutlined />
                    </div>
                  </div>

                  {selected_filter_display(key)}
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default FilterComp;
