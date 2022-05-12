import apis, {dynamicApis} from "../api/api_list.js";
import {purifyData,memoizeFetch} from "../api/api_call.js";
import Popup from "../popup/popup.js";

const BlogsBox =  document.querySelector(".blogs .blogs-content");


const BlogsPopup = function (data) {
    Popup.call(this);
    this.data = data;

    this.updateBody = () => {
        let date = this.data?.created_date ? new Date(this.data?.created_date).toDateString()  : "";

        this.body.innerHTML = `
        <div class="blog-card">
            <div class="blog-image">
            <div class="date">${date}</div>
                <img src="${this.data?.photo}" alt="${this?.data?.title}"/>
            </div>
            <div class="blog-title">${this.data?.title}</div>
            <div class="blog-description">${this.data?.description || ""}</div>
        </div>
            
        `
    }

    this.updateClose = () => {
        window.history.replaceState(null,null," ");
    }

}


const Blogs = function(data){
    this.dom = document.createElement('div');
    this.data = purifyData(data);
    this.id = this.data.id;

    this.popup = new BlogsPopup(this.data);
    
    this.getDom = () => {
        let date = this.data?.created_date ? new Date(this.data?.created_date).toDateString()  : "";

        this.dom.classList.add("blog-card");
        let description = this.data?.description.slice(0, 30)|| "";
        if(description.length < this.data?.description.length){
            description += `<span class='read-more'>....Read More >></span>`;
        }


        this.dom.innerHTML = `
            <div class="blog-image">
            <div class="date">${date}</div>
                <img src="${this.data?.photo}" alt="${this?.data?.title}"/>
            </div>
            <div class="blog-title">${this.data?.title}</div>
            <div class="blog-description">${description}</div>
        
        `
        this.dom.addEventListener("click",(e) => {
            window.location.hash = this.id;
            this.popup.display();
        })

        return this.dom;
    }
}


function populateBlogs(api){
    memoizeFetch(api,{}).then(data => {
        let next = document.createElement('div');
        
        if(data['results']){
            for(let blog of data['results']){
                let currBlog = new Blogs(blog);
                let dom = currBlog.getDom();
                BlogsBox.append(dom);
            }
        }

        if(data['next']){
            next.classList.add("view-more","blogs-view-more");
            next.innerHTML = `<div class="view-more-btn">View More >></div>`;

            next.querySelector(".view-more-btn").addEventListener("click",(e) => {
                populateBlogs(data['next']);
                next.remove();
            })

            BlogsBox.append(next);
        }
    })
}


populateBlogs(apis.blogList);


function showLinkBlogs(){
    let id = window.location.hash.slice(1);

    memoizeFetch(dynamicApis.blogs(id||"0"),{}).then(data => {
        console.log(data)
        if(data && !data['error']){
            let currBlogsPopup = new BlogsPopup(purifyData(data));
            currBlogsPopup.display();
        } else {
            window.history.replaceState(null, null, " ");
        }
    })
}

showLinkBlogs();