import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { completeTodos, removeTodos, updateTodos } from "../redux/reducer";
import TodoItem from "./TodoItem";

import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Pagination from "react-bootstrap/Pagination";

const ITEMS_PER_PAGE = 5;

const DisplayTodos = () => {
  const todos = useSelector((state) => state);
  const dispatch = useDispatch();
  const [sort, setSort] = useState("active");
  const [currentPage, setCurrentPage] = useState(1);

  const [searchInput, setSearchInput] = useState("");

  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
  };

  // const handlePageChange = (pageNumber) => {
  //   setCurrentPage(pageNumber);
  // };

  const handleRemoveTodo = (id) => {
    dispatch(removeTodos(id));
  };

  const handleUpdateTodo = (obj) => {
    dispatch(updateTodos(obj));
  };

  const handleCompleteTodo = (id) => {
    dispatch(completeTodos(id));
  };

  const filteredTodos = todos.filter((item) => {
    if (sort === "active") {
      return (
        !item.completed &&
        item.item.toLowerCase().includes(searchInput.toLowerCase())
      );
    } else if (sort === "completed") {
      return (
        item.completed &&
        item.item.toLowerCase().includes(searchInput.toLowerCase())
      );
    } else {
      return item.item.toLowerCase().includes(searchInput.toLowerCase());
    }
  });

  const totalPages = Math.ceil(filteredTodos.length / ITEMS_PER_PAGE);
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = filteredTodos.slice(indexOfFirstItem, indexOfLastItem);

  const handlePaginationClick = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <Container>
      <div className="displaytodos">
        <div className="searchbar">
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              value={searchInput}
              onChange={handleSearchChange}
              className="me-2"
              aria-label="Search"
            />
          </Form>
        </div>
        <div className="buttons">
          <button onClick={() => setSort("active")}>Active</button>
          <button onClick={() => setSort("completed")}>Completed</button>
          <button onClick={() => setSort("all")}>All</button>
        </div>
        <ul>
          {currentItems.length > 0 ? (
            currentItems.map((item) => (
              <TodoItem
                key={item.id}
                item={item}
                removeTodo={handleRemoveTodo}
                updateTodo={handleUpdateTodo}
                completeTodo={handleCompleteTodo}
              />
            ))
          ) : (
            <li>No items to display</li>
          )}
        </ul>
        {totalPages > 1 && (
          <div className="pagination">
            <Pagination>
              <Pagination.Prev
                disabled={currentPage === 1}
                onClick={() => handlePaginationClick(currentPage - 1)}
              />
              {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                (pageNumber) => (
                  <Pagination.Item
                    key={pageNumber}
                    active={pageNumber === currentPage}
                    onClick={() => handlePaginationClick(pageNumber)}
                  >
                    {pageNumber}
                  </Pagination.Item>
                )
              )}
              <Pagination.Next
                disabled={currentPage === totalPages}
                onClick={() => handlePaginationClick(currentPage + 1)}
              />
            </Pagination>
          </div>
        )}
      </div>
    </Container>
  );
};

export default DisplayTodos;
