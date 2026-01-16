(function () {
  const showError = (container, message) => {
    let err = container.querySelector(".like-error");
    if (!err) {
      err = document.createElement("div");
      err.className = "like-error text-red-600 text-sm mt-1";
      container.appendChild(err);
    }
    err.textContent = message;
    setTimeout(() => err.remove(), 4000);
  };

  // --- FORCE REFRESH FUNCTION ---
  const refreshLikeCounts = () => {
    console.log("Triggering like count refresh..."); // Debug log

    const likeCounters = document.querySelectorAll(".likes-count");

    likeCounters.forEach(async (counter) => {
      const id = counter.dataset.postId;
      if (!id) return;

      try {
        // TRICK: Add "?t=" + Date.now()
        // This makes the URL unique every single time, so the browser CANNOT cache it.
        const url = `/api/posts/${id}?t=${Date.now()}`;
        
        const res = await fetch(url, {
            headers: { 'Cache-Control': 'no-cache' } // Extra safety
        });
        
        if (res.ok) {
          const json = await res.json();
          if (typeof json.likes !== "undefined") {
            console.log(`Updated post ${id} to ${json.likes}`); // Debug log
            counter.textContent = String(json.likes);
          }
        }
      } catch (err) {
        console.error("Failed to refresh like count for post", id);
      }
    });
  };

  const initLikeButtons = () => {
    const buttons = Array.from(document.querySelectorAll(".like-btn"));

    buttons.forEach((btn) => {
      if (btn.dataset.likeBound) return;
      btn.dataset.likeBound = "1";

      btn.addEventListener("click", async () => {
        const id = btn.dataset.postId;
        if (!id || btn.disabled) return;

        const originalText = btn.textContent;
        btn.disabled = true;
        btn.textContent = "Liking...";

        const container = btn.closest("[data-post-container]") || btn.parentElement;
        const likesEl = document.querySelector(`.likes-count[data-post-id="${id}"]`);

        try {
          const res = await fetch(`/api/posts/${id}/like`, { method: "POST" });
          if (!res.ok) {
            showError(container, `Failed to like post (${res.status})`);
          } else {
            const json = await res.json();
            if (likesEl && typeof json.likes !== "undefined") {
              likesEl.textContent = String(json.likes);
            }
          }
        } catch (err) {
          showError(container, "Network error, try again");
        } finally {
          btn.disabled = false;
          btn.textContent = originalText;
        }
      });
    });
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initLikeButtons);
  } else {
    initLikeButtons();
  }

  // --- EVENT LISTENER ---
  // We use specific logic to ensure this runs when coming back from history
  window.addEventListener("pageshow", (event) => {
    // Log to console to verify the event is firing
    console.log("Page showed. Persisted (Back button used):", event.persisted);
    
    // Always run init to re-bind buttons
    initLikeButtons();
    
    // Always run refresh to get new numbers
    refreshLikeCounts();
  });

})();