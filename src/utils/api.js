import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";
const TMDB_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyOGM2NGEwNzllYWViZjM1NDQ2Zjc2NzkzNjQxMjhhMSIsInN1YiI6IjY1OWI4ODQzYjRhNTQzMDE0ODEwYjNjZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.B6WoYVwRODJxchCFl7f75pKVKuGbZ_xxyOC_k78TISY";
// const TMDB_TOKEN = import.meta.env.VITE_APP_TMDB_TOKEN;

const headers = {
    Authorization: "Bearer " + TMDB_TOKEN,
};

export const fetchDataFromApi = async(url,params)=>{
    try {
        const {data} = await axios.get
        (BASE_URL+url,{
            headers,
            params
        })
        return data;
    } catch (error) {
        console.log(error);
        return error;
    }
}