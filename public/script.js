const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');

const music = document.querySelector('audio');

const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');

const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const playBtn = document.getElementById('play');

// collection of music
// music cover image corresponds to name
const songs = [
    {
        name: 'demo-2',
        displayName: 'chiller',
        artist: 'tester',
    },
    {
        name: 'demo-1',
        displayName: 'Met',
        artist: 'tester',
    }

];

// check if playing
let isPlaying = false;

// play

function playSong(){
    isPlaying = true;
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'Pause');
    music.play();
}

function pauseSong(){
    isPlaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'Play');
    music.pause();
}

// play or pause
playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));

//  Update the DOM
function loadSong(song) {
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `music/${song.name}.mp3`;
    image.src = `img/${song.name}.jpg`;
}

// current song
let songIndex = 0;

function nextSong(){
    
    songIndex++;
    if (songIndex > songs.length -1) {
        songIndex = 0; //start at the beginning
    }
    loadSong(songs[songIndex]);
    playSong();
}

function prevSong(){
    songIndex--;
    if (songIndex < 0) {
        songIndex = songs.length -1;
    }
    loadSong(songs[songIndex]);
    playSong();
}

// on load select 1st song
loadSong(songs[songIndex]);

// Update Progress Bar and time
function updateProgressBar(e){
if(isPlaying){
    const {duration, currentTime } = e.srcElement;
    //console.log(duration, currentTime);

    //update the progress bar width 
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`

    //calculate the display for duration 
    const durationMinutes = Math.floor(duration / 60);
    let durationSeconds = Math.floor(duration % 60);
    if (durationSeconds < 10){
        durationSeconds = `0${durationSeconds}`;
    }
    // console.log('minutes', durationMinutes);
    // console.log('seconds', durationSeconds);
    
    //Delay switching the duration element 
    if (durationSeconds) {
        durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
    }
    //calculate the display for current Time 
    const currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime % 60);
    if (currentSeconds < 10){
        currentSeconds = `0${currentSeconds}`;
    }
    if (durationSeconds) {
        currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
    }
}
}

//set progress bar to click to part of song
function setProgressBar(e){
    //want the width (overall) and offsetX (ie. where the user clicked)
    //console.log(e);
    const width = this.clientWidth;
    const clickX = e.offsetX;
    console.log('clickX', clickX);

    const {duration } = music;
    //console.log(clickX / width);
    //console.log((clickX / width) * duration);

    music.currentTime = (clickX / width) * duration;

}

// navigate the list of songs prev/next
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

//progress bar event
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setProgressBar);
