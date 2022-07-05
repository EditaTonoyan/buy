import { useState } from "react";
import { useDispatch } from "react-redux";
import "./BuyForMeTable.scss";
import { Button } from "../index";
import { Link } from "react-router-dom";
import TableItem from "./tableItem/TableItem";
// import getOrdersAction from "../../store/actions/orders";
import { Search } from "@mui/icons-material";
import { getOrgers } from "../../store/actions/";

const BuyForMeTable = ({
  title,
  rows,
  tableHeads,
  action,
  checkedDatas,
  checkCodes,
  setCheckedDatas,
  setCheckCodes,
}) => {
  // console.log("checkedDatas", checkedDatas);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [checked, setChecked] = useState(false);
  // const [checkedAll, setCheckedAll] = useState(true);
  const [state, setState] = useState(0);

  const dispatch = useDispatch();

  const handleChangeChecked = (e) => {
    checkedDatas.push(e.target.name);
    setCheckedDatas(checkedDatas);
    setChecked(!checked);
  };
  const handleChangeCheckedCodes = (e) => {
    checkedDatas.push(e.target.name);
    setCheckCodes(checkCodes);
    setChecked(!checked);
  };

  const searchByStatus = (e) => {
    e.preventDefault();
    // console.log(111);
    dispatch(getOrgers(checkCodes));
  };

  const searchByCode = (e) => {
    e.preventDefault();
    console.log(111);
    dispatch(getOrgers(checkedDatas));
  };

  const handleClick = (index) => {
    const updatedState = rows[index];

    if (updatedState.other) {
      delete updatedState.other;
      setState((pre) => {
        return pre + 1;
      });
    } else {
      updatedState.other = {
        description: "Hello there", //or data from api
      };
      setState((pre) => {
        return pre + 1;
      });
    }
  };

  return rows.length ? (
    <div className="buyForMeTable-wrapper">
      <div className={"buyForMeTable-header"}>
        <div align="left" className={"buyForMeTable-title"}>
          <h2>{title}</h2>
        </div>
        <div align="left" className={"buyForMeTable-link-wrapper"}>
          {!!action.addUrl && (
            <Link to={action.addUrl} className={"buyForMeTable-link"}>
              {action.addLinkName}
            </Link>
          )}
        </div>
      </div>

      <form className="buy-for-me-filters-wrapper">
        <div className="buy-for-me-filters">
          <div className="checkbox">
            <label htmlFor="needConfirmed">Process</label>
            <input
              type="checkbox"
              name="process"
              onChange={handleChangeChecked}
            />
          </div>

          <div className="checkbox">
            <label htmlFor="needConfirmed">Need to confirmed</label>
            <input
              type="checkbox"
              name="need to confirm"
              onChange={handleChangeChecked}
            />
          </div>

          <div className="checkbox">
            <label htmlFor="confirmed">Confirmed</label>
            <input
              type="checkbox"
              name="confirm"
              onChange={handleChangeChecked}
            />
          </div>
          <div className="checkbox">
            <label htmlFor="checked">Canceled </label>
            <input
              type="checkbox"
              name="cancel"
              onChange={handleChangeChecked}
            />
          </div>
          <div className="checkbox">
            <label htmlFor="reject">Reject</label>
            <input
              type="checkbox"
              name="reject"
              onChange={handleChangeChecked}
            />
          </div>

          <div className="checkbox">
            <label htmlFor="purchased">Purchased</label>
            <input
              type="checkbox"
              name="purchased"
              onChange={handleChangeChecked}
            />
          </div>
          <div className="checkbox">
            <label htmlFor="delivered">Delivered</label>
            <input
              type="checkbox"
              name="delivered"
              onChange={handleChangeChecked}
            />
          </div>

          <button onClick={searchByStatus}>Search</button>
        </div>

        <div className="buy-for-me-filters">
          <div className="checkbox">
            <label htmlFor="armCards">Armenian cards</label>
            <input
              name="armenian"
              type="radio"
              id={"armCards"}
              onChange={handleChangeCheckedCodes}
            />
          </div>
          <div className="checkbox">
            <label htmlFor="usaCards">USA cards</label>
            <input
              name="american"
              type="radio"
              id={"usaCards"}
              onChange={handleChangeCheckedCodes}
            />
          </div>
          <div className="checkbox">
            <label htmlFor="ruCards">Russian cards</label>
            <input
              name="russian"
              type="radio"
              id={"ruCards"}
              onChange={handleChangeCheckedCodes}
            />
          </div>
          <div className="form-group">
            <button onClick={searchByCode}>search</button>
          </div>
        </div>
      </form>

      <div className="form-group">
        <input
          placeholder="Search by Full Name"
          type="text"
          id="first_name"
          className="form-field first_name input"
          required
        />
        <label htmlFor="first_name" className="form-label">
          <Search />
        </label>
      </div>
      {!!rows.length && (
        <div className="table--wrapper">
          <p className={"table-items-count"}>Total Items {rows.length}</p>
          <TableItem
            rows={rows}
            action={action}
            handleClick={handleClick}
            tableHeads={tableHeads}
          />
        </div>
      )}
    </div>
  ) : (
    <h2>No RESULT //TABLE</h2>
  );
};

export default BuyForMeTable;
