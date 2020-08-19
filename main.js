
document.getElementById('search-btn').addEventListener('click', function(){
          const searchInput = document.getElementById('search-input').value;
          lyricsSearch(searchInput);

})



function lyricsSearch(songs) {
  
 
          fetch('https://api.lyrics.ovh/suggest/' + songs)
          .then(res => res.json())
          .then(d => {
            fetchData = d;
            document.getElementById('firstList').innerHTML ="";
            for (let i = 0; i < d.data.length; i++) {
              const element = d.data[i];
              const title = element.title;
              const artist = element.artist.name;
               const result = `<div class="single-result row align-items-center my-3 p-3">
           <div class="col-md-9">
               <h3 class="lyrics-name">${title}</h3>
               <p class="author lead">Album by <span>${artist}</span></p>
           </div>
           <div class="col-md-3 text-md-right text-center">
               <button class="btn btn-success" onclick="getLyrics(${i})")">Get lyrics</button>
           </div>
           </div>`
           document.getElementById('firstList').innerHTML += result;
           if(i == 9){
             break;
           }
            
            }
            })          
  
}
function getLyrics(index) { 
  document.getElementById('lyrics').innerHTML= "";
  const title = fetchData.data[index].title;
  const artist = fetchData.data[index].artist.name;
  fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`)
  .then(res => res.json())
  .then(data => {
   const lyrics = data.lyrics;
   
            
  const result = `<div class="single-lyrics text-center">
  <button class="btn go-back" onclick=""></button>
  <p>${lyrics}</p>   
  </div>
  `
  document.getElementById('lyrics').innerHTML= result;
   

  } )

  
}
          
 
