const notesContainer = document.querySelector(".notes-container");
const createButton = document.getElementById("btn");

//  Save notes to localStorage
function saveNotes() {
    const notes = document.querySelectorAll(".input-box");
    const data = [];

    notes.forEach(note => {
        data.push(note.innerText.replace("\n", "")); // removes trash icon line
    });

    localStorage.setItem("notes", JSON.stringify(data));
}

//  Create a new note (text only, default style from CSS)
function createNote(text = "") {
    const inputBox = document.createElement("p");
    inputBox.className = "input-box";
    inputBox.setAttribute("contenteditable", "true");
    inputBox.innerText = text;

    const deleteIcon = document.createElement("i");
    deleteIcon.className = "fa-solid fa-trash";

    deleteIcon.addEventListener("click", () => {
        inputBox.remove();
        saveNotes();
    });

    inputBox.addEventListener("input", saveNotes);

    inputBox.appendChild(deleteIcon);
    notesContainer.appendChild(inputBox);
}

createButton.addEventListener("click", () => {  
    createNote();
    saveNotes();
});

//  Load notes from localStorage on page load
function loadNotes() {
    const savedNotes = JSON.parse(localStorage.getItem("notes"));
    if (savedNotes) {
        savedNotes.forEach(text => createNote(text));
    }
}

loadNotes(); // Load notes on page load

