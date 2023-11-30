var muscle = "biceps";
$.ajax({
  method: "GET",
  url: "https://api.api-ninjas.com/v1/exercises?muscle=" + muscle,
  headers: { "X-Api-Key": "ZsgK8spWOxxkEn6A70+Svg==xtHt8idt25vLlexH" },
  contentType: "application/json",
  success: function (result) {
    console.log(result);
    workoutPlanner()
},
  error: function ajaxError(jqXHR) {
    console.error("Error: ", jqXHR.responseText);
  },
});
// put everyhting below in a function
async function workoutPlanner() {
    const url = 'https://exercisedb.p.rapidapi.com/exercises/bodyPart/back?limit=10';
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

