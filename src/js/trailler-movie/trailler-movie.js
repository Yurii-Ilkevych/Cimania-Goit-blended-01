(() => {
    const TMDB_API_KEY = "1a61e5fdce9ed2e48250f150b81a57d1";
    const refs = {
      openModalBtn: document.querySelector("[data-modal-open]"),
      closeModalBtn: document.querySelector("[data-modal-close]"),
      modal: document.querySelector("[data-modal]"),
      player: document.getElementById("player"),
      errorModal: document.querySelector(".modal-message.error")
    };

    let player;
  
    refs.openModalBtn.addEventListener("click", openModal);
    refs.closeModalBtn.addEventListener("click", closeModal);
    document.addEventListener("keydown", handleKeyDown);
  
    function openModal() {
      const movieId = refs.openModalBtn.getAttribute("data-movie-id");
      fetchTrailer(movieId);
    }
  
    function fetchTrailer(movieId) {
      fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${TMDB_API_KEY}`)
        .then(response => response.json())
        .then(data => {
          if (data.results.length > 0) {
            const trailerKey = data.results[0].key;
            const youtubeUrl = `https://www.youtube.com/watch?v=${trailerKey}`;
            openPlayer(youtubeUrl);
          } else {
            openErrorModal();
          }
        })
        .catch(error => {
          console.log("An error occurred:", error);
          openErrorModal();
        });
    }
  
    function openPlayer(youtubeUrl) {
      refs.modal.classList.add("is-hidden");
      refs.player.innerHTML = `
        <iframe
          width="640"
          height="360"
          src="${youtubeUrl}"
          frameborder="0"
          allowfullscreen
        ></iframe>
      `;
    }
  
    function openErrorModal() {
      refs.modal.classList.remove("is-hidden");
      refs.errorModal.classList.remove("is-hidden");
    }
  
    function closeModal() {
      refs.modal.classList.add("is-hidden");
      refs.player.innerHTML = "";
      refs.errorModal.classList.add("is-hidden");
    }
  
    function handleKeyDown(event) {
      if (event.key === "Escape") {
        closeModal();
      }
    }
  })();
