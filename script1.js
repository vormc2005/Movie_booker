const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

populateUI();




let ticketPrice = +movieSelect.value;
// console.log(ticketPrice)

//save selected movie index and price
const setMovieData=(movieIndex, moviePrice)=>{
    localStorage.setItem('selectedMovieIndex', movieIndex)
    localStorage.setItem('selectedMoviePrice', moviePrice)

}

//update seat count
function updateSelectedCount(){
    const selectedSeats = document.querySelectorAll('.row .seat.selected')
    //ccopy selected seats into an array
    const seatsIndex = [...selectedSeats].map(seat=>[...seats].indexOf(seat)
    );
    console.log(seatsIndex)
    localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex))
    //map through array
    //return array

    // console.log(selectedSeats)
    const selectedSeatsCount = selectedSeats.length;
    // console.log(selectedSeatsCount)
    count.innerText = selectedSeatsCount
    total.innerText = selectedSeatsCount * ticketPrice
}

//Get  data from local storage and populate UI
function populateUI (){
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    // console.log(selectedSeats)
    if(selectedSeats!== null && selectedSeats.length >0){
        seats.forEach((seat, index)=>{
            if(selectedSeats.indexOf(index) > -1){
                seat.classList.add('selected');
            }
        })
    }
    const selectedMovieIndex =localStorage.getItem('selectedMovieIndex');
    if(selectedMovieIndex !==null){
        movieSelect.selectedIndex = selectedMovieIndex;
    }
}


//Movieselect evnet
movieSelect.addEventListener('change', (e)=>{
    ticketPrice = +e.target.value
    setMovieData(e.target.selectedIndex, e.target.value)
    updateSelectedCount()
})


//seat clicker, change class

container.addEventListener('click', (e)=>{
    e.preventDefault()
    // console.log(e.target)
    if(e.target.classList.contains('seat')&& !e.target.classList.contains('occupied')){
        // console.log(e.target)
        e.target.classList.toggle('selected')
        updateSelectedCount();
    }

})

//initial count

updateSelectedCount()




