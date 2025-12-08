/*
    Student Name: Phoenix Dodge
    File Name: script.js
    Date: 12/7/2025
    Description: Adds interactivity (1RM calculator, maintenance calories calculator, and contact form feedback)
*/

document.addEventListener("DOMContentLoaded", function () {

    // 1RM CALCULATOR (Epley formula)
    const oneRmForm = document.getElementById("oneRmForm");
    if (oneRmForm) {
        const weightInput = document.getElementById("oneRmWeight");
        const repsInput = document.getElementById("oneRmReps");
        const resultEl = document.getElementById("oneRmResult");
        const calcBtn = document.getElementById("oneRmCalculate");

        calcBtn.addEventListener("click", function () {
            const weight = parseFloat(weightInput.value);
            const reps = parseInt(repsInput.value, 10);

            if (isNaN(weight) || weight <= 0 || isNaN(reps) || reps <= 0) {
                resultEl.textContent = "Please enter a positive weight and reps.";
                resultEl.classList.remove("text-success");
                resultEl.classList.add("text-warning");
                return;
            }

            // Epley: 1RM = weight × (1 + reps / 30)
            const oneRm = weight * (1 + reps / 30);
            const rounded = Math.round(oneRm);

            resultEl.textContent = `Estimated 1RM: ~${rounded} (${oneRm.toFixed(1)} exact)`;
            resultEl.classList.remove("text-warning");
            resultEl.classList.add("text-success");
        });
    }

    // MAINTENANCE CALORIES CALCULATOR (Mifflin–St Jeor)
    const mcForm = document.getElementById("maintenanceForm");
    if (mcForm) {
        const sexEl = document.getElementById("mcSex");
        const ageEl = document.getElementById("mcAge");
        const heightEl = document.getElementById("mcHeight");
        const weightEl = document.getElementById("mcWeight");
        const activityEl = document.getElementById("mcActivity");
        const mcResultEl = document.getElementById("mcResult");
        const mcBtn = document.getElementById("mcCalculate");

        mcBtn.addEventListener("click", function () {
            const sex = sexEl.value;
            const age = parseInt(ageEl.value, 10);
            const height = parseFloat(heightEl.value);
            const weight = parseFloat(weightEl.value);
            const activity = activityEl.value;

            if (!sex || isNaN(age) || isNaN(height) || isNaN(weight) || !activity) {
                mcResultEl.textContent = "Please fill out all fields.";
                mcResultEl.classList.remove("text-success");
                mcResultEl.classList.add("text-warning");
                return;
            }

            // Mifflin–St Jeor (metric)
            let bmr;
            if (sex === "male") {
                bmr = 10 * weight + 6.25 * height - 5 * age + 5;
            } else {
                bmr = 10 * weight + 6.25 * height - 5 * age - 161;
            }

            let factor = 1.2;
            switch (activity) {
                case "light":
                    factor = 1.375;
                    break;
                case "moderate":
                    factor = 1.55;
                    break;
                case "very":
                    factor = 1.725;
                    break;
                case "extra":
                    factor = 1.9;
                    break;
            }

            const maintenance = Math.round(bmr * factor);
            mcResultEl.textContent =
                `Estimated maintenance: ~${maintenance} kcal/day (rough estimate).`;
            mcResultEl.classList.remove("text-warning");
            mcResultEl.classList.add("text-success");
        });
    }

    // CONTACT FORM FEEDBACK
    const contactForm =
        document.getElementById("contactForm") ||
        document.querySelector('form[aria-label="Contact form"]');

    if (contactForm) {
        contactForm.addEventListener("submit", function (event) {
            event.preventDefault();
            alert("Thanks for your message! This demo form doesn't send data, but your feedback would be appreciated if this were a real site.");
        });
    }
});
