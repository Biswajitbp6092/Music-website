const music = new Audio ('audio/1.mp3');

const songs = [
    { id: '1', songName: `On My Way <br><div class="subtitle">Alan Walker</div>`, poster: 'img/1.jpg' },
    { id: '2', songName: `Song Title <br><div class="subtitle">subtitle here</div>`, poster: 'img/2.jpg' },
    { id: '3', songName: `Song Title <br><div class="subtitle">subtitle here</div>`, poster: 'img/3.jpg' },
    { id: '4', songName: `Song Title <br><div class="subtitle">subtitle here</div>`, poster: 'img/4.jpg' },
    { id: '5', songName: `Song Title <br><div class="subtitle">subtitle here</div>`, poster: 'img/5.jpg' },
    { id: '6', songName: `Song Title <br><div class="subtitle">subtitle here</div>`, poster: 'img/6.jpg' },
    { id: '7', songName: `Song Title <br><div class="subtitle">subtitle here</div>`, poster: 'img/7.jpg' },
    { id: '8', songName: `Song Title <br><div class="subtitle">subtitle here</div>`, poster: 'img/8.jpg' },
    { id: '9', songName: `Song Title <br><div class="subtitle">subtitle here</div>`, poster: 'img/9.jpg' },
    { id: '10', songName: `Song Title <br><div class="subtitle">subtitle here</div>`, poster: 'img/10.jpg' },
    { id: '11', songName: `Song Title <br><div class="subtitle">subtitle here</div>`, poster: 'img/11.jpg' },
    { id: '12', songName: `Song Title <br><div class="subtitle">subtitle here</div>`, poster: 'img/12.jpg' },
    { id: '13', songName: `Song Title <br><div class="subtitle">subtitle here</div>`, poster: 'img/13.jpg' },
    { id: '14', songName: `Song Title <br><div class="subtitle">subtitle here</div>`, poster: 'img/14.jpg' },
    { id: '15', songName: `Song Title <br><div class="subtitle">subtitle here</div>`, poster: 'img/15.jpg' },
];

Array.from(document.getElementsByClassName('songItem')).forEach((element, i) => {
    if(songs[i]){ 
        element.getElementsByTagName('img')[0].src = songs[i].poster;
        element.getElementsByTagName('h5')[0].innerHTML = songs[i].songName;
    }
});

let masterPlay = document.getElementById('masterPlay');
let wave = document.getElementsByClassName('wave')[0];



masterPlay.addEventListener('click',()=>{
    if(music.paused || music.currentTime <=0){
        music.play();
        masterPlay.classList.remove('bi-play-fill');
        masterPlay.classList.add('bi-pause-fill');
        wave.classList.add('active2');
    }else{
        music.pause();
        masterPlay.classList.add('bi-play-fill');
        masterPlay.classList.remove('bi-pause-fill');
        wave.classList.remove('active2');
    }
})

const makeAllPlays = () =>{
    Array.from(document.getElementsByClassName('playlistplay')).forEach((element)=>{
            element.classList.add('bi-play-circle-fill');
            element.classList.remove('bi-pause-circle-fill');
    })

}
const makeAllBackgrounds = () =>{
    Array.from(document.getElementsByClassName('songItem')).forEach((element)=>{
            element.style.background = "rgb(105, 105, 170, 0)";
    })

}

let index = 0;
let poster_master_play = document.getElementById ('poster_master_play');
let title = document.getElementById ('title');
Array.from(document.getElementsByClassName('playlistplay')).forEach((element)=>{
    element.addEventListener('click',(e)=>{
        index = e.target.id;
        makeAllPlays();
        e.target.classList.remove('bi-play-circle-fill');
        e.target.classList.add('bi-pause-circle-fill');        
        music.src = `audio/${index}.mp3`;
        poster_master_play.src = `img/${index}.jpg`;
        music.play();
        let song_title =songs.filter((ele)=>{
            return ele.id == index;
        })

        song_title.forEach(ele =>{
            let {songName} = ele;
            title.innerHTML = songName;
        })
        masterPlay.classList.remove('bi-play-fill');
        masterPlay.classList.add('bi-pause-fill');
        wave.classList.add('active2');

        music.addEventListener('ended',()=>{
            masterPlay.classList.add('bi-play-fill');
            masterPlay.classList.remove('bi-pause-fill');
            wave.classList.remove('active2');
        })
        makeAllBackgrounds();
        Array.from(document.getElementsByClassName('songItem'))[`${index-1}`].style.background ="rgb(105, 105, 170, .1}";

    })
    
})

let currentStrat = document.getElementById('currentStrat');
let currentEnd = document.getElementById('currentEnd');
let seek = document.getElementById('seek');
let bar2 = document.getElementById('bar2');
let dot = document.getElementsByClassName('dot')[0];

music.addEventListener('timeupdate', () => {
    let music_curr = music.currentTime;
    let music_dur = music.duration;

    // Format end time (MM:SS)
    let minEnd = Math.floor(music_dur / 60);
    let secEnd = Math.floor(music_dur % 60);
    if (secEnd < 10) {
        secEnd = `0${secEnd}`;
    }
    currentEnd.innerText = `${minEnd}:${secEnd}`;

    // Format current time (MM:SS)
    let minCurr = Math.floor(music_curr / 60);
    let secCurr = Math.floor(music_curr % 60);
    if (secCurr < 10) {
        secCurr = `0${secCurr}`;
    }
    currentStrat.innerText = `${minCurr}:${secCurr}`;



    let progressbar = parseInt((music.currentTime/music.duration)*100);
    seek.value = progressbar;
    let seekbar = seek.value;
    bar2.style.width =`${seekbar}%`;
    dot.style.left =`${seekbar}%`;
});
seek.addEventListener('change',()=>{
    music.currentTime = seek.value*music.duration/100;
})

music.addEventListener('ended',()=>{
    masterPlay.classList.add('bi-play-fill');
    masterPlay.classList.remove('bi-pause-fill');
    wave.classList.remove('active2');    

})
let vol_icon = document.getElementById('vol_icon');
let vol = document.getElementById('vol');
let vol_dot = document.getElementById('vol_dot');
let vol_bar = document.getElementsByClassName('vol_bar')[0];

vol.addEventListener('change',()=>{
    if(vol.value == 0){
        vol_icon.classList.remove('bi-volume-down-fill');
        vol_icon.classList.add('bi-volume-mute-fill');
        vol_icon.classList.remove('bi-volume-up-fill');
    }
    if(vol.value > 0){
        vol_icon.classList.add('bi-volume-down-fill');
        vol_icon.classList.remove('bi-volume-mute-fill');
        vol_icon.classList.remove('bi-volume-up-fill');
    }
    if(vol.value > 50){
        vol_icon.classList.remove('bi-volume-down-fill');
        vol_icon.classList.remove('bi-volume-mute-fill');
        vol_icon.classList.add('bi-volume-up-fill');
    }

    let vol_a = vol.value;
    vol_bar.style.width =`${vol_a}%`;
    vol_dot.style.left =`${vol_a}%`;
    music.volume = vol_a/100;

})


let back = document.getElementById('back');
let next = document.getElementById('next');


back.addEventListener('click',()=>{
    index -= 1;
    if(index < 1){
        index = Array.from(document.getElementsByClassName('songItem')).length;

    }
    music.src = `audio/${index}.mp3`;
    poster_master_play.src = `img/${index}.jpg`;
    music.play();
    let song_title =songs.filter((ele)=>{
        return ele.id == index;
    })

    song_title.forEach(ele =>{
        let {songName} = ele;
        title.innerHTML = songName;
    })
    makeAllPlays()
    document.getElementById(`${index}`).classList.remove('bi-play-fill');
    document.getElementById(`${index}`).classList.add('bi-pause-fill');
    makeAllBackgrounds();
    Array.from(document.getElementsByClassName('songItem'))[`${index-1}`].style.background ="rgb(105, 105, 170, .1}";
})

next.addEventListener('click',()=>{
    index -= 0;
    index += 1;
    if(index > Array.from(document.getElementsByClassName('songItem')).length){
        index = 1;
    }
    music.src = `audio/${index}.mp3`;
    poster_master_play.src = `img/${index}.jpg`;
    music.play();
    let song_title =songs.filter((ele)=>{
        return ele.id == index;
    })

    song_title.forEach(ele =>{
        let {songName} = ele;
        title.innerHTML = songName;
    })
    makeAllPlays()
    document.getElementById(`${index}`).classList.remove('bi-play-fill');
    document.getElementById(`${index}`).classList.add('bi-pause-fill');
    makeAllBackgrounds();
    Array.from(document.getElementsByClassName('songItem'))[`${index-1}`].style.background ="rgb(105, 105, 170, .1}";
})

let left_scrol = document.getElementById('left_scrol');
let right_scrol = document.getElementById('right_scrol');
let pop_song =document.getElementsByClassName('pop_song')[0];

left_scrol.addEventListener('click',()=>{
    pop_song.scrollLeft-=400;
})
right_scrol.addEventListener('click',()=>{
    pop_song.scrollLeft+=400;
})


let left_scrols = document.getElementById('left-scrols');
let right_scrols = document.getElementById('right-scrols');
let item =document.getElementsByClassName('item')[0];

left_scrols.addEventListener('click',()=>{
    item.scrollLeft-=400;
})
right_scrols.addEventListener('click',()=>{
    item.scrollLeft+=400;
})