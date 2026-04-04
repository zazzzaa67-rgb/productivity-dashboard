
const addButtons = document.querySelectorAll(".add");
const deleteButtons = document.querySelectorAll(".delete");
document.addEventListener("DOMContentLoaded", function () {

    let toggle = document.getElementById("toggleBtn");
    let circle = document.querySelector(".circle");

    let isDark = false;

    toggle.addEventListener("click", function () {
        isDark = !isDark;

        if (isDark) {
            circle.style.transform = "translateX(30px)";
            circle.innerHTML = "🌙";
            toggle.style.backgroundColor = "#2c3e50";
            document.body.style.background = "#222";
            document.body.style.color = "white"
        } else {
            circle.style.transform = "translateX(0)";
            circle.innerHTML = "☀️";
            toggle.style.backgroundColor = "#4db6e2";
            document.body.style.background = "linear-gradient(#caf0f8 , #0096c7)";
        }
    });

});
addButtons.forEach(function(btn) {
    let card = btn.closest(".card");

    btn.addEventListener("click", function() {
        let TheTasks = card.querySelector(".tasks");

        let div = document.createElement("div");
        div.className = "task";

        div.innerHTML = `
            <button class="done">✓</button>
            <input class="usTask" type="text" placeholder="Enter the task">
        `;

        TheTasks.appendChild(div);
        saveAll();
    });
});

deleteButtons.forEach(function(dbtn){
    let card = dbtn.closest(".card");

    dbtn.addEventListener("dblclick" , function(){
        let theTasks = card.querySelector(".tasks");
        theTasks.innerHTML = "";
        saveAll();
    });
});


document.addEventListener("click", function(e) {
    if (e.target.classList.contains("done")) {
        let task = e.target.closest(".task");

        task.classList.toggle("finished");

        // لون الزرار
        if (task.classList.contains("finished")) {
            e.target.style.backgroundColor = "green";
        } else {
            e.target.style.backgroundColor = "";
        }

        saveAll();
    }
});


const addButtongym = document.getElementById("addg");
const deleteButtongym = document.getElementById("deleteg");

addButtongym.addEventListener("click" , function(){
    let container = document.querySelector(".work_out_cards");

    let day = document.getElementById("the-day").value;
    let ex = document.getElementById("the-exercise").value;
    let w = document.getElementById("the-waihgt").value;
    let sets = document.getElementById("the-sets").value;
    let det = document.getElementById("more-details").value;

    if (day && ex && w && sets){
        container.innerHTML += `
        <div class="workout-card">
            <h3>${day}</h3>
            <img class="card-photo" src="photos/gym.jpg">
            <b>${ex}</b>
            <b>${w}</b>
            <b>${sets}</b>
            <b>${det}</b>
        </div>`;
    }

    saveAll();
});

deleteButtongym.addEventListener("click", function(){
    document.querySelector(".work_out_cards").innerHTML = "";
    saveAll();
});


const addNote = document.getElementById("addn");
const deleteNote = document.getElementById("deleten");

addNote.addEventListener("click", function(){
    let container = document.getElementById("useNotes");

    let input = document.createElement("input");
    input.className = "useNotes__useNote";
    input.type = "text";
    input.placeholder = "Enter your note";

    container.appendChild(input);

    saveAll(); 
});

deleteNote.addEventListener("dblclick", function(){
    document.getElementById("useNotes").innerHTML = "";
    saveAll();
});


function saveAll() {
    let data = {};

    
    data.tasks = [];
    document.querySelectorAll(".card").forEach(card => {
        let arr = [];
        card.querySelectorAll(".task").forEach(task => {
            arr.push({
                text: task.querySelector(".usTask").value,
                finished: task.classList.contains("finished")
            });
        });
        data.tasks.push(arr);
    });

    data.gym = document.querySelector(".work_out_cards").innerHTML;

    
    let notes = [];
    document.querySelectorAll(".useNotes__useNote").forEach(n => {
        notes.push(n.value);
    });
    data.notes = notes;

    localStorage.setItem("allData", JSON.stringify(data));
}


function loadAll() {
    let data = JSON.parse(localStorage.getItem("allData"));
    if (!data) return;

    
    document.querySelectorAll(".card").forEach((card, i) => {
        let container = card.querySelector(".tasks");
        container.innerHTML = "";

        data.tasks[i]?.forEach(t => {
            let div = document.createElement("div");
            div.className = "task";

            if (t.finished) div.classList.add("finished");

            div.innerHTML = `
                <button class="done">✓</button>
                <input class="usTask" type="text" value="${t.text}">
            `;

            let btn = div.querySelector(".done");
            if (t.finished) btn.style.backgroundColor = "green";

            container.appendChild(div);
        });
    });

    
    document.querySelector(".work_out_cards").innerHTML = data.gym || "";

    
    let notesContainer = document.getElementById("useNotes");
    notesContainer.innerHTML = "";

    data.notes?.forEach(n => {
        let input = document.createElement("input");
        input.className = "useNotes__useNote";
        input.type = "text";
        input.value = n;

        notesContainer.appendChild(input);
    });
}


document.addEventListener("input", function(e) {
    if (e.target.matches(".usTask, .useNotes__useNote")) {
        saveAll();
    }
});

// LOAD
window.onload = loadAll;
