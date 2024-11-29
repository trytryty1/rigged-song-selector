"use client";
import Image from "next/image";
import {
  names,
  songs,
  randomSongs,
  getSongFromIndex,
  getNameFromIndex,
  getIndexForName,
  getRandomSong,
  getIndexForSong,
  getRiggedSongsForName,
  getRandomRiggedSongForName,
} from "@/lib/selectionData";
import { useEffect, useState, useRef } from "react";
import Disco from "@/components/Disco";
import getFirstImageForSong from "@/lib/getFirstImageForSong";

export default function Home() {
  const [currentHighlighted, setCurrentHighlighted] = useState(0);
  const [selectingName, setSelectingName] = useState(false);
  const selectedNameIndex = useRef(null);
  const currentNameIndex = useRef(null);
  const usedSongs = useRef([]);
  const [usedNamesState, setUsedNamesState] = useState([]);
  const usedRiggedSongs = useRef([]);
  const usedNames = useRef([]);
  const [selectingSong, setSelectingSong] = useState(false);
  const [selectedSong, setSelectedSong] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState("");

  useEffect(() => {
    console.log("used songs: ", usedNames.current);
    setUsedNamesState(usedNames.current);
  }, [usedNames.current]);

  const getRandomNewNameIndex = () => {
    // Make sure there are names that have not been selected
    if (usedNames.current.length === names.length) {
      usedNames.current = [];
    }

    // Make sure we don't select a name that has already been selected
    const randomIndex = Math.floor(Math.random() * names.length);
    if (usedNames.current.includes(randomIndex)) {
      return getRandomNewNameIndex();
    }

    // Add the index to the list of used names
    usedNames.current.push(randomIndex);
    return randomIndex;
  };

  const getRandomNewSongIndex = () => {
    // Make sure there are songs that have not been selected
    if (usedSongs.current.length === songs.length) {
      usedSongs.current = [];
    }

    // Make sure we don't select a song that has already been selected
    const randomSong = getRandomSong();
    if (usedSongs.current.includes(randomSong)) {
      return getRandomNewSongIndex();
    }

    // Add the index to the list of used songs
    usedSongs.current.push(randomSong);
    return randomSong;
  };

  const getNewRiggedSongForName = (name) => {
    const riggedSongs = getRiggedSongsForName(name);
    console.log("rigged songs: ", riggedSongs);

    const availableRiggedSongs = riggedSongs.filter(
      (song) =>
        !usedSongs.current.includes(song) &&
        !usedRiggedSongs.current.includes(song)
    );
    console.log("Rigged songs available: ", availableRiggedSongs);

    if (availableRiggedSongs.length === 0) {
      return getRandomNewSongIndex();
    }

    // Make sure we don't select a song that has already been selected
    const randomRiggedSong = getRandomRiggedSongForName(name);
    if (usedSongs.current.includes(randomRiggedSong)) {
      return getNewRiggedSongForName(randomRiggedSong);
    }

    // Add the index to the list of used songs
    usedSongs.current.push(randomRiggedSong);
    usedRiggedSongs.current.push(randomRiggedSong);
    return randomRiggedSong;
  };

  const handleNewPersonClick = () => {
    // Select a random name
    const nameIndex = getRandomNewNameIndex();
    const song = getNewRiggedSongForName(getNameFromIndex(nameIndex));

    setSelectedSong(song);
    getFirstImageForSong(song).then((src) => setBackgroundImage(src));
    console.log("name: ", getNameFromIndex(nameIndex));
    console.log("song: ", song);

    const paddedNameIndex =
      nameIndex + Math.floor(Math.random() * 3 + 3) * names.length;
    currentNameIndex.current = currentHighlighted;
    selectedNameIndex.current = paddedNameIndex;
    const update = () => {
      setTimeout(() => {
        if (currentNameIndex.current === selectedNameIndex.current) {
          setSelectingName(false);
        } else {
          currentNameIndex.current = currentNameIndex.current + 1;
          setCurrentHighlighted(currentNameIndex.current % names.length);
          update();
        }
      }, 300 * (currentNameIndex.current / paddedNameIndex));
    };
    update();
    setSelectingName(true);
    setSelectingSong(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center flex-col">
      <div className="flex flex-col items-center p-5 w-1/2 m-3 text-2xl">
        <img src={backgroundImage} className="flex-1 m-5" alt="" />
        <div className="flex flex-col items-center bg-black shadow-glowFrame shadow-white rounded-full p-4 px-8">
          <p
            style={{ textShadow: "0 0 15px, 0 0 25px" }}
            className="font-bold animate-glow text-pink-500"
          >
            {selectedSong}
          </p>
        </div>
      </div>

      <Disco />
      <div className="grid grid-cols-4 grid-rows-3 gap-4 p-5 rounded-lg">
        {names.map((name, index) => (
          <div
            key={index}
            className={`flex items-center justify-center text-white font-bold text-xl p-2 aspect-square rounded-md ${
              index === currentHighlighted
                ? "bg-pink-500 animate-bounce shadow-glowFrame opacity-100 "
                : " opacity-90"
            } ${usedNamesState.includes(name) ? "hidden" : ""} `}
          >
            {name}
          </div>
        ))}
      </div>
      <button
        onClick={handleNewPersonClick}
        className="bg-pink-500 hover:bg-pink-700 text-white font-bold m-4 py-2 px-4 rounded"
      >
        Choose new person
      </button>
    </div>
  );
}
