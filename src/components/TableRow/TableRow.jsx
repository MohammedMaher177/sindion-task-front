import React from "react";
import CreateTask from "../CreateTask/CreateTask.jsx";
import DeletePopUp from "../DeletePopUp/DeletePopUp.jsx";

export default function TableRow({ Task }) {
  const handleDelete = () => {
    console.log(Task._id);
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
          <div className="flex">
            <span className="text-sm text-blue-gray font-normal">
              <button className="text-sm flex gap-2 text-sm py-1 px-8 text-blue-600 p-4">
                <CreateTask
                  titleBtn="Edit"
                  taskValues={{
                    title: Task.title,
                    description: Task.description,
                    _id: Task._id,
                  }}
                />
              </button>
            </span>
            <span className="text-sm text-blue-gray font-normal opacity-70">
              <button
                className="text-sm flex gap-2 text-sm py-1 px-8 text-red-600 p-4"
                onClick={handleDelete}
              >
                <DeletePopUp />
              </button>
            </span>
          </div>
        </div>
      </td>
    </tr>
  );
}
