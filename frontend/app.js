// ==========================
// 🔐 TOKEN
// ==========================
const token = localStorage.getItem("token");


// ==========================
// 📝 REGISTER FUNCTION
// ==========================
async function registerUser() {
    try {
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const hometown = document.getElementById("hometown").value;

        const response = await fetch("https://hometown-hub-bswj.onrender.com/api/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                email,
                password,
                hometown
            })
        });

        const data = await response.json();
        alert(data.message);

    } catch (error) {
        console.error("Error:", error);
        alert("Something went wrong");
    }
}


// ==========================
// 👥 JOIN COMMUNITY
// ==========================
function joinCommunity() {
    fetch("https://hometown-hub-bswj.onrender.com/api/community/join", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            userId: 1,
            communityId: 101
        })
    })
    .then(res => res.json())
    .then(data => {
        alert(data.message);
    })
    .catch(err => {
        console.error(err);
        alert("Error joining community");
    });
}


// ==========================
// 📝 CREATE POST
// ==========================
function createPost() {
    const content = document.getElementById("postText").value;

    fetch("https://hometown-hub-bswj.onrender.com/api/posts/create", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token   // ✅ IMPORTANT
        },
        body: JSON.stringify({ content })
    })
    .then(res => res.json())
    .then(data => {
        alert(data.message);
    })
    .catch(err => {
        console.error(err);
        alert("Error creating post");
    });
}


// ==========================
// 🔔 LOAD NOTIFICATIONS
// ==========================
async function loadNotifications() {
    try {
        const res = await fetch("https://hometown-hub-bswj.onrender.com/api/notifications", {
            headers: {
                Authorization: "Bearer " + token
            }
        });

        const data = await res.json();

        console.log("Notifications:", data);

        const container = document.getElementById("notificationList");
        if (!container) return; // safety check

        container.innerHTML = "";

        data.forEach(n => {
            const div = document.createElement("div");
            div.innerText = n.message;
            container.appendChild(div);
        });

    } catch (err) {
        console.error("Notification error:", err);
    }
}


// ==========================
// 🔄 AUTO LOAD NOTIFICATIONS
// ==========================
setInterval(loadNotifications, 5000); // every 5 sec

// OR first load
window.onload = loadNotifications;