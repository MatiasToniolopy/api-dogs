import React from 'react'
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllDogs} from "../../redux/actions/index";
import {orderDogs, getDogByTemperament} from '../../redux/actions/index'
import './Filters.css';

const Filters = () => {
    const dispatch = useDispatch();
    const [order, setOrder] = useState('desc');
    const dogs = useSelector(state => state.allDogs);
    const [dogsOrder, setDogsOrder] = useState(dogs);
    const [temperaments, setTemperaments] = useState([]);
    const [temperament, setTemperament] = useState('');

    
    useEffect(() => {
        dispatch(getAllDogs());
      }, [dispatch]);
    
      useEffect(() => {
        setDogsOrder(dogs);
    }, [dogs]);
    
    const handleOrder = () => {
      if (order === 'desc') {
          setOrder('asc');
          dispatch(orderDogs(dogsOrder, 'asc'));
      } else {
          setOrder('desc');
          dispatch(orderDogs(dogsOrder, 'desc'));
      }
    }

    const handleTemperament = (e) => {
      setTemperament(e.target.value);
      dispatch(getDogByTemperament(e.target.value));
    }

    useEffect(() => {
      if (dogs.length > 0) {
        const temp = dogs.map(dog => dog.temperament);
        const temp2 = temp.join(',').split(',');
        const temp3 = temp2.map(t => t.trim());
        const temp4 = temp3.filter(t => t !== '');
        const temp5 = [...new Set(temp4)];
        setTemperaments(temp5);
      }
    }, [dogs]);




return (
    <div className="pagina">
        <select onChange={handleOrder} className="form-select" aria-label="Default select example" defaultValue={'DEFAULT'}>
        <option value="DEFAULT" disabled>Select an option to order by name</option>
        <option value="asc">Z-A</option>
        <option value="desc">A-Z</option>
      </select>

      <select onChange={handleTemperament} className="form-select" aria-label="Default select example" defaultValue={'DEFAULT'}>
        <option value="DEFAULT" disabled>Select an option to filter by temperament</option>
        {temperaments.map((t, i) => <option key={i} value={t}>{t}</option>)}
      </select>
    </div>
  )
}

export default Filters