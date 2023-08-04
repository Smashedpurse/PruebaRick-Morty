const ContenedorCaracteristicas = document.getElementById('characters-container');
const modal = document.getElementById('modal');
const nombreModal = document.getElementById('modal-name');
const statusModal = document.getElementById('modal-status');
const especieModal = document.getElementById('modal-species');
const origenModal = document.getElementById('modal-origin');
const imagenModal = document.getElementById('modal-image');
const episodioModal = document.getElementById('modal-episodes');
const closeBtn = document.getElementById('close-btn');
const valorAleatorio = Math.floor(Math.random() * 126) + 1;
console.log("Valor Aleatorio ", valorAleatorio);

fetch(`https://rickandmortyapi.com/api/location/${valorAleatorio}`)
    .then(response => response.json())
    .then(locationData => {
        const locationId = locationData.id;
        console.log("locationData",locationData)
        if (locationId < 50) {
            document.body.classList.add('green-bg');
        } else if (locationId >= 50 && locationId < 80) {
            document.body.classList.add('blue-bg');
        } else {
            document.body.classList.add('red-bg');
        }

        fetch(`https://rickandmortyapi.com/api/character/1,${valorAleatorio}`)
            .then(response => response.json())
            .then(residentsData => {
                console.log("residentsData",residentsData)
                residentsData.sort((a, b) => a.name.localeCompare(b.name));
                residentsData.forEach(resident => {
                    const characterElement = crearPersonaje(resident);
                    ContenedorCaracteristicas.appendChild(characterElement);
                });
            })
            .catch(error => console.log(error));
    })
    .catch(error => console.log(error));

function crearPersonaje(characterData) {
    const characterElement = document.createElement('div');
    characterElement.classList.add('character');
    const characterImage = document.createElement('img');
    nombreModal.textContent = characterData.name;
    statusModal.textContent = characterData.status;
    especieModal.textContent = characterData.species;
    characterImage.src = characterData.image;
    characterImage.alt = characterData.name;
    characterImage.classList.add('character-img');
    characterImage.addEventListener('click', () => {
        mostrarModal(characterData);
    });
    characterElement.appendChild(characterImage);
    return characterElement;
}

function mostrarModal(characterData) {
    console.log(characterData)
    nombreModal.textContent = characterData.name;
    statusModal.textContent = characterData.status;
    especieModal.textContent = characterData.species;
    origenModal.textContent = characterData.origin.name;
    imagenModal.src = characterData.image;
    episodioModal.innerHTML = '';
    characterData.episode.slice(0, 3).forEach(episode => {
        const episodeLi = document.createElement('li');
        episodeLi.textContent = episode;
        episodioModal.appendChild(episodeLi);
    });
    modal.style.display = 'block';
}

closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});