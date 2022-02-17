console.log("jhbudsfiuhds")
showNotes();
let addBtnJs = document.getElementById("addBtn");
let replaceBTn = document.getElementById("replaceBTn")
let addindex = 0;
addBtnJs.addEventListener("click", function () {

    let addNewtxt = document.getElementById("addTxt");
    let addNewhead = document.getElementById("addHeading");
    let newnotes = localStorage.getItem("newnotes");
    let notesobj;
    if (newnotes == null) {
        notesobj = [];
    }
    else {
        notesobj = JSON.parse(newnotes);
    }
    let noteobj = {
        heading: addNewhead.value,
        text: addNewtxt.value,
    }
    addindex++;
    notesobj.push(noteobj);
    localStorage.setItem("newnotes", JSON.stringify(notesobj));
    addNewtxt.value = "";
    addNewhead.value = "";
    // console.log(addindex);
    showNotes();
})
function showNotes() {
    let getnotes = localStorage.getItem("newnotes");
    let getnotesobj;
    if (getnotes == null) {
        getnotesobj = [];
    }
    else {
        getnotesobj = JSON.parse(getnotes);
    }
    let html = ""
    getnotesobj.forEach(function (element, index) {
        html += `
            <div class="noteCard my-2 mx-2 card" style="width: 20rem;">
                    <div class="card-body">
                    <div>
                        <div class="h6 text-muted float-right">Note${index + 1}</div>
                        <div class="card-title h5 float-left" id="headu">${element.heading}</div>
                        
                    </div>
                        <p class="card-text">${element.text}</p>
                        <button id="${index}"onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
                        <button id="${index}"onclick="editNote(this.id)" class="btn btn-primary">Edit Note</button>
                    </div>
                </div>`;
    });
    let notesElm = document.getElementById("notes");
    // let headElm = document.getElementById("head");
    if (getnotesobj.length != 0) {
        notesElm.innerHTML = html;
    } else {
        notesElm.innerHTML = `Nothing to show! Use "Add a Note" section above to add notes.`;
    }
    // notesElm.innerHTML = html;
}
function deleteNote(index) {
    let newnotes = localStorage.getItem("newnotes");
    let notesobj;
    if (newnotes == null) {
        notesobj = [];
    }
    else {
        notesobj = JSON.parse(newnotes);
    }
    notesobj.splice(index, 1);
    localStorage.setItem("newnotes", JSON.stringify(notesobj));
    showNotes();
}
let search = document.getElementById("searchTxt");
search.addEventListener("input", function () {
    let inputtext = search.value.toLowerCase();
    let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function (element) {
        let cardTxt = element.getElementsByTagName("p")[0].innerText;
        let cardheader = element.getElementsByTagName("div")[3].innerText;
        // let cardheader=element.getElementById('headu').innerText
        if (cardTxt.includes(inputtext)) {
            element.style.display = "block";
        }
        else if (cardheader.includes(inputtext)) {
            element.style.display = "block";
        }
        else {
            element.style.display = "none";
        }

    })
})
function editNote(index) {
    addindex=index;
    addBtnJs.style.display = "none";
    replaceBTn.style.display = "block"
    // console.log("The index is " + intel);
    let addNewtxt = document.getElementById("addTxt");
    let addNewhead = document.getElementById("addHeading");
    if (addNewtxt.value != "" || addNewhead.value != "") {
        alert("claer the input filed")
    }
    else {
        let newnotes = localStorage.getItem("newnotes");
        // let notesobj;
        if (newnotes == null) {
            notesobj = [];
        }
        else {
            notesobj = JSON.parse(newnotes);
        }
        // console.log(notesobj[index].heading);
        // console.log(addNewhead.value);
        addNewhead.value = notesobj[index].heading;
        addNewtxt.value = notesobj[index].text;
    }
}

// function getindex(noteobj) {
//     let getnotes = localStorage.getItem("newnotes");
//     let getnotesobj;
//     if (getnotes == null) {
//         getnotesobj = [];
//     }
//     else {
//         getnotesobj = JSON.parse(getnotes);
//     }
//     for (let i = 0; i < getnotesobj.length; i++) {
//         if (noteobj == getnotesobj[i]) {
//             return i;
//         }
//     }
// }
function replace() {
    console.log("The addindex is "+addindex);
    replaceBTn.style.display = "none";
    addBtnJs.style.display = "block";
    let addNewtxt = document.getElementById("addTxt");
    let addNewhead = document.getElementById("addHeading");
    let getnotes = localStorage.getItem("newnotes");
    let notesobj;
    if (getnotes == null) {
        getnotesobj = [];
    }
    else {
        notesobj = JSON.parse(getnotes);
    }
    noteobj = {
        heading: addNewhead.value,
        text: addNewtxt.value
    }
    console.log("Before change is " + notesobj[addindex].heading);
    console.log("Before change is " + notesobj[addindex].text);
    // notesobj[addindex] = notesobj;
    // notesobj.push(noteobj);
    notesobj[addindex].heading = addNewhead.value;
    notesobj[addindex].text = addNewtxt.value;
    console.log(notesobj);
    localStorage.setItem("newnotes", JSON.stringify(notesobj));
    addNewtxt.value = "";
    addNewhead.value = "";
    showNotes();
}

