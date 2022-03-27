import { React, useState } from "react";
import { Button, Modal, Form, Row, Col, Alert } from "react-bootstrap";
import ViewCard from "./ViewCard";
import { v4 as uuid } from 'uuid';
import { useDispatch, useSelector } from "react-redux";
import { addTodo, posttoast } from '../redux/Actions/actions'



function Lightbox({ show, setShow }) {
  const handleCloseError = () => {
    setErrorMsg(null)
  }

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const date = new Date(Date.now()).toLocaleDateString().split("/").map(x => { if (x.length < 2) { return "0" + x } else { return x } });
  const today = `${date[2]}-${date[0]}-${date[1]}`
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);


  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assignedTo, setAssignedTo] = useState(users[0].name);
  const [priority, setPriority] = useState("High");
  const [startDate, setStartDate] = useState(today);
  const [deadline, setDeadline] = useState("");
  const [status, setStatus] = useState("To Do");
  const [errorMsg, setErrorMsg] = useState(null);

  const onTitle = ({ target: { value } }) => setTitle(value);
  const onDescription = ({ target: { value } }) => setDescription(value);
  const onAssignedTo = ({ target: { value } }) => setAssignedTo(value);
  const onPriority = ({ target: { value } }) => setPriority(value);
  const onStartDate = ({ target: { value } }) => setStartDate(value);
  const onDeadline = ({ target: { value } }) => setDeadline(value);
  const onStatus = ({ target: { value } }) => setStatus(value);

  const handleClear = () => {
    setTitle("");
    setDescription("");
    setAssignedTo(users[0].assignedTo);
    setPriority("High");
    setStartDate(today);
    setDeadline("");
    setStatus("To Do");

  };

  const handleAddTask = () => {
    if (title === "" || description === "" || assignedTo === "" || deadline === "") {
      setErrorMsg("Please Enter All Required Informations.")
      return
    }
    const task = {
      id: uuid(),
      title: title,
      description: description,
      assignedTo: assignedTo,
      priority: priority,
      startDate: new Date(startDate),
      deadline: new Date(deadline),
      status: status,
    }
    dispatch(addTodo({ task: task }));
    dispatch(posttoast({ toast: { state: 'success', text: 'Task added successful', show: true } }))
    console.log(task);
    setShow(false);
    handleClear()
  };



  return (
    <>
      <Button
        variant="success"
        size="sm"
        style={{ margin: "5px 5px" }}
        onClick={handleShow}
      >
        ADD NEW TASK
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton >
          <Modal.Title>ADD NEW TASK</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ViewCard
            title={title}
            description={description}
            assignedTo={assignedTo}
            priority={priority}
            startDate={startDate}
            deadline={deadline}
            status={status}
          />
          <div>
            {errorMsg !== null ?
              <>
                <Alert variant="danger" onClose={handleCloseError} dismissible>
                  <Alert.Heading>Holy smokes! </Alert.Heading>
                  <p>{errorMsg}</p>
                  </Alert>
              </>
              :
              ""}
          </div>
          <Form>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="3">
                Insert title:
              </Form.Label>
              <Col sm="9">
                <Form.Control
                  type="text"
                  placeholder="Task Title...."
                  value={title}
                  onChange={onTitle}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="4">
                Insert description:
              </Form.Label>
              <Col sm="8">
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Description..."
                  value={description}
                  onChange={onDescription}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="4">
                Assign to:
              </Form.Label>
              <Col sm="8">
                <select name="status" onChange={onAssignedTo} value={assignedTo}>
                  {users.map(user =>
                    <option value={user.name} key={user.id}>{user.name}</option>
                  )}
                </select>
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="4">
                priority:
              </Form.Label>
              <Col sm="8">
                <select name="priority" onChange={onPriority} value={priority}>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="4">
                Insert Start Date:
              </Form.Label>
              <Col sm="8">
                <input type="date" value={startDate} min={today} max="2030-01-01" onChange={onStartDate} />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="4">
                Insert Deadline:
              </Form.Label>
              <Col sm="8">
                <input type="date" value={deadline} min={startDate} max="2030-01-01" onChange={onDeadline} />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="4">
                Status:
              </Form.Label>
              <Col sm="8">
                <select name="statue" onChange={onStatus} value={status}>
                  <option value="To Do">To Do</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Done">Done</option>
                </select>
              </Col>
            </Form.Group>

          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClear}>
            Clear
          </Button>
          <Button variant="primary" onClick={handleAddTask}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Lightbox;
