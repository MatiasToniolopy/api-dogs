const { Dog, Temperament } = require("../../db.js");
const fetch = require("node-fetch");
const apikey = process.env.API_KEY;

const getDogsApi = async () => {
  let dogsApiUrl = await fetch(
    `https://api.thedogapi.com/v1/breeds?api_key=${apikey}`
  );
  const dogsApiJson = await dogsApiUrl.json();
  let allDogsApi = dogsApiJson.map((e) => {
    return {
      id: e.id,
      name: e.name,
      temperament: e.temperament,
      weight: e.weight.metric,
      image: e.image.url,
      life_span: e.life_span,
      height: e.height.metric,
    };
  });
  return allDogsApi;
};

const getDogsDb = async function () {
  var dogsDBs = await Dog.findAll({
    include: {
      model: Temperament,
      attributes: ['name'],
      through: {
        attributes: [],
      },
    },
  });
  // Hago un mapeo para ajustar la info a mis necesidades
  let formatDogsDb = dogsDBs.map((dog) => {
  let tempsString = [];
  dog.temperaments.map((temp) => {
    tempsString.push(temp.name);
  });
  return {
    id: dog.id,
    name: dog.name,
    temperament: tempsString.join(", "),
    weight: dog.weight,
    image: dog.image,
    life_span: dog.life_span,
    height: dog.height,
  };
});
return formatDogsDb;
};

const getAllDogs = async () => {
  let dogsApi = await getDogsApi();
  let dogsDb = await getDogsDb();
  let dogsApiDb = dogsApi.concat(dogsDb);
  return dogsApiDb;
};

module.exports = { getAllDogs, getDogsDb, getDogsApi };
