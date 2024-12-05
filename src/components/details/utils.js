const movieImgNotFound = 'https://1080motion.com/wp-content/uploads/2018/06/NoImageFound.jpg.png'
const imageCloudUrl = "https://image.tmdb.org/t/p/w500/"

function formattedStringFromArray(arr=[]) {
  const stringFromArray = arr.map((item) => item);
  if(stringFromArray.length===0){
    return 'Не указано'
  }
  const formattedArr =
    stringFromArray.length > 1
      ? `${stringFromArray.slice(0, -1).join(", ")} и ${stringFromArray.slice(
          -1
        )}.`
      : `${stringFromArray[0]}`;
  return formattedArr;
}

function getYearFromDate(date) {
  return new Date(date).getFullYear() || "Нет даты";
}

function formatTime(minutes) {
  if(!minutes){
    return 'Не указано'
  }
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60; 
  
  return `${minutes} мин. / ${hours}:${remainingMinutes.toString().padStart(2, '0')}`;
}


function getActorImgUrl(movieImgPath) {
  if (!movieImgPath) {
    return movieImgNotFound;
  } else {
    return imageCloudUrl + movieImgPath;
  }
};

export { formattedStringFromArray, getYearFromDate, formatTime, getActorImgUrl};
