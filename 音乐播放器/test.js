var e = function(selector){
  return document.querySelector(selector)
}

var log = function(){
  console.log.apply(console,arguments)
}

//音乐盒这么个对象，包含播放器本体，歌曲目录，创建播放器，播放，暂停。。。。。
var musicBox= {

    musicDom : null, //播放器对象
    songs : [],        //歌曲目录，用数组来存储
    currentIndex : 0,
    //初始化音乐盒
    init : function(){
        this.musicDom = document.createElement('audio');
    },

    //添加一首音乐
    // 能否做一个添加音乐的功能？？？就是给用户一个按钮，
    // 点击可以上传歌曲到资源文件夹，完成添加操作？？？？
    add : function(src){
      src = 'media/' + src;
      this.songs.push(src);
    },
    //根据数组下标决定播放哪一首歌
    play : function(index){
        this.musicDom.src = this.songs[index];
        this.musicDom.play();
    },

    //暂停音乐
    stop : function(){
        this.musicDom.pause();
    },

    //下一首（待编写）
    next : function(){
      this.currentIndex++
      // log('当前index：' + index)
      // log('下一首index：' + index)
      // log('歌曲长度：' + musicBox.songs.length)
      if(this.currentIndex >= musicBox.songs.length){
        this.currentIndex = 0;
      }
      musicBox.play(this.currentIndex)
    },
    //上一首（待编写）
    prev : function(){
      this.currentIndex--
      if(this.currentIndex < 0 ){
        this.currentIndex = musicBox.songs.length - 1;
      }
      musicBox.play(this.currentIndex)
     
    }
}



var play = e('.icon-play')
var pause = e('.icon-pause')
var flag = false//是否从头开始
var logo = e('#logo')

musicBox.init()
musicBox.add('诚如神之所说.mp3')
musicBox.add('小姐.mp3')
// musicBox.musicDom.loop = 'loop'
//开始的时候设置图标静止
logo.classList.add('logo-pause')


play.addEventListener('click',function(){
  //图标的转动
  logo.classList.remove('logo-pause')
  logo.classList.add('logo-play')

  play.classList.add('icon-hide')
  pause.classList.remove('icon-hide')
  if(flag == false){
    musicBox.play(musicBox.currentIndex)
    flag = true
  } else{
    musicBox.musicDom.play()
  }
})

pause.addEventListener('click',function(){
  logo.classList.remove('logo-play')
  logo.classList.add('logo-pause')

  play.classList.remove('icon-hide')
  pause.classList.add('icon-hide')
  musicBox.musicDom.pause()

})

//歌曲切换
var next = e('.icon-next')
next.addEventListener('click',function(){
  // log('下一首歌曲')
  musicBox.next()
  play.classList.add('icon-hide')
  pause.classList.remove('icon-hide')
  logo.style.transform = 'rotate(0deg)'
  


})

var back = e('.icon-back')
back.addEventListener('click',function(){
  // log('前一首歌曲')
  musicBox.prev()
  play.classList.add('icon-hide')
  pause.classList.remove('icon-hide')
})




var max_audio = e('.icon-volume-up')
var min_audio = e('.icon-volume-down')
var volume_bar = e('.jp-volume-bar')
var volume_level = e('.volume-level')
var volume_progress = e('.volume-progress')
volume_bar.style.width = '100%'


max_audio.addEventListener('click',function(){
  musicBox.musicDom.volume = 1
  volume_bar.style.width = '100%'
})

min_audio.addEventListener('click',function(){
  musicBox.musicDom.volume = 0
  volume_bar.style.width = '0'
})




var audio =musicBox.musicDom

var bar = e('.jp-play-bar')
bar.style.width = '0px'
// log('设置bar')

audio.ontimeupdate = function(){myFunction()}
var myFunction = function()
{
  // 当前歌曲播放时间
  currentTime = audio.currentTime
  // log(currentTime)
  // 歌曲总周期，也就是歌曲时长
  duration = audio.duration
  if(currentTime == duration) {
    musicBox.next()
  }
  // log(duration)
  left = ''
  right = ''
  minute = parseInt(currentTime / 60)
  if(minute < 0){
    left = '00:'
  } else if (0 <= minute < 10) {
    left = '0' + String(minute) + ':'
  } else{
    left = String(minute)
  }

  second = parseInt(currentTime % 60)
  if(second < 10 ){
    right = '0' + String(second)
  } else {
    right = String(second)
  }
  e('.current').innerHTML = left + right

  perc = (currentTime/duration) * 100


  bar.style.width = '' + perc + '%'

}


//歌曲进度条的鼠标控制
var progress = e('.progress')
progress.addEventListener('click',function(event){
  x = event.pageX
  left_page = e('.music-player').offsetLeft
  // log(left_page)
  x = x - left_page
  all = e('.progress').offsetWidth
  perc = x / all
  duration = audio.duration
  audio.currentTime = perc * duration
})


//音量条的鼠标控制
var volume_progress = e('.volume-progress')
volume_progress.addEventListener('click',function(event){
  x = event.pageX
  log('点击横坐标：' + x)
  left_page = e('.volume-progress').offsetLeft + e('.music-player').offsetLeft
  log("left_page:" + left_page)
  bar_len = e('.volume-progress').offsetWidth
  x = x - left_page
  perc = x / bar_len
  
  musicBox.musicDom.volume = perc
  var bar =e('.jp-volume-bar')
  bar.style.width = perc*100 + '%'
})

