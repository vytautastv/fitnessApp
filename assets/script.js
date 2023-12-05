async function bmiCalulator() {
  const url =
    "https://bmi-calculator6.p.rapidapi.com/bmi?height=184&weight=86&system=metric";
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "2bbff0e70bmsh8bceeebc7aa361dp110557jsn382a7ebb2ba6",
      "X-RapidAPI-Host": "bmi-calculator6.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.text();
    console.log(result);
  } catch (error) {
    console.error(error);
  }
}

bmiCalulator();

document.addEventListener("DOMContentLoaded", async function () {
  const apiKey = "ec389cb394msh147e651554bd4f5p183964jsn80b6d95991b7"; //API key
  const bodyPartUrls = [
    "https://exercisedb.p.rapidapi.com/exercises/bodyPart/chest?limit=10",
    "https://exercisedb.p.rapidapi.com/exercises/bodyPart/back?limit=10",
    "https://exercisedb.p.rapidapi.com/exercises/bodyPart/lower%20legs?limit=10",
    "https://exercisedb.p.rapidapi.com/exercises/bodyPart/waist?limit=10",
  ]; // Function to fetch exercises for a specific body part

  const fetchExercises = async (url) => {
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": apiKey,
        "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
      },
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching exercises:", error);
    }
  }; // Function to set the exercise data in the corresponding card

  const setCardData = (cardIndex, exerciseData) => {
    const cardTitleElement =
      document.querySelectorAll(".card-title")[cardIndex];
    const imgElement = document.querySelectorAll(".card-img-top")[cardIndex];
    const moreInfoLink = document.querySelectorAll(".btn")[cardIndex];

    cardTitleElement.textContent = exerciseData.name;
    imgElement.src = exerciseData.gifUrl;
    moreInfoLink.href = exerciseData.moreInfoUrl; // Adjust this based on your API response
  }; // Define card indices

  const cardIndices = [0, 1, 2]; // Fetch exercises and set data for each body part

  for (let i = 0; i < bodyPartUrls.length; i++) {
    const exercises = await fetchExercises(bodyPartUrls[i]);
    const exercisesToShow = exercises.slice(0, cardIndices.length);

    exercisesToShow.forEach((exerciseData, index) => {
      setCardData(cardIndices[index] + i * cardIndices.length, exerciseData);
    });
  }
});
