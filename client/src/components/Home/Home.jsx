import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllDogs } from "../../redux/actions/index";
import Card from "../Card/Card";
import Paginado from "../Pagination/Paginado";
import "./Home.css";
import Nav from "../Nav/Nav";
import Filters from "../Filters/Filters";

export default function Home() {
  const dispatch = useDispatch();
  const allDogs = useSelector((state) => state.allDogs);

  const [currentPage, setCurrentPage] = useState(1);
  const [dogsPerPage, setDogsPerPage] = useState(8);
  const indexOfLastDog = currentPage * dogsPerPage;
  const indexOfFirstDog = indexOfLastDog - dogsPerPage;
  const currentDogs = allDogs.slice(indexOfFirstDog, indexOfLastDog);

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getAllDogs());
  }, [dispatch]);

  return (
    <div className="home-full">
      <Nav />
      <div className="selects">
        <div className="paginacion">
          <Paginado
            dogsPerPage={dogsPerPage}
            allDogs={allDogs.length}
            paginado={paginado}
          />
        </div>
      </div>
      <Filters />
      <div className="grid">
        {currentDogs.map((el) => {
          return (
            <div key={el.id} className="d-flex m-2">
              <Card
                id={el.id}
                name={el.name}
                image={el.image}
                temperament={el.temperament}
                weight={el.weight}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
