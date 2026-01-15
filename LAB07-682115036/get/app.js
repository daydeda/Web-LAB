// TASK A2: Implement GET with fetch (Random User)
// Requirements:
// 1) Show status: "Loading..."
// 2) Hide previous result (if any)
// 3) Fetch from: https://randomuser.me/api/
// 4) If (!res.ok) show error message
// 5) Parse JSON and render: name + email + avatar
// 6) Show status: "Loaded successfully."
//
// Must-have pattern: async/await, try/catch, res.ok, await res.json()

// 0) Access HTML elements (IDs required: btnLoad, status, result)
const loadUserBtn = document.getElementById("btnLoad");
const statusDiv = document.getElementById("status");
const resultDiv = document.getElementById("result");

// 1) Add click event listener to Load user button
// Hint: loadUserBtn.addEventListener("click", async () => { ... });

loadUserBtn.addEventListener("click", async () => {
  // 2) UI state: show loading + disable button
  // TODO: statusDiv.textContent = "Loading...";
  // TODO: loadUserBtn.disabled = true;
  statusDiv.textContent = "Loading...";
  loadUserBtn.disabled = true;

  // 3) Hide previous result (required)
  // TODO: resultDiv.classList.add("hidden");
  // TODO: resultDiv.innerHTML = "";
  resultDiv.classList.add("hidden");
  resultDiv.innerHTML = "";

  try {
    // 4) Fetch random user data
    // TODO: const res = await fetch("https://randomuser.me/api/");
    const res = await fetch("https://randomuser.me/api/");

    // 5) Check res.ok (HTTP errors do not throw automatically)
    // TODO: if (!res.ok) throw new Error(`HTTP ${res.status}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    // 6) Parse JSON
    // TODO: const data = await res.json();
    // TODO: const user = data.results[0];
    const data = await res.json();
    const user = data.results[0];

    // 7) Render name + email + avatar into resultDiv
    // TODO: resultDiv.innerHTML = `...`;
    resultDiv.innerHTML = `
      <img src="${user.picture.medium}" alt="Avatar" class="rounded-full mb-4">
      <h2 class="text-xl font-bold mb-2">${user.name.title} ${user.name.first} ${user.name.last}</h2>
      <p class="text-gray-700">${user.email}</p>
    `;

    // 8) Show result area (remove "hidden")
    // TODO: resultDiv.classList.remove("hidden");
    resultDiv.classList.remove("hidden");

    // 9) Status success
    // TODO: statusDiv.textContent = "Loaded successfully.";
    statusDiv.textContent = "Loaded successfully.";
  } catch (err) {
    // 10) Status error
    // TODO: statusDiv.textContent = `Error: ${err.message}`;
    statusDiv.textContent = `Error: ${err.message}`;
  } finally {
    // 11) Re-enable button (always)
    // TODO: loadUserBtn.disabled = false;
    loadUserBtn.disabled = false;
  }

  // ensure a Clear button exists and wire it up (works for existing or created button)
  let clearBtn = document.getElementById("btnClear");
  if (!clearBtn) {
    clearBtn = document.createElement("button");
    clearBtn.id = "btnClear";
    clearBtn.type = "button";
    clearBtn.textContent = "Clear";
    loadUserBtn.insertAdjacentElement("afterend", clearBtn);
  }
  // Attach listener once (use a data flag to avoid duplicate handlers)
  if (!clearBtn.dataset.hasListener) {
    clearBtn.addEventListener("click", () => {
      statusDiv.textContent = "Status: Idle";
      resultDiv.innerHTML = "";
      resultDiv.classList.add("hidden");
      loadUserBtn.disabled = false;
    });
    clearBtn.dataset.hasListener = "1";
  }
});