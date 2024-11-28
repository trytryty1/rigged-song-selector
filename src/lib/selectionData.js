import data from "./data.json";

export const names = data.names;
export const songs = data.songs.concat(data.randomSongs);
export const randomSongs = data.songs;
export const riggedSongs = data.riggedSongs;

export function getRandomSong() {
  return randomSongs[Math.floor(Math.random() * randomSongs.length)];
}

export function getRandomRiggedSongForName(name) {
  const riggedSongs = getRiggedSongsForName(name);
  return riggedSongs[Math.floor(Math.random() * riggedSongs.length)];
}

export function getSongFromIndex(index) {
  return songs[index];
}

export function getIndexForSong(song) {
  return songs.indexOf(song);
}

export function getRiggedSongsForName(name) {
  return riggedSongs[name] || [];
}

export function getNameFromIndex(index) {
  return names[index];
}

export function getIndexForName(name) {
  return names.indexOf(name);
}
