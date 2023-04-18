import { MarvelApi } from "./marvel-api";

let marvelApi = new MarvelApi();

async function renderModalCharacters() {
  try {
    // const {data: {data: {results}}} = await marvelApi.getCharacters();
    // console.log(results);
    const {data: {data: {results}}} = await marvelApi.getCharactersById('1010802');
    console.log(results[0].thumbnail);

  } catch (error) {
    console.log(error);
  }
} 

renderModalCharacters();