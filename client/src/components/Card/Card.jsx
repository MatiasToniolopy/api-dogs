import React from "react";
import './Card.css';
import { Link } from "react-router-dom";

export default function Card({ image, name, temperament, weight, id }) {
  return (
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">{name}</h5>
            <Link to={`/dog/${id}`}>
            <img className="card-img-top" src={image} alt="img not found" width="200" height="400" />
            </Link>
            <p className="card-text">Temperament: {temperament}</p>
            <p className="card-text">Weight: {weight}</p>
          </div>
        </div>
  );
}
