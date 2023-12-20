document.addEventListener('DOMContentLoaded', function() {
    var items = [
        "Szandi",
        "Bence",
        "Jani",
        "Laci",
        "Béla",
        "Virág",
        "Gábor",
        "Tamás"
    ];

    createCheckboxes(items);
    updateList(items);
});

function createCheckboxes(items) {
    var checkboxContainer = document.getElementById('checkboxContainer');

    items.forEach(function(item) {
        var checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = item;
        checkbox.checked = true; // Alapértelmezetten mindenki kiválasztva
        checkboxContainer.appendChild(checkbox);

        var label = document.createElement('label');
        label.htmlFor = item;
        label.appendChild(document.createTextNode(item));
        checkboxContainer.appendChild(label);
    });
}

function generateRandomList() {
    var generateButton = document.querySelector('button');
    generateButton.classList.add('button-generate-animation');

    var selectedItems = getSelectedItems();
    var randomList = document.getElementById('randomList');
    randomList.innerHTML = ''; // Töröljük a korábbi tartalmat

    var shuffledItems = shuffleArray(selectedItems);

    // Lista elemek egyesével való megjelenítése
    shuffledItems.forEach(function(item, index) {
        setTimeout(function() {
            var listItem = document.createElement('li');
            listItem.textContent = item;
            listItem.classList.add('fade-in-and-stay'); // Hozzáadjuk az animációt
            randomList.appendChild(listItem);

                   // Amikor elkészült a lista, megjelenítjük a "Copy to Clipboard" gombot
                   if (index === shuffledItems.length - 1) {
                    document.getElementById('copyButton').style.display = 'inline-block';
                }
        }, index * 500); // Várakozás az egyes elemek közötti idővel (500 milliszekundum = 0.5 másodperc)
    });

    // Gomb animáció eltávolítása a generálás befejeztével
    setTimeout(function() {
        generateButton.classList.remove('button-generate-animation');
    }, shuffledItems.length * 500); // Várakozás az utolsó elem befejezéséig
}

// Fisher-Yates algoritmus a tömb megkeveréséhez
function shuffleArray(array) {
    var currentIndex = array.length, randomIndex, tempValue;

    // Míg még maradnak elemek a tömbben
    while (currentIndex !== 0) {
        // Véletlenszerűen válassz ki egy megmaradt elemet
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // Cseréld ki a kiválasztott elemet a jelenlegi elemmel
        tempValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = tempValue;
    }

    return array;
}

function getSelectedItems() {
    var checkboxes = document.querySelectorAll('input[type=checkbox]:checked');
    var selectedItems = Array.from(checkboxes).map(function(checkbox) {
        return checkbox.id;
    });
    return selectedItems;
}


function copyToClipboard() {
    var randomList = document.getElementById('randomList');
    var listText = Array.from(randomList.children).map(li => li.textContent).join('\n');

    var textarea = document.createElement('textarea');
    textarea.value = listText;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);

    alert('List copied to clipboard!');
}