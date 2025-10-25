console.log('Lets write JavaScript');
let currentSong = new Audio();
let songs

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

async function getSongs() {
    let a = await fetch("http://127.0.0.1:3000/songs/")
    let response = await a.text();
    let div = document.createElement("div")
    div.innerHTML = response;
    let as = div.getElementsByTagName("a")
    let songs = []
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith(".m4a")) {
            songs.push(element.href.split("/songs/")[0])
        }
    }
    return songs
}
const playMusic = (track, pause=false)=>{
    // let audio = new Audio("/songs/" + track) 
    currentSong.src = "/songs/" + track
    currentSong.play()
    play.src = "pause.svg"
    
    document.querySelector(".songinfo").innerHTML = decodeURI(track)
    document.querySelector(".songtime").innerHTML = "00:00/00:00"
}
async function main() {
    //show all the song in the playlist
    songs = await getSongs()

    let songUL = document.querySelector(".songlist").getElementsByTagName("ul")[0]
    for (const song of songs) {
        songUL.innerHTML = songUL.innerHTML + `<li> <img class="invert" src="music.svg" alt="">
                            <div class="info">
                                <div class="songname">${song.replaceAll("http://127.0.0.1:3000/%5Csongs%5C", " ")}</div>
                                <div class="songartist">Fakhar</div>
                            </div>
                            <div class="playnow">
                                <span>Play now</span>
                                <img class="invert" src="playnow.svg" alt="">
                            </div></li>`;

    }

    Array.from(document.querySelector(".songlist").getElementsByTagName("li")).forEach(e => {
        e.addEventListener("click", element=>{
            console.log(e.querySelector(".info").firstElementChild.innerHTML)
            playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim())

        })
    })
    //Attach an evetn listner to play and pause ,next and previous song
    play.addEventListener("click", ()=>{
        if(currentSong.paused ){
            currentSong.play()
            play.src = "pause.svg"
        }
        else{
            currentSong.pause()
            play.src = "playbutton.svg"
        }
    })
    //list  for timeupdate 
    currentSong.addEventListener("timeupdate", ()=>{
        console.log(currentSong.currentTime, currentSong.duration)
        document.querySelector(".songtime").innerHTML = `${formatTime(currentSong.currentTime)}/${formatTime(currentSong.duration)}`
        document.querySelector(".circle").style.left = (currentSong.currentTime/ currentSong.duration)*100 + "%";
    })

    // add eventlistner for seekbar
    document.querySelector(".seekbar").addEventListener("click", e=>{
        let percent = (e.offsetX/e.target.getBoundingClientRect().width) * 100
        document.querySelector(".circle").style.left = percent +"%"
        currentSong.currentTime = (( currentSong.duration)*percent/100)
    })
    // Add Evenlistenr to humburder
    document.querySelector(".humburger").addEventListener("click", ()=>{
        document.querySelector(".left").style.left = "0"
        
    })
    //Add Eventlistner to closed
    document.querySelector(".close").addEventListener("click", ()=>{
        document.querySelector(".left").style.left = "-140%"
    })

    //add evetnlistener tp previous
    previous.addEventListener("click", ()=>{
        console.log("Previous Clicked")
        console.log(currentSong.src)
        console.log(songs)
    })

    //add evetnlistener tp previous
    next.addEventListener("click", ()=>{
        console.log("Next Clicked")
    })

}

main()