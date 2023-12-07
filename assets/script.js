$(document).ready(async function () {
  // BMI formula: weight (kg) / (height (m) * height (m))
  function calculateBMI(weight, height) {
    var heightInMeters = height / 100;
    return (weight / (heightInMeters * heightInMeters)).toFixed(2);
  }

  // Click event for the Calculate BMI button
  $(".btn").click(async function () {
    // Get user input
    var name = $("#nameInput").val();
    var weight = $("#weightInput").val();
    var height = $("#heightInput").val();

    // Validate the input
    if (!weight || !height) {
      // Display error message if user does not enter a valid weight and height
      $("#result").text("Please enter your name, weight and height.");
      return;
    }

    // Call the BMI Calculator API
    var { bmi, status } = await bmiCalculator(weight, height);
    localStorage.setItem("nameInput", name);
    // Display the result on the screen
    $("#result").text(
      `${localStorage.getItem(
        "nameInput"
      )}, your BMI is: ${bmi} Status: ${status}`
    );
  });

  // Clear input fields and result
  $("#clearBtn").click(function () {
    $("#weightInput").val("");
    $("#heightInput").val("");
    $("#nameInput").val("");
    $("#result").text("");
  });

  // Function to make API call to BMI Calculator

  async function bmiCalculator(weight, height) {
    var bmiUrl = `https://simple-bmi-calculator1.p.rapidapi.com/calculate/metric/${height}/${weight}`;
    var options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "c17abc7fa9msh04c62b3db8946f3p18d5a4jsnc7b37f72632e",
        "X-RapidAPI-Host": "simple-bmi-calculator1.p.rapidapi.com",
      },
    };

    try {
      var response = await fetch(bmiUrl, options);
      var result = await response.json();
      return {
        bmi: result.bmi.toFixed(2),
        status: result.status,
      };
    } catch (error) {
      console.error(error);
    }
  }

  var apiKey = "0cf590f0a0msh1ebd96456387635p136908jsn12642ff13d02";
  var bodyPartUrls = [
    "https://exercisedb.p.rapidapi.com/exercises/bodyPart/chest?limit=10",
    "https://exercisedb.p.rapidapi.com/exercises/bodyPart/back?limit=10",
    "https://exercisedb.p.rapidapi.com/exercises/bodyPart/lower%20legs?limit=10",
    "https://exercisedb.p.rapidapi.com/exercises/bodyPart/waist?limit=10",
  ];

  // Create a function to fetch exercises for a specific body part

  var fetchExercises = async function (bodyPartUrls) {
    var options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": apiKey,
        "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
      },
    };

    try {
      var response = await fetch(bodyPartUrls, options);
      var data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching exercises:", error);
    }
  };

  // Create a function to set the exercise data in the corresponding card

  var setCardData = function (cardIndex, exerciseData) {
    var cardTitleElement = document.querySelectorAll(".card-title")[cardIndex];
    var imgElement = document.querySelectorAll(".card-img-top")[cardIndex];
    var moreInfoLink = document.querySelectorAll(".btn")[cardIndex];

    cardTitleElement.textContent = exerciseData.name;
    imgElement.src = exerciseData.gifUrl;
  };

  // Fetch the exercises for each body part using for loop
  var cardIndices = [0, 1, 2];

  for (let i = 0; i < bodyPartUrls.length; i++) {
    var exercises = await fetchExercises(bodyPartUrls[i]);
    var exercisesToShow = exercises.slice(0, cardIndices.length);

    exercisesToShow.forEach(function (exerciseData, index) {
      setCardData(cardIndices[index] + i * cardIndices.length, exerciseData);
    });
  }
});
