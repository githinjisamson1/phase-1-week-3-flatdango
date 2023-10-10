function handleBuyTicket(e, availableTickets) {
  // decreasing number of tickets provided more than 0
  if (parseInt(availableTickets.innerHTML) > 0) {
    availableTickets.innerHTML = parseInt(availableTickets.innerHTML) - 1;
  } else {
    alert("All Tickets sold out!!");
  }
}

function displayMenu(data) {
  // grab element
  const ulMovies = document.querySelector("#movies");

  //   iterate data to display each item
  data.forEach((movie) => {
    // create element
    const liMovie = document.createElement("li");

    // manipulate dom
    liMovie.innerHTML = movie.title;

    // add to list of classes
    liMovie.classList.add("film-item");

    // clicking movie list item
    liMovie.addEventListener("click", (e) => {
      displayFirstMovie(movie);
    });

    // attach each film
    ulMovies.appendChild(liMovie);
  });
}

function fetchAllMovies() {
  // fetch API - all
  fetch("http://localhost:3000/films")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      // invoke upon receiving data
      displayMenu(data);
    })
    .catch((err) => {
      console.log(err.message);
    });
}

function displayFirstMovie(data) {
  // grab elements
  const main = document.querySelector("#main");
  const container = document.querySelector("#container");

  //   manipulate dom
  container.innerHTML = `
  <img src="${data.poster}" style="display:block;  width:100%; height:200px"/>
  <p>Title: ${data.title}</p>
  <p>Run Time: ${data.runtime}</p>
  <p>Show Time: ${data.showtime}</p>
  <p>Available Tickets: <span id="available-tickets">${
    data.capacity - data.tickets_sold
  }</span></p>  
  <button id="buy-ticket">Buy Ticket</button>
  `;

  //   attach to main
  main.appendChild(container);

  //   grab elements
  const availableTickets = document.querySelector("#available-tickets");
  const buyTicket = document.querySelector("#buy-ticket");

  //   clicking buy ticket
  buyTicket.addEventListener("click", (e) => {
    handleBuyTicket(e, availableTickets);
  });
}

function fetchFirstMovie() {
  // fetch API - 1
  fetch("http://localhost:3000/films/1")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      // invoke upon receiving data
      displayFirstMovie(data);
    })
    .catch((err) => {
      console.log(err.message);
    });
}

function handleDOMContentLoaded(e) {
  fetchFirstMovie();
  fetchAllMovies();
}

// wait HTML to load first
document.addEventListener("DOMContentLoaded", handleDOMContentLoaded);
