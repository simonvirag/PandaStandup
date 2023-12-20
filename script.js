// Ezt a funkciót még implementálnod kell, a kiválasztott lista elemekkel
function getListItems() {
    // Itt kéne implementálni a szerveroldali logikát, például AJAX kéréssel
    // Vissza kell térni a lementett lista elemeivel
    // Példa:
    return ["Szandi", "Jani", "Laci", "Bence", "Gábor", "Laci", "Virág", "Béla"];
}

// Funkció a checkboxok létrehozásához
function createCheckboxes(items) {
    var checkboxContainer = document.getElementById("checkboxContainer");
    checkboxContainer.innerHTML = "";

    for (var i = 0; i < items.length; i++) {
        var checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.value = items[i];
        checkbox.id = "checkbox" + i;

        var label = document.createElement("label");
        label.appendChild(checkbox);
        label.appendChild(document.createTextNode(items[i]));

        checkboxContainer.appendChild(label);
    }
}

// Random lista generálása
function generateRandomList() {
    var listItems = getListItems();
    var selectedItems = [];

    // Kiválasztott elemek összegyűjtése
    for (var j = 0; j < listItems.length; j++) {
        var checkboxId = "checkbox" + j;
        var checkbox = document.getElementById(checkboxId);

        if (checkbox.checked) {
            selectedItems.push(listItems[j]);
        }
    }

    // Eredmény lista elérése
    var randomList = document.getElementById("randomList");
    randomList.innerHTML = "";

    // Random lista generálása
    for (var k = 0; k < selectedItems.length; k++) {
        var listItem = document.createElement("li");
        listItem.textContent = selectedItems[k];
        randomList.appendChild(listItem);
    }
}

// Az oldal betöltésekor létrehozza a checkboxokat a lementett listából
var defaultListItems = getListItems();
createCheckboxes(defaultListItems);