import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodos } from "../redux/reducer";
import { GoPlus } from "react-icons/go";

const Todos = () => {
  const dispatch = useDispatch();
  const [todo, setTodo] = useState("");

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const add = () => {
    if (todo === "") {
      alert("Input is Empty");
    } else {
      dispatch(
        addTodos({
          id: Math.floor(Math.random() * 1000),
          item: todo,
          completed: false,
        })
      );
      setTodo("");
    }
  };

  return (
    <>
      <h1>To Do Item</h1>
      <div className="addTodos">
        <input
          type="text"
          onChange={(e) => handleChange(e)}
          className="todo-input"
          value={todo}
        />

        <button className="add-btn" onClick={() => add()}>
          <GoPlus />
        </button>
        <br />
      </div>
    </>
  );
};

export default Todos;
