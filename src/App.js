import React, { useState, useEffect } from "react";
import "./App.css";
import { MoreHorizontal } from "react-feather";
import { FaRegCircleDot } from "react-icons/fa6";

import { BsExclamation, BsFillExclamationSquareFill } from "react-icons/bs";
import { AiOutlinePlus } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";
import { LuSignalLow } from "react-icons/lu";
import { FcTodoList } from "react-icons/fc";
import { TbProgressCheck } from "react-icons/tb";
// import { IoCheckmarkDoneCircle } from "react-icons/io";
import {
  PiCellSignalHighBold,
  PiCellSignalMediumBold,
  PiCellSignalMediumDuotone,
  PiCellSignalMediumFill,
  PiMediumLogoBold,
} from "react-icons/pi";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [viewState, setViewState] = useState({
    grouping: "status",
    ordering: "priority",
  });

  useEffect(() => {
    fetchData();
    const savedViewState = JSON.parse(localStorage.getItem("viewState"));
    if (savedViewState) {
      setViewState(savedViewState);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("viewState", JSON.stringify(viewState));
  }, [viewState]);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://api.quicksell.co/v1/internal/frontend-assignment"
      );
      const data = await response.json();
      setTasks(data.tickets);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleAddTask = (status) => {
    const newTask = {
      id: `NEW-${Math.random().toString(36).substr(2, 5)}`,
      title: "New Task",
      tag: ["Feature Request"],
      userId: "usr-1",
      status,
      priority: 0,
    };

    setTasks([...tasks, newTask]);
  };

  const handleGroupingChange = (grouping) => {
    setViewState({ ...viewState, grouping });
  };

  const handleOrderingChange = (ordering) => {
    setViewState({ ...viewState, ordering });
  };

  const getPriorityName = (priority) => {
    switch (priority) {
      case 4:
        return "Urgent";
      case 3:
        return "High";
      case 2:
        return "Medium";
      case 1:
        return "Low";
      default:
        return "No priority";
    }
  };

  const groupAndOrderTasks = () => {
    const groupedTasks = {};
    tasks.forEach((task) => {
      const groupKey =
        viewState.grouping === "status"
          ? task.status
          : viewState.grouping === "user"
          ? task.userId
          : getPriorityName(task.priority);
      if (!groupedTasks[groupKey]) {
        groupedTasks[groupKey] = [];
      }
      groupedTasks[groupKey].push(task);
    });

    Object.keys(groupedTasks).forEach((groupKey) => {
      const orderCriteria =
        viewState.ordering === "title" ? "title" : "priority";
      groupedTasks[groupKey].sort(
        (a, b) => b[orderCriteria] - a[orderCriteria]
      );
    });

    return groupedTasks;
  };

  const groupedAndOrderedTasks = groupAndOrderTasks();

  return (
    <div className="app">
      <header>
        <div className="cursor-container">
          <span>Sort By:</span>
          <span className="cursor">{viewState.grouping}</span>
          <label className="dropdown">
            <div className="dd-button">Display</div>
            <input type="checkbox" className="dd-input" id="test" />
            <ul className="dd-menu">
              <li
                className="cursor"
                onClick={() => handleGroupingChange("status")}
              >
                Status
              </li>
              <li
                className="cursor"
                onClick={() => handleGroupingChange("user")}
              >
                User
              </li>
              <li
                className="cursor"
                onClick={() => handleGroupingChange("priority")}
              >
                Priority
              </li>
            </ul>
          </label>
          <span onClick={() => handleOrderingChange("priority")}></span>
          <span onClick={() => handleOrderingChange("title")}></span>
        </div>
      </header>
      <div className="board">
        {Object.keys(groupedAndOrderedTasks).map((group, index) => (
          <div key={index} className="column">
            <h3 style={{ display: "flex" }}>
              {group} <AiOutlinePlus /> {console.log(group)}
              {group === "No priority" && (
                <div>
                  <BsThreeDots />
                </div>
              )}
              {group === "Urgent" && (
                <div>
                  <BsExclamation style={{ backgroundColor: "red" }} />
                </div>
              )}
              {group === "Low" && (
                <div>
                  {" "}
                  <LuSignalLow />
                </div>
              )}
              {group === "High" && (
                <div>
                  {" "}
                  <PiCellSignalHighBold />
                </div>
              )}
              {group === "Medium" && (
                <div>
                  {" "}
                  <PiCellSignalMediumFill />
                </div>
              )}
              {group === "Todo" && (
                <div>
                  {" "}
                  <FcTodoList />
                </div>
              )}
              {group === "In progress" && (
                <div>
                  {" "}
                  <TbProgressCheck />
                </div>
              )}
            </h3>
            {/* <LuSignalLow /> */}
            {groupedAndOrderedTasks[group].map((task) => (
              <div key={task.id} className="card">
                <div className="card_top">{task.id}</div>
                <div className="card_top_labels">
                  <h5 className="card-title">{task.title}</h5>
                  <div className="tag">
                    <p className="card_footer" style={{}}>
                      <FaRegCircleDot
                        style={{ color: "grey", marginRight: "4px" }}
                      />

                      {task.tag.join(" ")}
                    </p>
                    <div className="card_top_more">
                      <MoreHorizontal />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
