import React, { useState } from "react";
import { Button, Item, Label, LabelDetail } from 'semantic-ui-react'
import { Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { deleteTask, posttoast } from '../redux/Actions/actions'
import EditCard from '../tools/EditCard';

function TaskCard({ id, title, description, assignedTo, priority, startDate, deadline, status }) {
    const priorityColor = priority === "High" ? "red" : priority === "Medium" ? "orange" : "yellow"
    const statusColor = status === "To Do" ? "grey" : status === "In Progress" ? "blue" : "green"
    const dispatch = useDispatch();
    const [editState, setEditState] = useState(false);
    const handleClose = () => setEditState(false);

    function handleDeleteTask(e) {
        e.preventDefault();
        dispatch(deleteTask({ id: id }))
        dispatch(posttoast({ toast: { state: 'success', text: 'Task deleted successful', show: true } }))

    }
    function handleEditTask(e) {
        e.preventDefault();
        setEditState(true);
    }

    return (
        <>
            {editState ? <>
                <Modal show={editState} onHide={handleClose}>
                    <Modal.Header closeButton >
                        <Modal.Title>Edit TASK</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <EditCard
                            id={id}
                            title={title}
                            description={description}
                            assignedTo={assignedTo}
                            priority={priority}
                            startDate={startDate}
                            deadline={deadline}
                            status={status}
                            setShow={setEditState}
                        />
                    </Modal.Body>
                </Modal>
            </> : <></>}
            <div className={editState ? "CardShake" : ""} style={{ width: '100%' }}>
                <Item className="taskCard" style={{ borderStyle: "groove", padding: "10px 10px", width: "100%", marginBottom: "10px" }}>
                    <Item.Content>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <Item.Header as="a">{title}</Item.Header>
                            <Item.Meta>
                                <Label color="teal">Assigned to:
                                    <LabelDetail>{assignedTo}</LabelDetail></Label>
                            </Item.Meta>
                        </div>

                        <Item.Description>{description}</Item.Description>

                        <div style={{ display: 'flex', gap: "10px", margin: "10px 0px" }}>
                            <Item.Extra  >
                                <Label color={priorityColor}><span>Priority: {priority}</span></Label>
                            </Item.Extra>
                            <Item.Extra>
                                <Label color={statusColor}><span>Status: {status}</span></Label>
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

                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Button onClick={handleEditTask} >
                                Edit Task
                            </Button>
                            <Button onClick={handleDeleteTask}>
                                Delete Task
                            </Button>
                        </div>
                    </Item.Content>
                </Item>
            </div>
        </>
    );
}





export default TaskCard;
