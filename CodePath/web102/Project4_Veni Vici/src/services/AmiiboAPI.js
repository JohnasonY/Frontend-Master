/**
 *
 * @param {object} banned banned Amiibo
 * {
 *   amiiboSeries: [],
 *   character: [],
 *   gameSeries: [],
 *   type: [],
 * }
 * @returns random Amiibo object
 */
export async function getRandomAmiibo(banned) {
  const url = `https://amiiboapi.org/api/amiibo/`;

  const response = await fetch(url);
  const data = await response.json();
  const amiiboArr = data.amiibo;

  const availableAmiibos = amiiboArr.filter((amiibo) => {
    return !isBanned(amiibo, banned);
  });

  if (availableAmiibos.length === 0) {
    return null;
  }

  const randomIndex = Math.floor(Math.random() * availableAmiibos.length);
  const randomAmiibo = availableAmiibos[randomIndex];

  const result = {
    image: randomAmiibo.image,
    name: randomAmiibo.name,
    attributes: {
      amiiboSeries: randomAmiibo.amiiboSeries,
      character: randomAmiibo.character,
      gameSeries: randomAmiibo.gameSeries,
      type: randomAmiibo.type,
    },
  };

  return result;
}

function isBanned(amiibo, banned) {
  return (
    banned.amiiboSeries.includes(amiibo.amiiboSeries) ||
    banned.character.includes(amiibo.character) ||
    banned.gameSeries.includes(amiibo.gameSeries) ||
    banned.type.includes(amiibo.type)
  );
}
