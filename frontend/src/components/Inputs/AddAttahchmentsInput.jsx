import React, { useState } from "react";
import { HiMiniPlus, HiOutlineTrash } from "react-icons/hi2";
import { LuPaperclip } from "react-icons/lu";

const AddAttahchmentsInput = ({ attachments, setAttachments }) => {
  const [option, setOption] = useState("");

  // Function to handle adding an attachment
  const handleAddOption = () => {
    if (option.trim()) {
      setAttachments([...attachments, option.trim()]);
      setOption(""); // Clear input field after adding
    }
  };

  // Function to handle deleting an attachment
  const handleDeleteOption = (index) => {
    const updatedArr = attachments.filter((_, idx) => idx !== index);
    setAttachments(updatedArr);
  };

  return (
    <div>
      {/* Display list of attachments */}
      {attachments.map((item, index) => (
        <div
          key={`${item}-${index}`} // Ensure each item has a unique key
          className="flex justify-between bg-gray-50 border border-gray-100 px-3 py-2 rounded-md mb-3 mt-2"
        >
          <div className="flex-1 flex items-center gap-3">
            <LuPaperclip className="text-gray-400" />
            <p className="text-xs text-black">{item}</p>
          </div>
          <button
            className="cursor-pointer"
            onClick={() => handleDeleteOption(index)}
          >
            <HiOutlineTrash className="text-lg text-red-500" />
          </button>
        </div>
      ))}

      {/* Input field to add new attachments */}
      <div className="w-full flex items-center gap-5 mt-4">
        <div className="flex items-center gap-3 border border-gray-100 px-3 py-2 rounded-md w-full">
          <LuPaperclip className="text-gray-400" />
          <input
            type="text"
            placeholder="Add File URL"
            value={option}
            onChange={({ target }) => setOption(target.value)}
            className="w-full text-[13px] text-black bg-white outline-none py-2"
          />
        </div>

        <button className="card-btn text-nowrap" onClick={handleAddOption}>
          <HiMiniPlus className="text-lg" />
          Add
        </button>
      </div>
    </div>
  );
};

export default AddAttahchmentsInput;
