
// Siiimon og Oliiiver
async function hentArtists() {
    // 1. Hent JSON-filen (husk citationstegn omkring stien)
    const svar = await fetch("../db/artists.json");
    const kunstnere = await svar.json(); // .json() omdanner det direkte til et JavaScript-array!

    // 2. Find kolonnen med id="liste" (husk citationstegn omkring "liste")
    const liste = document.getElementById("liste");

    // 3. Tøm listen før vi sætter nye ting ind
    liste.innerHTML = "";

    // 4. Gå igennem alle kunstnere i arrayet
    for (const kunstner of kunstnere) {
        // Lav en knap til hver kunstner
        const knap = document.createElement("button");
        knap.textContent = kunstner.name; // Hiver direkte fat i "name" fra JSON

        // Tilføj et klik-event
        knap.addEventListener("click", function() {
            alert("Du trykkede på kunstner: " + kunstner.name + " (" + kunstner.country + ")");
        });

        // Sæt knappen ind i midterkolonnen
        liste.appendChild(knap);
    }
}