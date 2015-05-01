export default {
  endpoint: "https://dockpit-eu.appspot.com",

  responseHandler(resolve, reject, key) {
    return function(err, resp) {
      var data
      try {
        data = JSON.parse(resp.text)
      } catch(syntaxErr) {
        return reject(err)
      }

      if(data.error) {
        return reject(data.error)
      } else if(!resp.ok) {
        return reject(resp.text)
      }

      //responses without data dont have a key
      if(key === "") {
        return resolve(null)
      }

      if(!data[key]) {
        return reject("Response data has data key '"+key+'": '+data)
      }

      resolve(data[key])
    }
  }
}
