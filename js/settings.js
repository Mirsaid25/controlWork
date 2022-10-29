let url ="http://localhost:3001"

let audio = document.querySelector("audio")

let like_songs_plc = document.querySelector(".liked_songs")

// *
let audio_time_white = document.querySelector(".audio_time_white")

let music_player_time_song = document.querySelector(".music_player_time_song")

let music_player_name_music = document.querySelector(".music_player_name_music")
let music_player_artist = document.querySelector(".music_player_artist")

let btn_play_music = document.querySelector(".btn_play_music")
let btn_pause_music = document.querySelector(".btn_pause_music")

let track_prev = document.querySelector(".track_next")
let track_next = document.querySelector(".track_prev")

let repet_green_block_black = document.querySelector(".repet_green_block_black")
let repet_green_block = document.querySelector(".repet_green_block")
let repet_green_block_one = document.querySelector(".repet_green_block_one")

let random_btns_black_block = document.querySelector(".random_btns_black_block")
let random_btns_green_block = document.querySelector(".random_btns_green_block")
// *
 
let userName = document.querySelector(".userName")
let userStatus = document.querySelector(".userStatus")


let resently_listened_arr =[]


// *** Reload of songs in .list_block -----------

function getUserInfo() {
  axios.get(url + "/" + "userInfo")
    .then(res=>{
      for(let item of res.data){
        userName.innerHTML = item.name
        if (item.premium === true) {
          document.documentElement.style.setProperty('--color', '#EE6F57');
          document.body.style.backgroundImage = "linear-gradient(#59261C 10%,  black, black)"
          userStatus.innerHTML = "Premium User"
        }
      }
    })
}
getUserInfo() 



function getData() {
  axios.get(url + "/" + "music")
    .then(res=>{
      if (res.status === 200 || res.status === 201) { 
          let liked_songs_arr =  res.data.filter(item => {
            if(item.like === true){
              return item
            }
          })
          reloadLikedSongs(liked_songs_arr, like_songs_plc)
      }
  
    })
}

getData()



// *** Reload of like songs -----------

function reloadLikedSongs(arr , pls) {
  pls.innerHTML = ""
  for(let item of arr){
    let liked_song = document.createElement("div")
    let name_song = document.createElement("p")
    let minutes = document.createElement("p")
    
    liked_song.classList.add("liked_song")
    minutes.classList.add("music_time")

    name_song.innerHTML = item.nameMusic
    minutes.innerHTML = item.minutes

    liked_song.append(name_song, minutes)
    pls.append(liked_song )

    liked_song.onclick=()=>{
      musicPlayer(item)
    }
  }
  // console.log(arr);
}
// Reload of like songs *** -----------






// -------------------------------  *** SEARCH ----------------------------------------

let header_search_block_modal = document.querySelector(".header_search_block_modal")
let search_input = document.querySelector(".search_input")

function getDataSearch(params) {  
    axios.get(url + "/" + "music")
        .then(res => {
            search_input.onkeyup=()=>{
              
              if(search_input.value.length === 0){
                header_search_block_modal.innerHTML = "<p>Введите имя артиста или название песни</p>"
              }else{
                let search_arr = res.data.filter(item=>{
                    if(((item.artist.slice(0, item.artist.trim().indexOf(" ")) + item.artist.slice(item.artist.trim().indexOf(" ")+1)).toLowerCase()).includes(search_input.value.toLowerCase()) ||
                    ((item.nameMusic.slice(0, item.nameMusic.trim().indexOf(" ")) + item.nameMusic.slice(item.nameMusic.trim().indexOf(" ")+1)).toLowerCase()).includes(search_input.value.toLowerCase())){
                      return item
                    }
                })
                reloadSearchBlock(search_arr, header_search_block_modal)    
              }
              
            }
            search_input.onmouseleave=()=>{
              header_search_block_modal.setAttribute("tabIndex", "0")
              header_search_block_modal.focus()
            }
        })
}
search_input.onclick=()=>{
  header_search_block_modal.style.display = "flex"
  getDataSearch()
} 
header_search_block_modal.onblur=()=>{
  header_search_block_modal.style.display = "none"
  search_input.value = ""
}

function reloadSearchBlock(arr, plc) {
    if(arr.length === 0){
      plc.innerHTML = "<p>К сожалению ничего не найденно</p>"
    } else{
      plc.innerHTML = ""
    }
    
    for(let item of arr){
        let music_block_search = document.createElement("div")
        let music_block_search_left = document.createElement("div")
        let name_song_search =document.createElement("p")
        let name_artist_search =document.createElement("p")
        let time_song_search =document.createElement("p")

        music_block_search.classList.add("music_block_search")
        music_block_search_left.classList.add("music_block_search_left")
        name_song_search.classList.add("name_song_search")
        name_artist_search.classList.add("name_artist_search")
        time_song_search.classList.add("time_song_search")

        name_song_search.innerHTML = item.nameMusic
        name_artist_search.innerHTML = item.artist
        time_song_search.innerHTML = item.minutes

        music_block_search.append(music_block_search_left, time_song_search)
        music_block_search_left.append(name_song_search,name_artist_search)
        plc.append(music_block_search)
        // function

        music_block_search.onclick=()=>{
          musicPlayer(item)
          plc.style.display = "none"
        }
    }
}


// ------------------------------- SEARCH ***  ----------------------------------------

// ------------------------------- *** music_player -----------------------------------

function musicPlayer(item) {
  audio.duration
  music_player_artist.innerHTML = item.artist
  music_player_name_music.innerHTML = item.nameMusic
  music_player_time_song.innerHTML = item.minutes

  btn_play_music.style.display = "none"
  btn_pause_music.style.display = "block"
  audio.src = item.src
  audio.play()
  if(resently_listened_arr.filter(item2 => item2.id !== item.id).length === resently_listened_arr.length){
    resently_listened_arr.unshift(item)
  }
  resently_listened_arr = resently_listened_arr.slice(0,10)
  trackNext(item)
  trackPrev(item)
}

function trackNext(item) {
  axios.get(url + "/" + "music")
    .then(res=> {
      if((res.data.length)=== item.id){
        track_next.onclick=()=>{
          musicPlayer(res.data[0])    
        }
      }else{
        track_next.onclick=()=>{
          musicPlayer(res.data[item.id])    
        }
      }
    })
}

function trackPrev(item) {
  axios.get(url + "/" + "music")
    .then(res=> {
      if(1 === item.id){
        track_prev.onclick=()=>{
          musicPlayer(res.data[res.data.length-1])    
        }
      }else{
        track_prev.onclick=()=>{
          musicPlayer(res.data[item.id -2])    
        }
      }
    })
}

btn_pause_music.onclick=()=>{
  btn_play_music.style.display = "block"
  btn_pause_music.style.display = "none"
  audio.pause()
}
btn_play_music.onclick=()=>{
  btn_play_music.style.display = "none"
  btn_pause_music.style.display = "flex"
  audio.play()
}


repet_green_block_black.onclick=()=>{
  repet_green_block_black.style.display  ='none'
  repet_green_block.style.display = "flex"
}
repet_green_block.onclick=()=>{
  repet_green_block.style.display  ='none'
  repet_green_block_one.style.display = "flex"
  
  random_btns_green_block.style.display  ='none'
  random_btns_black_block.style.display = "flex"
}
repet_green_block_one.onclick=()=>{
  repet_green_block_one.style.display  ='none'
  repet_green_block_black.style.display = "flex"
}


random_btns_black_block.onclick=()=>{
  random_btns_black_block.style.display  ='none'
  random_btns_green_block.style.display = "flex"

  repet_green_block_one.style.display  ='none'
  repet_green_block.style.display  ='none'
  repet_green_block_black.style.display = "flex"
}
random_btns_green_block.onclick=()=>{
  random_btns_green_block.style.display  ='none'
  random_btns_black_block.style.display = "flex"
}
// ------------------------------- music_player *** -----------------------------------

//-------------------------------- *** form -------------------------------------------- 
let form = document.forms.form

let toggle_up =document.querySelector(".toggle_up")
let toggle_in_left =document.querySelector(".toggle_in_left")
let toggle_in_right =document.querySelector(".toggle_in_right")

toggle_up.onclick=()=>{
  toggle_in_left.classList.toggle("toggle_in_right")
}
form.onsubmit=(e)=>{
  e.preventDefault()

  let info = {
    id:1,
    premium:false,
  }

  let fm = new FormData(form)
  fm.forEach((value, key)=>{
    info[key]= value
  })

  if (toggle_in_left.classList.length === 2) {
    info.premium = true
  }
  axios.patch(url + "/" + "userInfo/"+ info.id,{
    premium: info.premium,
    name: info.name
  })
  .catch(err=> console.log(err))
    
  location.reload()
}
//-------------------------------- form *** -------------------------------------------- 