import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createDog, getTemperaments } from "../../redux/actions/index";
import "./Form.css";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'


const Form = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const temps = useSelector((state) => state.temperament);
  const [errors, setErrors] = useState({});
  const [input, setInput] = useState({
    name: "",
    image: "",
    weight: "",
    height: "",
    life_span: "",
    temperaments: [],
  });

  useEffect(() => {
    dispatch(getTemperaments());
  }, [dispatch]);

  const validate = (input) => {
    let errors = {};
    if (!input.name) {
      errors.name = "Name is required";
    } else if (!/^[A-Za-z]+$/.test(input.name)) {
      errors.name = "Name must be only letters";
    }
    if (!input.weight) {
      errors.weight = "Weight is required";
    }
    if (!input.height) {
      errors.height = "Height is required";
    }
    if (!input.life_span) {
      errors.life_span = "Life span is required";
    }
    if (!input.temperaments) {
      errors.temperaments = "Temperaments is required";
    }
    return errors;
  };

  const handleInputChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  };

  const handleSelectChange = (e) => {
    setInput({
      ...input,
      temperaments: [...input.temperaments, e.target.value],
    });
    setErrors(
      validate({
        ...input,
        temperaments: [...input.temperaments, e.target.value],
      })
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createDog(input));
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Your dog has been created',
      showConfirmButton: false,
      timer: 1500
    })
    setInput({
      name: "",
      image: "",
      weight: "",
      height: "",
      life_span: "",
      temperaments: [],
    });
  };

  const handleCancel = () => {
    navigate("/home");
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: 'Your dog has not been created',
      showConfirmButton: false,
      timer: 1500
    })
  };

  const handleDelete = (el) => {
    setInput({
      ...input,
      temperaments: input.temperaments.filter((temp) => temp !== el),
    });
  };

  return (
    <div className="container">
      <form className="form" onSubmit={handleSubmit}>
        <label className="control-label">Name</label>
        <input
          className="input-control"
          type="text"
          name="name"
          value={input.name}
          onChange={handleInputChange}
        />
        {errors.name && <p className="danger">{errors.name}</p>}
        <label className="control-label">Image</label>
        <input
          className="input-control"
          type="text"
          name="image"
          value={input.image}
          onChange={handleInputChange}
        />
        <label className="control-label">Weight</label>
        <input
          className="input-control"
          type="text"
          name="weight"
          value={input.weight}
          onChange={handleInputChange}
        />
        {errors.weight && <p className="danger">{errors.weight}</p>}
        <label className="control-label">Height</label>
        <input
          className="input-control"
          type="text"
          name="height"
          value={input.height}
          onChange={handleInputChange}
        />
        {errors.height && <p className="danger">{errors.height}</p>}
        <label className="control-label">Life Span</label>
        <input
          className="input-control"
          type="text"
          name="life_span"
          value={input.life_span}
          onChange={handleInputChange}
        />
        {errors.life_span && <p className="danger">{errors.life_span}</p>}
        <label className="control-label">Temperament</label>
        <select className="input-control" onChange={handleSelectChange}>
          <option value="">Select a temperament</option>
          {temps.map((t) => (
            <option key={t.id} value={t.name}>
              {t.name}
            </option>
          ))}
        </select>
        <div className="temps-list-container">
          {input.temperaments.map((el) => (
            <div className="temp-item" key={el}>
              <button onClick={() => handleDelete(el)}>❌</button>
              <p>{el}</p>
            </div>
          ))}
        </div>
        <button className="create" type="submit">
          Create
        </button>
        <button className="cancel" onClick={handleCancel}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default Form;
