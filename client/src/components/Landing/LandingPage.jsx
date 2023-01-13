import React from "react";
import { useNavigate } from "react-router-dom";
import "./Landing.css";
import Swal from 'sweetalert2'

export default function LandingPage() {
  const navigate = useNavigate()

  const handleClick = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "you can reverse it anyway",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, go to home!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Welcome',
          'enjoy the app',
          'success'
        )
        navigate("/home");
      }
    })
    // navigate('/home')
  }
  return (
    <div className="lan">
      <div className="landing">
        <h1 className="landing__title">Welcome to dogs lover</h1>
        <button className="landing__button" onClick={handleClick}>Get Started</button>
      </div>
    </div>
  );
}
