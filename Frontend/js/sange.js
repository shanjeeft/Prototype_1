//Shanjeeeef
async function hentSange() {
  const svarSange = await fetch("../db/sange.json");
  const svarArtist = await fetch("../db/artists.json")
  const sange = await svarSange.json();
  const artists = await svarArtist.json();
  const liste = document.getElementById("liste");
  console.log(sange);
  liste.innerText = "" ;
  for (const sang of sange){
    const knap = document.createElement("button");
    
    let artistName = "" ;
    for (const artist of artists)
      if(artist.artist_id === sang.artist_id){
        artistName = artist.name;
        };
    knap.textContent = sang.title + " - " + artistName;
    liste.appendChild(knap);
  }

}