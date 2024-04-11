// Store password rules
const passwordRules = [
    {
        level:1,
        rules: [
            "Between 6 to 10 characters long",
            "Include at least one uppercase letter, lowercase letter, and number",
            "Contains the alias symbol"
        ]
    },
    {
        level:2,
        rules: [
            "Include at least one uppercase letter, lowercase letter, and number",
            "Contains at least one special character",
            "Contains the name of a mythical creature that have the upper body of a human and a lower body of a horse"
        ]
    },
    {
        level:3,
        rules: [
            "Include at least one uppercase letter, lowercase letter, and number",
            "The name of Malaysia's national food",
            "The year the food was invented"
        ]
    },
    {
        level:4,
        rules: [
            "Include at least one uppercase letter, lowercase letter, and number",
            "Must include a question mark",
            "The name of a famous sportswear brand"
        ]
    },
    {
        level:5,
        rules: [
            "Include at least one uppercase letter, lowercase letter, and number",
            "The distance of the earth to the moon in kilometer",
            "The name of a famous basketball player"
        ]
    }
];

// Global variable to track the current level
let currentLevel = 1;

// Load password rules for the given level
function loadPasswordRules(level) {
    const rulesList = document.getElementById("rules-list");
    const validationMessage = document.getElementById("game-input-validation");
    
    // Clear previous rules and set default validation message
    rulesList.innerHTML = ""; 
    validationMessage.textContent = "Please enter an input";

    // Load rules for current level
    const levelRules = passwordRules.find(rule => rule.level === level);
    if (levelRules) {
        levelRules.rules.forEach(rule => {
            const li = document.createElement("li");
            li.textContent = rule;
            rulesList.appendChild(li);
        });
    }
}

// Validate password input
function validatePassword(password) {
    const levelRules = passwordRules.find(rule => rule.level === currentLevel);
    if (levelRules) {
        // Check if each rule is satisfied
        for (const rule of levelRules.rules) {
            if (!checkRule(password, rule)) {
                return false; // Password doesn't satisfy the rule
            }
        }
        return true; // Password satisfies all rules for the current level
    }
    return false; // Level rules not found
}

// Function to check if a specific rule is satisfied
function checkRule(password, rule) {
    if (rule === "Between 6 to 10 characters long") {
        return password.length >= 6 && password.length <= 10;
    } else if (rule === "Include at least one uppercase letter, lowercase letter, and number") {
        return /[A-Z]/.test(password) && /[a-z]/.test(password) && /\d/.test(password);
    } else if (rule === "Contains the alias symbol") {
        return password.includes("@");
    } else if (rule === "Contains at least one special character") {
        return /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
    } else if (rule === "Contains the name of a mythical creature that have the upper body of a human and a lower body of a horse") {
        return password.toLowerCase().includes("centaur");
    } else if (rule === "The name of Malaysia's national food") {
        return password.toLowerCase().includes("nasilemak");
    } else if (rule === "The year the food was invented") {
        return password.includes("1909");
    } else if (rule === "Must include a question mark") {
        return password.includes("?");
    } else if (rule === "The name of a famous sportswear brand") {
        return password.toLowerCase().includes("nike");
    } else if (rule === "The distance of the earth to the moon in kilometer") {
        return password.includes("384400");
    } else if (rule === "The name of a famous basketball player") {
        return password.toLowerCase().includes("lebronjames");
    }
    
    return false;
}

// Event listener to go to next level
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("next-game-button").addEventListener("click", handleNextButtonClick);
});

// Handle click event on "Next" button
function handleNextButtonClick() {
    const inputPassword = document.getElementById("player-answer").value;
    const validationMessage = document.getElementById("game-input-validation");

    if (inputPassword.trim() === "") {
        validationMessage.textContent = "Please enter an input";
    } else if (validatePassword(inputPassword)) {
        if (currentLevel === 5) {
            validationMessage.textContent = "Password is good";

            // Change button text to "Finish" and update click event handler
            document.getElementById("next-game-button").textContent = "Finish";
            document.getElementById("next-game-button").removeEventListener("click", handleNextButtonClick);
            document.getElementById("next-game-button").addEventListener("click", function() {
                // Redirect back to game.html
                window.location.href = "game.html";
            });

        } else {
            validationMessage.textContent = "Password is good";

            // Clear the player-answer field
            document.getElementById("player-answer").value = "";

            // Progress to next level
            currentLevel++;
            loadPasswordRules(currentLevel);

            // Update the new level id
            document.getElementById("current-level").textContent = currentLevel;
        }
    } else {
        validationMessage.textContent = "Password hasn't satisfied the rules";
    }
}