import axios from 'axios';

export const GET_ALL_DOGS = "GET_ALL_DOGS";
export const GET_DOG_DETAILS = "GET_DOG_DETAILS";
export const GET_TEMPERAMENTS = "GET_TEMPERAMENTS";

export const getAllDogs = () => {
  return async (dispatch) => {
    const { data } = await axios.get("http://localhost:3001/dogs");
    dispatch({
      type: GET_ALL_DOGS,
      payload: data,
    });
  };
};

export const getDogDetail = (id) => {
  return async (dispatch) => {
    const data  = await axios.get(`http://localhost:3001/dogs/${id}`);
    dispatch({
      type: GET_DOG_DETAILS,
      payload: data.data
    });
  };
};

export const createDog = (payload) => {
 return async () => {
    try {
      const data  = await axios.post("http://localhost:3001/dogs", payload);
      return data;
    } catch (error) {
      console.log(error);
    }
 }
};



export const getTemperaments = () => {
  return async (dispatch) => {
    const data = await axios.get("http://localhost:3001/temperaments");
    dispatch({
      type: GET_TEMPERAMENTS,
      payload: data.data,
    });
  };
}

export const searchDogs = (name) => {
  return async (dispatch) => {
    const data = await axios.get(`http://localhost:3001/dogs?name=${name}`);
    dispatch({
      type: GET_ALL_DOGS,
      payload: data.data,
    });
  };
}

export const orderDogs = (asc, desc) => {
  return async (dispatch) => {
    const data = await axios.get('http://localhost:3001/dogs');
    const order = data.data.sort((a, b) => {
      if (asc === 'asc') {
        return a.name > b.name ? 1 : -1;
      } else if (desc === 'desc'){
        return a.name < b.name ? 1 : -1;
      }
    })
    dispatch({
      type: GET_ALL_DOGS,
      payload: order,
    });
  }
}

export const getDogByTemperament= (payload) => {
  return async (dispatch) => {
    const data = await axios.get(`http://localhost:3001/dogs`);
    const temperament = data.data.filter((dog) => {
      if (dog.temperament) {
        return dog.temperament.includes(payload);
      }
    });
    dispatch({
      type: GET_ALL_DOGS,
      payload: temperament,
    });
  };
}