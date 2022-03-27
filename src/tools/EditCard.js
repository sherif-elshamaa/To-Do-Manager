import React, { useState } from "react";
import { Item, Label, LabelDetail, Button } from 'semantic-ui-react'
import { useDispatch } from "react-redux";
import { editTask,posttoast } from '../redux/Actions/actions'

function EditCard({ id, title, description, assignedTo, priority, startDate, deadline, status, setShow }) {
    const priorityColor = priority === "High" ? "red" : priority === "Medium" ? "orange" : "yellow"
    const statusColor = status === "To Do" ? "grey" : status === "In Progress" ? "blue" : "green"
    const [newStatus, setNewStatus] = useState(status)
    const onStatus = ({ target: { value } }) => setNewStatus(value);
    const dispatch = useDispatch();

    const handleEdit = (e) => {
        e.preventDefault();
        dispatch(editTask({id: id, status: newStatus}))
        dispatch(posttoast({ toast: { state: 'success', text: 'Task Status updated successful', show: true } }))

        setShow(false)
    }
    return (
        <>
            <Item.Group>
                <Item style={{ borderStyle: "groove", padding: "10px 10px" }}>
                    <Item.Content>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <Item.Header >Title: {title}</Item.Header>
                            <Item.Meta>
                                <Label color="teal">Assigned to:
                                    <LabelDetail>{assignedTo}</LabelDetail></Label>
                            </Item.Meta>
                        </div>

                        <Item.Description>Description: {description}</Item.Description>

                        <div style={{ display: 'flex', gap: "10px", margin: "10px 0px" }}>
                            <Item.Extra  >
                                <Label color={priorityColor || "grey"}><span>Priority: {priority}</span></Label>
                            </Item.Extra>
                            <Item.Extra>
                                <Label color={statusColor || "grey"}>
                                    <span>Status: </span>
                                </Label>
                                <select name="statue" onChange={onStatus} value={newStatus}>
                                    <option value="To Do">To Do</option>
                                    <option value="In Progress">In Progress</option>
                                    <option value="Done">Done</option>
                                </select>
                            </Item.Extra>
                        </div>

                        <div style={{ display: 'flex', justifyContent: "space-evenly", margin: "10px 0px" }}>
                            <Item.Extra>
                                <span>Start Date: {startDate.toDateString()}</span>
                            </Item.Extra>
                            <Item.Extra>
                                <span>Deadline: {deadline.toDateString()}</span>
                            </Item.Extra>
                        </div>
                        <div style={{ display: 'flex', justifyContent: "flex-end" }}>
                            <Button primary onClick={handleEdit}>Confirm</Button>
                        </div>

                    </Item.Content>
                </Item>
            </Item.Group>
        </>
    );
}

export default EditCard;
