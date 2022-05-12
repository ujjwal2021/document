import apis from "./api_list.js";
import {memoizeFetch} from './api_call.js'

const responseField = document.querySelector(".response");
const errorField = document.querySelector(".error");
const buttons = document.querySelector('.api_buttons')

const handleError = (resp_data, response) => {
    errorField.innerHTML = `${response.status} | ${JSON.stringify(resp_data)}`;
}

for( let key in apis ) {
    const button = document.createElement('button');
    button.id =  key;
    button.innerHTML = key;
    const methods = ['GET','POST','DELETE','PUT','PATCH']
    let random = Math.floor(Math.random()*methods.length);

    button.addEventListener( 'click', async (e)=>{
        
        errorField.innerHTML = "";
        responseField.innerHTML = "";

        const resp = await memoizeFetch(apis[key],{
            method:methods[random]
        },handleError)
        
        if(resp){
            responseField.innerHTML = JSON.stringify(resp);
        }
    })

    buttons.append(button)
}