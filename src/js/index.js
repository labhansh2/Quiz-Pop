import { store, fetch } from "./localData";
import { renderQuizCard } from "./view";
import { scoreCount, verifyAllAnswered } from "./score";
import data from "./dataset.json";

if (!fetch(`Music`)) {
    store("Music", data.music);
}
if (!fetch(`Modern Art`)) {
    store("Modern Art", data["modern-art"]);
}
if (!fetch("Coding")) {
    store("Coding", data.coding);
}

// index.html
const taskOptions = document.querySelector(".topic-options");

// quiz-instructions.html
const topicEntry = document.querySelector(".quiz-topic-entry");

// quiz.html
const quizCard = document.querySelector(".quizCard");
const questionContent = document.querySelector(".question-content");

// score.html
const infoCard = document.querySelector(".infoCard");

if (taskOptions) {
    taskOptions.addEventListener("click", function (event) {
        store("current", event.target.innerText);
    });

    // taskOptions.addEventListener("click", function (event) {
    //     if (event.target.classList.contains("resetBtn")) {
    //         window.localStorage.clear();

    //         taskOptions.querySelector(".option1").classList.remove("done");
    //         taskOptions.querySelector(".option2").classList.remove("done");
    //         taskOptions.querySelector(".option3").classList.remove("done");

    //         store("Music", data.music);
    //         store("Modern Art", data["modern-art"]);
    //         store("Coding", data.coding);
    //     }
    // });

    if (verifyAllAnswered(fetch("Music"))) {
        taskOptions.querySelector(".option1").classList.add("done");
    }
    if (verifyAllAnswered(fetch("Modern Art"))) {
        taskOptions.querySelector(".option2").classList.add("done");
    }
    if (verifyAllAnswered(fetch("Coding"))) {
        taskOptions.querySelector(".option3").classList.add("done");
    }
}

if (topicEntry) {
    topicEntry.innerHTML = fetch("current");
    // store('current', fetch('current').)
}

if (quizCard) {
    // render 1st question
    const current = fetch("current");
    let categoryObj = fetch(current);
    if (!fetch(`currentQNO-${current}`)) {
        store(`currentQNO-${current}`, 0);
    }
    renderQuizCard(quizCard, fetch(current)[fetch("currentQNO")]);

    quizCard.addEventListener("click", function (event) {
        if (event.target.parentElement.classList.contains("options")) {
            // update data
            categoryObj[fetch("currentQNO")]["answered"] =
                event.target.innerText;
            store(current, categoryObj);
            // update ui for option div
            renderQuizCard(quizCard, fetch(current)[fetch("currentQNO")]);
        }
    });

    quizCard.addEventListener("click", function (event) {
        if (event.target.classList.contains("prev")) {
            if (fetch("currentQNO") > 0) {
                store("currentQNO", fetch("currentQNO") - 1);
                renderQuizCard(quizCard, fetch(current)[fetch("currentQNO")]);
            }
            if (
                fetch(current).every((element) => {
                    element.answered;
                })
            ) {
                quizCard.querySelector(
                    ".navigationBtns"
                ).innerHTML = `<button class="prev">Previous Question</button>
                             <a href="./score.html"
                             ><button class="next">Submit</button></a
                         >`;
            }
        }
        if (event.target.classList.contains("next")) {
            if (fetch("currentQNO") < 9) {
                store("currentQNO", fetch("currentQNO") + 1);
                renderQuizCard(quizCard, fetch(current)[fetch("currentQNO")]);
            }
            if (verifyAllAnswered(fetch(current))) {
                quizCard.querySelector(
                    ".navigationBtns"
                ).innerHTML = `<button class="prev">Previous Question</button>
                             <a href="./score.html"
                             ><button class="next">Submit</button></a
                         >
                         <button class="next">Next</button>`;
            }
        }
    });
}

if (infoCard) {
    infoCard.querySelector(".total-correct").innerText = scoreCount(
        fetch("current")
    );
    infoCard.querySelector(".total-incorrect").innerText =
        10 - scoreCount(fetch("current"));
    infoCard.querySelector(".total-marks").innerText =
        scoreCount(fetch("current")) * 10;
}
