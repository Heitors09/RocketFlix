import {
  API_KEY, BASE_URL,
  IMG_URL,
  language,
} from './api.js'

const button = document.querySelector('.shuffle-button')


function randomNumber(min,max){
     return Math.floor(Math.random() * (max - min + 1)) + min;

}
let numberRandomized = randomNumber(1,1000)

let newAPI = API_KEY.replace(/\/\d+\?/, `/${numberRandomized}?`)
// a expressão "/\/\d+\?/" procura um número seguido de interrogação 
console.log(newAPI)

async function getMovie(){
    try{
       const resp = await fetch(newAPI)
       const response = await resp.json()
       console.log(response)

       const containerMovie = document.querySelector('.movie') 
       const containerMovieInfo = document.querySelector('.movie-info')

       containerMovie.innerHTML = '';
       containerMovieInfo.innerHTML = '';
     
        if(response.poster_path){   

      
        containerMovieInfo.innerHTML +=`<h4>${response.original_title}</h4>
        <p>${response.overview}</p>`
        
        containerMovie.innerHTML += `<img src="${IMG_URL+response.poster_path}" alt="Filme gerado">`
        }else{ 
        
          containerMovieInfo.innerHTML += `<h1>OPS, hoje não é dia de assistir filme</h1>`
          containerMovie.innerHTML += `<img class='img-error' src="./assets/favico/pngegg.png" alt="img-error">`
        }        
    }catch(error){
      console.error(Error)
    }
}

button.addEventListener('click',getMovie)