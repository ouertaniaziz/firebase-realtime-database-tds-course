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
      const row = document.createElement("tr");
      row.innerHTML =
        "<td>" +
        issue.severity +
        "</td> <td>" +
        issue.description +
        "</td> <td>" +
        issue.status +
        "</td>";
      listeTableBody.appendChild(row);
    });
  },

  (error) => {
    console.log(error);
  }
);
