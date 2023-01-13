import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDogDetail } from "../../redux/actions/index.js";
import './Detail.css';
import {useParams} from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import Swal from 'sweetalert2'

export default function DetailDog() {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const detallePerro = useSelector((state) => state.dogDetail);
  const {id} = useParams();

  useEffect(() => {
     Swal.fire({
      title: 'Loading...',
      timer: 1000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading()
      }
    })
    dispatch(getDogDetail(id));
  }, [dispatch, id]);

  const handleCancel = () => {
    navigate('/home');
  };


  return (
    <div className="DetailDog">
      {detallePerro.length > 0 ? (
        <div className="card-container">
          <img className="card-img-top" src={detallePerro[0].image} alt="imagen" />
          <h2 className="name">{detallePerro[0].name}</h2>
          <p className="card-text">Temperament: {detallePerro[0].temperament}</p>
          <p className="card-text">Weight: {detallePerro[0].weight}</p>
          <p className="card-text">Height: {detallePerro[0].height}</p>
          <p className="card-text">LifeSpan: {detallePerro[0].life_span}</p>
          <button className="cancel" onClick={handleCancel}>Back to Home</button>
        </div>
      ) : (
        <div className="d-flex justify-content-center text-success">
          {/* <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div> */}
        </div>
      )}
    </div>
  );
}
