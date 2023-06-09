import "./styles.css";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

import "bootstrap/dist/css/bootstrap.min.css";
import userdata from "./tempData.json";
import { useState } from "react";

export default function App() {
  const [users, setUsers] = useState(userdata.data);

  const handleDragEnd = (e) => {
    if (!e.destination) return;
    let tempData = Array.from(users);
    let [source_data] = tempData.splice(e.source.index, 1);
    tempData.splice(e.destination.index, 0, source_data);
    setUsers(tempData);
  };
  return (
    <div className="App mt-4">
      <DragDropContext onDragEnd={handleDragEnd}>
        <table className="table borderd">
          <thead>
            <tr>
              <th />
              <th>Username</th>
              <th>Input Type</th>
              <th>Created at</th>
            </tr>
          </thead>
          <Droppable droppableId="droppable-1">
            {(provider) => (
              <tbody
                className="text-capitalize"
                ref={provider.innerRef}
                {...provider.droppableProps}
              >
                {users?.map((user, index) => (
                  <Draggable
                    key={user.name}
                    draggableId={user.name}
                    index={index}
                  >
                    {(provider) => (
                      <tr
                        {...provider.draggableProps}
                        ref={provider.innerRef}
                        {...provider.dragHandleProps}
                      >
                        <td>you can dang => </td>
                        <td>{user.name}</td>
                        <td>{user.input_type}</td>
                        <td>{user.createdAt}</td>
                      </tr>
                    )}
                  </Draggable>
                ))}
                {provider.placeholder}
              </tbody>
            )}
          </Droppable>
        </table>
      </DragDropContext>
    </div>
  );
}
