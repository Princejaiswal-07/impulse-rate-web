let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

// Add Expense
function addExpense() {
    let category = document.getElementById("category").value.trim();
    let amount = Number(document.getElementById("amount").value);

    if (!category || amount <= 0) return;

    expenses.push({ category, amount });
    localStorage.setItem("expenses", JSON.stringify(expenses));

    updateTotal();
    resetForm();
}

// 🔥 FIXED TOTAL FUNCTION
function updateTotal() {
    let total = expenses.reduce((sum, e) => sum + e.amount, 0);

    document.getElementById("total").innerText = total;

    let alertBox = document.getElementById("alertBox");

    // Always reset first
    alertBox.style.display = "none";

    if (total > 2000) {
        alertBox.style.display = "block";
    }
}

// Reset
function resetForm() {
    document.getElementById("category").value = "";
    document.getElementById("amount").value = "";
}

// Delete All (🔥 FIXED)
function deleteAll() {
    expenses = [];
    localStorage.removeItem("expenses");

    document.getElementById("total").innerText = 0;

    let alertBox = document.getElementById("alertBox");
    alertBox.style.display = "none";

    alert("All data deleted 🗑");
}

// Load
updateTotal();

// --- Signup / Auth (simple demo, not secure) ---
function registerUser() {
    const name = document.getElementById('su-name').value.trim();
    const email = document.getElementById('su-email').value.trim().toLowerCase();
    const pass = document.getElementById('su-password').value;
    const pass2 = document.getElementById('su-password2').value;

    const msgEl = document.getElementById('su-message');

    if (!name || !email || !pass) {
        msgEl.innerText = 'Please fill all fields.';
        msgEl.className = 'form-message error';
        msgEl.style.display = 'block';
        return;
    }

    if (pass !== pass2) {
        msgEl.innerText = "Passwords don't match.";
        msgEl.className = 'form-message error';
        msgEl.style.display = 'block';
        return;
    }

    // Save a very small demo user list in localStorage (for prototype only)
    const users = JSON.parse(localStorage.getItem('users') || '[]');

    if (users.find(u => u.email === email)) {
        msgEl.innerText = 'User already exists.';
        msgEl.className = 'form-message error';
        msgEl.style.display = 'block';
        return;
    }

    users.push({ name, email, password: pass });
    localStorage.setItem('users', JSON.stringify(users));

    msgEl.innerText = 'Signup successful! Redirecting...';
    msgEl.className = 'form-message success';
    msgEl.style.display = 'block';

    setTimeout(() => { location.href = 'index.html'; }, 1200);
}

function clearSignupMessage() {
    const msgEl = document.getElementById('su-message');
    if (msgEl) msgEl.style.display = 'none';
}