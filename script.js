const link = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';
const places=[];

fetch(link)
.then(blob => blob.json())
.then(data => places.push(...data));

function findSearch(matches,places){
return places.filter(e =>{
        const regex = new RegExp(matches,'gi');
        return e.city.match(regex) || e.state.match(regex);
    }) 
}
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
function dispay(){
    const search = findSearch(this.value,places);
    const name = search.map(e=>{
        const regex = RegExp(this.value,'gi');
        const cityName = e.city.replace(regex, `<span style="background-color: yellow;">${this.value}</span>`);
        const stateName = e.state.replace(regex, `<span style="background-color: yellow;">${this.value}</span>`);

        return `<li class="names">${cityName} , ${stateName}  <span class="population">${numberWithCommas(e.population)}</span></li>`
    }).join('');
    
    suggestions.innerHTML = name;
}
const input = document.querySelector('.input');
const suggestions=document.querySelector('.suggestions');

input.addEventListener('change',dispay);
input.addEventListener('keyup',dispay);
input.addEventListener('click',dispay);