import axios from "axios";

// Base da URL: https://api.themoviedb.org/3/

// URL da API: /movie/now_playing?api_key=b544250d6979b4e9d78907ec8dcdbeca&language=pt-BR

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
});

export default api;
