
document.addEventListener('DOMContentLoaded', () => { //ChatGPT
    let apiKey = localStorage.getItem('apiKey');
    if (!apiKey) {
        apiKey = prompt("Please enter your API key:");
        if (apiKey) {
            localStorage.setItem('apiKey', apiKey);
            alert('Your API key has been saved.');
        } else {
            alert('No API key entered. Please refresh the page to try again.');
        }
    } else {
        alert('Your API key is already saved: ' + apiKey);
    }
})

function generateWarmup() {
    const apiKey = localStorage.getItem('apiKey');
    const userInputWorkout = document.querySelector("#workout-type").value
    const userInputSets = document.querySelector("#sets").value
    const userInputType = document.querySelector("#type").value
    fetch("https://api-inference.huggingface.co/models/tiiuae/falcon-7b-instruct/v1/chat/completions", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${apiKey}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model: "meta-llama/Llama-3.1-8B-Instruct",
            messages: [
                {
                    role: "user",
                    content: `Generate a warmup for ${userInputWorkout}, in this format: ${userInputSets} exercise of 30 sec each being ${userInputType} stretching`
                }
            ],
            max_tokens: 500,
            stream: false
        })
    })
        .then(response => {
            if (!response.ok) {
                console.log(111);
                throw new Error(`Error: ${response.statusText}`);
            }
            return response.json();
        })
        .then(suggestionData => {
            console.log(suggestionData);
            const content = suggestionData.choices[0].message.content;
            displayWarmup(content)
        })
        .catch(error => console.error(error));
}

const warmupBtn = document.querySelector(".generateWarmupBtn")

warmupBtn.addEventListener("click", () => {
    generateWarmup()
    console.log("hej")
})

function displayWarmup(suggetionData) {
    const workoutContainer = document.querySelector("#warmup-container");
    workoutContainer.innerText = `${suggetionData}`
}