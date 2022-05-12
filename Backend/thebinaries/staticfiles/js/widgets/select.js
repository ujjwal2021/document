function addCustomSelectProps (item){
    item.innerHTML = item.innerHTML;        
    const select = item.querySelector("select");
    const current = item.querySelector(".curr-option");
    const optlist = item.querySelector(".opt-list");
    
    current.addEventListener("click",e=>{
        optlist.toggleAttribute('hidden');
    })
    
    
    const options = item.querySelectorAll(".option");
    
    const setCurrent = (current,value,dom) => {
        current.setAttribute("data-value",value);
        current.innerHTML = dom;
        optlist.setAttribute('hidden','true');
    }
    
    setCurrent(current,select.value,options[select.selectedIndex].innerHTML);
    
    options.forEach(option => {
        option.addEventListener("click",e => {
            const value = option.getAttribute("data-value");
            select.value = value;
            setCurrent(current,value,option.innerHTML);
        })
    });

}

window.addEventListener('DOMContentLoaded', (event) => {
    document.querySelectorAll(".custom-select").forEach(val => {
        addCustomSelectProps(val);
    })
});
