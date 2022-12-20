console.log("scrips")
window.postMessage({ type: "FROM_PAGE", text: "Hello from the webpage!" }, "*");
const addNoteButton = document.querySelector("#Add-btn");
const search = document.querySelector("#search");

//  updating  list and local storage
const updateLst = () => {
    const textareaData = document.querySelectorAll('#textarea')
    const notes = [];
    textareaData.forEach((element) => {
        console.log(element);
        // by every time adding new element we just reload the page for loading new data
        return notes.push(element.value), window.document.location.reload();
    })
    localStorage.setItem('notes', JSON.stringify(notes));
}

const addNewnote = (text = '') => {
    debugger
    const note = document.createElement('div');

    // for add class name dynamically in ('div')
    note.classList.add('note')

    // dynamic data for adding
    const htmlData = `
    <button id="edit" class="fa">&#xf044</button>
    <button id="delete" class="fa">&#xf00d</button>
    <div class="inner  text-capitalize">
        <div class="innerme  ${text ? "" : "hidden"}"></div>
    </div>
    <textarea class="${text ? "hidden" : ""}" id="textarea" cols="40" rows="10" placeholder="Type your note here" type="text"></textarea>`;

    // adding Html dynamically / for adding htmldata in div (new and fast method)
    note.insertAdjacentHTML("afterbegin", htmlData);

    // getting refrence
    let main = document.querySelector('.main');
    let inner = note.querySelector('.innerme');
    let Edit = note.querySelector("#edit");
    let delBtn = note.querySelector('#delete');
    let textArea = note.querySelector("#textarea");

    // adding Html dynamically
    main.insertAdjacentElement('beforeend', note)

    //delete or remove note functionality
    delBtn.addEventListener('click', () => {
        note.remove();
        updateLst();
    });

    // for adding text
    textArea.value = text;
    inner.innerHTML = text;

    // toggle useing edit button
    Edit.addEventListener('click', () => {
        textArea.classList.toggle('hidden');
        inner.classList.toggle('hidden');
    })

    textArea.addEventListener('change', (event) => {
        // const value = event.target.value;
        updateLst();
    })
};

// getting data📁 from browser storage
const notes = JSON.parse(localStorage.getItem('notes'));

// if (notes) is not null then condition is true.
if (notes) {
    // notes.forEach((note) => {
    //     addNewnote(note);
    // })
    for (let i = 1; i <= notes.length;) {
        const element = notes[notes.length - i];
        console.log(element)
        addNewnote(element);
        i++;
    }
}

addNoteButton.addEventListener('click', () => { addNewnote() });

// search functionality
search.addEventListener('click', () => {
    let searchInput = document.querySelector("#search-input").value;
    // fat arrow function for searching 
    const result = () => {
        const innerme = document.querySelectorAll('.innerme');
        innerme.forEach((elm) => {
            if (elm.textContent == searchInput) {
                elm.style.boxShadow = "-2px 0px 12px 5px green";
                setTimeout(() => {
                    window.document.location.reload();
                }, 2000);
            }
        })
    }
    console.log(result())
})