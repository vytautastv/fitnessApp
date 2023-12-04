async function bmiCalculator() {
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

bmiCalculator()

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

