//Abiiii og Philliiiip



// Viser alle albums i midterkolonnen som knapper: "Albumtitel - Kunstnernavn".
// Kaldes når man trykker på "Albums"-knappen (onclick i jukebox.html).
async function hentAlbums() {
  // 1. Hent begge JSON-filer. Vi skal bruge albums, og artists for at finde kunstnerens navn
  const svarAlbums = await fetch("../db/albums.json");
  const svarArtist = await fetch("../db/artists.json")

  // 2. Lav svarene om til JavaScript-arrays
  const albums = await svarAlbums.json();
  const artists = await svarArtist.json();

  // 3. Find midterkolonnen og tøm den, så gamle knapper forsvinder
  const liste = document.getElementById("liste");
  console.log(albums);
  liste.innerText = "" ;

  // 4. Gå igennem albums ét ad gangen
  for (const album of albums){
    const knap = document.createElement("button");

    // 5. Find kunstnerens navn: led efter den kunstner, hvis artist_id passer med albummets artist_id
    let artistName = "" ;
    for (const artist of artists)
      if(artist.artist_id === album.artist_id){
        artistName = artist.name;
        };

    // 6. Skriv "Albumtitel - Kunstnernavn" på knappen og sæt den ind i listen
    knap.textContent = album.title + " - " + artistName;
    liste.appendChild(knap);
  }

}
