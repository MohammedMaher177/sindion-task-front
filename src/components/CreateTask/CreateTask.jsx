import React from "react";
import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import FormComp from "../Form/Form.jsx";
import { createTaskValidation } from "../../util/util.js";
const inputs = [
  {
    type: "text",
    placeholder: "Title",
    id: "title",
  },
  {
    type: "text",
    placeholder: "Description",
    id: "description",
  },
];
export default function CreateTask({ taskValues = null, titleBtn }) {
  console.log(taskValues);
  const [open, setOpen] = useState(false);
  const initialValues = taskValues || {
    title: "",
    description: "",
  };
  const handleSubmit = async (values) => {
    console.log(values);
    // const result = await dispatch(sign_up(values));
    // console.log(result);
  };
  const cancelButtonRef = useRef(null);
  return (
    <>
      <button
        className="bg-slate-700 text-white flex flex-wrap p-3 rounded-lg uppercase hover:opacity-95"
        onClick={() => setOpen(true)}
      >
        {titleBtn}
      </button>
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={setOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-full">
                        <Dialog.Title
                          as="h3"
                          className="text-base font-semibold leading-6 text-gray-900"
                        >
                          {titleBtn}
                        </Dialog.Title>
                        <div className="mt-2 w-full">
                          <FormComp
                            handleSubmit={handleSubmit}
                            initialValues={initialValues}
                            validationSchema={createTaskValidation}
                            inputs={inputs}
                            loading={false}
                            titleBtn={"Create Task"}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                      onClick={() => setOpen(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}
