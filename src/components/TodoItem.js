import React, { useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import { IoCheckmarkDoneSharp, IoClose } from "react-icons/io5";

const TodoItem = (props) => {
  const { item, updateTodo, removeTodo, completeTodo } = props;

  const [editText, setEditText] = useState(item.item);
  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (e) => {
    setEditText(e.target.value);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleUpdate = () => {
    if (editText.trim() !== "") {
      updateTodo({
        id: item.id,
        item: editText.trim(),
      });
      setIsEditing(false);
    }
  };

  return (
    <li key={item.id} className="card">
      {isEditing ? (
        <textarea
          value={editText}
          onChange={handleInputChange}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              handleUpdate();
            }
          }}
        />
      ) : (
        <span>{item.item}</span>
      )}
      <div className="btns">
        {!isEditing && (
          <button onClick={handleEdit}>
            <AiFillEdit />
          </button>
        )}
        {!item.completed && (
          <button
            style={{ color: "green" }}
            onClick={() => completeTodo(item.id)}
          >
            <IoCheckmarkDoneSharp />
          </button>
        )}
        <button style={{ color: "red" }} onClick={() => removeTodo(item.id)}>
          <IoClose />
        </button>
      </div>
      {item.completed && <span className="completed">done</span>}
    </li>
  );
};

export default TodoItem;
