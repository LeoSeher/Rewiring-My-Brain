// Load saved data from local storage or set defaults
let points = localStorage.getItem('points') ? parseInt(localStorage.getItem('points')) : 305;
let barsFulfilled = localStorage.getItem('barsFulfilled') ? parseInt(localStorage.getItem('barsFulfilled')) : 1;
let streak = localStorage.getItem('streak') ? parseInt(localStorage.getItem('streak')) : 20;
let starCount = localStorage.getItem('starCount') ? parseInt(localStorage.getItem('starCount')) : 1;
const totalPoints = 500;

// Function to update points and progress bar
function updateProgress() {
    document.getElementById('points').textContent = points;
    const progressPercent = (points / totalPoints) * 100;
    document.getElementById('progress').style.width = progressPercent + '%';

    // Update bars fulfilled and stars when reaching 500 points
    if (points >= totalPoints) {
        points = points - totalPoints;
        barsFulfilled++;
        starCount++;
        localStorage.setItem('barsFulfilled', barsFulfilled);
        localStorage.setItem('starCount', starCount);
        updateStars();
        updateRank();
    }

    // Save the current points to local storage
    localStorage.setItem('points', points);
    document.getElementById('barsFulfilled').textContent = barsFulfilled;
}

// Function to add points
function addPoints(value) {
    points += value;
    updateProgress();
}

// Function to subtract points
function subtractPoints(value) {
    if (points > 0) {
        points -= value;
        updateProgress();
    }
}

// Function to update stars
function updateStars() {
    let stars = '⭐'.repeat(starCount);  // Show stars based on starCount
    document.getElementById('stars').textContent = stars;
}

// Function to update rank based on points and stars
function updateRank() {
    let rank = 'Novice';
    if (starCount >= 2) rank = 'Advanced Beginner';
    if (starCount >= 4) rank = 'Competent';
    if (starCount >= 6) rank = 'Proficient';
    if (starCount >= 8) rank = 'Expert';
    if (starCount >= 10) rank = 'Master';
    if (starCount >= 12) rank = 'Supreme Expert';
    if (starCount >= 15) rank = 'Supreme Master';
    if (starCount >= 20) rank = 'Legend';
    if (starCount >= 30) rank = 'Supreme Legend';

    document.getElementById('rank').textContent = rank;
}

// Function to increase streak
function increaseStreak() {
    streak++;
    document.getElementById('streak').textContent = streak;
    animateFire();
    localStorage.setItem('streak', streak); // Save the streak to local storage
}

// Function to decrease streak
function decreaseStreak() {
    if (streak > 0) {
        streak--;
        document.getElementById('streak').textContent = streak;
        animateFire();
        localStorage.setItem('streak', streak); // Save the streak to local storage
    }
}

// Function to animate the fire icon briefly
function animateFire() {
    const fire = document.getElementById('fire');
    fire.style.color = 'orange';  // Change fire color to bright orange
    setTimeout(() => {
        fire.style.color = 'black';  // Return to normal after 2 seconds
    }, 2000);
}

// Initialize progress, stars, rank, and streak immediately after the page loads
window.onload = function() {
    updateProgress();
    updateStars();
    updateRank();
    document.getElementById('streak').textContent = streak;
    document.getElementById('barsFulfilled').textContent = barsFulfilled;
}
