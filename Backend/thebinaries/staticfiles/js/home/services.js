import Popup from "../popup/popup.js";
import apis from "../api/api_list.js";
import {memoizeFetch,purifyData} from "../api/api_call.js";

const servicesBox = document.querySelector(".services .services-content")

const ServicePopup = function(data){
    
    Popup.call(this);
    this.data = data;

    this.updateBody = () => {

        this.body.innerHTML = `
            <div class="services-card">
                <div class="image">
                    <img src="${this.data?.illustration}" alt="${this.data?.title}">
                </div>
                <div class="service-title">${this.data?.title||""}</div>
                <div class="service-description">${this.data?.description||""}</div>    
            </div>
        `
    }

}
const Service = function (data) {

    this.dom = document.createElement('div');
    this.data = purifyData(data);
    this.popup = new ServicePopup(this.data);
    

    this.getDom = () => {
        this.dom.classList.add('services-card');

        let description = this.data?.description.slice(0,200) || "";
        if(description.length < this.data?.description.length){
            description += `<span class='read-more'>....Read More >></span>`;
        }

        this.dom.innerHTML = `
            <div class="image">
                <img src="${this.data?.illustration}" alt="${this.data?.title}">
            </div>
            <div class="service-title">${this.data?.title||""}</div>
            <div class="service-description">${description||""}</div> 
        `

        this.dom.addEventListener('click',(e)=>{
            this.popup.display();
        })

        return this.dom;
    }
}

function populateService(api){
    memoizeFetch(api,{}).then(data => {
        let next = document.createElement('div');
    
        if(data && data['results']){
            for(let service of data['results']){
                
                let currService = new Service(service);
                let dom = currService.getDom();
                servicesBox.append(dom);
            
            }
        }  
        if(data['next']){
            next.classList.add("view-more","services-view-more");
            next.innerHTML = `
            <div class="view-more-btn">view more >></div>
            `;
            next.querySelector(".view-more-btn").addEventListener('click', (e) =>{
                populateService(data['next']);
                next.remove();
                console.log("hi")
            })
            servicesBox.append(next);
        }
        
    })
}

populateService(apis.serviceList);


export default Service;
export {ServicePopup};
