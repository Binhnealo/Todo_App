import TaskCard from "@/components/TaskCard";
import TaskEmptyState from "@/components/TaskEmptyState";
import React from "react";

const TaskList = ({ FilteredTask, filter, handleTaskChange }) => {
  if (!FilteredTask || FilteredTask.length === 0) {
    return <TaskEmptyState filter={filter} />;
  }
  return (
    <div className="space-y-3">
      {FilteredTask.map((task, index) => (
        <TaskCard key={index} task={task} index={index} handleTaskChange={handleTaskChange} />
      ))}
    </div>
  );
};

export default TaskList;
