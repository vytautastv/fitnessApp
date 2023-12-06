$(document).ready(async function () {
  // BMI formula: weight (kg) / (height (m) * height (m))
  function calculateBMI(weight, height) {
    var heightInMeters = height / 100;
    return (weight / (heightInMeters * heightInMeters)).toFixed(2);
  }

  // Click event for the Calculate BMI button
  $(".btn").click(async function () {
    // Get user input
    var weight = $("#weightInput").val();
    var height = $("#heightInput").val();

    // Validate the input
    if (!weight || !height) {
      // Display error message if user does not enter a valid weight and height
      $("#result").text("Please enter both weight and height.");
      return;
    }

    // Call the BMI Calculator API
    var { bmi, status } = await bmiCalculator(weight, height);

    // Display the result on the screen
    $("#result").text(`Your BMI is: ${bmi} Status: ${status}`);
  });
  // Clear input fields and result
  $("#clearBtn").click(function () {
    $("#weightInput").val("");
    $("#heightInput").val("");
    $("#result").text("");
  });

  // Function to make API call to BMI Calculator

  async function bmiCalculator(weight, height) {
    var bmiUrl = `https://simple-bmi-calculator1.p.rapidapi.com/calculate/metric/${height}/${weight}`;
    var options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "ec389cb394msh147e651554bd4f5p183964jsn80b6d95991b7",
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

    //var muscle = "chest";
    //$.ajax({
     // method: "GET",
     // url: "https://api.api-ninjas.com/v1/exercises?muscle=" + muscle,
     // headers: { "X-Api-Key": "ZsgK8spWOxxkEn6A70+Svg==xtHt8idt25vLlexH" },
     // contentType: "application/json",
     // success: function (result) {
       //console.log(result);
       // workoutPlanner()
    //},
      //error: function ajaxError(jqXHR) {
        //console.error("Error: ", jqXHR.responseText);
      //},
    //});
    
    async function workoutPlanner() {
       // const url = 'https://exercisedb.p.rapidapi.com/exercises/bodyPart/chest?limit=10';
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '2bbff0e70bmsh8bceeebc7aa361dp110557jsn382a7ebb2ba6',
                'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
            }
        };
        
        try {
            const response = await fetch(url, options);
            const result = await response.text();
            console.log(result);
        } catch (error) {
            console.error(error);
        }
    }
    workoutPlanner()
    


});

  // Code for storing the users inputs (email and name) to local storage
  function saveUserData() {
    // Get user inputs
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;

    // Create an object to store user data
    var userData = {
      name: name,
      email: email,
    };

    // Convert the object to a JSON string
    var userDataJSON = JSON.stringify(userData);

    // Store the JSON string in local storage
    localStorage.setItem("userData", userDataJSON);

    // Close the modal (if needed)
    var signupModal = new bootstrap.Modal(
      document.getElementById("signupModal")
    );
    signupModal.hide();
  }

  var apiKey = "ec389cb394msh147e651554bd4f5p183964jsn80b6d95991b7"; //API key
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
