/* =====================================
   LOAD DATA
===================================== */

const applications =
JSON.parse(localStorage.getItem("applications")) || [];

const professors =
JSON.parse(localStorage.getItem("professors")) || [];

const referees =
JSON.parse(localStorage.getItem("referees")) || [];

const deadlineContainer =
document.getElementById("deadlineContainer");

let deadlines = [];

/* =====================================
   APPLICATIONS
===================================== */

applications.forEach(app => {

if(app.deadline){

deadlines.push({

title: app.university || "Application",

type: "Application",

date: app.deadline

});

}

});

/* =====================================
   PROFESSORS
===================================== */

professors.forEach(prof => {

if(prof.followUp){

deadlines.push({

title: prof.name,

type: "Professor Follow-Up",

date: prof.followUp

});

}

});

/* =====================================
   REFEREES
===================================== */

referees.forEach(ref => {

if(ref.deadline){

deadlines.push({

title: ref.name,

type: "Referee Deadline",

date: ref.deadline

});

}

});

/* =====================================
   SORT
===================================== */

deadlines.sort((a,b)=>{

return new Date(a.date) - new Date(b.date);

});

/* =====================================
   COUNTERS
===================================== */

let overdue = 0;
let week = 0;
let month = 0;

const today = new Date();

/* =====================================
   NOTIFICATIONS
===================================== */

const enableBtn =
document.getElementById(
"enableNotificationsBtn"
);

enableBtn.addEventListener("click",()=>{

Notification.requestPermission()
.then(permission=>{

if(permission === "granted"){

alert(
"Notifications Enabled!"
);

}

});

});

/* =====================================
   RENDER
===================================== */

function renderDeadlines(){

deadlineContainer.innerHTML = "";

deadlines.forEach(item=>{

const deadlineDate =
new Date(item.date);

const diffDays =
Math.ceil(
(deadlineDate - today)
/
(1000 * 60 * 60 * 24)
);

let statusClass =
"deadline-normal";

let statusText =
`${diffDays} days remaining`;

if(diffDays < 0){

statusClass =
"deadline-overdue";

statusText =
`${Math.abs(diffDays)} days overdue`;

overdue++;

}

else if(diffDays <= 7){

statusClass =
"deadline-week";

statusText =
`${diffDays} days remaining`;

week++;

}

else if(diffDays <= 30){

month++;

}

/* ==========================
   NOTIFICATIONS
========================== */

if(
Notification.permission ===
"granted"
){

if(diffDays === 5){

new Notification(
`⚠ ${item.title}`
,{
body:
"Deadline in 5 days"
}
);

}

if(diffDays === 1){

new Notification(
`⚠ ${item.title}`
,{
body:
"Deadline tomorrow"
}
);

}

}

/* ==========================
   CARD
========================== */

deadlineContainer.innerHTML += `

<div class="deadline-card ${statusClass}">

<h3>
${item.title}
</h3>

<p>
${item.type}
</p>

<p>
${item.date}
</p>

<span>
${statusText}
</span>

</div>

`;

});

/* ==========================
   STATS
========================== */

document.getElementById(
"totalDeadlines"
).textContent =
deadlines.length;

document.getElementById(
"overdueCount"
).textContent =
overdue;

document.getElementById(
"weekCount"
).textContent =
week;

document.getElementById(
"monthCount"
).textContent =
month;

}

renderDeadlines();