// Her gemmes alt data, når det er hentet
let sange = [];
let albums = [];
let artists = [];
let koe = [];

// Hent de tre JSON-filer én gang, når siden åbner
async function hentData() {
  sange = await (await fetch("../db/sange.json")).json();
  albums = await (await fetch("../db/albums.json")).json();
  artists = await (await fetch("../db/artists.json")).json();
  visSange(sange);
}

// Find kunstneren ud fra et id
function findKunstner(id) {
  for (const artist of artists) {
    if (artist.artist_id === id) return artist;
  }
}

// Find albummet ud fra et id
function findAlbum(id) {
  for (const album of albums) {
    if (album.album_id === id) return album;
  }
}

// Lav én linje med sangen og en "Tilføj til køen"-knap
function sangLinje(sang) {
  const linje = document.createElement("div");
  linje.textContent = sang.title + " - " + findKunstner(sang.artist_id).name + " ";

  const knap = document.createElement("button");
  knap.id = "tilfoej-" + sang.title_id;
  knap.textContent = "Tilføj til køen";
  knap.onclick = function () { tilfoejTilKoe(sang); };

  linje.appendChild(knap);
  return linje;
}

// Vis en liste af sange (bruges af "Sange"-knappen og af søgningen)
function visSange(listeAfSange) {
  const liste = document.getElementById("liste");
  liste.innerHTML = "";
  for (const sang of listeAfSange) {
    liste.appendChild(sangLinje(sang));
  }
}

// Vis albums, som kan foldes ud og vise deres sange
function visAlbums() {
  const liste = document.getElementById("liste");
  liste.innerHTML = "";
  for (const album of albums) {
    const boks = document.createElement("details");
    boks.innerHTML = "<summary>" + album.title + " - " + findKunstner(album.artist_id).name + "</summary>";
    for (const sang of sange) {
      if (sang.album_id === album.album_id) boks.appendChild(sangLinje(sang));
    }
    liste.appendChild(boks);
  }
}

// Vis kunstnere, som kan foldes ud og vise deres sange
function visKunstnere() {
  const liste = document.getElementById("liste");
  liste.innerHTML = "";
  for (const artist of artists) {
    const boks = document.createElement("details");
    boks.innerHTML = "<summary>" + artist.name + " (" + artist.genre + ")</summary>";
    for (const sang of sange) {
      if (sang.artist_id === artist.artist_id) boks.appendChild(sangLinje(sang));
    }
    liste.appendChild(boks);
  }
}

// Vis genrer, som kan foldes ud og vise deres sange
function visGenrer() {
  const liste = document.getElementById("liste");
  liste.innerHTML = "";
  for (const genre of ["Rock", "Metal", "Pop", "Grunge", "Alternativ"]) {
    const boks = document.createElement("details");
    boks.innerHTML = "<summary>" + genre + "</summary>";
    for (const sang of sange) {
      if (findKunstner(sang.artist_id).genre === genre) boks.appendChild(sangLinje(sang));
    }
    liste.appendChild(boks);
  }
}

// Søg på sangtitel, kunstner og album + filtrér efter genre
function soeg() {
  const ord = document.getElementById("soegefelt").value.toLowerCase();
  const genre = document.getElementById("genreValg").value;
  const fundne = [];
  for (const sang of sange) {
    const kunstner = findKunstner(sang.artist_id);
    const tekst = (sang.title + " " + kunstner.name + " " + findAlbum(sang.album_id).title).toLowerCase();
    if (tekst.includes(ord) && (genre === "" || kunstner.genre === genre)) fundne.push(sang);
  }
  visSange(fundne);
}

// Forslag mens man skriver: søg ved hvert tastetryk og når man vælger genre
document.getElementById("soegefelt").oninput = soeg;
document.getElementById("genreValg").onchange = soeg;

// Læg en sang i køen (max 5)
function tilfoejTilKoe(sang) {
  if (koe.length >= 5) {
    document.getElementById("besked").textContent = "Køen er fuld (max 5 sange).";
    return;
  }
  koe.push(sang);
  visKoe();
}

// Vis køen med estimeret ventetid (3 min pr. sang foran i køen)
function visKoe() {
  document.getElementById("koeOverskrift").textContent = "Kø (" + koe.length + "/5)";
  const boks = document.getElementById("koe");
  boks.innerHTML = "";
  let ventetid = 0;
  for (const sang of koe) {
    const linje = document.createElement("div");
    linje.textContent = sang.title + " (venter ca. " + ventetid + " min)";
    boks.appendChild(linje);
    ventetid += 3;
  }
}

// Tøm køen
function rydKoe() {
  koe = [];
  document.getElementById("besked").textContent = "";
  visKoe();
}

hentData();