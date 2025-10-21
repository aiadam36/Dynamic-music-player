# Dynamic music player

My first public project, A dynamic music player! Hope you guys liked it.

- To add new lyrics, we can put it like this in `songs.js`

```javascript
  {
    id: 1,
    title: "Example",
    artist: "Unknown Artist",
    album: "Unknown Album",
    albumArtUrl: "assets/img/example.png",
    audioSrc: "assets/music/example.mp3",
    videoBgSrc: "assets/bg/example.mp4",
    lyrics: []
  }
```

- If we want to add another song, we do it like these

```javascript
// Up here is the {id: 1}
    videoBgSrc: "assets/bg/example.mp4",
    lyrics: []
  },
  {
    id: 2,
    title: "Example 2",
    artist: "Unknown Artist",
    album: "Unknown Album",
    albumArtUrl: "assets/img/example2.png",
    audioSrc: "assets/music/example2.mp3",
    videoBgSrc: "assets/bg/example2.mp4",
    lyrics: []
  },
```

- To add lyrics, we do it like these

```javascript
// Other parts of the code
    lyrics: [
      { time: 18, text: "We're no strangers to love" },
// For your information, it uses seconds unit to define the lyrics timing
      { time: 22.1, text: "You know the rules and so do I" },
    ]
  },
```

This project is still in development, so be patient.

**Please don't steal my code guys, this tooks me around 7 hours to reorganize the whole code from forked random Music player repository.**