// Mock user data for demonstration
// In real projects, fetch this from backend or session storage
const currentUser = {
  username: "john_doe",
  role: "vendor", // "user", "vendor", "admin"
  verified: true  // only verified vendors can access admin panel
};

// Front-end UI: show/hide admin link
const adminLink = document.getElementById("adminLink");
if (currentUser.role === "vendor" && currentUser.verified) {
  adminLink.style.display = "block";
} else {
  adminLink.style.display = "none";
}

// Page-level access control for admin page
if (window.location.pathname.includes("/admin/admin.html")) {
  if (!(currentUser.role === "vendor" && currentUser.verified)) {
    alert("Access Denied! Only verified vendors can access this page.");
    window.location.href = "/home/index.html"; // redirect to homepage
  }
}

// Guests Box
const guestsInput = document.getElementById("guestsInput");
const guestsDropdown = document.getElementById("guestsDropdown");
const persons = document.getElementById("persons");
const rooms = document.getElementById("rooms");
const applyGuests = document.getElementById("applyGuests");

guestsInput.addEventListener("click", () => {
  guestsDropdown.style.display =
    guestsDropdown.style.display === "none" ? "block" : "none";
});

applyGuests.addEventListener("click", () => {
  guestsInput.value = `${persons.value} persons · ${rooms.value} rooms`;
  guestsDropdown.style.display = "none";
});

// Search Button
document.getElementById("searchBtn").addEventListener("click", () => {
  let destination = document.getElementById("destination").value;
  let checkin = document.getElementById("checkin").value;
  let checkout = document.getElementById("checkout").value;
  let guests = guestsInput.value;

  if (destination.trim() === "") {
    alert("Please enter a destination!");
    return;
  }

  alert(
    `Searching hotels in ${destination}\nCheck-in: ${checkin}\nCheck-out: ${checkout}\nGuests: ${guests}`
  );
});

// Book Now Buttons
document.querySelectorAll(".bookNow").forEach(button => {
  button.addEventListener("click", () => {
    alert("Booking feature coming soon!");
  });
});
