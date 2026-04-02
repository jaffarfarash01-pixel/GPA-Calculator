
let addbtn = document.querySelector("#add-btn");
let calbtn = document.querySelector("#calculate-btn");
let table = document.querySelector("table");

let subInput = document.querySelector("#subject");
let creditInput = document.querySelector("#credits");
let gradeInput = document.querySelector("#grade");

let subjects = [];

addbtn.addEventListener("click", () => {
    let subject = subInput.value;
    let credits = Number(creditInput.value);
    let grade = gradeInput.value;

    if(!subject || !credits || !grade){
       alert("Fill all the fields");
       return;
    }
    if(credits <= 0){
       alert("credits cannot be negative");
       return;
    }

    let row = table .insertRow();
    row.insertCell(0).innerText = subject;
     row.insertCell(1).innerText = credits;
      row.insertCell(2).innerText = grade;

    let deleteCell = row.insertCell(3);
    deleteCell.innerHTML = "<button onclick='deleteRow(this)'>Delete</button>";
 
    subjects.push({ subject , credits , grade});
        subInput.value = "";
        creditInput.value = "";
        gradeInput.value = "";
});

// CALCULATE GPA BUTTON

calbtn.addEventListener("click", () => {
       let totalCredits = 0;
       let totalPoints = 0;
       let gradePoint = 0;

       subjects.forEach(item => {
        let gradePoint = 0;

        if(item.grade === 'O')
            gradePoint = 10;
        else if (item.grade === 'A+')
            gradePoint = 9;
        else if (item.grade === 'A')
            gradePoint = 8;
        else if (item.grade === 'B+')
            gradePoint = 7;
        else if (item.grade === 'B')
            gradePoint = 6;
        else if (item.grade === 'C')
            gradePoint = 5;
         else if (item.grade === 'P')
            gradePoint = 4;
        else if (item.grade === 'F')
            gradePoint = 0;

        totalPoints += gradePoint * item.credits;
        totalCredits += item.credits;
        
       });

       let gpa = totalPoints / totalCredits;
       document.getElementById("output").innerHTML = gpa.toFixed(2);
});

function deleteRow(btn){
    let row = btn.parentNode.parentNode;
    row.remove();
}