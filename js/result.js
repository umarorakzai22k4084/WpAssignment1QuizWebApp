const urlParams = new URLSearchParams(window.location.search)
score = urlParams.get('score');
bonus = urlParams.get('bonus');
correctAnswer = urlParams.get('ans-correct');

const leaderboard = [
    [3460, 'Eliad Rosendorfer'],
    [6000, 'Julie Betz'],
    [4500, 'AnnieM'],
    [6500, 'Jonathan Porter'],
    [4500, 'Alexa Richter'],
    [score, 'You'],
]

leaderboard.sort((a, b) => b[0] - a[0]);

document.getElementById('score-btn').addEventListener('click', () => {
    document.getElementById('leaderboard-tab').hidden = true;
    document.getElementById('score-tab').hidden = false;

    document.getElementById('leaderboard-btn').parentElement.classList.add('border-bottom-0');
    document.getElementById('score-btn').parentElement.classList.remove('border-bottom-0');
});

document.getElementById('leaderboard-btn').addEventListener('click', () => {
    document.getElementById('score-tab').hidden = true;
    document.getElementById('leaderboard-tab').hidden = false;

    document.getElementById('score-btn').parentElement.classList.add('border-bottom-0');
    document.getElementById('leaderboard-btn').parentElement.classList.remove('border-bottom-0');
});

document.getElementById('questions-solved').innerText = `${correctAnswer}/14`;

document.getElementsByClassName('points')[0].innerText = `${score} points`;
document.getElementsByClassName('points')[1].innerText = score;
document.getElementById('point').innerText = score;

const table = document.getElementById('table');
var tableHtml = '';

for(let i = 0; i < leaderboard.length; i++){
    tableHtml = `${tableHtml}
    <tr>
        <td>${leaderboard[i][1]}</td>
        <td>${leaderboard[i][0]}</td>
    </tr>`
}

table.innerHTML = tableHtml;

document.getElementById('correct').innerText = `${correctAnswer} Correct`;
document.getElementById('score').innerText = `${score - bonus} Points`;
document.getElementById('bonus').innerText = `${bonus} Points`;