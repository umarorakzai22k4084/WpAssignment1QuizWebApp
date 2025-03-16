questionAndAnswers = {
    1: {
        "question": "Never Eat Shredded Wheat",
        "choices": ["compass directions", "ancient grains", "presidents on Mount Rushmore", "Allied powers in World War II"],
        "answer": 1,
        'explain': 'Starting at the top and going clockwise, compass directions are north, east, south, and west.'
    },
    2: {
        "question": "My Very Educated Mother Just Served Us Nachos",
        "choices": ["famous chefs", "types of cuisine", "order of planets", "Greek mythology titans"],
        "answer": 3,
        "explain": "This mnemonic helps remember the order of the planets from the Sun: Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune.",
    },
    3: {
        "question": "King Philip Came Over For Good Soup",
        "choices": ["order of taxonomy", "medieval kings", "Shakespearean plays", "famous scientists"],
        "answer": 2,
        "explain": "Used in biology to remember taxonomic ranks: Kingdom, Phylum, Class, Order, Family, Genus, Species."
    },
    4: {
        "question": "Please Excuse My Dear Aunt Sally",
        "choices": ["math order of operations", "famous aunts in literature", "historical apologies", "Shakespearean characters"],
        "answer": 1,
        "explain": "This mnemonic helps recall the order of operations in math: Parentheses, Exponents, Multiplication, Division, Addition, Subtraction (PEMDAS)."
    },
    5: {
        "question": "Richard Of York Gave Battle In Vain",
        "choices": ["colors of the rainbow", "British generals", "Shakespearean tragedies", "famous explorers"],
        "answer": 1,
        "explain": "Each word represents the first letter of the colors in a rainbow: Red, Orange, Yellow, Green, Blue, Indigo, Violet (ROYGBIV)."
    },
    6: {
        "question": "SOH CAH TOA",
        "choices": ["ancient tribes", "scientific discoveries", "types of volcanoes", "trigonometry ratios"],
        "answer": 4,
        "explain": "A mnemonic to remember sine, cosine, and tangent ratios: Sine = Opposite/Hypotenuse, Cosine = Adjacent/Hypotenuse, Tangent = Opposite/Adjacent."
    },
    7: {
        "question": "Every Good Boy Deserves Fudge",
        "choices": ["musical notes", "types of desserts", "famous chefs", "French revolution figures"],
        "answer": 1,
        "explain": "This mnemonic helps musicians remember the notes on the treble clef lines: E, G, B, D, F."
    },
    8: {
        "question": "HOMES",
        "choices": ["types of houses", "Shakespearean plays", "Great Lakes", "famous rivers"],
        "answer": 3,
        "explain": "This stands for the five Great Lakes: Huron, Ontario, Michigan, Erie, Superior."
    },
    9: {
        "question": "BODMAS",
        "choices": ["math order of operations", "types of bacteria", "ancient philosophers", "parts of speech"],
        "answer": 1,
        "explain": "BODMAS stands for Brackets, Orders (i.e., exponents), Division, Multiplication, Addition, and Subtraction, used for solving math equations."
    },
    10: {
        "question": "FANBOYS",
        "choices": ["famous actors", "coordinating conjunctions", "sports teams", "types of weather patterns"],
        "answer": 2,
        "explain": "FANBOYS stands for the coordinating conjunctions: For, And, Nor, But, Or, Yet, So."
    },
    11: {
        "question": "Big Elephants Can Always Understand Small Elephants",
        "choices": ["spelling 'because'", "types of elephants", "zoo classifications", "famous animal trainers"],
        "answer": 1,
        "explain": "This mnemonic helps in remembering the spelling of 'because': B-E-C-A-U-S-E."
    },
    12: {
        "question": "OIL RIG",
        "choices": ["redox reactions", "types of machinery", "historical events", "ocean currents"],
        "answer": 1,
        "explain": "'OIL RIG' stands for 'Oxidation Is Loss, Reduction Is Gain' in chemistry, describing electron transfer in redox reactions."
    },
    13: {
        "question": "Dear King Philip Came Over For Good Soup",
        "choices": ["biological classification", "medieval royalty", "Greek philosophers", "ancient trade routes"],
        "answer": 2,
        "explain": "This mnemonic helps remember the taxonomic hierarchy: Domain, Kingdom, Phylum, Class, Order, Family, Genus, Species."
    },
    14: {
        "question": "ABC",
        "choices": ["alphabet order", "musical scales", "famous TV networks", "CPR steps"],
        "answer": 4,
        "explain": "ABC stands for Airway, Breathing, and Circulation, the steps used in CPR and first aid."
    }
}

var score = 0;
var selected = false;
var interval;
var questionNumber = 1;
var answerIndex = 0;
var timeBonusVal = 0;
var ansCorrect = 0;
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString)
const timeBonus = urlParams.get('timebonus') !== null;
const choices = document.getElementById('choices').children;
const qNumber = document.getElementById('no-of-questions').getElementsByTagName('strong')[0];
const nextButton = document.getElementById('next');
const explain = document.getElementById('explain');
const form = document.getElementById('form');

if(!timeBonus){
    document.getElementById('timer').remove();
}

function questionEnd(answerNumber, intervalNumber){
    isSuccess = answerNumber === answerIndex;
    selected = true;
    choices[answerIndex - 1].classList.add('border-success');
    if(!isSuccess && answerNumber !== -1){
        choices[answerNumber - 1].classList.add('border-danger');
    }

    clearInterval(intervalNumber);
    let add = 0;
    if (isSuccess) {
        add = 400;
        timeBonusVal += timeBonus ? 100 : 0;
        add += timeBonus ? 100 : 0;
        ansCorrect++;
    }
    
    score += add;
    document.getElementsByClassName('score')[0].getElementsByTagName('strong')[0].innerText = score;

    if(timeBonus) {
        succ = document.getElementById('timer').getElementsByTagName('div')[0];
        succ.innerText = `+${add}`;
        succ.classList.add(add === 0 ? 'bg-danger' : 'bg-success');
    }
    
    explain.hidden = false;
    if(questionNumber < 14){
        nextButton.hidden = false;
    } else {
        form.hidden = false;
        document.getElementById('score').value = score;
        document.getElementById('bonus').value = timeBonusVal;
        document.getElementById('ans-correct').value = ansCorrect;
    }
}

for (let i = 0; i < choices.length; i++) {
    const choice = choices[i];

    const handleSelect = () => {
        if(!selected){
            questionEnd(i + 1, interval);
        }
    };

    choice.addEventListener('click', handleSelect);
}

nextButton.addEventListener('click', () => {
    questionNumber++;

    for(let i = 0; i < choices.length; i++){
        const choice = choices[i];
        if(choice.classList.contains('border-success')){
            choice.classList.remove('border-success');
        }
        if(choice.classList.contains('border-danger')){
            choice.classList.remove('border-danger');
        }
    }

    if(timeBonus){
        succ = document.getElementById('timer').getElementsByTagName('div')[0];
        succ.innerText = '';
        if(succ.classList.contains('bg-success')){
            succ.classList.remove('bg-success');
        }
        if(succ.classList.contains('bg-danger')){
            succ.classList.remove('bg-danger');
        }
    }

    qNumber.innerText = questionNumber;
    
    startQuestion(questionNumber);
});

function startQuestion(questionNumber){
    nextButton.hidden = true;
    explain.hidden = true;
    if(timeBonus){
        time = 30;
        timer = document.getElementById('timer').getElementsByTagName('strong')[0]
        
        timer.innerText = time;
        time--;

        interval = setInterval(() => {
            timer.innerText = time;
            time--;
            if(time === -1){
                questionEnd(-1, interval);
            };
        }, 1000);
    }

    question = questionAndAnswers[questionNumber];
    answerIndex = question.answer;
    document.getElementById('sentence').innerText = question.question;

    selected = false;
    for(let i in [0, 1, 2, 3]){
        choices[i].innerText = question.choices[i];
    }
    explain.getElementsByTagName('p')[0].innerText = question.explain;
}

startQuestion(questionNumber);