const addBtn = document.getElementById("addBtn");
const formContainer = document.getElementById("formContainer");
const saveBtn = document.getElementById("saveBtn");

const applicationsContainer =
document.getElementById("applicationsContainer");

let applications =
JSON.parse(localStorage.getItem("applications")) || [];

let editingIndex = null;

/* -----------------------------
   SHOW / HIDE FORM
----------------------------- */

addBtn.addEventListener("click", () => {

formContainer.classList.toggle("hidden");

});

/* -----------------------------
   RESET
----------------------------- */

function resetApplications(){

if(confirm("Delete all applications?")){

localStorage.removeItem("applications");

applications = [];

renderApplications();

}

}

/* -----------------------------
   PROGRESS CALCULATION
----------------------------- */

function calculateProgress(app){

const requirements = [

app.cv,
app.sop,
app.coverLetter,
app.motivationLetter,
app.referees,
app.applicationForm,
app.transcript,
app.englishTest

];

const required =
requirements.filter(
item => item !== "Not Required"
);

const completed =
required.filter(
item => item === "Completed"
);

if(required.length === 0){

return 100;

}

return Math.round(
(completed.length / required.length) * 100
);

}

/* -----------------------------
   DELETE
----------------------------- */

function deleteApplication(index){

if(confirm("Delete application?")){

applications.splice(index,1);

localStorage.setItem(
"applications",
JSON.stringify(applications)
);

renderApplications();

}

}

/* -----------------------------
   EXPAND CARD
----------------------------- */

function toggleDetails(index){

const details =
document.getElementById(`details-${index}`);

if(details.style.display === "block"){

details.style.display = "none";

}else{

details.style.display = "block";

}

}

function editApplication(index){

const app = applications[index];

document.getElementById("university").value =
app.university;

document.getElementById("program").value =
app.program;

document.getElementById("deadline").value =
app.deadline;

document.getElementById("status").value =
app.status;

document.getElementById("cv").value =
app.cv;

document.getElementById("sop").value =
app.sop;

document.getElementById("coverLetter").value =
app.coverLetter;

document.getElementById("motivationLetter").value =
app.motivationLetter;

document.getElementById("referees").value =
app.referees;

document.getElementById("applicationForm").value =
app.applicationForm;

document.getElementById("transcript").value =
app.transcript;

document.getElementById("englishTest").value =
app.englishTest;

editingIndex = index;

document.getElementById("saveBtn").textContent =
"Update Application";

formContainer.classList.remove("hidden");

window.scrollTo({
top:0,
behavior:"smooth"
});

}

/* -----------------------------
   RENDER
----------------------------- */

function renderApplications(){

applicationsContainer.innerHTML = "";

applications.forEach((app,index)=>{

const progress =
calculateProgress(app);

applicationsContainer.innerHTML += `

<div class="application-card">

<div class="card-top">

<div>

<h3>${app.university}</h3>

<p>${app.program}</p>

</div>

<span class="status-badge">
${app.status}
</span>

</div>

<p class="deadline">
Deadline: ${app.deadline}
</p>

<div class="progress-bar">

<div
class="progress-fill"
style="width:${progress}%">
</div>

</div>

<p class="progress-text">
${progress}% Complete
</p>

<div class="card-buttons">

<button
onclick="toggleDetails(${index})"
class="btn-secondary">

Show Details

</button>

<button
onclick="editApplication(${index})"
class="btn-secondary">

Edit

</button>

<button
onclick="deleteApplication(${index})"
class="delete-btn">

Delete

</button>

</div>

<div
id="details-${index}"
class="details-section">

<div class="detail-row">
<span>CV</span>
<span>${app.cv}</span>
</div>

<div class="detail-row">
<span>SOP</span>
<span>${app.sop}</span>
</div>

<div class="detail-row">
<span>Cover Letter</span>
<span>${app.coverLetter}</span>
</div>

<div class="detail-row">
<span>Motivation Letter</span>
<span>${app.motivationLetter}</span>
</div>

<div class="detail-row">
<span>Referees</span>
<span>${app.referees}</span>
</div>

<div class="detail-row">
<span>Application Form</span>
<span>${app.applicationForm}</span>
</div>

<div class="detail-row">
<span>Transcript</span>
<span>${app.transcript}</span>
</div>

<div class="detail-row">
<span>English Test</span>
<span>${app.englishTest}</span>
</div>

</div>

</div>

`;

});

}

/* -----------------------------
   SAVE
----------------------------- */

saveBtn.addEventListener("click",()=>{

const application = {

university:
document.getElementById("university").value,

program:
document.getElementById("program").value,

deadline:
document.getElementById("deadline").value,

status:
document.getElementById("status").value,

cv:
document.getElementById("cv").value,

sop:
document.getElementById("sop").value,

coverLetter:
document.getElementById("coverLetter").value,

motivationLetter:
document.getElementById("motivationLetter").value,

referees:
document.getElementById("referees").value,

applicationForm:
document.getElementById("applicationForm").value,

transcript:
document.getElementById("transcript").value,

englishTest:
document.getElementById("englishTest").value

};

if(editingIndex !== null){

applications[editingIndex] = application;

editingIndex = null;

document.getElementById("saveBtn").textContent =
"Save Application";

}else{

applications.push(application);

}

localStorage.setItem(
"applications",
JSON.stringify(applications)
);

renderApplications();

formContainer.classList.add("hidden");

});

renderApplications();
/* ======================
   APPLICATION FEES
====================== */

const feeRequired =
document.getElementById(
"feeRequired"
);

const feeSection =
document.getElementById(
"feeSection"
);

if(feeRequired){

feeRequired.addEventListener(
"change",
()=>{

if(
feeRequired.value === "Yes"
){

feeSection.style.display =
"block";

}
else{

feeSection.style.display =
"none";

}

});

}
