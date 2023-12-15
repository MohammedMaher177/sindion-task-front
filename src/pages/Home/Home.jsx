import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CreateTask from "../../components/CreateTask/CreateTask.jsx";
import TableRow from "../../components/TableRow/TableRow.jsx";
import { getAllTasks } from "../../redux/TaskSlice/TaskSlice.js";

const TABLE_HEAD = ["User", "Title", "Description", "Date", "Actions"];

export default function Home() {
  const dispatch = useDispatch();
  const { tasks, loading } = useSelector(({ task }) => task);
  const getTasks = async () => {
    dispatch(getAllTasks());
  };

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <>
      <div className="mt-4">
        <h1 className="underline font-extrabold underline-offset-1 mb-10">
          Your Tasks:
        </h1>
        <div className=" mb-12">
          <CreateTask titleBtn="Create Task" />
        </div>
        {loading["getTasks"] ? (
          "Loading......"
        ) : (
          <table className="w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    className="cursor-pointer border-b bg-gray-100 p-4 hover:bg-gray-50"
                  >
                    <span className="text-sm text-blue-gray">{head}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tasks?.map((task) => (
                <TableRow Task={task} key={task?._id} />
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
