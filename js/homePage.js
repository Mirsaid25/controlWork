let url ="http://localhost:3001"

let audio = document.querySelector("audio")
let random_reload = document.querySelector(".random_reload")
let random_reload1 = document.querySelector(".r1")
let random_reload2 = document.querySelector(".r2")

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
let userName = document.querySelector(".name")
let userStatus = document.querySelector(".status")

let resently_listened_arr =[]
// *** Swiper ---------------------

  var swiper = new Swiper(".mySwiper", {
    cssMode: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev"
    },
    pagination: {
      el: ".swiper-pagination",
    },
    mousewheel: true,
    keyboard: true,
  });

//  Swiper *** ---------------------

// *** getUserInfo ----------------

function getUserInfo() {
  axios.get(url + "/" + "userInfo")
    .then(res=>{
      for(let item of res.data){
        userName.innerHTML = item.name
        if (item.premium === true) {
          document.documentElement.style.setProperty('--color', '#EE6F57');
          document.body.style.backgroundImage = "linear-gradient(#59261C ,black,  black, black)"
          userStatus.innerHTML = "Premium User"
        }
      }
    })
}
getUserInfo() 

// getUserInfo *** ----------------

// *** Reload of songs in .list_block -----------


function getData() {
  axios.get(url + "/" + "music")
    .then(res=>{  
      if (res.status === 200 || res.status === 201) { 
        let arr_random =(res.data.map(i=>[Math.random(), i]).sort().map(i=>i[1])).slice(0,10)

        reloadListBlock(arr_random ,random_reload )
        // reloadListBlock(res.data ,random_reload2 )
      }
      let liked_songs_arr =  res.data.filter(item => {
        if(item.like === true){
          return item
        }
      })
      reloadLikedSongs(liked_songs_arr, like_songs_plc)
      reloadListBlock(liked_songs_arr,random_reload1 )
    })
}

getData()

function reloadListBlock(arr, pls) {
  pls.innerHTML = ""
  for(let item of arr){
    let song_block = document.createElement("div")

    let song_block_left = document.createElement("div")
      let span_of_song_block_left = document.createElement("span")
      let img_of_song_block_left = document.createElement("img")
      let name_song = document.createElement("div")
        let name_song_p1 = document.createElement("p")
        let name_song_p2 = document.createElement("p")

    let song_block_right = document.createElement("div")
      let like_heart = document.createElement("img")
      let p_song_block_right = document.createElement("p")
      let three_dots = document.createElement("img")
      let three_dots_modal = document.createElement("div")
        let dislike = document.createElement("div")
          let p_dislike = document.createElement("p")
        let hr1 = document.createElement("hr")
        let add_to_playlist = document.createElement("div")
          let p_add_to_playlist = document.createElement("p")
        let hr2 = document.createElement("hr")
        let listen_now = document.createElement("div")
          let p_listen_now = document.createElement("p")

    // styles
    // *** add classes ------

    song_block.classList.add("song_block")
      song_block_left.classList.add("song_block-left")
        name_song.classList.add("name_song")
      song_block_right.classList.add("song_block-right")
        like_heart.classList.add("like-heart")
        three_dots.classList.add("three-dots")
        three_dots_modal.classList.add("three-dots_modal")
          dislike.classList.add("dislike")
          add_to_playlist.classList.add("add_to_playlist")
          listen_now.classList.add("listen_now")
    // add classes *** ------

    // *** add src ------

    img_of_song_block_left.src = item.img
    img_of_song_block_left.alt = "../assets/music/miyagi_сын.mp3"
  
    if(item.like === false){
      like_heart.src = "../assets/Icons/love.svg"
      like_heart.onclick=()=>{
        axios.patch(url+ "/"+ "music" + "/"+ item.id,{
          like: true
        })
        .catch(err =>console.log(err) )
        getData()
      }
      p_dislike.innerHTML = "LIKE"
      dislike.onclick=()=>{
        axios.patch(url+ "/"+ "music" + "/"+ item.id,{
          like: true
        })
        .catch(err =>console.log(err) )
        getData()
      }
    } else{
      axios.get(url+"/userInfo")
        .then(res=> {
          for(let items of res.data){
            if(items.premium === true){
              like_heart.src = "../assets/Icons/icon-heart-premium.png"
              like_heart.style.height = "30px"
              like_heart.style.width = "30px"
            }else{
              like_heart.src = "../assets/Icons/green_heart.png"
            }
          }
        })
      like_heart.onclick=()=>{
        axios.patch(url+ "/"+ "music" + "/"+ item.id,{
          like: false
        })
        .catch(err =>console.log(err) )
        getData()
      }
      p_dislike.innerHTML = "DISLIKE"
      dislike.onclick=()=>{
        axios.patch(url+ "/"+ "music" + "/"+ item.id,{
          like: false
        })
        .catch(err =>console.log(err) )
        getData()
      }
    }

    like_heart.alt = ""
    three_dots.src = "../assets/Icons/three dots_icon.svg"
    three_dots.alt = ""
    // add src *** ------

    // *** add innerHTML ------

    span_of_song_block_left.innerHTML= item.id
    name_song_p1.innerHTML = item.nameMusic
    name_song_p2.innerHTML = item.artist
    p_song_block_right.innerHTML = item.minutes
    p_add_to_playlist.innerHTML = "ADD TO PLAYLIST"
    p_listen_now.innerHTML = "LISTEN NOW"


    // ADDING ------------
    
    song_block.append(song_block_left, song_block_right)
      song_block_left.append(span_of_song_block_left, img_of_song_block_left, name_song)
        name_song.append(name_song_p1, name_song_p2)
      song_block_right.append(like_heart, p_song_block_right, three_dots, three_dots_modal)
        three_dots_modal.append(dislike,hr1, add_to_playlist,hr2, listen_now)
          dislike.append(p_dislike)
          add_to_playlist.append(p_add_to_playlist)
          listen_now.append(p_listen_now)
    pls.append(song_block)

    // function

    three_dots.onclick=() =>{
      three_dots_modal.style.display = "flex"
    }
    three_dots_modal.onmouseleave=()=>{
        three_dots_modal.style.display = "none"
    }
    
    p_listen_now.onclick=()=>{
      musicPlayer(item)
      three_dots_modal.style.display = "none"
    }
    }
  }


// Reload of songs in .list_block *** -----------

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
  reloadListBlock(resently_listened_arr, random_reload2)
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

let icon_right = document.querySelector(".icon-right")
let icon_left = document.querySelector(".swiper-button-prev")
axios.get(url+ "/music")
.then(res =>{
    icon_right.onclick=()=>{
      musicPlayer(res.data[4]);
    }
    icon_left.onclick=()=>{
      musicPlayer(res.data[3]);
    }
    })



