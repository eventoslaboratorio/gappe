import axios from 'axios';

export default axios.create({
  baseURL:window.cordova?'https://us-central1-gappe-v2.cloudfunctions.net/api/':'/api'
  //baseURL:
});