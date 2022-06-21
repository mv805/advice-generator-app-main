const AdviceArea = () => {

    const adviceBox = document.createElement('div');
    adviceBox.classList.add('advice-container');
    adviceBox.innerHTML = `
    <div class="advice-number" id="advice-num"></div>
    <div class="advice-area">
    <p id="quote"></p>
    </div>
    <div class="divider">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="143 0 10 20">
        <g fill="none" fill-rule="evenodd">
        <path fill="#4F5D74" d="M0 8h122v1H0zM173 8h122v1H173z" />
        <g transform="translate(138)" fill="#CEE3E9">
            <rect width="6" height="16" rx="3" />
            <rect x="14" width="6" height="16" rx="3" />
        </g>
        </g>
    </svg>
    </div>`;

    const diceButton = document.createElement('button');
    diceButton.id = 'dice-button';
    diceButton.innerHTML = `
    <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg">
    <path
        d="M20 0H4a4.005 4.005 0 0 0-4 4v16a4.005 4.005 0 0 0 4 4h16a4.005 4.005 0 0 0 4-4V4a4.005 4.005 0 0 0-4-4ZM7.5 18a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm0-9a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm4.5 4.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm4.5 4.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm0-9a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Z"
        fill="#202733" />
    </svg>
    `;

    const attribution = document.createElement('div');
    attribution.classList.add('attribution');
    attribution.innerHTML = `
    Challenge by <a href="https://www.frontendmentor.io?ref=challenge"
    target="_blank">Frontend Mentor</a>.
    Coded by <a href="https://github.com/mv805">Matt Villa</a>.
    `;

    let quote;
    let adviceNum;

    const addBoxToDOM = () => {
        document.body.appendChild(adviceBox);
        document.body.appendChild(diceButton);
        document.body.appendChild(attribution);

        quote = document.querySelector('#quote');
        adviceNum = document.querySelector('#advice-num');

        _updateAdvice();
        _addAdviceEventToButton();
    };

    async function _generateAdvice() {

        // example json;
        // {
        //     "slip": {
        //         "id": "2",
        //         "advice": "Smile and the world smiles with you. Frown and you're on your own.";
        //     }
        // }

        const slipObject = await fetch(`https://api.adviceslip.com/advice`);
        const advice = await slipObject.json();

        console.log(advice);
        return advice;
    };

    async function _updateAdvice() {
        let adviceObject = await _generateAdvice();
        quote.textContent = `"${adviceObject.slip.advice}"`;
        adviceNum.textContent = `Advice #${adviceObject.slip.id}`;
    }

    const _addAdviceEventToButton = () => {
        diceButton.addEventListener('click', _updateAdvice);
    };

    return {
        addBoxToDOM,
    };
};

const initializeAdviceBox = (() => {

    const adviceArea = AdviceArea();
    adviceArea.addBoxToDOM();

})();
