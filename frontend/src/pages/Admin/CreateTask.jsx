import moment from "moment";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { LuTrash2 } from "react-icons/lu";
import { useLocation, useNavigate } from "react-router-dom";
import AddAttahchmentsInput from "../../components/Inputs/AddAttahchmentsInput";
import SelectDropdown from "../../components/Inputs/SelectDropdown";
import SelectUsers from "../../components/Inputs/SelectUsers";
import TodoListInput from "../../components/Inputs/TodoListInput";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { API_PATHS } from "../../utils/apiPaths";
import axiosInstance from "../../utils/axiosInstance";
import { PRIORITY_DATA } from "../../utils/data";

const CreateTask = () => {
  const location = useLocation();
  const { taskId } = location.state || {};
  const navigate = useNavigate();

  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    priority: "Low",
    dueDate: null,
    assignedTo: [],
    todoCheckList: [],
    attachments: [],
  });

  const [currentTask, setCurrentTask] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState(false);

  const handleValueChange = (key, value) => {
    setTaskData((prevData) => ({ ...prevData, [key]: value }));
  };

  const clearData = () => {
    //reset form
    setTaskData({
      title: "",
      description: "",
      priority: "Low",
      dueDate: null,
      assignedTo: [],
      todoCheckList: [],
      attachments: [],
    });
  };

  // Create Task
  const createTask = async () => {
    setLoading(true);
    try {
      const todolist = taskData.todoCheckList?.map((item) => ({
        text: item,
        completed: false,
      }));

      const response = await axiosInstance.post(API_PATHS.TASKS.CREATE_TASK, {
        ...taskData,
        dueDate: new Date(taskData.dueDate).toISOString(),
        todoCheckList: todolist,
      });

      toast.success("Task created successfully.");
      clearData();
    } catch (error) {
      console.error("Error creating task:", error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  // Update Task
  const updateTask = async () => {
    setLoading(true);
    try {
      const todolist = taskData.todoCheckList?.map((item) => { 
        const prevTodoCheckList = currentTask?.todoCheckList || [];
        const matchedTask = prevTodoCheckList.find((task) => task.text === item);

        return {
          text: item,
          completed: matchedTask ? matchedTask.completed : false,
        };
      });
      
      const response = await axiosInstance.put(API_PATHS.TASKS.UPDATE_TASK(taskId),
        {
        ...taskData,
        dueDate: new Date(taskData.dueDate).toISOString(),
        todoCheckList: todolist,
        }
      );

      toast.success("Task Updated Successfully");
    } catch (error) {
      console.error("Error Updating Task: ", error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    setError(null);

    // Input validation
    if (!taskData.title.trim()) {
      setError("Task title is required.");
      return;
    }
    if (!taskData.description.trim()) {
      setError("Task description is required.");
      return;
    }

    if (!taskData.dueDate) {
      setError("Task due date is required.");
      return;
    }

    if (taskData.assignedTo?.length === 0) {
      setError("Task not assigned to any Member.");
      return;
    }

    if (taskData.todoCheckList?.length === 0) {
      setError("Add atleast one To-Do task.");
      return;
    }
    if (taskId) {
      updateTask();
      return;
    }

    createTask();
  };

  // get Task info by ID
  const getTaskDetailsByID = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.TASKS.GET_TASK_BY_ID(taskId)
      );
      if (response.data) {
        const taskInfo = response.data;
        setCurrentTask(taskInfo);

        setTaskData((prevState) => ({
          title: taskInfo.title,
          description: taskInfo.description,
          priority: taskInfo.priority,
          dueDate: taskInfo.dueDate
            ? moment(taskInfo.dueDate).format("YYYY-MM-DD")
            : null,
          assignedTo: Array.isArray(taskInfo?.assignedTo)
            ? taskInfo.assignedTo.map((item) => item?._id)
            : taskInfo?.assignedTo
            ? [taskInfo.assignedTo._id]
            : [],
          todoCheckList:
            taskInfo?.todoCheckList?.map((item) => item?.text) || [],
          attachments: taskInfo?.attachments || [],
        }));
      }
    } catch (error) {
      console.log("Error Fetching Users: ", error);
    }
  };

  // Delete Task
  const deleteTask = async () => {};

  useEffect(() => {
    if (taskId) {
      getTaskDetailsByID(taskId);
    }

    return () => {};
  }, [taskId]);

  return (
    <DashboardLayout activeMenu="Create Task">
      <div className="mt-5">
        <div className="grid grid-cols-1 md:grid-cols-4 mt-4">
          <div className="form-card col-span-3">
            <div className="flex items-center justify-between">
              <h2 className="text-xl md:text-xl font-medium">
                {taskId ? "Update Task" : "Create Task"}
              </h2>

              {taskId && (
                <button
                  className="flex items-center gap-1.5 text-[13px] font-medium text-rose-500 bg-rose-50 rounded px-2 py-1 border border-rose-100 hover:border-rose-300 cursor-pointer"
                  onClick={() => {
                    setOpenDeleteAlert(true);
                  }}
                >
                  <LuTrash2 className="text-base" />
                  Delete
                </button>
              )}
            </div>
            <div className="mt-4">
              <label className="text-xs font-medium text-slate-600">
                Task Title
              </label>
              <input
                placeholder="Create App UI"
                className="form-input focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                value={taskData.title}
                onChange={({ target }) =>
                  handleValueChange("title", target.value)
                }
              />
            </div>

            <div className="mt-3">
              <label className="text-xs font-medium text-slate-600">
                Description
              </label>
              <textarea
                placeholder="Describe task"
                className="form-input focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                rows={4}
                value={taskData.description}
                onChange={({ target }) =>
                  handleValueChange("description", target.value)
                }
              />
            </div>

            <div className="grid grid-cols-12 gap-4 mt-2">
              <div className="col-span-6 md:col-span-4">
                <label className="text-xs font-medium text-slate-600 ">
                  Priority
                </label>
                <SelectDropdown
                  options={PRIORITY_DATA}
                  value={taskData.priority}
                  onChange={(value) => handleValueChange("priority", value)}
                  placeholder="Select Priority"
                  className="form-input "
                />
              </div>

              <div className="col-span-6 md:col-span-4 text-black">
                <label className="text-xs font-medium text-slate-600">
                  Due Date
                </label>
                <input
                  placeholder="Create App UI"
                  className="w-full text-sm text-black bg-white rounded-md px-2.5 py-3 mt-0 border border-slate-100 outline-none placeholder:text-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  value={taskData.dueDate || ""}
                  onChange={({ target }) =>
                    handleValueChange("dueDate", target.value)
                  }
                  type="date"
                />
              </div>
              <div className="col-span-12 md:col-span-3">
                <label className="text-xs font-medium text-slate-600">
                  Assign To
                </label>

                <SelectUsers
                  selectedUsers={taskData.assignedTo}
                  setSelectedUsers={(value) => {
                    handleValueChange("assignedTo", value);
                  }}
                />
              </div>
            </div>
            <div className="mt-3">
              <label className="text-xs font-medium text-slate-600">
                To-Do Checklist
              </label>

              <TodoListInput
                todoList={taskData?.todoCheckList}
                setTodoList={(value) =>
                  handleValueChange("todoCheckList", value)
                }
              />
            </div>
            <div className="mt-3">
              <label className="text-xs font-medium text-slate-600">
                Add Attachments
              </label>

              <AddAttahchmentsInput
                attachments={taskData?.attachments}
                setAttachments={(value) =>
                  handleValueChange("attachments", value)
                }
              />
            </div>

            {error && (
              <p className="text-red-500 text-xs font-medium mt-5">{error}</p>
            )}

            <div className="flex justify-end mt-7">
              <button
                className="add-btn"
                onClick={handleSubmit}
                disabled={loading}
              >
                {taskId ? "Update Task" : "Create Task"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CreateTask;
