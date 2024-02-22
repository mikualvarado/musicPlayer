if (!localStorage.getItem('isLogged')) {
	window.location.href = './pages/login.html';
}

const songsContainerList = document.getElementById('songs');
const favoritesContainerList = document.getElementById('favorites');
const myPlaylistContainerList = document.getElementById('my-playlist');
const songsContainer = document.getElementById('songs-container');
const searchInput = document.getElementById('search');
const searchIcon = document.getElementById('searchIcon');


class Song {
	static idCounter = 0;
	constructor({
		name,
		author,
		duration,
		album,
		year,
		genre,
		cover,
		url,
		isFavorite = false,
		inMyPlaylist = false,
	}) {
		this.id = Song.idCounter++;
		this.name = name;
		this.author = author;
		this.duration = duration;
		this.album = album;
		this.year = year;
		this.genre = genre;
		this.cover = cover;
		this.url = url;
		this.isFavorite = isFavorite;
		this.inMyPlaylist = inMyPlaylist;
		this.audioElement = new Audio(this.url);
	}

	play() {
		this.audioElement.play();
	}

	pause() {
		this.audioElement.pause();
	}

	stop() {
		this.audioElement.pause();
		this.audioElement.currentTime = 0;
	}

	mute() {
		this.audioElement.muted = !this.audioElement.muted;
	}
}

class Playlist {
	constructor({ name, songs = [], container }) {
		this.name = name;
		this.songs = songs;
		this.container = container;
		this.currentIndex = 0; 
	}

	addSong(song) {
		if (this.name == 'Favorites') song.isFavorite = true;
		if (this.name == 'MyPlaylist') song.inMyPlaylist = true;
		this.songs.push(song);
		this.renderList();
	}

	removeSong(song) {
		const index = this.songs.indexOf(song);
		if (index === -1) return;
		if (this.name === 'Favorites') song.isFavorite = false;
		if (this.name === 'MyPlaylist') song.inMyPlaylist = false;
		this.songs.splice(index, 1);
		this.renderList();
	}

	renderList() {
		if (this.songs.length == 0)
			this.container.innerHTML = `<p class="songsError">Songs not found</p>`;
		else
			this.container.innerHTML = this.songs.map(
				(p) => `
            <div class="song" >
                <div class="left-song">
                    <img src=${p.cover} alt="song" />
                    <h4>${p.name}</h4>
					<!--<span class="author">${p.author}</span>-->
                </div>
                
				<div id="song-list-buttons">
					<button class="add-to-list-btn" onClick="changeCurrentSong(${
						p.id
					})"><i class="bi bi-play-fill"></i></button>
					${
						p.inMyPlaylist
							? `<button class="add-to-list-btn" onclick="removeCurrentSongFromMyPlaylist(${p.id})"><i class="bi bi-trash-fill"></i></button>`
							: `<button class="add-to-list-btn" onclick="addCurrentSongToMyPlaylist(${p.id})"><i class="bi bi-plus-lg"></i></button>`
					}
					
					${
						p.isFavorite
							? `<button class="add-to-list-btn" onclick="removeCurrentSongFromFavorites(${p.id})"><i class="bi bi-heart-fill"></i></button>`
							: `<button class="add-to-list-btn" onclick="addCurrentSongToFavorites(${p.id})"><i class="bi bi-heart"></i></button>`
					}
				</div>
				
            </div>
        `
			);
	}

	searchSong(query) {
		const results = this.songs.filter((p) =>
			p.name.toLowerCase().includes(query.toLowerCase())||
			p.author.toLowerCase().includes(query.toLowerCase()) ||
			p.genre.toLowerCase().includes(query.toLowerCase())
		);
		if (results.length == 0)
			this.container.innerHTML = `<p class="songsError">No se encontraron canciones</p>`;
		else
			this.container.innerHTML = results.map(
				(p) => `
            <div class="song" onClick="changeCurrentSong(${p.id})">
                <div class="left-song">
                    <img src=${p.cover} alt="song" />
                    <h4>${p.name}</h4>
					<button onClick="changeCurrentSong(${
						p.id
					})"><i class="bi bi-play-fill"></i></button>
                ${
					p.inMyPlaylist
						? `<button class="add-to-list-btn" onclick="removeCurrentSongFromMyPlaylist(${p.id})"><i class="bi bi-trash-fill"></i></button>`
						: `<button class="add-to-list-btn" onclick="addCurrentSongToMyPlaylist(${p.id})"><i class="bi bi-plus-lg"></i></button>`
				}
				
				${
					p.isFavorite
						? `<button class="add-to-list-btn" onclick="removeCurrentSongFromFavorites(${p.id})"><i class="bi bi-heart-fill"></i></button>`
						: `<button class="add-to-list-btn" onclick="addCurrentSongToFavorites(${p.id})"><i class="bi bi-heart"></i></button>`
				}
				
            </div>
			</div>
			</div>`
			);

			this.container.innerHTML = htmlResults.join('');
	}
	
	playNextSong() {
        this.currentIndex = (this.currentIndex + 1) % this.songs.length;
        const nextSong = this.songs[this.currentIndex];
		console.log(nextSong);
        changeCurrentSong(nextSong.id);
    }
}

const allSongs = [
	new Song({
		name: 'Lover',
		author: 'Taylor Swift',
		duration: '3:58',
		album: '1983',
		year: 2019,
		genre: 'Pop',
		cover: './assets/covers/cover1.webp',
		url: './assets/songs/song1.mp3',
	}),
	new Song({
		name: 'Accidentally in Love',
		author: 'Counting Crows',
		duration: '3:14',
		album: 'List of songs featured in Shrek',
		year: 2004,
		genre: 'Pop Rock',
		cover: './assets/covers/cover2.webp',
		url: './assets/songs/song2.mp3',
	}),
	new Song({
		name: 'What Goes Around... Comes Around',
		author: 'Justin Timberlake',
		duration: '8:01',
		album: 'FutureSex/LoveSounds',
		year: 2006,
		genre: 'Psychedelic popsophisti-pop',
		cover: './assets/covers/cover3.webp',
		url: './assets/songs/song3.mp3',
	}),
	new Song({
		name: 'Everytime',
		author: 'Britney Spears',
		duration: '3:46',
		album: 'In the Zone',
		year: 2003,
		genre: 'Electro pop',
		cover: './assets/covers/cover4.webp',
		url: './assets/songs/song4.mp3',
	}),
	new Song({
		name: 'Hot N Cold',
		author: 'Katy Perry',
		duration: '3:38',
		album: 'One of the Boys',
		year: 2008,
		genre: 'Pop',
		cover: './assets/covers/cover5.webp',
		url: './assets/songs/song5.mp3',
	}),
	new Song({
		name: 'Those Eyes',
		author: 'New West',
		duration: '3:41',
		album: 'Single',
		year: 2023,
		genre: 'Reggae',
		cover: './assets/covers/cover6.webp',
		url: './assets/songs/song6.mp3',
	}),
	new Song({
		name: "I'm too pretty for this",
		author: 'Claire Rosinkranz',
		duration: '2:48',
		album: 'Single',
		year: 2023,
		genre: 'Alternative',
		cover: './assets/covers/cover7.webp',
		url: './assets/songs/song7.mp3',
	}),
	new Song({
		name: 'Es por ti',
		author: 'Juanes',
		duration: '4:02',
		album: 'Un día normal',
		year: 2002,
		genre: 'Pop',
		cover: './assets/covers/cover8.webp',
		url: './assets/songs/song8.mp3',
	}),
	new Song({
		name: 'Wenn Worte meine Sprache wären',
		author: 'Tim Bendzko',
		duration: '3:15',
		album: 'Wenn Worte meine Sprache wären',
		year: 2011,
		genre: 'Pop',
		cover: './assets/covers/cover9.webp',
		url: './assets/songs/song9.mp3',
	}),
	new Song({
		name: 'About Love',
		author: 'Marina',
		duration: '3:36',
		album: 'To All the Boys: P.S. I Still Love You',
		year: 2020,
		genre: 'Pop',
		cover: './assets/covers/cover10.webp',
		url: './assets/songs/song10.mp3',
	}),
	new Song({
		name: "Don't Blame Me",
		author: 'Taylor Swift',
		duration: '3:56',
		album: 'Reputation',
		year: 2017,
		genre: 'Electropop',
		cover: './assets/covers/cover11.webp',
		url: './assets/songs/song11.mp3',
	}),
	new Song({
		name: 'Symphony',
		author: 'Clean Bandit',
		duration: '4:06',
		album: 'So Good',
		year: 2017,
		genre: 'Pop',
		cover: './assets/covers/cover12.webp',
		url: './assets/songs/song12.mp3',
	}),
	new Song({
		name: 'This Love',
		author: 'Maroon 5',
		duration: '4:26',
		album: 'Songs About Jane',
		year: 2002,
		genre: 'Pop Rock',
		cover: './assets/covers/cover13.webp',
		url: './assets/songs/song13.mp3',
	}),
	new Song({
		name: 'Lovefool',
		author: 'The Cardigans',
		duration: '3:15',
		album: 'First Band on the Moon',
		year: 1996,
		genre: 'Pop',
		cover: './assets/covers/cover14.webp',
		url: './assets/songs/song14.mp3',
	}),
	new Song({
		name: 'Bitter Sweet Symphony',
		author: 'The Verve',
		duration: '4:35',
		album: 'Urban Hymns',
		year: 1997,
		genre: 'Pop',
		cover: './assets/covers/cover15.webp',
		url: './assets/songs/song15.mp3',
	}),
	new Song({
		name: 'Smells Like Teen Spirit',
		author: 'Nirvana',
		duration: '4:38',
		album: 'Urban Hymns',
		year: 1997,
		genre: 'Pop',
		cover: './assets/covers/cover16.webp',
		url: './assets/songs/song16.mp3',
	}),
	new Song({
		name: 'Strangers',
		author: 'Kenya Grace',
		duration: '2:53',
		album: "NOW That's What I Call Music Volume 89",
		year: 2023,
		genre: 'Pop',
		cover: './assets/covers/cover17.webp',
		url: './assets/songs/song17.mp3',
	}),
	new Song({
		name: "Ariana Grande - yes, and?",
		author: 'Ariana Grande',
		duration: '4:34',
		album: "yes, and?",
		year: 2024,
		genre: 'Pop',
		cover: './assets/covers/cover18.webp',
		url: './assets/songs/song18.mp3',
	}),
	new Song({
		name: "Mirrors",
		author: 'Justin Timberlake',
		duration: '8:20',
		album: "The 20/20 Experience",
		year: 2013,
		genre: 'Pop',
		cover: './assets/covers/cover19.webp',
		url: './assets/songs/song19.mp3',
	}),
	new Song({
		name: 'Honeybee',
		author: 'The Head and the Heart',
		duration: '2:52',
		album: "Living Mirage",
		year: 2019,
		genre: 'Pop',
		cover: './assets/covers/cover20.webp',
		url: './assets/songs/song20.mp3',
	}),
	new Song({
		name: 'Open Your Eyes',
		author: 'Snow Patrol',
		duration: '5:50',
		album: 'Eyes Open',
		year: 2006,
		genre: 'Alternative',
		cover: './assets/covers/cover21.webp',
		url: './assets/songs/song21.mp3',
	}),
	new Song({
		name: 'I Want It That Way',
		author: 'Backstreet Boys',
		duration: '3:39',
		album: 'Millennium',
		year: 1999,
		genre: 'Pop',
		cover: './assets/covers/cover22.webp',
		url: './assets/songs/song22.mp3',
	}),
	new Song({
		name: "It's Gonna Be Me",
		author: '*NSYNC',
		duration: '3:12',
		album: 'No Strings Attached',
		year: 2000,
		genre: 'Pop',
		cover: './assets/covers/cover23.webp',
		url: './assets/songs/song23.mp3',
	}),
	new Song({
		name: 'Dragostea Din Tei',
		author: 'O-Zone',
		duration: '4:45',
		album: 'No Strings Attached',
		year: 2000,
		genre: 'Pop',
		cover: './assets/covers/cover24.webp',
		url: './assets/songs/song24.mp3',
	}),
	new Song({
		name: "Somethin' Stupid",
		author: 'Robbie Williams, Nicole Kidman',
		duration: '3:08',
		album: "Swing When You're Winning",
		year: 2001,
		genre: 'Pop',
		cover: './assets/covers/cover25.webp',
		url: './assets/songs/song25.mp3',
	}),
	new Song({
		name: 'Believe',
		author: 'Cher',
		duration: '3:56',
		album: 'Believe',
		year: 1998,
		genre: 'Pop',
		cover: './assets/covers/cover26.webp',
		url: './assets/songs/song26.mp3',
	}),
	new Song({
		name: 'Baby One More Time',
		author: 'Britney Spears',
		duration: '3:57',
		album: 'Baby One More Time',
		year: 1999,
		genre: 'Pop',
		cover: './assets/covers/cover27.webp',
		url: './assets/songs/song27.mp3',
	}),
	new Song({
		name: 'Suerte',
		author: 'Shakira',
		duration: '3:13',
		album: 'Servicio de lavandería',
		year: 2001,
		genre: 'Pop',
		cover: './assets/covers/cover28.webp',
		url: './assets/songs/song28.mp3',
	}),
	new Song({
		name: 'Pessimist',
		author: 'Julia Michaels',
		duration: '3:19',
		album: 'Not in Chronological Order',
		year: 2021,
		genre: 'Pop',
		cover: './assets/covers/cover29.webp',
		url: './assets/songs/song29.mp3',
	}),
	new Song({
		name: 'Hey Ya!',
		author: 'Outkast',
		duration: '3:55',
		album: 'The Love Below',
		year: 2003,
		genre: 'Pop',
		cover: './assets/covers/cover30.webp',
		url: './assets/songs/song30.mp3',
	}),
];

const songs = new Playlist({
	name: 'All songs',
	songs: allSongs,
	container: songsContainerList,
});

const myPlaylist = new Playlist({
	name: 'MyPlaylist',
	container: myPlaylistContainerList,
});

const favorites = new Playlist({
	name: 'Favorites',
	container: favoritesContainerList,
});


let currentSong;

function addCurrentSongToMyPlaylist(id) {
	const song = allSongs.find((p) => p.id === id);
	myPlaylist.addSong(song);
}

function addCurrentSongToFavorites(id) {
	const song = allSongs.find((p) => p.id === id);
	favorites.addSong(song);
}

function removeCurrentSongFromMyPlaylist(id) {
	const song = allSongs.find((p) => p.id === id);
	myPlaylist.removeSong(song);
}

function removeCurrentSongFromFavorites(id) {
	const song = allSongs.find((p) => p.id === id);
	favorites.removeSong(song);
}

function changeCurrentSong(id) {
	const song = allSongs.find((p) => p.id === id);
	currentSong = song;

	songsContainer.innerHTML = `
    <img
        class="song-img"
        src="${song.cover}"
        alt="song"
    />
    <h2 class="song-name">${song.name}</h2>

    <div class="song-details">
        <span class="author">Name: ${song.author}</span>
		<span class="duration">Duration: ${song.duration}</span>
		<span class="album">Album: ${song.album}</span>
		<span class="year">Year: ${song.year}</span>
        <span class="genre">Genre: ${song.genre}</span>

		<audio autoplay id="audio-current-song">
			<source src="${song.url}" type="audio/mpeg">
		</audio>

		<div id="progress-container">
				<div id="progress-bar"></div>
		</div>
		<div id="song-buttons">
			<button id="previous-song-button" class="current-song-button" onclick="playPreviousSong()"><i class="bi bi-skip-start-circle-fill"></i></button>
			<button id="playpause-btn" class="current-song-button" onclick="togglePlayPause()"><i class="bi bi-play-fill"></i></button>
			<button id="next-song-button" class="current-song-button" onclick="playNextSong()"><i class="bi bi-skip-end-circle-fill"></i></button>
			<button id="stop-btn" class="current-song-button" onclick="stopSong()"><i class="bi bi-stop-fill"></i></button>
			<button id="mute-btn" class="current-song-button" onclick="toggleMute()"><i class="bi bi-volume-mute-fill"></i></button>
	</div>
    </div>	
	`;
	const playPauseBtn = document.getElementById('playpause-btn');
	const muteBtn = document.getElementById('mute-btn');
	const stopBtn = document.getElementById('stop-btn');
	const skipBtn = document.getElementById('skip-btn');
	const audioElement = document.getElementById('audio-current-song');
	const progressBar = document.getElementById('progress-bar');

	playPauseBtn.addEventListener('click', () => {
		togglePlayPause();
	});

	muteBtn.addEventListener('click', () => {
		toggleMute();
	});

	stopBtn.addEventListener('click', () => {
		stopSong();
	});

	function togglePlayPause() {
		if (audioElement.paused) {
			audioElement.play();
		} else {
			audioElement.pause();
		}
	}

	function toggleMute() {
		audioElement.muted = !audioElement.muted;
	}

	function stopSong() {
		audioElement.pause();
		audioElement.currentTime = 0;
	}

	audioElement.addEventListener('timeupdate', () => {
		const progress =
			(audioElement.currentTime / audioElement.duration) * 100;
		progressBar.style.width = progress + '%';
	});

	audioElement.addEventListener('ended', () => {
        playNextSong();
    });


}

changeCurrentSong(0);


function playNextSong() {
    if (myPlaylist.songs.includes(currentSong)) {
        const currentIndex = myPlaylist.songs.indexOf(currentSong);
        const nextIndex = (currentIndex + 1) % myPlaylist.songs.length;
        changeCurrentSong(myPlaylist.songs[nextIndex].id);
    } else if (favorites.songs.includes(currentSong)) {
        const currentIndex = favorites.songs.indexOf(currentSong);
        const nextIndex = (currentIndex + 1) % favorites.songs.length;
        changeCurrentSong(favorites.songs[nextIndex].id);
    }
}

function playPreviousSong() {
    if (myPlaylist.songs.includes(currentSong)) {
        const currentIndex = myPlaylist.songs.indexOf(currentSong);
        const nextIndex = (currentIndex - 1) % myPlaylist.songs.length;
        changeCurrentSong(myPlaylist.songs[nextIndex].id);
    } else if (favorites.songs.includes(currentSong)) {
        const currentIndex = favorites.songs.indexOf(currentSong);
        const nextIndex = (currentIndex - 1) % favorites.songs.length;
        changeCurrentSong(favorites.songs[nextIndex].id);
    }
}

const nextSongButton = document.getElementById('next-song-button');
nextSongButton.addEventListener('click', playNextSong);

const previousSongButton = document.getElementById('previous-song-button');
previousSongButton.addEventListener('click', playPreviousSong);



function onStart() {
	songs.renderList();
	myPlaylist.renderList();
	favorites.renderList();
}

onStart();

searchIcon.addEventListener('click', () => {
	songs.searchSong(searchInput.value);
});

searchInput.addEventListener('keyup', () => {
	/*if (event.key == 'Enter') {*/
	songs.searchSong(searchInput.value);
	/*}*/
});
