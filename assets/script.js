const homePage = document.getElementById('homePage');
const songDetailPage = document.getElementById('songDetailPage');
const playerPage = document.getElementById('playerPage');
const songListElement = document.getElementById('songList');
const backToHomeFromDetailBtn = document.getElementById('backToHomeFromDetailBtn');
const backToHomeBtn = document.getElementById('backToHomeBtn');
const bodyElement = document.body;
const backgroundVideoContainer = document.querySelector('.video-background-container');
const backgroundVideo = document.getElementById('backgroundVideo');
const detailAlbumArt = document.getElementById('detailAlbumArt');
const detailTrackTitle = document.getElementById('detailTrackTitle');
const detailTrackArtist = document.getElementById('detailTrackArtist');
const detailAlbumName = document.getElementById('detailAlbumName');
const playFromDetailBtn = document.getElementById('playFromDetailBtn');
const audioPlayer = document.getElementById('audioPlayer');
const albumArtPlayer = document.getElementById('albumArt');
const playerTrackTitle = document.getElementById('playerTrackTitle');
const playerTrackArtist = document.getElementById('playerTrackArtist');
const lyricsContainer = document.getElementById('lyricsContainer');
const playerProgressBarContainer = document.getElementById('playerProgressBarContainer');
const playerProgressBar = document.getElementById('playerProgressBar');
const playerCurrentTime = document.getElementById('playerCurrentTime');
const playerTotalDuration = document.getElementById('playerTotalDuration');
const playerPrevBtn = document.getElementById('playerPrevBtn');
const playerPlayPauseBtn = document.getElementById('playerPlayPauseBtn');
const playerNextBtn = document.getElementById('playerNextBtn');
const playerRepeatBtn = document.getElementById('playerRepeatBtn');
const playerShuffleBtn = document.getElementById('playerShuffleBtn');
const playerVolumeSlider = document.getElementById('playerVolumeSlider');
const playerSpeedSlider = document.getElementById('playerSpeedSlider');
const currentSpeedDisplay = document.getElementById('currentSpeedDisplay');
let currentSongIndex = 0;
let isPlaying = false;
let isShuffle = false;
let repeatMode = 0;
function showHomePage() {
  playerPage.classList.remove('active');
  songDetailPage.classList.remove('active');
  homePage.classList.add('active');
  bodyElement.classList.remove('player-active-bg');
  bodyElement.classList.remove('detail-active-bg');
  backgroundVideoContainer.classList.remove('active');
  backgroundVideo.pause();
  backgroundVideo.src = "";
  backgroundVideo.load();
  pauseTrack();
}
function showSongDetailPage(song) {
  homePage.classList.remove('active');
  playerPage.classList.remove('active');
  songDetailPage.classList.add('active');
  detailAlbumArt.src = song.albumArtUrl;
  detailTrackTitle.textContent = song.title;
  detailTrackArtist.textContent = song.artist;
  detailAlbumName.textContent = song.album || "Unknown Album";
  bodyElement.classList.remove('player-active-bg');
  bodyElement.classList.add('detail-active-bg');
  backgroundVideoContainer.classList.remove('active');
  backgroundVideo.pause();
  backgroundVideo.src = "";
  backgroundVideo.load();
}
function showPlayerPage() {
  homePage.classList.remove('active');
  songDetailPage.classList.remove('active');
  playerPage.classList.add('active');
  bodyElement.classList.remove('detail-active-bg');
  bodyElement.classList.add('player-active-bg');
  backgroundVideoContainer.classList.add('active');
  const currentSong = songs[currentSongIndex];
  if (currentSong && currentSong.videoBgSrc) {
    backgroundVideo.src = currentSong.videoBgSrc;
    backgroundVideo.load();
    backgroundVideo.play().catch(e => console.error("Error playing video background:", e));
  } else {
    backgroundVideo.src = "";
    backgroundVideo.load();
  }
}
function renderSongList() {
  songListElement.innerHTML = '';
  if (songs.length === 0) {
    songListElement.innerHTML = '<li class="loading-songs">No song available.</li>';
    return;
  }
  songs.forEach((song, index) => {
    const listItem = document.createElement('li');
    listItem.setAttribute('data-id', song.id);
    listItem.innerHTML = `
    <img src="${song.albumArtUrl}" alt="${song.title}" class="song-art-list">
    <div class="song-info-list">
      <h3>${song.title}</h3>
      <p>${song.artist}</p>
    </div>
    `;
    listItem.addEventListener('click', () => {
      currentSongIndex = index;
      loadSong(songs[currentSongIndex]);
      playTrack();
      showPlayerPage();
    });
    listItem.addEventListener('mouseenter', () => {
      if (homePage.classList.contains('active') && song.videoBgSrc) {
        backgroundVideo.src = song.videoBgSrc;
        backgroundVideo.load();
        backgroundVideoContainer.classList.add('active');
        backgroundVideo.play().catch(e => console.error("Error playing video on hover:", e));
        bodyElement.classList.add('player-active-bg');
      }
    });
    listItem.addEventListener('mouseleave', () => {
      if (homePage.classList.contains('active')) {
        backgroundVideoContainer.classList.remove('active');
        backgroundVideo.pause();
        backgroundVideo.src = "";
        backgroundVideo.load();
        bodyElement.classList.remove('player-active-bg');
      }
    });
    songListElement.appendChild(listItem);
  });
}
function loadSong(song) {
  if (!song) {
    console.error("The song is not found!");
    albumArtPlayer.src = "https://placehold.co/100x100/3a3a4e/e0e0e0?text=Error";
    playerTrackTitle.textContent = "Song Unavailable";
    playerTrackArtist.textContent = "-";
    lyricsContainer.innerHTML = "<p>Lyrics not found.</p>";
    audioPlayer.src = "";
    playerCurrentTime.textContent = "0:00";
    playerTotalDuration.textContent = "0:00";
    playerProgressBar.style.width = "0%";
    return;
  }
  albumArtPlayer.src = song.albumArtUrl;
  playerTrackTitle.textContent = song.title;
  playerTrackArtist.textContent = song.artist;
  renderLyrics(song.lyrics);
  audioPlayer.src = song.audioSrc;
  audioPlayer.onloadedmetadata = () => {
    playerTotalDuration.textContent = formatTime(audioPlayer.duration);
  };
  audioPlayer.load();
  updatePlayPauseIcon();
}
function renderLyrics(lyrics) {
  lyricsContainer.innerHTML = '';
  if (!lyrics || lyrics.length === 0) {
    lyricsContainer.innerHTML = "<p>Lyrics is not available in this song.</p>";
    return;
  }
  lyrics.forEach(line => {
    const span = document.createElement('span');
    span.textContent = line.text;
    span.setAttribute('data-time', line.time);
    span.classList.add('lyric-line');
    lyricsContainer.appendChild(span);
  });
}
function playTrack() {
  if (!audioPlayer.src || audioPlayer.src === window.location.href) {
    if (songs.length > 0) {
      loadSong(songs[currentSongIndex]);
    } else {
      console.log("No songs to be played.");
      return;
    }
  }
  isPlaying = true;
  audioPlayer.play().catch(error => console.error("Error during the play:", error));
  updatePlayPauseIcon();
}
function pauseTrack() {
  isPlaying = false;
  audioPlayer.pause();
  updatePlayPauseIcon();
}
function updatePlayPauseIcon() {
  if (isPlaying) {
    playerPlayPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
  } else {
    playerPlayPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
  }
}
function prevTrack() {
  if (songs.length === 0) return;
  if (isShuffle) {
    playRandomTrack();
  } else {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  }
  loadSong(songs[currentSongIndex]);
  playTrack();
  showPlayerPage();
}
function nextTrackLogic() {
  if (songs.length === 0) return;
  if (isShuffle) {
    playRandomTrack();
  } else {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
  }
  loadSong(songs[currentSongIndex]);
  playTrack();
  showPlayerPage();
}
function nextTrack() {
  if (songs.length === 0) return;
  if (repeatMode === 1 && audioPlayer.ended) {
    
  } else if (isShuffle) {
    playRandomTrack();
  } else {
    currentSongIndex++;
    if (currentSongIndex >= songs.length) {
      if (repeatMode === 2) {
        currentSongIndex = 0;
      } else {
        currentSongIndex = songs.length - 1;
        loadSong(songs[currentSongIndex]);
        pauseTrack();
        audioPlayer.currentTime = audioPlayer.duration;
        return;
      }
    }
    loadSong(songs[currentSongIndex]);
    playTrack();
  }
  showPlayerPage();
}
function playRandomTrack() {
  if (songs.length <= 1) {
    currentSongIndex = 0;
  } else {
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * songs.length);
    } while (randomIndex === currentSongIndex);
    currentSongIndex = randomIndex;
  }
  loadSong(songs[currentSongIndex]);
  playTrack();
  showPlayerPage();
}
audioPlayer.addEventListener('timeupdate', () => {
  if (audioPlayer.duration) {
    const progressPercent = (audioPlayer.currentTime / audioPlayer.duration) * 100;
    playerProgressBar.style.width = `${progressPercent}%`;
    playerCurrentTime.textContent = formatTime(audioPlayer.currentTime);
    const currentTime = audioPlayer.currentTime;
    const lyricLines = lyricsContainer.querySelectorAll('.lyric-line');
    let highlightedLine = null;
    lyricLines.forEach((line, index) => {
      const lineTime = parseFloat(line.getAttribute('data-time'));
      let nextLineTime = Infinity;
      if (index + 1 < lyricLines.length) {
        nextLineTime = parseFloat(lyricLines[index + 1].getAttribute('data-time'));
      }
      if (currentTime >= lineTime && currentTime < nextLineTime) {
        line.classList.add('highlight');
        highlightedLine = line;
      } else {
        line.classList.remove('highlight');
      }
    });
    if (highlightedLine) {
      const containerRect = lyricsContainer.getBoundingClientRect();
      const lineRect = highlightedLine.getBoundingClientRect();
      const isOutsideTop = lineRect.top < containerRect.top;
      const isOutsideBottom = lineRect.bottom > containerRect.bottom;
      if (isOutsideTop || isOutsideBottom) {
        highlightedLine.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }
  }
});
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}
playerProgressBarContainer.addEventListener('click', (e) => {
  if (!audioPlayer.duration || songs.length === 0) return;
  const width = playerProgressBarContainer.clientWidth;
  const clickX = e.offsetX;
  audioPlayer.currentTime = (clickX / width) * audioPlayer.duration;
});
playerVolumeSlider.addEventListener('input', (e) => {
  audioPlayer.volume = e.target.value;
});
playerSpeedSlider.addEventListener('input', (e) => {
  audioPlayer.playbackRate = parseFloat(e.target.value);
  currentSpeedDisplay.textContent = `${audioPlayer.playbackRate.toFixed(2)}x`;
});
playerShuffleBtn.addEventListener('click', () => {
  isShuffle = !isShuffle;
  playerShuffleBtn.classList.toggle('active-feature', isShuffle);
  console.log("Shuffle: " + isShuffle);
});
playerRepeatBtn.addEventListener('click', () => {
  repeatMode = (repeatMode + 1) % 3;
  updateRepeatButtonUI();
  console.log("Repeat Mode: " + repeatMode);
});
function updateRepeatButtonUI() {
  playerRepeatBtn.classList.remove('active-feature');
  audioPlayer.loop = false;
  if (repeatMode === 0) {
    playerRepeatBtn.innerHTML = '<i class="fas fa-repeat"></i>';
  } else if (repeatMode === 1) {
    playerRepeatBtn.innerHTML = '<i class="fas fa-repeat-1"></i>';
    playerRepeatBtn.classList.add('active-feature');
    audioPlayer.loop = true;
  } else {
    playerRepeatBtn.innerHTML = '<i class="fas fa-repeat"></i>';
    playerRepeatBtn.classList.add('active-feature');
  }
}
playerPlayPauseBtn.addEventListener('click', () => {
  if (isPlaying) {
    pauseTrack();
  } else {
    playTrack();
  }
});
playerPrevBtn.addEventListener('click', prevTrack);
playerNextBtn.addEventListener('click', nextTrackLogic);
audioPlayer.addEventListener('ended', () => {
  if (repeatMode === 1) {
    
  } else {
    nextTrack();
  }
});
backToHomeFromDetailBtn.addEventListener('click', showHomePage);
backToHomeBtn.addEventListener('click', showHomePage);
playFromDetailBtn.addEventListener('click', () => {
  loadSong(songs[currentSongIndex]);
  playTrack();
  showPlayerPage();
});
function init() {
  console.log("Initializing...");
  console.log("Songs array length:", songs.length);
  console.log("songListElement:", songListElement);
  renderSongList();
  if (songs.length > 0) {
    loadSong(songs[currentSongIndex]);
  } else {
    albumArtPlayer.src = "https://placehold.co/100x100/3a3a4e/e0e0e0?text=Musik";
    playerTrackTitle.textContent = "No Songs";
    playerTrackArtist.textContent = "Add Songs";
    lyricsContainer.innerHTML = "<p>Please add lyrics to the song.</p>";
  }
  audioPlayer.volume = playerVolumeSlider.value;
  audioPlayer.playbackRate = playerSpeedSlider.value;
  currentSpeedDisplay.textContent = `${audioPlayer.playbackRate.toFixed(2)}x`;
  updatePlayPauseIcon();
  updateRepeatButtonUI();
  showHomePage();
  console.log("Initialization complete.");
}
init();