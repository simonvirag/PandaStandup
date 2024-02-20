document.addEventListener('DOMContentLoaded', function() {
    var items = [
        "Szandi",
        "Bence",
        "Jani",
        "Laci",
        "Béla",
        "Virág",
        "Gábor",
        "Tamás",
        "Dani"
    ];

    createCheckboxes(items);
});

function createCheckboxes(items) {
    var checkboxContainer = document.getElementById('checkboxContainer');

    items.forEach(function(item) {
        var checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = item;
        checkbox.checked = true;
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
    randomList.innerHTML = '';

    var shuffledItems = shuffleArray(selectedItems);

    shuffledItems.forEach(function(item, index) {
        setTimeout(function() {
            var listItem = document.createElement('li');
            listItem.textContent = (index + 1) + '. ' + item;
            listItem.classList.add('fade-in-and-stay');
            randomList.appendChild(listItem);

            if (index === shuffledItems.length - 1) {
                document.getElementById('copyButton').style.display = 'inline-block';

                setTimeout(function() {
                    generateButton.classList.remove('button-generate-animation');
                }, 1000); 
            }
        }, index * 500);
    });
}

// Fisher-Yates algoritmus a tömb megkeveréséhez
function shuffleArray(array) {
    var currentIndex = array.length, randomIndex, tempValue;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
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

    alert('A sorrend kimásolva a vágólapra!');
}
