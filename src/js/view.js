export function renderQuizCard(quizCardDOM, questionObj) {
    const questionDiv = quizCardDOM.querySelector(".question");
    const option1 = quizCardDOM.querySelector(".option1");
    const option2 = quizCardDOM.querySelector(".option2");
    const option3 = quizCardDOM.querySelector(".option3");
    const option4 = quizCardDOM.querySelector(".option4");
    const options = quizCardDOM.querySelector(".options");

    const questionNo =
        questionObj.category === "music"
            ? questionObj.id
            : questionObj.category === "modern-art"
            ? questionObj.id - 10
            : questionObj.category === "coding"
            ? questionObj.id - 20
            : false;

    questionDiv.innerText = `Que. ${questionNo}: ${questionObj.question}`;
    option1.innerText = questionObj.options[0];
    option2.innerText = questionObj.options[1];
    option3.innerText = questionObj.options[2];
    option4.innerText = questionObj.options[3];

    if (questionObj.answered) {
        const optionNo =
            questionObj.options.findIndex(
                (el) => el === questionObj["answered"]
            ) + 1;
        console.log(optionNo);
        const optionsNodeList = options.querySelectorAll("div");
        optionsNodeList.forEach((element) => {
            element.classList.remove("selected");
        });

        console.log(options.querySelector(`.option${optionNo}`));
        options.querySelector(`.option${optionNo}`).classList.add("selected");
    } else {
        const optionsNodeList = options.querySelectorAll("div");
        optionsNodeList.forEach((element) => {
            element.classList.remove("selected");
        });
    }
}
