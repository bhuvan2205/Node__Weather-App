
const req = require("request");


const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=15276c242f707dcf95819e0dc8686ad4&query=${latitude},${longitude}&units=f`;

  req({ url: url, json: true }, (error, {body}) => {

    if (error) {
      callback("Unable to Connect Service", undefined);
    } else if (body.error) {
      callback("Unable to find Location",undefined);
    } else {
      const desc= body.current.weather_descriptions[0];
      const preception= body.current.precip;
      callback(
        undefined,
        {
          desc,
          preception
        }
      );
    }
  });
};

module.exports = forecast