// Removes the "playing" class from the element 
// so that the styling is not shown until the key is pressed again.
function removeTransition(e) {
    if (e.propertyName !== 'transform') return; 
    e.target.classList.remove('playing');
}

// Plays the corresponding sound when a key is pressed.
function playSound(e) {
    // Selects the audio and div elements with matching data-key attributes.
    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`); 
    const key = document.querySelector(`div[data-key="${e.keyCode}"]`); 

    // If no matching audio element is found, exit the function.
    if (!audio) return; 

    // Adds the "playing" class to apply visual styling to the pressed key.
    key.classList.add('playing'); 
    
    // Resets the audio playback to the beginning.
    audio.currentTime = 0; 
    
    // Plays the audio.
    audio.play(); 

    // Removes the "playing" class when the audio has finished playing.
    // The {once: true} option ensures the listener is removed after execution.
    audio.addEventListener('ended', () => { 
        key.classList.remove('playing');
    }, { once: true }); 
}

  // Selects all elements with the "key" class and converts them into an array.
const keys = Array.from(document.querySelectorAll('.key'));

  // Adds a "transitionend" event listener to each key element 
  // to trigger the removal of the "playing" class after the transition ends.
keys.forEach(key => key.addEventListener('transitionend', removeTransition));

  // Adds a "keydown" event listener to the entire window to trigger 
  // the playSound function whenever a key is pressed.
window.addEventListener('keydown', playSound);