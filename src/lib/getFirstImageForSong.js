export default async function getFirstImageForSong(song) {
  const response = await fetch("/api/getFirstImageForSong", {
    method: "POST",
    body: JSON.stringify({ song }),
  });

  return (await response.json()).src;
}
