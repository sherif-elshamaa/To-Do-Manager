import React from "react";
import { Item, Label, LabelDetail } from 'semantic-ui-react'

function ViewCard({ title, description, assignedTo, priority, startDate, deadline, status }) {
  const priorityColor = priority === "High" ? "red" : priority === "Medium" ? "orange" : "yellow"
  const statusColor = status === "To Do" ? "grey" : status === "In Progress" ? "blue" : "green"

  return (
    <>
      <Item.Group>
        <Item style={{ borderStyle: "groove", padding: "10px 10px"}}>
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
                <Label color={statusColor || "grey"}><span>Status: {status}</span></Label>
              </Item.Extra>
            </div>

            <div style={{ display: 'flex', justifyContent: "space-evenly", margin: "10px 0px" }}>
              <Item.Extra>
                <span>Start Date: {startDate}</span>
              </Item.Extra>
              <Item.Extra>
                <span>Deadline: {deadline}</span>
              </Item.Extra>
            </div>

          </Item.Content>
        </Item>
      </Item.Group>
    </>
  );
}

export default ViewCard;
