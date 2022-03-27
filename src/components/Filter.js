import React, { useEffect } from "react";
import TaskCard from "./TaskCard"
import { Container, Item } from "semantic-ui-react";
import { useSelector } from "react-redux"


function renderSwitch(sort, priority, status, date, selectDate, tasks) {
    const pOrder = { 'Low': priority === "Low" ? 1 : 0, 'Medium': priority === "Medium" ? 1 : 0, 'High': priority === "High" ? 1 : 0 };
    const sOrder = { 'To Do': status === "To Do" ? 1 : 0, 'In Progress': status === "In Progress" ? 1 : 0, 'Done': status === "Done" ? 1 : 0 };
    switch (sort) {
        case 'Priority':
            return <>{
                tasks.sort(
                    (a, b) => pOrder[b.priority] - pOrder[a.priority]
                ).map(
                    (task) => (

                        <TaskCard
                            id={task.id}
                            title={task.title}
                            description={task.description}
                            assignedTo={task.assignedTo}
                            priority={task.priority}
                            startDate={task.startDate}
                            deadline={task.deadline}
                            status={task.status}
                            key={task.id}
                        />
                    )
                )

            }
            </>;
        case 'Status':
            return <>{
                tasks.sort(
                    (a, b) => sOrder[b.status] - sOrder[a.status]
                ).map(
                    (task) => (

                        <TaskCard
                            id={task.id}
                            title={task.title}
                            description={task.description}
                            assignedTo={task.assignedTo}
                            priority={task.priority}
                            startDate={task.startDate}
                            deadline={task.deadline}
                            status={task.status}
                            key={task.id}
                        />
                    )
                )

            }
            </>;
        case 'Date':
            switch (date) {
                case 'Deadline':
                    return <>{
                        tasks.sort(
                            (a, b) => a.deadline - b.deadline
                        ).map(
                            (task) => (

                                <TaskCard
                                    id={task.id}
                                    title={task.title}
                                    description={task.description}
                                    assignedTo={task.assignedTo}
                                    priority={task.priority}
                                    startDate={task.startDate}
                                    deadline={task.deadline}
                                    status={task.status}
                                    key={task.id}
                                />
                            )
                        )

                    }
                    </>;
                case 'selectDate':
                    const filter = tasks.filter(task => task.startDate.toDateString() === new Date(selectDate).toDateString())

                    return <>{
                        filter.length < 1 ? <div style={{ width: '100%' }}>
                            <Item style={{ borderStyle: "groove", padding: "10px 10px", width: "780px", marginBottom: "10px" }}>
                                <Item.Content>
                                    <p>no data found</p>
                                </Item.Content>
                            </Item>
                        </div> :
                            filter.map(
                                (task) => (
                                    <TaskCard
                                        id={task.id}
                                        title={task.title}
                                        description={task.description}
                                        assignedTo={task.assignedTo}
                                        priority={task.priority}
                                        startDate={task.startDate}
                                        deadline={task.deadline}
                                        status={task.status}
                                        key={task.id}
                                    />
                                )
                            )

                    }
                    </>;
                case 'StartDate':
                    return <>{
                        tasks.sort(
                            (a, b) => a.startDate - b.startDate
                        ).map(
                            (task) => (

                                <TaskCard
                                    id={task.id}
                                    title={task.title}
                                    description={task.description}
                                    assignedTo={task.assignedTo}
                                    priority={task.priority}
                                    startDate={task.startDate}
                                    deadline={task.deadline}
                                    status={task.status}
                                    key={task.id}
                                />
                            )
                        )

                    }
                    </>;
                default:
                    return <div style={{ width: '100%' }}>
                        <Item style={{ borderStyle: "groove", padding: "10px 10px", width: "780px", marginBottom: "10px" }}>
                            <Item.Content>
                                <p>no data found</p>
                            </Item.Content>
                        </Item>
                    </div>;
            }
        default:
            return <div style={{ width: '100%' }}>
                <Item style={{ borderStyle: "groove", padding: "10px 10px", width: "780px", marginBottom: "10px" }}>
                    <Item.Content>
                        <p>no data found</p>
                    </Item.Content>
                </Item>
            </div>;

    }
}
function Filter({ sort, priority, status, date, selectDate }) {
    const tasks = useSelector((state) => state.tasks);

    useEffect(() => { }, [sort, tasks])

    return (
        <Container className="d-flex flex-wrap" style={{ margin: "auto" }}>
            <Item.Group>
                {renderSwitch(sort, priority, status, date, selectDate, tasks)}
            </Item.Group>
        </Container>
    )
}


export default Filter