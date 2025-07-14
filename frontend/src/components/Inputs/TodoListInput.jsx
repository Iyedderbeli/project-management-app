import React, { useState } from "react";
import { HiMiniPlus, HiOutlineTrash } from "react-icons/hi2";

const TodoListInput = ({ todoList, setTodoList }) => {
  const [option, setOption] = useState("");

  // Function to handle adding a new task
  const handleAddOption = () => {
    if (option.trim()) {
      setTodoList([...todoList, option.trim()]);
      setOption(""); // Clear the input field after adding
    }
  };

  // Function to handle deleting a task
  const handleDeleteOption = (index) => {
    const updatedArr = todoList.filter((_, idx) => idx !== index);
    setTodoList(updatedArr);
  };

  return (
    <div>
      {/* Display list of todo items */}
      {todoList.map((item, index) => (
        <div
          key={item}
          className="flex justify-between bg-gray-50 border border-gray-100 px-3 py-2 rounded-md mb-3 mt-2"
        >
          <p className="text-xs text-black">
            <span className="text-xs text-gray-400 font-semibold mr-2">
              {index < 9 ? `0${index + 1}` : index + 1}
            </span>
            {item}
          </p>
          <button
            className="cursor-pointer"
            onClick={() => handleDeleteOption(index)}
          >
            <HiOutlineTrash className="text-lg text-red-500" />
          </button>
        </div>
      ))}

      {/* Input field for adding a task */}
      <div className="flex items-center gap-5 mt-4">
        {/* Input field with task logo (SVG directly embedded) */}
        <div className="flex items-center gap-3 border border-gray-100 px-3 py-2 rounded-md w-full">
          {/* SVG Logo (Tasks App) */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-gray-400"
          >
            <path d="M3 6h18M3 12h18M3 18h18"></path>
          </svg>
          <input
            type="text"
            placeholder="Add task"
            value={option}
            onChange={({ target }) => setOption(target.value)}
            className="w-full text-[13px] text-black bg-white outline-none py-2"
          />
        </div>

        {/* Add button */}
        <button className="card-btn text-nowrap" onClick={handleAddOption}>
          <HiMiniPlus className="text-lg" />
          Add
        </button>
      </div>
    </div>
  );
};

export default TodoListInput;
