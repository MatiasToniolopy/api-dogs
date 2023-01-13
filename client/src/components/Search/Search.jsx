import React, { useState } from "react";
import { searchDogs } from "../../redux/actions";
import { useDispatch } from "react-redux";
import "./Search.css";
import Swal from 'sweetalert2'

const Search = () => {
  const dispatch = useDispatch();
  const [input, setInput] = useState("");

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.length > 0) {
      dispatch(searchDogs(input));
      setInput("");
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please enter a valid name! only letters',
      })
    }
  };

  return (
    <form className="d-flex" onSubmit={handleSubmit}>
      <input
        className="form-control me-2"
        type="text"
        aria-label="Search"
        placeholder="Search Dog..."
        value={input}
        onChange={handleChange}
      />
      <button className="btn btn-outline-success btn-sm" type="submit">
        Search
      </button>
    </form>
  );
};

export default Search;
