document.getElementById('time-bonus').addEventListener('click', (ent) => {
    timeBonus = document.getElementById('time-bonus');
    val = timeBonus.value;
    timeBonus.value = val === "off" ? "on" : "off";
})

document.getElementById('start').addEventListener('click', () => {
    timeBonus = document.getElementById('time-bonus');
})

// document.getElementById('start').addEventListener