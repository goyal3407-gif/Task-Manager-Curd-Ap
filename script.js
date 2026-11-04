
const contform = document.querySelector(".container");
const form = document.querySelector("form");
const Close = document.querySelector("#closee");
const createe = document.querySelector("#Create");
const Main = document.querySelector("main");

let editIndex = null;

let Taskaray = JSON.parse(localStorage.getItem("Data")) || [];

let ui = () => {
    Main.innerHTML = `
        <section class="tasks-section">
            <h2>My Tasks</h2>
            <div class="task-list" id="taskList"></div>
        </section>
    `;

    const taskList = document.querySelector("#taskList");

    Taskaray.forEach((Element, index) => {
        taskList.innerHTML += `
            <div class="task-card">
                <h1>${Element.Tasktitle}</h1>
                <h2>${Element.catagory}</h2>

                <div class="btns">
                    <button onclick="Updatearrind(${index})">Update</button>
                    <button onclick="deletearrind(${index})">Delete</button>
                </div>
            </div>
        `;
    });
};

createe.addEventListener("click", () => {
    editIndex = null;
    form.reset();
    contform.style.display = "flex";
});

Close.addEventListener("click", () => {
    contform.style.display = "none";
    form.reset();
    editIndex = null;
});

form.addEventListener("submit", (event) => {
    event.preventDefault();

    let Tasktitle = event.target[0].value.trim();
    let catagory = event.target[1].value;

    if (!Tasktitle || !catagory) {
        alert("Please fill all fields");
        return;
    }

    let obj = {
        Tasktitle,
        catagory
    };

    if (editIndex !== null) {
        Taskaray[editIndex] = obj;
        editIndex = null;
    } else {
        Taskaray.push(obj);
    }

    localStorage.setItem("Data", JSON.stringify(Taskaray));

    ui();

    contform.style.display = "none";
    form.reset();
});

function deletearrind(index) {
    Taskaray.splice(index, 1);

    localStorage.setItem("Data", JSON.stringify(Taskaray));
    

    ui();
}

function Updatearrind(index) {
    editIndex = index;

    let tasks = Taskaray[index];

    contform.style.display = "flex";

    form[0].value = tasks.Tasktitle;
    form[1].value = tasks.catagory;
}

ui();
