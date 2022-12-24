function init() {
    const addNoteButton = document.querySelector("#Add-btn");
    const search = document.querySelector("#search");
    // getting data📁 from browser storage
    const notes = JSON.parse(localStorage.getItem("myNote"));
    const main = document.querySelector("#keepNoteMain");

    function loadNotes(notes) {
        if (notes) {
            for (let i = 1; i <= notes.length;) {
                const { text, id } = notes[notes.length - i];
                addPreviousNotes(text, id);
                i++;
            }
        }
        else {
            addNote("Lets do some work...", guidGenerator());
        }
    }

    loadNotes(notes);

    function edit(e, nodeId) {
        console.log(e.target.classList[0], nodeId);
        let currentNote = document.getElementById(nodeId)
        let currentNoteText = document.querySelector('.text' + nodeId)
        let currentTextArea = document.getElementById('textarea' + nodeId)
        // toogle note with text are 
        currentNote.classList.remove('d-flex')
        currentNote.classList.add('d-none')
        if (currentNote.classList.contains('d-none')) {
            // initalizing textarea
            currentTextArea.classList.remove('d-none')
            currentTextArea.value = currentNoteText.innerHTML;
            currentTextArea.focus()
            // on blur saveing note in local storage 
            currentTextArea.addEventListener('blur', (e) => {
                e.target.classList.add('d-none')
                if (currentNote.classList.contains('d-none')) {
                    currentNoteText.innerText = currentTextArea.value;
                    currentNote.classList.remove('d-none')
                    currentNote.classList.add('d-flex')
                    updateNote(currentTextArea.value, nodeId)
                }
            });
        }

    }

    function deleteNote(params) {
        return ''
    }

    function saveNote(text, id) {
        let getNotes = JSON.parse(localStorage.getItem('myNote')) ? JSON.parse(localStorage.getItem('myNote')) : [];
        getNotes.push({ 'text': text, 'id': id })
        localStorage.setItem('myNote', JSON.stringify(getNotes))
    }

    function updateNote(text, id) {
        let getNotes = JSON.parse(localStorage.getItem('myNote')) ? JSON.parse(localStorage.getItem('myNote')) : [{ 'text': text, 'id': id }];
        let updatedNotes = getNotes.map((item) => {
            if (item.id == id) {
                return ({ 'text': text, 'id': item.id })
            } else {
                return ({ 'text': item.text, 'id': item.id })
            }
        })
        localStorage.setItem('myNote', JSON.stringify(updatedNotes))
    }
    
    // generate a random id
    function guidGenerator() {
        var S4 = function () {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        };
        return (
            S4() +
            S4() +
            "-" +
            S4() +
            "-" +
            S4() +
            "-" +
            S4() +
            "-" +
            S4() +
            S4() +
            S4()
        );
    }

    function addNote(text, nodeId) {
        let id = nodeId ? nodeId : guidGenerator();
        main.insertAdjacentHTML(
            "afterbegin",
            `<div class="alert alert-info d-flex flex-row justify-content-between ${text ? "" : "hidden"
            }" id="${id}"role="alert">
            <div class="w-75 text${id}">${text}</div>
            <div class="w-25">
                <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class=" ${id}  feather feather-edit-2 editNote" id="${id}">
                <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" ></path>
                </svg>

                 <svg xmlns="http://www.w3.org/2000/svg" id="${id}" width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class=" ${id} feather feather-trash-2"><polyline points="3 6 5 6 21 6"></polyline>
                 <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line>
                 </svg>
            </div>
      </div>
      <textarea class="${id} d-none form-control"  id="textarea${id}" cols="40" rows="3" placeholder="Type your note here" type="text"></textarea>
      `);
        saveNote(text, id);
        document
            .querySelector(".editNote")
            .addEventListener("click", (e) => edit(e, id));
    }

    function addPreviousNotes(text, nodeId) {
        let id = nodeId ? nodeId : guidGenerator();
        main.insertAdjacentHTML(
            "afterbegin",
            `<div class="alert alert-info d-flex flex-row justify-content-between ${text ? "" : "hidden"
            }" id="${id}"role="alert">
            <div class="w-75 text${id}">${text}</div>
            <div class="w-25">
                <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class=" ${id}  feather feather-edit-2 editNote" id="${id}">
                <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" ></path>
                </svg>

                 <svg xmlns="http://www.w3.org/2000/svg" id="${id}" width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class=" ${id} feather feather-trash-2"><polyline points="3 6 5 6 21 6"></polyline>
                 <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line>
                 </svg>
            </div>
      </div>
      <textarea class="${id} d-none form-control"  id="textarea${id}" cols="40" rows="3" placeholder="Type your note here" type="text"></textarea>
      `);
        document
            .querySelector(".editNote")
            .addEventListener("click", (e) => edit(e, id));
    }
    addNoteButton.addEventListener('click', () => addNote('Complete the work.', guidGenerator()));
}