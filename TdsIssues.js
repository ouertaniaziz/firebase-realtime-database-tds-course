const firebaseConfig = {
  apiKey: "AIzaSyBaYYaU7cw7X1sVC7ZV-_WUSlOpKyTAESM",
  authDomain: "issueprojecttds.firebaseapp.com",
  projectId: "issueprojecttds",
  storageBucket: "issueprojecttds.appspot.com",
  messagingSenderId: "837421530226",
  appId: "1:837421530226:web:601cb5232e0c854988d6eb",
  databaseURL: "https://issueprojecttds-default-rtdb.firebaseio.com/",
};
firebase.initializeApp(firebaseConfig);

const rootRef = firebase.database().ref("issueList/");

function addNewIssue() {
  const severity = document.getElementById("severity-dropdown").value;
  const description = document.getElementById("description-textfield").value;
  const status = document.getElementById("resolved-dropdown").value;

  rootRef.push({
    severity: severity,
    description: description,
    status: status,
  });
  document.getElementById("description-textfield").value = "";
}

rootRef.on(
  "value",
  (snapshot) => {
    const listeTableBody = document.getElementById("list-table-body");
    listeTableBody.textContent = "";
    snapshot.forEach((element) => {
      issue = element.val();
      console.log(element.key);
      const row = document.createElement("tr");
      const id = JSON.stringify(element.key);
      console.log(id);
      row.innerHTML =
        "<td>" +
        issue.severity +
        "</td> <td>" +
        issue.description +
        "</td> <td>" +
        "<select onchange='updateIssue(" +
        id +
        ", this.value)'>" +
        " <option value='yes'" +
        (issue.status == "yes" ? "selected" : "") +
        " >yes</option>" +
        "<option value='no'" +
        (issue.status == "no" ? "selected" : "") +
        ">no</option>" +
        "</select>" +
        "</td> <td onclick='deletissue(" +
        id +
        ")'>x</td>";
      listeTableBody.appendChild(row);
    });
  },

  (error) => {
    console.log(error);
  }
);

// function updateIssue(key, value) {
//   console.log(value);
//   rootRef.child(key).update({ status: value });
// }
function updateIssue(key, value) {
  const updateRef = firebase.database().ref("issueList/" + key);
  updateRef.update({ status: value });
}

// function deletissue(key) {
//   const removeRef = firebase.database().ref("issueList/" + key);
//   removeRef.remove();
// }
function deletissue(key) {
  rootRef.child(key).remove();
}
