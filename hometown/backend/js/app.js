// 🌐 Base URL of backend
const API_URL = "https://hometown-hub-bswj.onrender.com/api/auth";

// ================= REGISTER =================
async function registerUser() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const res = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        email,
        password
      })
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "Registration failed");
      return;
    }

    alert("✅ Registration successful");

    // redirect to login page
    window.location.href = "login.html";

  } catch (error) {
    console.error(error);
    alert("❌ Server error");
  }
}

// ================= LOGIN =================
async function loginUser() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  

  try {
    const res = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email,
        password
      })
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "Login failed");
      return;
    }

    // Save token
    localStorage.setItem("token", data.token);

    alert("✅ Login successful");

    // redirect to dashboard
    window.location.href = "dashboard.html";

  } catch (error) {
    console.error(error);
    alert("❌ Server error");
  }
}

// ================= LOGOUT =================
function logoutUser() {
  localStorage.removeItem("token");
  alert("Logged out");
  window.location.href = "login.html";
}

// ================= CHECK LOGIN =================
function checkAuth() {
  const token = localStorage.getItem("token");

  if (!token) {
    alert("Please login first");
    window.location.href = "login.html";
  }
}