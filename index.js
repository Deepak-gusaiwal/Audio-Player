console.log('Audio player');
let songs = [
    {name:'kacha-Badam',path:'songs/kacha badam New Viral Full .mp3',artist:'artist1',cover:'coverImages/badam.jpg'},
    {name:'Belanchi',path:'songs/Bilanchi Chi Nagin Nighali  Johnny Leve.mp3',artist:'artist1',cover:'coverImages/belenchi.jpeg'},
    {name:'harry porter',path:'songs/Harry Potter.mp3',artist:'artist1',cover:'coverImages/harry porter.jpg'},
    {name:'Hello World',path:'songs/Hello World.mp3',artist:'Alan Walker',cover:'coverImages/alanwalker.jpg'},
    {name:'Lion Heart',path:'songs/Lion Heart.mp3',artist:'Kshmr',cover:'coverImages/lionheart.jpg'}
];

let carouselImg =document.querySelectorAll('.homeSection img');
let carouselImgIndex=0;
// function to change carousel Image
function changeCarouselImage(){
    carouselImg[carouselImgIndex].classList.toggle('active');
    if(carouselImgIndex>=carouselImg.length-1){
        carouselImgIndex=0;
    }else{
        carouselImgIndex++;
    }
    carouselImg[carouselImgIndex].classList.add('active');
}
setInterval(() => {
    changeCarouselImage();
}, 3000);

// / *********Navigation *****************/

/////////////////////////////toggling music player 
let musicPlayerSection = document.querySelector('.music-player-section');
let clickCount = 1;
musicPlayerSection.addEventListener('click',()=>{
    if(clickCount>=2){
        musicPlayerSection.classList.add('active');
        clickCount = 1;
    }
    clickCount ++;
    setTimeout(() => {
        clickCount = 1;
    }, 250);
});

// BackFromMusicPlayer
let backToHomeBtn = document.querySelector('.music-player-section .back-btn');
backToHomeBtn.addEventListener('click',()=>{
    musicPlayerSection.classList.remove('active');
});

// Access Playlist
let playlistsection = document.querySelector('.playlist');
let navBtn = document.querySelector('.music-player-section .nav-btn');
navBtn.addEventListener('click',()=>{
    playlistsection.classList.add('active');
});

// populate playlistsection;
let html = `<span class="back-btn icon hide fa-solid fa-angle-left"></span>
<div class="top-box">
<h1 class="title">Playlist</h1> <input type="search" name="" id="search" placeholder="search song name here"> </div>`
songs.forEach((element)=>{
 html+=`<div class="queue">
 <div class="queue-cover">
     <img src="${element.cover}" alt="">
     <i class="fas fa-pause"></i>
 </div>
 <div class='contantHolder'>
 <p class="name">${element.name}</p>
 <p>${element.artist}</p>
 </div>
</div>
 `
});
playlistsection.innerHTML = html;

let backToMusicPlayer = document.querySelector('.playlist .back-btn');
backToMusicPlayer.addEventListener('click',()=>{
    playlistsection.classList.remove('active');
});

// recently played song section
let flexBox = document.querySelector('.flex-box');
// populate playlistsection;
let html2 = ``
songs.forEach((element)=>{
 html2+=`<div class="image-box">
 <img src="${element.cover}" alt="">
 <p>${element.name}</p>
 <div class='play-icon'></div>
</div>
 `
});
flexBox.innerHTML = html2;



// ***********Navigation Done ************

// targating all variables
let currentMusic = 0;
let music = new Audio('./songs/1.mp3')
let seekBar = document.querySelector('.music-seek-bar');
let SongName = document.querySelector('.current-song-name');
let artistName = document.querySelector('.artist-name');
let coverImage = document.querySelector('.cover');
let currentMusicTime = document.querySelector('.current-time');
let musicDuration = document.querySelector('.duration');
let queue = [...document.querySelectorAll('.queue')];
let ItemBox = [...document.querySelectorAll('.image-box')];
// select all control btns here;
let forwardBtn = document.querySelector('i.fa-forward');
let backwardBtn = document.querySelector('i.fa-backward');
let playBtn = document.querySelector('i.fa-play');
let pauseBtn = document.querySelector('i.fa-pause');
let repeatBtn = document.querySelector('span.fa-redo');
let volumeBtn = document.querySelector('span.fa-volume-up');
let volumeSlider = document.querySelector('.volume-slider');
let volumeNo = document.querySelector('.volumeNo');


playBtn.addEventListener('click',()=>{
    playBtn.classList.remove('active');
    pauseBtn.classList.add('active');
    music.play();
});
pauseBtn.addEventListener('click',()=>{
    pauseBtn.classList.remove('active');
    playBtn.classList.add('active');
    music.pause();
});

// setting up music
function setupMusic(i){
    seekBar.value = 0;
    currentMusicIndex = i;
    currentSong = songs[i];
    music.src = currentSong.path;
    coverImage.src = currentSong.cover;
    SongName.innerHTML = currentSong.name;
    artistName.innerHTML = currentSong.artist;
    setInterval(() => {
        musicDuration.innerHTML = formatTime(music.duration)
        seekBar.max= music.duration;
        volumeNo.innerHTML = volumeSlider.value *100+'%'
        if(volumeSlider.value *100 == 100){
            volumeNo.innerHTML= 'full'
        }

    }, 300);
    //for play list
    queue.forEach((element)=>{
        element.classList.remove('active');
    });
    queue[currentMusicIndex].classList.add('active');
    //for recently played songs
    ItemBox.forEach((element)=>{
        element.classList.remove('active');
    });
    ItemBox[currentMusicIndex].classList.add('active');
}

setupMusic(0);
// format duration in 00:00 format
function formatTime(time){
    let min = Math.floor(time/60);
    if(min<10){
        min = '0'+min;
    }
    let sec = Math.floor(time%60);
    if(sec<10){
        sec = '0'+sec;
    }
    return `${min}:${sec}`;
}
// seekbarevents
setInterval(() => {
    seekBar.value = music.currentTime;
    currentMusicTime.innerHTML = formatTime(music.currentTime);
    if(Math.floor(music.currentTime)==Math.floor(seekBar.max)){
        if(repeatBtn.className.includes('active')){
            setupMusic(currentMusicIndex);
            playBtn.click();
        }else{
            forwardBtn.click();
        }
    }
}, 500);

seekBar.addEventListener('change',()=>{
    music.currentTime = seekBar.value;
    
});

// playList
queue.forEach((songitem,index)=>{
    songitem.addEventListener('click',()=>{
        setupMusic(index);
        playBtn.click();
        search.value = '';
        queue.forEach((element)=>{
            element.style.display = 'flex';
        });
    });
})
// recentlyPlayedLIst
ItemBox.forEach((recentBox,index)=>{
    recentBox.addEventListener('click',()=>{
        setupMusic(index);
        playBtn.click();
        recentBox.classList.add('active');
    });
})
// change music
volumeSlider.addEventListener('change',()=>{
    music.volume =volumeSlider.value;
    volumeNo.innerHTML = volumeSlider.value *100+'%'
})




// forwardBtn
forwardBtn.addEventListener('click',()=>{
    if(currentMusicIndex>= songs.length-1){
        currentMusicIndex = 0;
    }else{
        currentMusicIndex++
    }
    setupMusic(currentMusicIndex);
    playBtn.click();
});
// backwardbtn
backwardBtn.addEventListener('click',()=>{
    if(currentMusicIndex<=0){
        currentMusicIndex = songs.length-1
    }else{
        currentMusicIndex--
    }
    setupMusic(currentMusicIndex);
    playBtn.click();
});
repeatBtn.addEventListener('click',()=>{
    repeatBtn.classList.toggle('active');
});
volumeBtn.addEventListener('click',()=>{
    volumeBtn.classList.toggle('active');
    volumeSlider.classList.toggle('active');
    volumeNo.classList.toggle('active');
});
volumeNo.addEventListener('click',()=>{
    volumeBtn.classList.toggle('active');
    volumeSlider.classList.toggle('active');
    volumeNo.classList.toggle('active');
});



// search functionality
search.addEventListener('keyup',()=>{
    let searchval = search.value.toUpperCase();
    queue.forEach((element)=>{
      let SongName =  element.querySelector('.contantHolder .name').textContent.toUpperCase();
        if(SongName.includes(searchval)){
            element.style.display = '';
        }else{
            element.style.display = 'none'
        }
    });
})