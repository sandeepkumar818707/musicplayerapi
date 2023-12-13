var userinp = document.getElementsByClassName("input")
var songlist = document.querySelector(".list")
var audiotag = document.querySelector(".audio")
var currentsongimg = document.querySelector(".currentsongimg");
var prevBtn = document.getElementById("prevBtn");
var nextBtn = document.getElementById("nextBtn");
var pause = document.getElementById("pause");
var volumebar = document.querySelector(".volumebar");
const playlistItems = document.getElementById("playlist-items");
const addtoPlaylist = document.getElementById("addToPlaylist");
const newPlaylistBtn = document.getElementById("newPlaylist-btn");
const newPlaylist = document.getElementById("newPlaylist");
const playlists=document.getElementById("playlists");

function mainfunction(event) {
  userinp[0].value = event.target.value;
  console.log(userinp[0].value);
  data();
}

function data() {
  songlist.innerHTML = "";
  console.log(userinp[0].value);
  fetch(`https://saavn.me/search/songs?query=${userinp[0].value}`)
    .then(res => (res.json()))
    .then(res => {
      console.log(res);
      const data = res.data.results;
      localStorage.setItem("songs", JSON.stringify(data));
      data.map(finalresult => {
        songlist.innerHTML += `<img src="${finalresult.image[2].link}" name="${finalresult.name}" class="songimageinjs" alt="${finalresult.downloadUrl[4].link}" data-id="${finalresult.id}"/> `;
        var a = document.querySelectorAll(".songimageinjs")
        a.forEach((c) => {
          c.addEventListener("click", (event) => {
            console.log(event);
            audiotag.setAttribute("src", event.target.alt);
            audiotag.setAttribute("data-id", event.target.dataset.id);
            currentsongimg.src = event.target.currentSrc;
          })
        });
      })
    })
}

// prev btn------------------------------------
// prevBtn.addEventListener("click", ()=> {
//   var songImg = document.querySelectorAll(".songimageinjs")
//   const songsUrl=[];
//   for(const iterator of songImg){
//   songsUrl.push({
//     id:iterator.dataset.id,
//     url:iterator.getAttribute("alt"),
//     img:iterator.getAttribute("src")

//   });
//   }
//     const currentSong=audiotag.getAttribute("src");
//     let currIndex = 0;
//     songsUrl.forEach((e,index)=>{
//       if(e.url===currentSong)currIndex=index;
//     })
//   let prevIndex=currIndex-1;
//   if(prevIndex<0)
//   {
//     prevIndex=songsUrl.length-1;
//   }
//   audiotag.setAttribute("src", songsUrl[prevIndex].url);
//   audiotag.setAttribute("data-id",songsUrl[prevIndex].id);
//   currentsongimg.src=songsUrl[prevIndex].img;
//   audiotag.load();
//   audiotag.play();
//   });


// next btn-----------------------------------
// nextBtn.addEventListener("click", ()=> {
//   var songImg = document.querySelectorAll(".songimageinjs")
//   const songsUrl=[];
//   for(const iterator of songImg){
//   songsUrl.push ({
//   id:iterator.dataset.id,
//   url:iterator.getAttribute("alt"),
//   img:iterator.getAttribute("src")
//   });
//   }
//     const currentSong=audiotag.getAttribute("src");
//     let currIndex = 0;
//     songsUrl.forEach((e,index)=>{
//       if(e.url===currentSong)currIndex=index;
//     })
//   let nextIndex =currIndex+1;
//   if(nextIndex>songsUrl.length-1)

//   {
//     nextIndex=0;
//   }
//   audiotag.setAttribute("src", songsUrl[nextIndex].url);
//   audiotag.setAttribute("data-id",songsUrl[nextIndex].id);
//   currentsongimg.src=songsUrl[nextIndex].img;
//   audiotag.load();
//   audiotag.play();
//   });


// pause/play btn--------------------------------

pause.addEventListener("click", () => {
  if (audiotag.paused) {
    audiotag.play()
  }
  else {
    audiotag.pause()
  }
})


// progressbar-------------------------------------------------------------------

const progress = document.getElementById("progress");
audiotag.addEventListener("timeupdate", () => {
  const currentTime = audiotag.currentTime;
  const duration = audiotag.duration;
  const percentage = (currentTime / duration) * 100;
  progress.style.width = percentage + "%";
})




// seeek---------------------------------------------
// const player=document.getElementById("player");
// player.addEventListener("click",(event)=>{
//   console.log(event);
// })




// adding to playlist-----------------------------------
// const addToPlaylist = document.getElementById("addToPlaylist");

// addToPlaylist.addEventListener("click", () => {
//   const playlist = localStorage.getItem("playlist");
//   let newPlaylist;
//   if (!audiotag.dataset.id) return;
//   if (playlist) {
//     newPlaylist = JSON.parse(playlist)
//     if (!newPlaylist.find((e) => e === audiotag.dataset.id))
//       newPlaylist.push(audiotag.dataset.id)
//   }
//   else {
//     newPlaylist = [audiotag.dataset.id]
//   }
//   localStorage.setItem("playlist", JSON.stringify(newPlaylist));
// })


// when mymusic is clicked --we write this --to get playlist --------------------------------------------------
// const myMusic = document.getElementById("myMusic");
// myMusic.addEventListener("click", async () => {
//   let playlist = localStorage.getItem("playlist");
//   if (playlist) {
//     playlist = JSON.parse(playlist);
//   }
//   else {
//     return;
//   }


// to create promise
//   const playlistPromiseArr = playlist.map(async e => {
//     try {
//       const res = await fetch("https://saavn.me/songs?id=" + e);
//       const data = await res.json();
//       return data;
//     } catch (error) {
//       console.log(error);
//     }
//   })
//   let playlistData = await Promise.allSettled(playlistPromiseArr);
//   playlistData = playlistData.map(e => e.value.data[0])
//   console.log(playlistData);
// })



// previous button-----------------------------------------------------------------------
prevBtn.addEventListener("click", () => {
  const songs = JSON.parse(localStorage.getItem("songs"));
  let index = songs.findIndex(e => e.id == audiotag.dataset.id);
  if (index == 0) {
    index = songs.length - 1;
  }
  else {
    index -= 1;
  }
  const newSong = songs[index];
  currentsongimg.src = newSong.image[newSong.image.length - 1].link;
  audiotag.src = newSong.downloadUrl[newSong.downloadUrl.length - 1].link;
  audiotag.dataset.id = newSong.id;
  audiotag.load();
})

// next button--------------------------------------------------------------

nextBtn.addEventListener("click", () => {
  const songs = JSON.parse(localStorage.getItem("songs"));
  let index = songs.findIndex(e => e.id == audiotag.dataset.id);
  if (index == songs.length - 1) {
    index = 0;
  }
  else {
    index += 1;
  }
  const newSong = songs[index];
  currentsongimg.src = newSong.image[newSong.image.length - 1].link;
  audiotag.src = newSong.downloadUrl[newSong.downloadUrl.length - 1].link;
  audiotag.dataset.id = newSong.id;
  audiotag.load();
})


// volume-------------------------------------------------------
function setVolume() {
  audiotag.volume = volumebar.value / 100;
}


// playlist---------------------------------------------------------
const playListsArr=[];

addtoPlaylist.addEventListener("click", () => {
  playlists.classList.toggle("hide")
})

newPlaylistBtn.addEventListener("click", () => {
  const playlistName = newPlaylist.value;
  playListsArr.push({
    id: Math.random().toString(32).slice(2),
    name: playlistName,
    songs: [
      audiotag.dataset.id
    ]
  })
  renderPlaylist()

})
const renderPlaylist = () => {
  let playlistText = ""
  playListsArr.forEach(e => {
    playlistText += `<button class="playList-item" id="${e.id}">${e.name}</button>`
  })
  playlistItems.innerHTML = playlistText;
}
const myMusic = document.getElementById("myMusic");
myMusic.addEventListener("click", async () => {
  let playlist = localStorage.getItem("playlist");
  if (playlist) {
    playlist = JSON.parse(playlist);

  }
  else {
    return;
  }
  const playlistPromiseArr = playlist.map(async e => {
    try {
      const res = await fetch("" + e);
      const data = res.json();
      return data;
    }
    catch (error) {
      console.log(error);
    }
  })
  let playlistData = await Promise.allSettled(playlistPromiseArr);
  playlistData = playlistData.map(e => e.value.data[0])
  console.log(playlistData);
  renderHTML(playlistData)
})
 