document.addEventListener("DOMContentLoaded", () => {
  const buttons = Array.from(document.querySelectorAll(".like-btn"));

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

  buttons.forEach((btn) => {
    btn.addEventListener("click", async (e) => {
      const id = btn.dataset.postId;
      if (!id) return;

      // prevent double clicks
      if (btn.disabled) return;

      const originalText = btn.textContent;
      btn.disabled = true;
      btn.textContent = "Liking...";

      const container = btn.closest("[data-post-container]") || btn.parentElement;
      const likesEl = document.querySelector(`.likes-count[data-post-id="${id}"]`);

      try {
        const res = await fetch(`/api/posts/${id}/like`, { method: "POST" });
        if (!res.ok) {
          // fetch only rejects on network errors — check res.ok
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
});