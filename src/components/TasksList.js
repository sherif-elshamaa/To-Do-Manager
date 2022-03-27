import { useState } from "react";
import { Container, Navbar } from "react-bootstrap";
import Filter from "./Filter";
import Lightbox from "../tools/Lightbox";

function TasksList() {
    const [priority, setPriority] = useState("High");
    const [status, setStatus] = useState("To Do");
    const today = new Date(Date.now()).toLocaleDateString().split("/").map(x => { if (x.length < 2) { return "0" + x } else { return x } });
    const todayFormat = `${today[2]}-${today[0]}-${today[1]}`
    const [date, setDate] = useState("Deadline")
    const [selectDate, setSelectDate] = useState(todayFormat);
    const [sort, setSort] = useState("Priority")


    const handleSortFilter = (e) => {
        setSort(e.target.value)
    }
    const handlePriorityFilter = (e) => {
        setPriority(e.target.value);
    };
    const handleSelectDateFilter = (e) => {
        setSelectDate(e.target.value);
    }
    const handleStatusFilter = (e) => {
        setStatus(e.target.value);
    }
    const handleDateFilter = (e) => {
        setDate(e.target.value);
    }
    const [show, setShow] = useState(false);
    return (
        <>
            <Navbar
                bg="dark"
                expand="lg"
                variant="dark"
                style={{ margin: "0px 0px 5px  0px" }}
            >
                <Container style={{ margin: "auto" }}>
                    <>
                        <Navbar.Brand>To Do Manager</Navbar.Brand>
                        <div className="sortNavBar">
                            <label
                                htmlFor="sort"
                                style={{ color: "white", margin: "10px 10px" }}
                            >
                                FilterBy:
                            </label>
                            <select className="filter" id="sort" onChange={handleSortFilter} value={sort}>
                                <option value="Priority">Priority</option>
                                <option value="Status">Status</option>
                                <option value="Date">Date</option>
                            </select>
                            {sort === "Priority" && <>
                                <label
                                    htmlFor="Priority"
                                    style={{ color: "white", margin: "10px 10px" }}
                                >
                                    Priority:
                                </label>
                                <select className="filter" id="Priority" onChange={handlePriorityFilter} value={priority}>
                                    <option value="High">High</option>
                                    <option value="Medium">Medium</option>
                                    <option value="Low">Low</option>
                                </select>
                            </>
                            }

                            {sort === "Status" && <>
                                <label
                                    htmlFor="Status"
                                    style={{ color: "white", margin: "10px 10px" }}
                                >
                                    Status:
                                </label>
                                <select className="filter" id="Status" onChange={handleStatusFilter} value={status}>
                                    <option value="To Do">To Do</option>
                                    <option value="In Progress">In Progress</option>
                                    <option value="Done">Done</option>
                                </select>
                            </>}

                            {sort === "Date" && <>
                                <label
                                    htmlFor="Date"
                                    style={{ color: "white", margin: "10px 10px" }}
                                >
                                    Date:
                                </label>
                                <select className="filter" id="Date" onChange={handleDateFilter} value={date}>
                                    <option value="StartDate">Start Date</option>
                                    <option value="Deadline">Deadline</option>
                                    <option value="selectDate">Select Date</option>
                                </select> </>
                            }

                        </div>

                    </>
                    <br />
                </Container>
            </Navbar>

            <div className="SecNavbar">
                <Lightbox show={show} setShow={setShow} />
                {
                    date === "selectDate" ?
                        <input value={selectDate} type="date" className="filter" id="SelectDate" onChange={handleSelectDateFilter} />
                        : <></>
                }
            </div>

            <Filter sort={sort} priority={priority} status={status} date={date} selectDate={selectDate} />
        </>
    )
}

export default TasksList