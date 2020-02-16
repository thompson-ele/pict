import axios from "axios";

const BASE_URL = "http://192.168.43.174:8080/ccapi/ver100/";

const api = axios.create({
  baseURL: BASE_URL
  // timeout: 8000
});

const capturePhoto = () => {
  return api
    .post("shooting/control/shutterbutton", {
      af: true
    })
    .then(response => {
      return getLastImage();
    })
    .catch(error => {
      console.warn(error);
    });
};

const getAllImages = () => {
  return api
    .get("contents/sd/100CANON/")
    .then(response => {
      return response.data.url;
    })
    .catch(error => {
      console.warn(error);
    });
};

const getLastImage = () => {
  return api
    .get("contents/sd/100CANON/")
    .then(response => {
      const images = response.data.url;
      const imagesLength = images.length;
      return images[imagesLength - 1];
    })
    .catch(error => {
      console.warn(error);
    });
};

const startLiveFeed = () => {
  return api
    .post("shooting/liveview/", {
      liveviewsize: "small",
      cameradisplay: "on"
    })
    .then(response => {
      console.log(response);
      return response;
    })
    .catch(error => {
      console.warn(error);
    });
};

const getLiveFeed = () => {
  return api.get("/shooting/liveview/flip").then(result => {
    console.log(result);
    return result;
  });
};

export { capturePhoto, getAllImages, startLiveFeed, getLiveFeed, getLastImage };
