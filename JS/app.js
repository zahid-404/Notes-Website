console.log("Welcome to Notes App");
showNotes();

// if users adds a note , add to the local storage

let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function (e) {
  let addTxt = document.getElementById("addTxt");
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  if (addTxt.value.length == 0) {
    alert(`Please write some notes first`);
  } else {
    notesObj.push(addTxt.value);
    localStorage.setItem("notes", JSON.stringify(notesObj));
  }
  addTxt.value = "";
  console.log(notesObj);
  showNotes();
});

// Function to show element from local storage

function showNotes() {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }

  // add note card through inner html

  let html = "";
  notesObj.forEach(function (element, index) {
    html += `
    <div
          class="noteCard p-6  md:max-w-xs bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 mx-4 my-4"
        >
          <h5
            class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
          >
            Note ${index + 1}
          </h5>

          <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
          ${element}
          </p>
          <button
            class="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onclick="deleteNote(this.id)" id="${index}"
          >
            Delete Note
            <svg
              class="ml-2 -mr-1 w-4 h-4"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
        `;
  });

  let notesElm = document.getElementById("notes");
  if (notesObj.length != 0) {
    notesElm.innerHTML = html;
  } else {
    notesElm.innerHTML = `Nothing to show here, Please add notes`;
  }
}

// Function to delete note

function deleteNote(index) {
  console.log("I am deleting");
  let notes = localStorage.getItem("notes");

  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }

  if (index == 0) {
    notesObj.shift();
  } else {
    notesObj.splice(index, 1);
  }
  localStorage.setItem("notes", JSON.stringify(notesObj));
  showNotes();
}

// Function to Search Notes

let searchNote = document.getElementById("searchNote");
searchNote.addEventListener("input", function () {
  let inputVal = searchNote.value.toLowerCase();
  // console.log("input event fired", inputVal);
  let noteCard = document.getElementsByClassName("noteCard");
  Array.from(noteCard).forEach(function (element) {
    let cardText = element.getElementsByTagName("p")[0].innerText;
    if (cardText.includes(inputVal)) {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
  });
});
