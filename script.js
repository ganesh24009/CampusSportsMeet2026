// Date and Time
function showDateTime() {

    let now = new Date();

    let dateTime = now.toLocaleString();

    let dt = document.getElementById("datetime");

    if (dt) {
        dt.innerHTML = dateTime;
    }
}

setInterval(showDateTime, 1000);

// -------------------- SPORTS FORM --------------------

let participantCount = 0;

let participants = [];

let sportsForm = document.getElementById("sportsForm");

if (sportsForm) {

    sportsForm.addEventListener("submit", function(event) {

        event.preventDefault();

        let name = document.getElementById("name").value;
        let regno = document.getElementById("regno").value;
        let email = document.getElementById("email").value;
        let mobile = document.getElementById("mobile").value;
        let department = document.getElementById("department").value;
        let year = document.getElementById("year").value;
        let eventName = document.getElementById("event").value;
        let ptype = document.getElementById("ptype").value;
        let teamname = document.getElementById("teamname").value;
        let members = document.getElementById("members").value;

        let message = document.getElementById("message");

        // Validation

        if (name == "") {
            message.innerHTML = "Enter student name";
            message.className = "error";
            return;
        }

        let emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

        if (!email.match(emailPattern)) {
            message.innerHTML = "Invalid email format";
            message.className = "error";
            return;
        }

        let mobilePattern = /^[0-9]{10}$/;

        if (!mobile.match(mobilePattern)) {
            message.innerHTML = "Mobile number must be 10 digits";
            message.className = "error";
            return;
        }

        let regPattern = /^[A-Za-z0-9]+$/;

        if (!regno.match(regPattern)) {
            message.innerHTML = "Invalid register number";
            message.className = "error";
            return;
        }

        if (eventName == "") {
            message.innerHTML = "Select event";
            message.className = "error";
            return;
        }

        // Closed Event Restriction

        if (eventName == "Chess") {
            message.innerHTML = "Chess event is closed";
            message.className = "error";
            return;
        }

        // Team Validation

        if (ptype == "Team") {

            if (teamname == "" || members == "") {
                message.innerHTML = "Enter team details";
                message.className = "error";
                return;
            }

            if (members < 2 || members > 6) {
                message.innerHTML = "Team size must be between 2 and 6";
                message.className = "error";
                return;
            }
        }

        // Duplicate Check

        for (let i = 0; i < participants.length; i++) {

            if (
                participants[i].regno == regno &&
                participants[i].eventName == eventName
            ) {
                message.innerHTML =
                    "Duplicate entry not allowed";
                message.className = "error";
                return;
            }
        }

        // Add Participant

        participants.push({
            regno: regno,
            eventName: eventName
        });

        participantCount++;

        document.getElementById("count").innerHTML =
            participantCount;

        message.innerHTML =
            "Participation Registered Successfully";

        message.className = "success";

        // Display Participant

        let participantList =
            document.getElementById("participantList");

        participantList.innerHTML += `
            <div class="card">
                <h3>${name}</h3>
                <p>Register Number: ${regno}</p>
                <p>Event: ${eventName}</p>
                <p>Department: ${department}</p>
            </div>
        `;

        // Clear Form

        sportsForm.reset();

    });
}

// -------------------- FEEDBACK FORM --------------------

let totalRating = 0;
let feedbackCount = 0;

let feedbackForm =
    document.getElementById("feedbackForm");

if (feedbackForm) {

    feedbackForm.addEventListener("submit", function(event) {

        event.preventDefault();

        let fname =
            document.getElementById("fname").value;

        let fregno =
            document.getElementById("fregno").value;

        let fevent =
            document.getElementById("fevent").value;

        let rating =
            document.getElementById("rating").value;

        let comments =
            document.getElementById("comments").value;

        let feedbackMessage =
            document.getElementById("feedbackMessage");

        // Validation

        if (fname == "") {
            feedbackMessage.innerHTML =
                "Enter student name";

            feedbackMessage.className = "error";
            return;
        }

        if (fregno == "") {
            feedbackMessage.innerHTML =
                "Enter register number";

            feedbackMessage.className = "error";
            return;
        }

        if (fevent == "") {
            feedbackMessage.innerHTML =
                "Select event";

            feedbackMessage.className = "error";
            return;
        }

        if (rating == "") {
            feedbackMessage.innerHTML =
                "Select rating";

            feedbackMessage.className = "error";
            return;
        }

        if (comments.length < 20) {
            feedbackMessage.innerHTML =
                "Comments must contain minimum 20 characters";

            feedbackMessage.className = "error";
            return;
        }

        // Success Message

        feedbackMessage.innerHTML =
            "Feedback Submitted Successfully";

        feedbackMessage.className = "success";

        // Feedback Summary

        let feedbackSummary =
            document.getElementById("feedbackSummary");

        feedbackSummary.innerHTML += `
            <div class="card">
                <h3>${fname}</h3>
                <p>Register Number: ${fregno}</p>
                <p>Event: ${fevent}</p>
                <p>Rating: ${rating}</p>
                <p>Comments: ${comments}</p>
            </div>
        `;

        // Average Rating

        totalRating += Number(rating);

        feedbackCount++;

        let average =
            totalRating / feedbackCount;

        document.getElementById("averageRating")
            .innerHTML = average.toFixed(2);

        // Clear Form

        feedbackForm.reset();

    });
}