import { Button } from "../../../components/index";
import { Link } from "react-router-dom";
import "./TableItem.scss";
import { Fragment, useState } from "react";
import ShopLogo from "../../../assets/svg/walmart.svg";

function TableItem({ rows, handleClick, action, tableHeads }) {
  const capitalize = (word) => {
    return word
      .toLowerCase()
      .replace(/\w/, (firstLetter) => firstLetter.toUpperCase());
  };

  const headDatas = tableHeads.map(({ name, id }) => {
    return <th key={id}>{name}</th>;
  });

  return (
    <table>
      <thead>
        <tr>{headDatas}</tr>
      </thead>
      <tbody>
        {rows.map((row, index) => (
          <Fragment key={`${row.id}`}>
            <tr onClick={() => handleClick(index)}>
              <td>{row.id}</td>
              <td>{row.customer_full_name}</td>
              <td>
                {row.status !== "need to confirm" ? (
                  <span className={`badge-${row.status}`}>
                    {capitalize(row.status)}
                  </span>
                ) : (
                  <span className={`badge-${row.status}`}>
                    Needs to confirm
                  </span>
                )}
              </td>
              <td>{row.tracking_code}</td>
              <td>
                <a
                  href={row.product.url}
                  target="_blank"
                  className="underline"
                  onClick={(e) => e.stopPropagation()}
                >
                  <img src={ShopLogo} alt="" className="shopLogo" />
                </a>
              </td>
              <td>
                <span className="product-name" title={row.product.name}>
                  {row.product.name}
                </span>
              </td>
              <td>{row.coupon}</td>
              <td>{row.product.quantity}</td>
              <td>{row.total_price}</td>
              <td>
                <div className="action-wrapper">
                  <div className="action-link-wrapper">
                    <Link
                      to={`${action.updateUrl}${row.id}`}
                      className={"action-link"}
                    >
                      {" "}
                      {action.update}{" "}
                    </Link>
                  </div>
                  {row.status === "confirm" && (
                    <div
                      className="action-delete-wrapper"
                      onClick={(e) => action.buy(e, row.id)}
                    >
                      <Button name={action.buyName} type={"btn-action"} />
                    </div>
                  )}
                  <div
                    className="action-delete-wrapper"
                    onClick={(e) => action.cancelItem(e, row.id)}
                  >
                    <Button name={action.cancelName} type={"btn-action"} />
                  </div>
                </div>
              </td>
            </tr>
            {row.other && (
              <tr>
                <td className="colSpan" colSpan="10">
                  <table>
                    <thead>
                      <tr>
                        <th>Color</th>
                        <th>Price</th>
                        <th>Comment</th>
                        <th>Admin Comment</th>
                        <th>Cancel Message</th>
                        <th>Rate</th>
                        <th>Message</th>
                        <th>Confirmed Price</th>
                        <th>Shipping Price</th>
                        <th>Commission</th>
                        <th>Card</th>
                        <th>Buy At</th>
                        <th>Updated At</th>
                        <th>Created At</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{row.product.color}</td>
                        <td>{row.product.price}</td>
                        <td>{row.comment}</td>
                        <td>{row.admin_comment}</td>
                        <td>{row.cancel_message}</td>
                        <td>{row.rate}</td>
                        <td>{row.message}</td>
                        <td>{row.confirmed_price}</td>
                        <td>{row.shipping_price}</td>
                        <td>{row.commission}</td>
                        <td>{row.card}</td>
                        <td>{row.buy_at}</td>
                        <td>{row.updated_at}</td>
                        <td>{row.created_at}</td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            )}
          </Fragment>
        ))}
      </tbody>
    </table>
  );
}

export default TableItem;
