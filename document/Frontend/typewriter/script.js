const texts = ['website', 'illustration', 'pancakes'];
let count = 0;
let index = 0;
let currentText = '';
let letter = '';

// (function typeWriter(){
setInterval(()=>{
    count = count%texts.length;
    currentText = texts[count];
    letter =currentText.slice(0, ++index);
    document.querySelector('.typing').textContent = letter;
    if(letter.length === currentText.length){
        count++;
        index = 0;
    }
}, 300)
    // setTimeout(typeWriter, 300)
// }())