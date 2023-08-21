import React, { useState } from "react";
import { CheckSquare, Clock, MoreHorizontal } from "react-feather";

import "./Card.css";
import { FaRegCircleDot } from "react-icons/fa6";

function UserCard({ userid, usertitle, userFeatured }) {
  console.log(userid);
  console.log(userFeatured);
  console.log(usertitle);
  return (
    <>
      <div className="card">
        <div className="card_top">
          <div className="card_top_labels">
            {userid}
            hha ye
          </div>
          <div className="card_top_more">
            <MoreHorizontal />
          </div>
        </div>
        <div className="card_title">heloo ha</div>
        <div className="card_footer">
          <p className="card_footer_item">
            <Clock className="card_footer_icon" />
          </p>
          <p className="card_footer_item">
            {userFeatured ? (
              <div className="tag">
                <FaRegCircleDot style={{ color: "grey", marginRight: "4px" }} />
                Featured request
              </div>
            ) : (
              <div>no request</div>
            )}
            <CheckSquare className="card_footer_icon" />
          </p>
        </div>
      </div>
    </>
  );
}

export default UserCard;
