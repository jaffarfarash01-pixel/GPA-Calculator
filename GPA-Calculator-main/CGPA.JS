let addbtn = document.querySelector("#add-btn");
let calbtn = document.querySelector("#calculate-btn");
let table = document.querySelector("#table-body");

let SemInp = document.querySelector("#sem");
let SGPAInp = document.querySelector("#SGPA");
let creditsInp = document.querySelector("#credits");

let store = [];

addbtn.addEventListener("click", () => {
  let sem = SemInp.value;
  let TotalCredits = Number(creditsInp.value);
  let SemSGPA = Number(SGPAInp.value);

  if (!sem || !TotalCredits || !SemSGPA) {
    alert("Fill all the fields");
    return;
  }

  if (SemSGPA > 10 || SemSGPA < 0) {
    alert("SGPA must be between 0 and 10");
    return;
  }

  if (store.some((item) => item.sem === sem)) {
    alert("Semester already added!");
    return;
  }

  store.push({ sem, SemSGPA, TotalCredits });

  let template = `
          <tr>
             <td>${sem}</td>
             <td>${SemSGPA}</td>
             <td>${TotalCredits}</td>
             <td><button class="delete-btn">Delete</button></td>
          </tr>
      `;

  table.insertAdjacentHTML("beforeend", template);
  SemInp.value = "";
  creditsInp.value = "";
  SGPAInp.value = "";
});

// delete row logic
table.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-btn")) {
    let row = e.target.closest("tr");
    let index = row.rowIndex - 1;

    store.splice(index, 1);
    row.remove();
  }
});

function calculateCGPA(store) {
  let totalCredits = 0;
  let totalPoints = 0;

  if (store.length === 1) {
    alert("You added only 1 semester. Add more to calculate CGPA.");
    return;
  }
  if (store.length === 0) {
    alert("No data found. Please add semester details.");
    return;
  }

  store.forEach((item) => {
    totalPoints += item.SemSGPA * item.TotalCredits;
    totalCredits += item.TotalCredits;
  });

  let cgpa = totalPoints / totalCredits;

  document.getElementById("output").innerHTML = cgpa.toFixed(2);
}
