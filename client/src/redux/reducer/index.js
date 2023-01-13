import { GET_ALL_DOGS, GET_DOG_DETAILS, GET_TEMPERAMENTS } from "../actions";

const initialState = {
  allDogs: [],
  dogDetail: [],
  temperament: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case  GET_ALL_DOGS: {
      return {
        ...state,
        allDogs: action.payload, //en el estado allDogs, manda todo lo que llegue del llamado a la función
      };
    }
    case GET_DOG_DETAILS:
      return {
        ...state,
        dogDetail: action.payload,
      };
    case GET_TEMPERAMENTS:
      return {
        ...state,
        temperament: action.payload,
      };
    default:
      return state;
  }
};

export default rootReducer;
