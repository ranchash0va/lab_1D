const pokemons = [
    { name: 'Bulbasaur', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png' },
    { name: 'Ivysaur', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png' },
    { name: 'Venusaur', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png' },
    { name: 'Charmander', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png' },
    { name: 'Charmeleon', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/5.png' },
    { name: 'Charizard', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png' },
    { name: 'Squirtle', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png' },
    { name: 'Wartortle', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/8.png' },
    { name: 'Blastoise', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/9.png' },
    { name: 'Caterpie', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/10.png' },
    { name: 'Metapod', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/11.png' },
    { name: 'Butterfree', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/12.png' },
    { name: 'Weedle', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/13.png' },
    { name: 'Kakuna', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/14.png' },
    { name: 'Beedrill', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/15.png' },
    { name: 'Pidgey', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/16.png' },
    { name: 'Pidgeotto', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/17.png' },
    { name: 'Pidgeot', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/18.png' },
    { name: 'Rattata', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/19.png' },
    { name: 'Raticate', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/20.png' },
    { name: 'Spearow', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/21.png' },
    { name: 'Fearow', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/22.png' },
    { name: 'Ekans', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/23.png' },
    { name: 'Pikachu', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png' },
    { name: 'Sandshrew', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/27.png' },
    { name: 'Nidoran♀', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/29.png' },
    { name: 'Nidorina', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/30.png' },
    { name: 'Nidoqueen', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/31.png' },
    ]


const form = document.querySelector('form');
const input = document.querySelector('#search');
const list = document.querySelector('#pokemons-list');
let isListOpen = false;

// Скрываем список покемонов при загрузке страницы
list.style.display = 'none';

// Показываем/скрываем список при нажатии на поисковую строку
input.addEventListener('click', () => {
    if (!isListOpen) {
        list.style.display = 'block';
        isListOpen = true;
    } else {
        list.style.display = 'none';
        isListOpen = false;
    }
});

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const query = input.value.toLowerCase();
    const filteredPokemons = pokemons.filter((pokemon) => pokemon.name.toLowerCase().includes(query));
    displayPokemons(filteredPokemons);
});

input.addEventListener('keyup', () => {
    const query = input.value.toLowerCase();
    const filteredPokemons = pokemons.filter((pokemon) => pokemon.name.toLowerCase().includes(query));
    displayPokemons(filteredPokemons);
});

function displayPokemons(filteredPokemons) {
    list.innerHTML = '';
    if (filteredPokemons.length === 0) {
        list.textContent = 'No Pokemon found';
    } else {
        filteredPokemons.forEach((pokemon) => {
            const card = document.createElement('li');
            card.classList.add('card');
            const image = document.createElement('img');
            image.src = pokemon.image;
            const name = document.createElement('h3');
            name.textContent = pokemon.name;
            const deleteButton = document.createElement('button'); // Создаем кнопку удаления
            deleteButton.textContent = 'Delete'; // Добавляем текст на кнопку
            deleteButton.addEventListener('click', () => {
                const index = pokemons.indexOf(pokemon); // Находим индекс покемона в массиве
                if (index > -1) {
                    pokemons.splice(index, 1); // Удаляем покемона из массива
                    displayPokemons(pokemons); // Перерисовываем список покемонов
                }
            });
            card.appendChild(image);
            card.appendChild(name);
            card.appendChild(deleteButton); // Добавляем кнопку удаления к карточке покемона
            card.addEventListener('click', () => {
                input.value = pokemon.name;
                list.style.display = 'none';
                isListOpen = false;
            });
            list.appendChild(card);
        });
    }
}

// Перерисовываем список при загрузке страницы
displayPokemons(pokemons);