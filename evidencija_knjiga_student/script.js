const apiUrl = "http://127.0.0.1:5000/api/books";

function prikaziKnjige() {
    fetch(apiUrl)
        .then(res => res.json())
        .then(knjige => {
            const tablica = document.getElementById("tablicaKnjiga");
            tablica.innerHTML = "";

            knjige.forEach(knjiga => {
                const red = document.createElement("tr");

                red.innerHTML = `
                    <td>${knjiga.naslov}</td>
                    <td>${knjiga.autor}</td>
                    <td>${knjiga.godina}</td>
                    <td><button onclick="obrisiKnjigu(${knjiga.id})">Obriši</button></td>
                `;

                tablica.appendChild(red);
            });
        });
}

function dodajKnjigu() {
    const naslov = document.getElementById("naslov").value;
    const autor = document.getElementById("autor").value;
    const godina = document.getElementById("godina").value;

    if (naslov === "" || autor === "" || godina === "") {
        alert("Unesi sve podatke!");
        return;
    }

    fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ naslov: naslov, autor: autor, godina: godina })
    }).then(() => {
        document.getElementById("naslov").value = "";
        document.getElementById("autor").value = "";
        document.getElementById("godina").value = "";
        prikaziKnjige();
    });
}

function obrisiKnjigu(id) {
    fetch(apiUrl + "/" + id, { method: "DELETE" })
        .then(() => prikaziKnjige());
}

document.getElementById("dodajBtn").addEventListener("click", dodajKnjigu);
prikaziKnjige();
