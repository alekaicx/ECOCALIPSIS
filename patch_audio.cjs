const fs = require('fs');
let code = fs.readFileSync('src/components/MiniGame.tsx', 'utf8');

code = code.replace(
    /this.bgmAudio = new Audio\("https:\/\/upload.wikimedia.org\/wikipedia\/commons\/d\/d4\/Beethoven_Moonlight_3rd_movement.ogg"\);/,
    'this.bgmAudio = new Audio("https://upload.wikimedia.org/wikipedia/commons/d/d4/Beethoven_Moonlight_3rd_movement.ogg");\n    this.bgmAudio.preload = "auto";'
);

code = code.replace(
    /bgmAudioRef.current = new Audio\("https:\/\/upload.wikimedia.org\/wikipedia\/commons\/c\/c0\/Rimsky-Korsakov_-_flight_of_the_bumblebee.oga"\);/,
    'bgmAudioRef.current = new Audio("https://upload.wikimedia.org/wikipedia/commons/c/c0/Rimsky-Korsakov_-_flight_of_the_bumblebee.oga");\n            bgmAudioRef.current.preload = "auto";'
);

fs.writeFileSync('src/components/MiniGame.tsx', code);
