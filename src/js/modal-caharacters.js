import { MarvelApi } from "./marvel-api";

let marvelApi = new MarvelApi();

async function renderModalCharacters() {
  try {
    const responce = await marvelApi.getCharacters();
    console.log(responce);
  } catch (error) {
    console.log(error);
  }
} 

renderModalCharacters();