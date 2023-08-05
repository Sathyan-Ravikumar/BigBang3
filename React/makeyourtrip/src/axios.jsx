 import axios from "axios";

 const API=axios.create({
    baseURL:"https://localhost:7115/api",
 });

 export default API;