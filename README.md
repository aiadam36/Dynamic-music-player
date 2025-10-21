# Dynamic music player

My first public project, A dynamic music player! Hope you guys liked it.

- To add new lyrics, we can put it like this in `songs.js`

```javascript
  {
    id: 1,
    title: "",
    artist: "",
    album: "",
    albumArtUrl: "",
    audioSrc: "",
    videoBgSrc: "",
    lyrics: []
  }
```

- If we want to add another song, we do it like these

```javascript
// Up here is the {id: 1}
    videoBgSrc: "",
    lyrics: []
  },
  {
    id: 2,
    title: "",
    artist: "",
    album: "",
    albumArtUrl: "",
    audioSrc: "",
    videoBgSrc: "",
    lyrics: []
  },
```

- To add lyrics, we do it like these

```javascript
// Other parts of the code
    videoBgSrc: "",
    lyrics: [
      { time: 18, text: "We're no strangers to love" },
// For your information, it uses seconds unit to define the lyrics timing
      { time: 22.1, text: "You know the rules and so do I" },
    ]
  },
```

This project is still in development, so be patient.

**Please don't steal my code guys, this tooks me around 7 hours to reorganize the whole code from forked random Music player repository.**
