async function bmiCalulator() {
    const url = 'https://bmi-calculator6.p.rapidapi.com/bmi?height=184&weight=86&system=metric';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '2bbff0e70bmsh8bceeebc7aa361dp110557jsn382a7ebb2ba6',
            'X-RapidAPI-Host': 'bmi-calculator6.p.rapidapi.com'
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

bmiCalulator()
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
    const url = 'https://exercisedb.p.rapidapi.com/exercises/bodyPart/chest?limit=10';
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

// Code for storing the users inputs (email and name) to local storage
function saveUserData() {
    // Get user inputs
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;

    // Create an object to store user data
    var userData = {
      name: name,
      email: email
    };

    // Convert the object to a JSON string
    var userDataJSON = JSON.stringify(userData);

    // Store the JSON string in local storage
    localStorage.setItem('userData', userDataJSON);

    // Close the modal (if needed)
    var signupModal = new bootstrap.Modal(document.getElementById('signupModal'));
    signupModal.hide();
  }
 