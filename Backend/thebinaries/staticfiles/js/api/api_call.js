export const memoize = (fn)=>{
    const cache = {}
    return async(...args)=>{
        const url = args[0];
        const request = args[1];
        const errorCallBack = args[2];

        if (url in cache){
            console.log("fetched from cache")
            return cache[url];

        }
        else{
            console.log("fetched from server")
            const {error, data} = await fn(url, request, errorCallBack);

            if(!error){
                cache[url] = data;
                return data;
            }
            return false;
        }
    }
}
export const memoizeFetch = memoize( async (url,request={},errorCallback=()=>{return}) => {

    let headers = request.headers || {};
    headers['X-CSRFToken'] = getCookie('csrftoken');

    request = {...request,headers}

    const response = await fetch(url,request);
    const data = await response?.json();

    if(response.status !== 200){
        errorCallback(data,response);
        return {
            'error':true,
            'data':data
        }
    }

    return {
        'error':false,
        'data':data
    }

})

export function getCookie(cname){
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  export function purifyData(data){
    if(!data) return "";

    if(typeof data === 'string'){
        return data.replaceAll("<","&lt;").replaceAll('>','&gt;')
    }

    if(typeof data === 'object'){
        if(Array.isArray(data)){

          data.forEach((val,i) => {
              data[i] = purifyData(val);
          })    

        }else{

          for (let key in data) {
              data[key] = purifyData(data[key]);
          }

        }
    }

    return data;
}
