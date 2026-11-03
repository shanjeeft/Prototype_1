//Abiiii og Philliiiip
async function hentAlbums() {
  const svarAlbums = await fetch("../db/albums.json");
  const svarArtist = await fetch("../db/artists.json")
  const albums = await svarAlbums.json();
  const artists = await svarArtist.json();
  const liste = document.getElementById("liste");
  console.log(albums);
  liste.innerText = "" ;
  for (const album of albums){
    const knap = document.createElement("button");
    
    let artistName = "" ;
    for (const artist of artists)
      if(artist.artist_id === album.artist_id){
        artistName = artist.name;
        };
    knap.textContent = album.title + " - " + artistName;
    liste.appendChild(knap);
  }

}