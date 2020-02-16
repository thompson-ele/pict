import axios from "axios";

const BASE_URL = "http://10.3.19.74:8080/ccapi/ver100/";

const capturePhoto = () => {
  return axios
    .post(BASE_URL + "shooting/control/shutterbutton", { body: { af: true } })
    .then(response => {
      return response;
    })
    .catch(error => {
      console.warn(error);
    });
};

const getAllImages = () => {
  return axios
    .get(BASE_URL + "contents/sd/100CANON/")
    .then(response => {
      return response.data.url;
    })
    .catch(error => {
      console.warn(error);
    });
};

export { capturePhoto, getAllImages };
