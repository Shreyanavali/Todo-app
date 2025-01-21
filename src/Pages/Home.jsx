import React, { useState } from 'react';

function Home() {
  const [task, setTask] = useState(''); // Input field value
  const [tasks, setTasks] = useState({ todo: [], ongoing: [], completed: [] }); // Task categories

  // Handle input change
  const handleInputChange = (e) => {
    setTask(e.target.value);
  };

  // Add task to "To-Do" section
  const addTask = () => {
    if (task.trim() !== '') {
      setTasks((prevTasks) => ({
        ...prevTasks,
        todo: [...prevTasks.todo, task],
      }));
      setTask(''); // Clear input
    }
  };

  // Move task to another category
  const moveTask = (taskToMove, fromCategory, toCategory) => {
    setTasks((prevTasks) => {
      const updatedFrom = prevTasks[fromCategory].filter((t) => t !== taskToMove); // Remove from current category
      const updatedTo = [...prevTasks[toCategory], taskToMove]; // Add to target category
      return { 
        ...prevTasks, 
        [fromCategory]: updatedFrom, 
        [toCategory]: updatedTo 
      };
    });
  };

  // Handle the dropdown change for moving tasks
  const handleMoveTask = (e, taskToMove) => {
    const selectedCategory = e.target.value;
    if (selectedCategory) {
      moveTask(taskToMove, e.target.dataset.category, selectedCategory);
    }
  };

  return (
    <div className="home">
      <form
        className="task-form"
        onSubmit={(e) => {
          e.preventDefault(); // Prevent form reload
          addTask();
        }}
      >
        <input
          type="text"
          placeholder="Enter task..."
          className="task-input"
          value={task}
          onChange={handleInputChange}
        />
        <button type="button" className="add-task-button" onClick={addTask}>
          ADD TASK
        </button>
      </form>

      <div className="task-sections">
        {/* To-Do Section */}
        <div className="task-section">
          <h2>To-Do Tasks</h2>
          <ul>
            {tasks.todo.map((t, index) => (
              <li key={index}>
                <div className="task-text">{t}</div>
                <select
                  className="task-move-dropdown"
                  onChange={(e) => handleMoveTask(e, t)}
                  data-category="todo"
                >
                  <option value="">Move Task</option>
                  <option value="ongoing">Move to Ongoing</option>
                  <option value="completed">Move to Completed</option>
                </select>
              </li>
            ))}
          </ul>
        </div>

        {/* Ongoing Section */}
        <div className="task-section">
          <h2>Ongoing Tasks</h2>
          <ul>
            {tasks.ongoing.map((t, index) => (
              <li key={index}>
                <div className="task-text">{t}</div>
                <select
                  className="task-move-dropdown"
                  onChange={(e) => handleMoveTask(e, t)}
                  data-category="ongoing"
                >
                  <option value="">Move Task</option>
                  <option value="todo">Move to To-Do</option>
                  <option value="completed">Move to Completed</option>
                </select>
              </li>
            ))}
          </ul>
        </div>

        {/* Completed Section */}
        <div className="task-section">
          <h2>Completed Tasks</h2>
          <ul>
            {tasks.completed.map((t, index) => (
              <li key={index}>
                <div className="task-text">{t}</div>
                <select
                  className="task-move-dropdown"
                  onChange={(e) => handleMoveTask(e, t)}
                  data-category="completed"
                >
                  <option value="">Move Task</option>
                  <option value="todo">Move to To-Do</option>
                  <option value="ongoing">Move to Ongoing</option>
                </select>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Home;
