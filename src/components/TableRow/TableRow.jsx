import React from "react";
import CreateTask from "../CreateTask/CreateTask.jsx";
import DeletePopUp from "../DeletePopUp/DeletePopUp.jsx";
import { useDispatch } from "react-redux";
import { deleteTask } from "../../redux/TaskSlice/TaskSlice.js";

export default function TableRow({ Task }) {
  const dispatch = useDispatch();
  const handleDelete = () => {
    dispatch(deleteTask(Task._id));
  };
  return (
    <tr key={Task._id} className="p-4 border-b">
      <td className="p-4">
        <div className="flex items-center gap-3">
          <div className="flex flex-col">
            <span className="text-sm text-blue-gray font-normal">
              {Task.user.name}
            </span>
            <span className="text-sm text-blue-gray font-normal opacity-70">
              {Task.user.email}
            </span>
          </div>
        </div>
      </td>
      <td className="p-4">
        <div className="flex items-center gap-3">
          <div className="flex flex-col">{Task.title}</div>
        </div>
      </td>
      <td className="p-4">
        <div className="flex flex-col">
          <span className="text-sm text-blue-gray font-normal">
            {Task.description}
          </span>
        </div>
      </td>

      <td className="p-4">
        <span className="text-sm text-blue-gray font-normal">
          {new Date(Task.createdAt).toLocaleString()}
        </span>
      </td>
      <td className="p-4">
        <div className="flex items-center gap-3">
          <span className="text-sm text-blue-gray font-normal">
            <CreateTask
              titleBtn="Edit"
              taskValues={{
                title: Task.title,
                description: Task.description,
                _id: Task._id,
              }}
            />
          </span>
          <span className="text-sm text-blue-gray font-normal opacity-70">
            <DeletePopUp handleDelete={handleDelete} />
          </span>
        </div>
      </td>
    </tr>
  );
}
