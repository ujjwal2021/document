
import apis from "../api/api_list.js";
import {memoizeFetch,purifyData} from "../api/api_call.js";

const teamBox = document.querySelector('.team .team-content');

const teamMember = function(data) {
    
    this.dom = document.createElement('div');
    this.data = purifyData(data);

    this.getDom = () => {

        this.dom.classList.add('team-card');

        this.dom.innerHTML = `
            <div class="team-image">
                <img src="${this.data?.photo}"  alt="${this.data?.name||"staff"}"/>
            </div>
            <div class="position">${this.data?.name || ""}</div>
            <div class="team-info">${this.data?.description || ""}</div>
            <div class="team-media-icon">
            <i class="fab fa-facebook"></i>
            <i class="fab fa-instagram"></i>
            <i class="fab fa-twitter"></i>
            </div>
        `
        return this.dom;
    }
}



function populateTeam(api) {
    memoizeFetch(api,{}).then(data => {
        let next = document.createElement('div');

        if(data && data['results']){
            for(let member of data['results']){
                let currmember = new teamMember(member);
                let dom = currmember.getDom();
                teamBox.append(dom);
            }
        }

        if(data['next']){
            next.classList.add('view-more','team-view-more');
            next.innerHTML = `<div class="view-more-btn">View More >></div>`;
            next.addEventListener('click', (e) =>{
                populateTeam(data['next']);
                next.remove();
            })
            teamBox.append(next);
        }
    })
}

populateTeam(apis.memberList);


export default teamMember