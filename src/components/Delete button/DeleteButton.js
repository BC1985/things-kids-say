import React, { useState, useContext } from "react";

import { apiService } from "../../Services/apiServices";
import Spinner from "../Spinner/Spinner";
import { withRouter } from "react-router";
import { context } from "../../Context";
import { icons } from "../../helpers"

function DeleteQuote(props) {
  const { user } = useContext(context);

  const [toggle, setToggle] = useState(false);
  const [confirmation, setConfirmation] = useState({
    message: "",
    isConfirmed: false,
  });

  const deleteIcon = (
    <div>
      <span>Delete quote</span>
      {icons.trash}
    </div>
  );

  const iconStyle = {
    fontSize: "2em",
  };

  const confirmDelete = async e => {
    e.preventDefault();

    const res = await apiService.deleteQuote(props.id);
    setTimeout(() => {
      props.history.push(`/my_quotes/user/${user._id}`);
    }, 1000);
    setConfirmation({ message: res, isConfirmed: true });
    toggleMenu();
  };
  const toggleMenu = () => {
    setToggle(prev => !prev);
  };

  const show = toggle ? "show" : "";

  return (
    <>
      <div>
        <button
          className=" btn btn-danger mt-4"
          type="button"
          onClick={toggleMenu}
        >
          {deleteIcon}
        </button>
        <div className={"collapse " + show}>
          <div className="text-danger">
            Are you sure?
            <button className="btn p-0" type="button" onClick={confirmDelete}>
              <span className="text-primary" style={iconStyle}>
                {icons.check}
              </span>
            </button>
            <button className="btn p-10" type="button" onClick={toggleMenu}>
              <span style={iconStyle}>{icons.abort}</span>
            </button>
          </div>
        </div>
        {confirmation.isConfirmed && (
          <div>
            <span>
              {confirmation.message} <Spinner />
            </span>
          </div>
        )}
      </div>
    </>
  );
}

export default withRouter(DeleteQuote);
