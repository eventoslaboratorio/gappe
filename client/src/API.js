import axios from 'axios';

export default axios.create({
  baseURL:'/api'
  //baseURL:'https://us-central1-gappe-v2.cloudfunctions.net/api/'
});