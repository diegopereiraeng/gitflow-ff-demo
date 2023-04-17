function startRequests() {
        var url = "https://canarydemo-prod-tio7kygjlq-uc.a.run.app/";
        var requestsLeft = 100;
        var revisions = {};
        var squaresContainer = document.createElement("div");
        squaresContainer.className = "square-container";
        document.body.appendChild(squaresContainer);
​
        function makeRequest() {
          fetch(url)
            .then(response => response.json())
            .then(data => {
              var revision = data.revision;
              if (!(revision in revisions)) {
                revisions[revision] = 0;
              }
              revisions[revision]++;
              updateStatus(revisions);
              requestsLeft--;
              if (requestsLeft > 0) {
                makeRequest();
              }
            })
            .catch(error => {
              console.log("Error:", error);
              requestsLeft--;
              if (requestsLeft > 0) {
                makeRequest();
              }
            });
        }
​
        function updateStatus(revisions) {
          var status = document.getElementById("status");
          status.innerHTML = "";
          for (var revision in revisions) {
            var count = revisions[revision];
            var squareContainer = document.createElement("div");
            squareContainer.className = "square-container";
            for (var i = 0; i < count; i++) {
              var square = document.createElement("div");
              square.className = "square";
              square.style.backgroundColor = getColor(revision);
              squareContainer.appendChild(square);
            }
            status.appendChild(squareContainer);
            status.innerHTML += "Requests to revision " + revision + ": " + count + " (" + (count / 100 * 100).toFixed(2) + "%)<br>";
          }
        }
​
        function getColor(revision) {
          var hash = 0;
          for (var i = 0; i < revision.length; i++) {
            hash = revision.charCodeAt(i) + ((hash << 5) - hash);
          }
          var c = (hash & 0x00FFFFFF)
            .toString(16)
            .toUpperCase();
          return "#" + "00000".substring(0, 6 - c.length) + c;
        }
​
        makeRequest();
}
