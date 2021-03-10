const Timr = require('timrjs');

console.log('starting Pomodoro');

startPomodoro();

function startPomodoro() {
    // Create empty array to hold total pomodoro sessions.
    let totalPomodoros = [0];

    // call function to start the Pomodoro session.
    pomodoro('25m');

    function pomodoro(duration) {
        // Countdown for time equal to duration.
        let timer = Timr(duration);
        timer.start();
        console.log('\n----------\nStarting Pomodoro session, focus for 25 minutes\n');
        timer.ticker(( {formattedTime, percentDone}) => {
        // Show time remaining and percent done.
        process.stdout.write(`Time left: ${formattedTime} | ${percentDone} % complete \r`);
        });

        // When countdown is complete.
        timer.finish((self) => {
        // Increment the total Pomodoros.
        totalPomodoros[0]++;
        console.log(`\nWell done! You have completed ${totalPomodoros[0]} in this session \n----------`);

        // Call the appropriate break.
        totalPomodoros[0] % 4 === 0 ? longBreak() : shortBreak();
        });
    };

    function shortBreak() {
        console.log('Short break,relax for 5 minutes');
        countdownBreak('5');
    };

    function longBreak() {
        console.log('Long break,relax for 15 minutes');
        countdownBreak('15');
    };

    function countdownBreak(duration) {
        let timer = Timr(duration);
        timer.start();
        timer.ticker(({formattedTime, percentDone}) => {
        process.stdout.write(`\Rest for: ${formattedTime}\r`);
        })
    
        timer.finish(() => {
            console.log(`now that you are fresh, let's work!`);
        pomodoro('25m');
        });
    } 
}