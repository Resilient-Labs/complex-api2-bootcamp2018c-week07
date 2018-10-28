const form = document.querySelector(".movieForm")
const movieCon = document.querySelector(".movieCon")
const newsCon = document.querySelector(".newsCon")
let newsTitle = document.querySelector("#ns")
let movie = document.querySelector("#movie")

form.addEventListener("submit", function(e) {
  e.preventDefault()
  let key = movie.value
  getMovie(key)
})

movieCon.addEventListener("click", function(e){
  e.preventDefault()
  if(e.target.tagName === 'H3'){
    let newsSearch = e.target.textContent
    getNews(newsSearch)
  }
})

function getMovie(n) {
  fetch(`https://api.themoviedb.org/3/search/movie?api_key=5a201178134b41c506552f0e22ebdcb7&query=<${n}>`)
    .then(res => res.json())
    .then(response => {
      response.results.forEach(result => {
        console.log(result)
        let title = document.createTextNode(result.title)
        let h = document.createElement("h3")

        h.appendChild(title)
        movieCon.append(h)
      })
    })
    .catch(err => {
      console.log(`error ${err}`)
      alert("sorry, there are no results for your search")
    });
}

function getNews(k){
  let m = " movie"
  fetch(`https://newsapi.org/v2/everything?q=${k}${m}&apiKey=75907e40a62f427fbcbf937b909818b7`)
    .then(res => res.json())
    .then(response => {
      newsTitle.textContent = k
      response.articles.forEach(result => {
        console.log(result.url)
        let sec = document.createElement("section")

        sec.innerHTML = `
        <h4>${result.title}</h4>
        <a>URL: ${result.url}</a>
        <p>Source: ${result.source.name}</p>
        `

        newsCon.appendChild(sec)
      })
    })
    .catch(err => {
      console.log(`error ${err}`)
      alert("sorry, there are no results for your search")
    });
}
