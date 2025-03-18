async function generateHaiku() {
    const theme = document.getElementById("theme").value;

    if (!theme) {
        alert("Please enter a theme!");
        return;
    }

    try {
        const response = await fetch("http://localhost:3000/generate-haiku", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ theme })
        });

        const data = await response.json();

        if (data.haiku) {
            displayHaiku(data.haiku);
        } else {
            alert("Error generating haiku!");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Failed to connect to server.");

        
    }
    
}


function displayHaiku(haiku) {
    let haikuContainer = document.getElementById("haiku");
    if (!haikuContainer) {
        haikuContainer = document.createElement("p");
        haikuContainer.id = "haiku";
        document.body.appendChild(haikuContainer);
    }
    haikuContainer.innerText = haiku;
    clearButton.style.display = "inline-block";
}

function clearHaiku() {
    const haikuContainer = document.getElementById("haiku");
    const clearButton = document.getElementById("clearButton");

    haikuContainer.innerText = "";
    clearButton.style.display = "none";
}