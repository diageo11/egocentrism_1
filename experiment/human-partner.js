//<!DOCTYPE html>
//<html>
//
//
//
//
//<script>
var timeline = [];
var fills = [];
var tests = [];
var images = [];
var stimuli = [];
var counter = 0;
var mediaRecorder;
var ID = jsPsych.randomization.randomID(15);
var audioBlob;
var blobUrl;
var timeline = [];
    var parts = []

jsPsych.data.addProperties({
	subject: ID
});

var demo = `<div class='demographics'>
    <h1>Demographics Questionnaire</h1>
    <div class='form'>
        <label for='age'>Age: </label>
        <input type='number' id='age' name='age' min='18' max='100' required>
    </div>
    <div class='form'>
        <label for='nationality'>Nationality: </label>
        <input type='text' id='nationality' name='nationality' autocomplete="off">
    </div>
    <div class='form'>
        <label for='gender'>Gender: </label>
        <select id='gender' name='gender_drop' required>
            <option disabled selected value> -- select an option -- </option>
            <option>Prefer not to say</option>
            <option>Male</option>
            <option>Female</option>
            <option>Non-binary</option>
        </select>
    </div>
    <div class='form'>
        <label for='education'>What is the highest level of education completed? </label>
        <select id='education' name='education_drop' required>
            <option disabled selected value> -- select an option -- </option>
            <option>Prefer not to say</option>
            <option>Secondary or High School</option>
            <option>Vocational Qualification</option>
            <option>Bachelor's Degree</option>
            <option>Master's or Higher</option>
        </select>
    </div>
    <div class='form'>
        <label for='speech'>How often do you use speech agents like Alexa, Siri, or Google Assistant? </label>
        <select id='speech' name='speech_drop' required>
            <option disabled selected value> -- select an option -- </option>
            <option>Daily</option>
            <option>A few times per week</option>
            <option>A few times per month</option>
            <option>Rarely</option>
			<option>Never</option>
        </select>
    </div>
    <div class='form optionals hidden'>
        <label for='assistant'>Which of the following do you use most often: </label>
        <select id='assistant' name='assistant_drop'>
            <option disabled selected value> -- select an option -- </option>
            <option>Amazon Alexa</option>
            <option>Apple's Siri</option>
            <option>Google Assistant</option>
            <option>Cortana</option>
            <option>Other</option>
            <option>I don't use speech agents</option>
        </select>
    </div>
    <div class='form hidden' id='ass_holder'>
        <label for='other_ass'>Other assistant used: </label>
        <input type='text' id='other_ass' name='other_assistant' autocomplete="off">
    </div>
	 <div class='form'>
        <label for='partnerID'>I thought the partner I played the game with today was: </label>
        <select id='partnerID' name='partnerDrop' required>
            <option disabled selected value> -- select an option -- </option>
            <option>Another person</option>
            <option>A computer</option>
            <option>Not sure</option>
        </select>
    </div>

</div>`

var exclu = `
<div class='Exlusion'>
    <h1>Demographics Questionnaire</h1>
<div class='form'>
        <label for='native'>Are you a native speaker of British English? </label>
        <select id='native' name='native_speaker' required>
            <option disabled selected value> -- select an option -- </option>
            <option>Yes</option>
            <option>No</option>
        </select>
    </div>
    <div class='form'>
        <label for='vision'>Do you have normal to corrected vision? </label>
        <select id='vision' name='normal_vision' required>
            <option disabled selected value> -- select an option -- </option>
            <option>Yes</option>
            <option>No</option>
        </select>
    </div>
    <div class='form'>
        <label for='hearing'>Do you have normal to corrected hearing? </label>
        <select id='hearing' name='normal_hearing' required>
            <option disabled selected value> -- select an option -- </option>
            <option>Yes</option>
            <option>No</option>
        </select>
    </div>
    <div class='form'>
        <label for='impairment'>Do you suffer from a diagnosed speech or cognitive impairment? </label>
        <select id='impairment' name='impairment_condition' required>
            <option disabled selected value> -- select an option -- </option>
            <option>Yes</option>
            <option>No</option>
        </select>
    </div>
`

var mictest = `<body>
    <H1>Microphone Testing</H1>
    <p>To take part in this experiment you will require a working microphone. Please test your voice using the record button to make sure that your microphone works.</p>
    <button onclick='record()' id='record'>Record</button>
    <button onclick='stop()' id='stop' disabled>Stop</button>
    <h2>Information Logs</h2>
    <div id='logs'></div>
    <h2>Recordings</h2>
    <div id='recordings'></div>

    <div>
        <p>Please make sure to listen to a few recordings before you press continue. Make sure that you can clearly hear your voice at a regular volume.</p> <button onclick='startExperiment()' id='start' disabled>Continue</button>
    </div>
`

//DJR I wonder why img/stimuli/(1)sr.png (the small plane with a red border) is first in all these arrays?
var sr = ["img/stimuli/(1)sr.png",
          "img/stimuli/(1)sr.png",
"img/stimuli/(2)sr.png",
"img/stimuli/(3)sr.png",
"img/stimuli/(4)sr.png",
"img/stimuli/(5)sr.png",
"img/stimuli/(6)sr.png",
"img/stimuli/(7)sr.png",
"img/stimuli/(8)sr.png",
"img/stimuli/(9)sr.png",
"img/stimuli/(10)sr.png",
"img/stimuli/(11)sr.png",
"img/stimuli/(12)sr.png",
"img/stimuli/(13)sr.png"];
stimuli.push(sr);

var r = ["img/stimuli/(1)sr.png",
        "img/stimuli/(1)r.png",
"img/stimuli/(2)r.png",
"img/stimuli/(3)r.png",
"img/stimuli/(4)r.png",
"img/stimuli/(5)r.png",
"img/stimuli/(6)r.png",
"img/stimuli/(7)r.png",
"img/stimuli/(8)r.png",
"img/stimuli/(9)r.png",
"img/stimuli/(10)r.png",
"img/stimuli/(11)r.png",
"img/stimuli/(12)r.png",
"img/stimuli/(13)r.png"
    ];
stimuli.push(r);


var small = ["img/stimuli/(1)sr.png","img/stimuli/(1)s.png",
"img/stimuli/(2)s.png",
"img/stimuli/(3)s.png",
"img/stimuli/(4)s.png",
"img/stimuli/(5)s.png",
"img/stimuli/(6)s.png",
"img/stimuli/(7)s.png",
"img/stimuli/(8)s.png",
"img/stimuli/(9)s.png",
"img/stimuli/(10)s.png",
"img/stimuli/(11)s.png",
"img/stimuli/(12)s.png",
"img/stimuli/(13)s.png"];
stimuli.push(small);


var norm = ["img/stimuli/(1)sr.png","img/stimuli/(1).png",
"img/stimuli/(2).png",
"img/stimuli/(3).png",
"img/stimuli/(4).png",
"img/stimuli/(5).png",
"img/stimuli/(6).png",
"img/stimuli/(7).png",
"img/stimuli/(8).png",
"img/stimuli/(9).png",
"img/stimuli/(10).png",
"img/stimuli/(11).png",
"img/stimuli/(12).png",
"img/stimuli/(13).png"];
stimuli.push(norm);

var grey = ["img/stimuli/(1)sr.png","img/stimuli/(1)g.png",
"img/stimuli/(2)g.png",
"img/stimuli/(3)g.png",
"img/stimuli/(4)g.png",
"img/stimuli/(5)g.png",
"img/stimuli/(6)g.png",
"img/stimuli/(7)g.png",
"img/stimuli/(8)g.png",
"img/stimuli/(9)g.png",
"img/stimuli/(10)g.png",
"img/stimuli/(11)g.png",
"img/stimuli/(12)g.png",
"img/stimuli/(13)g.png"];
stimuli.push(grey);


var smallgrey = ["img/stimuli/(1)sr.png","img/stimuli/(1)sg.png",
"img/stimuli/(2)sg.png",
"img/stimuli/(3)sg.png",
"img/stimuli/(4)sg.png",
"img/stimuli/(5)sg.png",
"img/stimuli/(6)sg.png",
"img/stimuli/(7)sg.png",
"img/stimuli/(8)sg.png",
"img/stimuli/(9)sg.png",
"img/stimuli/(10)sg.png",
"img/stimuli/(11)sg.png",
"img/stimuli/(12)sg.png",
"img/stimuli/(13)sg.png"];
stimuli.push(smallgrey);

var audio = ["img/stimuli/(1)1.wav","img/stimuli/(1)2.wav","img/stimuli/(1)3.wav","img/stimuli/(1)4.wav",
"img/stimuli/(2)1.wav","img/stimuli/(2)2.wav","img/stimuli/(2)3.wav","img/stimuli/(2)4.wav",
"img/stimuli/(3)1.wav","img/stimuli/(3)2.wav","img/stimuli/(3)3.wav","img/stimuli/(3)4.wav",
"img/stimuli/(4)1.wav","img/stimuli/(4)2.wav","img/stimuli/(4)3.wav","img/stimuli/(4)4.wav",
"img/stimuli/(5)1.wav","img/stimuli/(5)2.wav","img/stimuli/(5)3.wav","img/stimuli/(5)4.wav",
"img/stimuli/(6)1.wav","img/stimuli/(6)2.wav","img/stimuli/(6)3.wav","img/stimuli/(6)4.wav",
"img/stimuli/(7)1.wav","img/stimuli/(7)2.wav","img/stimuli/(7)3.wav","img/stimuli/(7)4.wav",
"img/stimuli/(8)1.wav","img/stimuli/(8)2.wav","img/stimuli/(8)3.wav","img/stimuli/(8)4.wav",
"img/stimuli/(9)1.wav","img/stimuli/(9)2.wav","img/stimuli/(9)3.wav","img/stimuli/(9)4.wav",
"img/stimuli/(10)1.wav","img/stimuli/(10)2.wav","img/stimuli/(10)3.wav","img/stimuli/(10)4.wav",
"img/stimuli/(11)1.wav","img/stimuli/(11)2.wav","img/stimuli/(11)3.wav","img/stimuli/(11)4.wav",
"img/stimuli/(12)1.wav","img/stimuli/(12)2.wav","img/stimuli/(12)3.wav","img/stimuli/(12)4.wav",
"img/stimuli/(13)1.wav","img/stimuli/(13)2.wav","img/stimuli/(13)3.wav","img/stimuli/(13)4.wav"];

//DJR 'thisAudioSet' doesn't get used again. Redundant?
var thisAudioSet = audio;

var fills = []
var tests = []
var parts = []

var targetnums = [3, 4, 5, 6, 11, 12];
var fillernums = [1, 2, 7, 8, 9, 10, 13];

var Agrids = [
    [[0, smallgrey[targetnums[2]], 0, norm[fillernums[5]], 0],
    [1, grey[fillernums[0]], 1, 0, 0],
    [0, norm[targetnums[1]], r[targetnums[0]], 0, 0],
    [norm[fillernums[3]], 0, small[targetnums[1]], 0, 0],
    [norm[targetnums[2]], norm[fillernums[1]],
    norm[fillernums[4]], 0, norm[fillernums[2]]]],

    [[0, smallgrey[targetnums[2]], 0, norm[fillernums[5]], 0],
    [1, norm[fillernums[0]], 1, 0, 0],
    [0, sr[targetnums[1]], norm[targetnums[0]], 0, 0],
    [norm[fillernums[3]], 0, norm[targetnums[1]], 0, 0],
    [norm[targetnums[2]], grey[fillernums[1]],
    norm[fillernums[4]], 0, norm[fillernums[2]]]],

    [[0, grey[targetnums[2]], 0, norm[fillernums[5]], 0],
    [1, norm[fillernums[0]], 1, 0, 0],
    [0, norm[targetnums[1]], norm[targetnums[0]], 0, 0],
    [norm[fillernums[3]], 0, small[targetnums[1]], 0, 0],
    [sr[targetnums[2]], norm[fillernums[1]],
    norm[fillernums[4]], 0, grey[fillernums[2]]]],

    [[0, smallgrey[targetnums[2]], 0, norm[fillernums[5]], 0],
    [1, r[fillernums[0]], 1, 0, 0],
    [0, norm[targetnums[1]], norm[targetnums[0]], 0, 0],
    [grey[fillernums[3]], 0, small[targetnums[1]], 0, 0],
    [norm[targetnums[2]], norm[fillernums[1]],
    norm[fillernums[4]], 0, norm[fillernums[2]]]],

    [[0, smallgrey[targetnums[2]], 0, norm[fillernums[5]], 0],
    [1, norm[fillernums[0]], 1, 0, 0],
    [0, norm[targetnums[1]], norm[targetnums[0]], 0, 0],
    [norm[fillernums[3]], 0, small[targetnums[1]], 0, 0],
    [norm[targetnums[2]], r[fillernums[1]],
    grey[fillernums[4]], 0, norm[fillernums[2]]]],

    [[0, smallgrey[targetnums[2]], 0, grey[fillernums[5]], 0],
    [1, norm[fillernums[0]], 1, 0, 0],
    [0, norm[targetnums[1]], norm[targetnums[0]], 0, 0],
    [norm[fillernums[3]], 0, small[targetnums[1]], 0, 0],
    [norm[targetnums[2]], norm[fillernums[1]],
    norm[fillernums[4]], 0, r[fillernums[2]]]]
    ];

var Bgrids = [
    [[0, norm[targetnums[3]], norm[fillernums[3]], 0,
    norm[fillernums[2]]],
    [0, norm[fillernums[4]], r[targetnums[1]], 0, 0],
    [norm[fillernums[5]], 0, norm[targetnums[2]],
    grey[fillernums[1]], smallgrey[targetnums[3]]],
    [norm[fillernums[6]], 0, 0, 0, 0],
    [1, 0, 0, 1, small[targetnums[2]]]],

    [[0, norm[targetnums[3]], norm[fillernums[3]], 0,
    grey[fillernums[2]]],
    [0, norm[fillernums[4]], norm[targetnums[1]], 0, 0],
    [norm[fillernums[5]], 0, sr[targetnums[2]],
    norm[fillernums[1]], smallgrey[targetnums[3]]],
    [norm[fillernums[6]], 0, 0, 0, 0],
    [1, 0, 0, 1, norm[targetnums[2]]]],

    [[0, sr[targetnums[3]], grey[fillernums[3]], 0,
    norm[fillernums[2]]],
    [0, norm[fillernums[4]], norm[targetnums[1]], 0, 0],
    [norm[fillernums[5]], 0, norm[targetnums[2]],
    norm[fillernums[1]], grey[targetnums[3]]],
    [norm[fillernums[6]], 0, 0, 0, 0],
    [1, 0, 0, 1, small[targetnums[2]]]],

    [[0, norm[targetnums[3]], norm[fillernums[3]], 0,
    norm[fillernums[2]]],
    [0, grey[fillernums[4]], norm[targetnums[1]], 0, 0],
    [norm[fillernums[5]], 0, norm[targetnums[2]],
    r[fillernums[1]], smallgrey[targetnums[3]]],
    [norm[fillernums[6]], 0, 0, 0, 0],
    [1, 0, 0, 1, small[targetnums[2]]]],

    [[0, norm[targetnums[3]], norm[fillernums[3]], 0,
    r[fillernums[2]]],
    [0, norm[fillernums[4]], norm[targetnums[1]], 0, 0],
    [grey[fillernums[5]], 0, norm[targetnums[2]],
    norm[fillernums[1]], smallgrey[targetnums[3]]],
    [norm[fillernums[6]], 0, 0, 0, 0],
    [1, 0, 0, 1, small[targetnums[2]]]],

    [[0, norm[targetnums[3]], r[fillernums[3]], 0,
    norm[fillernums[2]]],
    [0, norm[fillernums[4]], norm[targetnums[1]], 0, 0],
    [norm[fillernums[5]], 0, norm[targetnums[2]],
    norm[fillernums[1]], smallgrey[targetnums[3]]],
    [grey[fillernums[6]], 0, 0, 0, 0],
    [1, 0, 0, 1, small[targetnums[2]]]]
    ];

var Cgrids = [

    [[small[targetnums[3]], 0, 0, norm[fillernums[3]], 0],
    [1, 0, norm[fillernums[0]], 0, norm[targetnums[3]]],
    [norm[fillernums[6]], grey[fillernums[2]], 0,
    r[targetnums[2]], 0],
    [norm[fillernums[4]], 1, 0, norm[fillernums[5]], 0],
    [0, smallgrey[targetnums[4]], 0, 0, norm[targetnums[4]]]],

    [[norm[targetnums[3]], 0, 0, grey[fillernums[3]], 0],
    [1, 0, norm[fillernums[0]], 0, sr[targetnums[3]]],
    [norm[fillernums[6]], norm[fillernums[2]], 0,
    norm[targetnums[2]], 0],
    [norm[fillernums[4]], 1, 0, norm[fillernums[5]], 0],
    [0, smallgrey[targetnums[4]], 0, 0, norm[targetnums[4]]]],

    [[small[targetnums[3]], 0, 0, norm[fillernums[3]], 0],
    [1, 0, norm[fillernums[0]], 0, norm[targetnums[3]]],
    [norm[fillernums[6]], norm[fillernums[2]], 0,
    norm[targetnums[2]], 0],
    [grey[fillernums[4]], 1, 0, norm[fillernums[5]], 0],
    [0, grey[targetnums[4]], 0, 0, sr[targetnums[4]]]],

    [[small[targetnums[3]], 0, 0, norm[fillernums[3]], 0],
    [1, 0, norm[fillernums[0]], 0, norm[targetnums[3]]],
    [norm[fillernums[6]], r[fillernums[2]], 0,
    norm[targetnums[2]], 0],
    [norm[fillernums[4]], 1, 0, grey[fillernums[5]], 0],
    [0, smallgrey[targetnums[4]], 0, 0, norm[targetnums[4]]]],

    [[small[targetnums[3]], 0, 0, r[fillernums[3]], 0],
    [1, 0, norm[fillernums[0]], 0, norm[targetnums[3]]],
    [grey[fillernums[6]], norm[fillernums[2]], 0,
    norm[targetnums[2]], 0],
    [norm[fillernums[4]], 1, 0, norm[fillernums[5]], 0],
    [0, smallgrey[targetnums[4]], 0, 0, norm[targetnums[4]]]],

    [[small[targetnums[3]], 0, 0, norm[fillernums[3]], 0],
    [1, 0, grey[fillernums[0]], 0, norm[targetnums[3]]],
    [norm[fillernums[6]], norm[fillernums[2]], 0,
    norm[targetnums[2]], 0],
    [r[fillernums[4]], 1, 0, norm[fillernums[5]], 0],
    [0, smallgrey[targetnums[4]], 0, 0, norm[targetnums[4]]]]
    ];

var Dgrids = [
    [[0, r[targetnums[3]], 0, 0, 0],
    [norm[targetnums[5]], 0, norm[fillernums[6]],
    norm[targetnums[4]], norm[fillernums[4]]],
    [0, 0, 1, norm[fillernums[5]], grey[fillernums[3]]],
    [norm[fillernums[1]], 1, small[targetnums[4]], 0,
    norm[fillernums[0]]],
    [0, 0, 0, smallgrey[targetnums[5]], 0]],

    [[0, norm[targetnums[3]], 0, 0, 0],
    [norm[targetnums[5]], 0, norm[fillernums[6]],
    sr[targetnums[4]], grey[fillernums[4]]],
    [0, 0, 1, norm[fillernums[5]], norm[fillernums[3]]],
    [norm[fillernums[1]], 1, norm[targetnums[4]], 0,
    norm[fillernums[0]]],
    [0, 0, 0, smallgrey[targetnums[5]], 0]],

    [[0, norm[targetnums[3]], 0, 0, 0],
    [sr[targetnums[5]], 0, norm[fillernums[6]],
    norm[targetnums[4]], norm[fillernums[4]]],
    [0, 0, 1, grey[fillernums[5]], norm[fillernums[3]]],
    [norm[fillernums[1]], 1, small[targetnums[4]], 0,
    norm[fillernums[0]]],
    [0, 0, 0, grey[targetnums[5]], 0]],

    [[0, norm[targetnums[3]], 0, 0, 0],
    [norm[targetnums[5]], 0, grey[fillernums[6]],
    norm[targetnums[4]], norm[fillernums[4]]],
    [0, 0, 1, norm[fillernums[5]], r[fillernums[3]]],
    [norm[fillernums[1]], 1, small[targetnums[4]], 0,
    norm[fillernums[0]]],
    [0, 0, 0, smallgrey[targetnums[5]], 0]],

    [[0, norm[targetnums[3]], 0, 0, 0],
    [norm[targetnums[5]], 0, norm[fillernums[6]],
    norm[targetnums[4]], r[fillernums[4]]],
    [0, 0, 1, norm[fillernums[5]], norm[fillernums[3]]],
    [norm[fillernums[1]], 1, small[targetnums[4]], 0,
    grey[fillernums[0]]],
    [0, 0, 0, smallgrey[targetnums[5]], 0]],

    [[0, norm[targetnums[3]], 0, 0, 0],
    [norm[targetnums[5]], 0, norm[fillernums[6]],
    norm[targetnums[4]], norm[fillernums[4]]],
    [0, 0, 1, r[fillernums[5]], norm[fillernums[3]]],
    [grey[fillernums[1]], 1, small[targetnums[4]], 0,
    norm[fillernums[0]]],
    [0, 0, 0, smallgrey[targetnums[5]], 0]]
    ];

var Egrids = [
    [[norm[targetnums[5]], 0, 0, norm[fillernums[1]], 0],
    [norm[fillernums[2]], 0, r[targetnums[4]], 0,
    small[targetnums[5]]],
    [1, norm[targetnums[0]], 0, 1, norm[fillernums[6]]],
    [0, 0, 0, 0, norm[fillernums[5]]],
    [grey[fillernums[4]], 0, norm[fillernums[0]],
    smallgrey[targetnums[0]], 0]],

    [[sr[targetnums[5]], 0, 0, norm[fillernums[1]], 0],
    [norm[fillernums[2]], 0, norm[targetnums[4]], 0,
    norm[targetnums[5]]],
    [1, norm[targetnums[0]], 0, 1, norm[fillernums[6]]],
    [0, 0, 0, 0, grey[fillernums[5]]],
    [norm[fillernums[4]], 0, norm[fillernums[0]],
    smallgrey[targetnums[0]], 0]],

    [[norm[targetnums[5]], 0, 0, norm[fillernums[1]], 0],
    [norm[fillernums[2]], 0, norm[targetnums[4]], 0,
    small[targetnums[5]]],
    [1, sr[targetnums[0]], 0, 1, grey[fillernums[6]]],
    [0, 0, 0, 0, norm[fillernums[5]]],
    [norm[fillernums[4]], 0, norm[fillernums[0]],
    grey[targetnums[0]], 0]],

    [[norm[targetnums[5]], 0, 0, norm[fillernums[1]], 0],
    [norm[fillernums[2]], 0, norm[targetnums[4]], 0,
    small[targetnums[5]]],
    [1, norm[targetnums[0]], 0, 1, norm[fillernums[6]]],
    [0, 0, 0, 0, norm[fillernums[5]]],
    [r[fillernums[4]], 0, grey[fillernums[0]],
    smallgrey[targetnums[0]], 0]],

    [[norm[targetnums[5]], 0, 0, grey[fillernums[1]], 0],
    [norm[fillernums[2]], 0, norm[targetnums[4]], 0,
    small[targetnums[5]]],
    [1, norm[targetnums[0]], 0, 1, norm[fillernums[6]]],
    [0, 0, 0, 0, r[fillernums[5]]],
    [norm[fillernums[4]], 0, norm[fillernums[0]],
    smallgrey[targetnums[0]], 0]],

    [[norm[targetnums[5]], 0, 0, norm[fillernums[1]], 0],
    [grey[fillernums[2]], 0, norm[targetnums[4]], 0,
    small[targetnums[5]]],
    [1, norm[targetnums[0]], 0, 1, r[fillernums[6]]],
    [0, 0, 0, 0, norm[fillernums[5]]],
    [norm[fillernums[4]], 0, norm[fillernums[0]],
    smallgrey[targetnums[0]], 0]]
    ];

var Fgrids = [

    [[norm[fillernums[2]], 1, 0, norm[targetnums[1]], 0],
    [0, r[targetnums[5]], norm[fillernums[1]],
    smallgrey[targetnums[1]], 0],
    [norm[fillernums[6]], 0, small[targetnums[0]], 0,
    norm[fillernums[0]]],
    [norm[fillernums[3]], 0, 0, 1, grey[fillernums[5]]],
    [0, 0, 0, 0, norm[targetnums[0]]]],

    [[norm[fillernums[2]], 1, 0, norm[targetnums[1]], 0],
    [0, norm[targetnums[5]], norm[fillernums[1]],
    smallgrey[targetnums[1]], 0],
    [grey[fillernums[6]], 0, norm[targetnums[0]], 0,
    norm[fillernums[0]]],
    [norm[fillernums[3]], 0, 0, 1, norm[fillernums[5]]],
    [0, 0, 0, 0, sr[targetnums[0]]]],

    [[norm[fillernums[2]], 1, 0, sr[targetnums[1]], 0],
    [0, norm[targetnums[5]], norm[fillernums[1]],
    grey[targetnums[1]], 0],
    [norm[fillernums[6]], 0, small[targetnums[0]], 0,
    grey[fillernums[0]]],
    [norm[fillernums[3]], 0, 0, 1, norm[fillernums[5]]],
    [0, 0, 0, 0, norm[targetnums[0]]]],

    [[norm[fillernums[2]], 1, 0, norm[targetnums[1]], 0],
    [0, norm[targetnums[5]], grey[fillernums[1]],
    smallgrey[targetnums[1]], 0],
    [norm[fillernums[6]], 0, small[targetnums[0]], 0,
    norm[fillernums[0]]],
    [norm[fillernums[3]], 0, 0, 1, r[fillernums[5]]],
    [0, 0, 0, 0, norm[targetnums[0]]]],

    [[grey[fillernums[2]], 1, 0, norm[targetnums[1]], 0],
    [0, norm[targetnums[5]], norm[fillernums[1]],
    smallgrey[targetnums[1]], 0],
    [r[fillernums[6]], 0, small[targetnums[0]], 0,
    norm[fillernums[0]]],
    [norm[fillernums[3]], 0, 0, 1, norm[fillernums[5]]],
    [0, 0, 0, 0, norm[targetnums[0]]]],

    [[norm[fillernums[2]], 1, 0, norm[targetnums[1]], 0],
    [0, norm[targetnums[5]], norm[fillernums[1]],
    smallgrey[targetnums[1]], 0],
    [norm[fillernums[6]], 0, small[targetnums[0]], 0,
    r[fillernums[0]]],
    [grey[fillernums[3]], 0, 0, 1, norm[fillernums[5]]],
    [0, 0, 0, 0, norm[targetnums[0]]]]
    ];

var practicegrids = [
    [[0, norm[fillernums[2]], 0, small[targetnums[3]], 0],
       [norm[targetnums[2]], norm[targetnums[4]],
        norm[fillernums[0]], norm[fillernums[5]], 0],
       [smallgrey[targetnums[5]], 0, 0, 1, 0],
       [norm[targetnums[1]], 0, 1, 0, norm[fillernums[4]]],
       [norm[fillernums[1]], norm[fillernums[3]], 0, 0,
        r[targetnums[0]]]],
    
    [[norm[targetnums[4]], norm[fillernums[3]],
        norm[targetnums[0]], 0, 1],
       [0, norm[fillernums[2]], 0, norm[fillernums[6]],
        smallgrey[targetnums[5]]],
       [r[targetnums[1]], 0, small[targetnums[3]], 0, 0],
       [norm[fillernums[4]], norm[fillernums[5]],
        norm[fillernums[1]], 0, 0],
       [0, 1, 0, 0, norm[targetnums[2]]]],
    
    [[0, norm[fillernums[3]], norm[fillernums[5]], 0, 0],
       [0, r[targetnums[2]], norm[fillernums[2]], 0,
        norm[targetnums[0]]],
       [0, 0, norm[targetnums[4]], 1, 1],
       [norm[fillernums[4]], 0, 0, norm[targetnums[1]], 0],
       [norm[fillernums[6]], norm[fillernums[0]],
        small[targetnums[3]], 0, smallgrey[targetnums[5]]]],
    
    [[0, 0, smallgrey[targetnums[5]], norm[fillernums[5]],
        norm[fillernums[1]]],
       [0, 0, 0, 1, norm[fillernums[4]]],
       [small[targetnums[2]], 0, norm[fillernums[3]],
        norm[targetnums[1]], 0],
       [norm[fillernums[0]], 0, 0, 0, norm[targetnums[0]]],
       [norm[targetnums[4]], 1, norm[fillernums[6]],
        r[targetnums[3]], 0]],
    
    [[0, norm[fillernums[1]], 0, norm[targetnums[0]],
        norm[targetnums[3]]],
       [norm[fillernums[5]], 1, norm[fillernums[4]], 0,
        norm[fillernums[6]]],
       [0, 0, norm[fillernums[3]], 1, 0],
       [small[targetnums[2]], 0, 0, norm[fillernums[0]],
        r[targetnums[4]]],
       [0, 0, smallgrey[targetnums[5]], norm[targetnums[1]], 0]],
    
    [[norm[targetnums[1]], 0, 0, 0, 0],
       [norm[fillernums[5]], 0, norm[targetnums[3]],
        norm[fillernums[0]], 0],
       [1, norm[fillernums[4]], 1, smallgrey[targetnums[4]], 0],
       [norm[fillernums[1]], 0, small[targetnums[2]], 0, 0],
       [norm[targetnums[0]], 0, norm[fillernums[2]],
        r[targetnums[5]], norm[fillernums[6]]]]
    
];

function getTargetObject(grid){
    var targetIndex = 0;
    for(var i = 0; i < grid.length; i++){
        for(var j = 0; j < grid[i].length; j++){
            if(r.includes(grid[i][j])){
                targetIndex = r.indexOf(grid[i][j]);
                break;
            }
            if(sr.includes(grid[i][j])){
                targetIndex = sr.indexOf(grid[i][j]);
                break;
            }
        }
    }
    return targetIndex; 
}

function listComparator(list1, list2){
    for(var i = 0; i < list1.length; i++){
        if(list1[i] == list2[i])
            return true;
    }
    return false;
}
//What we'll need to do here is ensure that the grid that ends up at twovisgrids[x] doesn't have the same target 
//as that which ends up at twoprivgrids[x] 
var twovisgrids = jsPsych.randomization.shuffle([
        Agrids[1], Bgrids[1], Cgrids[1], Dgrids[1], Egrids[1], Fgrids[1]
    ]);
//Make a list of the target object numbers for twovisgrids
var twovistargets = twovisgrids.map(x => getTargetObject(x));
console.log('twovistargets: ');
console.log(twovistargets);

var twoprivgrids;
//Keep shuffling twoprivgrids until the list of target object numbers has no mapping with twovistargets
do{
twoprivgrids = jsPsych.randomization.shuffle([
        Agrids[2], Bgrids[2], Cgrids[2], Dgrids[2], Egrids[2], Fgrids[2]
    ]);
}while(listComparator(twovistargets,twoprivgrids.map(x => getTargetObject(x))));

var twoprivtargets = twoprivgrids.map(x => getTargetObject(x));
console.log('twoprivtargets: ');
console.log(twoprivtargets);

var oneobjgrids;
//And again, keep shuffling oneobjgrids until the mapped list of target object numbers has no 
//correspondence with twoprivtargets OR with twovistargets
do{
var oneobjgrids = jsPsych.randomization.shuffle([
    Agrids[0], Bgrids[0], Cgrids[0], Dgrids[0], Egrids[0], Fgrids[0]
    ]);
}
while(listComparator(twoprivtargets,oneobjgrids.map(x => getTargetObject(x))) || listComparator(twovistargets,oneobjgrids.map(x => getTargetObject(x))));
var oneobjtargets = oneobjgrids.map(x => getTargetObject(x));

console.log("RESULTS");
console.log(twovistargets);
console.log(twoprivtargets);
console.log(oneobjtargets);

var fillergrids = jsPsych.randomization.shuffle([
        Agrids[3], Agrids[4], Agrids[5], Bgrids[3], Bgrids[4], Bgrids[5], Cgrids[3], Cgrids[4], Cgrids[5], Dgrids[3], Dgrids[4], Dgrids[5], Egrids[3], Egrids[4], Egrids[5], Fgrids[3], Fgrids[4], Fgrids[5]
    ]);


var partnergrid = function() {
        var filleroptions = jsPsych.randomization.shuffle(fillernums);
        var targetoptions = jsPsych.randomization.shuffle(targetnums);
        var grid = [
       
        [norm[filleroptions[0]], norm[filleroptions[1]], norm[filleroptions[2]], norm[filleroptions[3]], norm[filleroptions[4]]],
        [norm[filleroptions[5]], 1, 1, norm[filleroptions[6]], small[targetoptions[3]]],
        [grey[targetoptions[0]], grey[targetoptions[1]], small[targetoptions[2]], 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0]
    ];
        return shuffled(grid);
    }

var fillparts = function (){
        for (var i=0;i<=150;i++){
            parts[i] = partnergrid();
        }
    };

var spartner = function(){
    return shuffled(getone(parts));};
    
    var getone = function(array){
        var theone = array[partnercounter];
        partnercounter+=1;
        return theone;
    };

var onecounter = 0;
var twocounter = 0;
var privcounter = 0;
var fillercounter = 0;
var partnercounter = 0;
var praccounter = 0;


var getonegrid = function () {
    var thegrid = oneobjgrids[onecounter];
    onecounter += 1;
    return thegrid;
};

var gettwovisgrid = function () {
    var thegrid = twovisgrids[twocounter];
    twocounter += 1;
    return thegrid;
};

var gettwoprivgrid = function () {
    var thegrid = twoprivgrids[privcounter];
    privcounter += 1;
    return thegrid;
};

var getfillergrid = function () {
    var thegrid = fillergrids[fillercounter];
    fillercounter += 1;
    return thegrid;
};

var getpracticegrid = function () {
    var thegrid = practicegrids[praccounter];
    praccounter += 1;
    return thegrid;
};

var timedcircle = {
    type: 'categorize-html',
    stimulus: "<div style=\"display:block; margin:100px;font-size:36px;text-align:center; font-family:'Lucida Sans Unicode', 'Lucida Grande', sans-serif\">Finding a partner...</div><div class=\"wrapper\"><div class=\"left\"></div><div class=\"right\"></div><div class=\"rotate\"></div></div>",
    key_answer: jsPsych.NO_KEYS,
    choices: jsPsych.NO_KEYS,
    show_feedback_on_timeout: true,
    show_stim_with_feedback: false,
    correct_text: "Partner found. Practice beginning in a moment",
    timeout_message: "Partner found. Practice beginning in a moment",
    incorrect_text: "Partner found. Practice beginning in a moment",
    stimulus_duration: 5000,
    trial_duration: 5000,
    feedback_duration: 5000
};

var practiceproc = {
    type: "show-grid",
    stimuli: getpracticegrid,
    condition: "filler",
    image_size: [150, 150],
    response_ends_trial: true,
    choices: "t"
};


 var initialize = {
        type: "call-function",
        func: fillparts
    };

    var shuffled = function (somegrid) {
        output = somegrid.flat();
        var shuf = jsPsych.randomization.shuffle(output);
        var newArr = [];
        while(shuf.length) newArr.push(shuf.splice(0,5)); 
        return newArr;    
    };
    


var oneproc = {
    type: "show-grid",
    stimuli: getonegrid,
    condition: "onetarget",
    image_size: [150, 150],
    response_ends_trial: true,
    choices: "t"
};

var twovisproc = {
    type: "show-grid",
    stimuli: gettwovisgrid,
    condition: "twovis",
    image_size: [150, 150],
    response_ends_trial: true,
    choices: "t"
};

var twoprivproc = {
    type: "show-grid",
    stimuli: gettwoprivgrid,
    condition: "twopriv",
    image_size: [150, 150],
    response_ends_trial: true,
    choices: "t"
};

var fillerproc = {
    type: "show-grid",
    stimuli: getfillergrid,
    condition: "filler",
    image_size: [150, 150],
    response_ends_trial: true,
    choices: "t"
};

 var partnerproc = {
        type: "partner-grid",
        stimuli: spartner,
        condition: "partner",
        image_size: [150, 150],
    };

var practimeline = {
	timeline : [timedcircle, partnerproc, practiceproc, partnerproc, practiceproc, partnerproc, practiceproc, partnerproc, practiceproc, partnerproc, practiceproc, partnerproc, practiceproc],
	randomize_order: false
				   };


var proclist = [];
var types = [fillerproc,twovisproc,twoprivproc,oneproc];
var lastObject = 0;

//Helper function to get the target object of the given procedure at the given index
function getLastObject(procedure,index){
        switch(procedure.condition){
        case "twopriv": return twoprivtargets[index];
        case "twovis": return twovistargets[index];
        case "onetarget": return oneobjtargets[index];
        default: return getTargetObject(fillergrids[index]);
    }
}

for(var i = 0; i < 6; i++){
  var shuffleproc = jsPsych.randomization.repeat(types, 1);
    proclist.push(partnerproc);
    //Make sure the first object of this set of 4 stimuli is different to the 
    //last object of the previous set of 4.
    var x;
    for(x = 0; x < shuffleproc.length; x++){
        if(getLastObject(shuffleproc[x],i) != lastObject){
            proclist.push(shuffleproc[x]);
            console.log("THIS OBJECT: " + getLastObject(shuffleproc[x],i));
            break;
        }
    }
    //Now remove the object we selected
    shuffleproc.splice(x, 1);
    
    //The rest can be shuffled any which way we like
    for(var j = 0; j < 3; j++){
        proclist.push(partnerproc);
        var thing = shuffleproc.pop();
        proclist.push(thing);
        console.log("THIS OBJECT: " + getLastObject(thing,i));
    }
    lastObject = getLastObject(thing,i); //Set the last object of this set of 4 stimuli
}
console.log(proclist);
 var expproc = { 
        timeline: proclist,
        randomize_order: false,
        repetitions: 1
    };

// sample function that might be used to check if a subject has given
// consent to participate.
var check_consent = function (elem) {
    if (document.getElementById('consent_checkbox1').checked && document.getElementById('consent_checkbox2').checked && document.getElementById('consent_checkbox3').checked) {
        return true;
    } else {
        alert("If you wish to participate, you must check all three boxes next to the statements of consent.");
        return false;
    }
    return false;
};

var consent = {
    type: 'external-html',
    url: "consentform.html",
    cont_btn: "start",
    check_fn: check_consent
};




var debrief = {
    type: 'external-html',
    url: "debrief.html",
    cont_btn: "Okay",
	
	on_load: function () {
		prevent_leave = false;
		saveInfo('completion_code', ID);

		var results = jsPsych.data.get();
		var interaction = jsPsych.data.getInteractionData();
		var data = results.join(interaction);
        var name = ID + "_HUMAN";
		saveData(name, data.csv());
        
        //DJR A bit of hacked together nonsense to get merged demographic data into CSV format
        var demographics = jsPsych.data.get().filter({trial_type: 'survey-html-form'}).values();
        var merged = $.extend({},JSON.parse(demographics[0].responses),JSON.parse(demographics[1].responses));
        var csv = "";
        var headers = "";
        var values = "";
        let keysAmount = Object.keys(merged).length;
        let keysCounter = 0;
        for (var key in merged){
            headers += key + (keysCounter+1 < keysAmount ? ',' : '\r\n' );
            keysCounter++;
        }
        keysCounter = 0       
        for (var key in merged){
            values += "\"" + merged[key] + "\"" + (keysCounter+1 < keysAmount ? ',' : '\r\n' );
            keysCounter++;
        }
        csv = headers + values;
        var name = ID + "_demographics";
        saveData(name,csv);
        var valueList = [ID].concat(Object.values(merged));
        appendDemographics(valueList);
	}
};

//var startmic = function(){    
//navigator.mediaDevices.getUserMedia({ audio: true })
//  .then(stream => {
//    mediaRecorder = new MediaRecorder(stream);
//    mediaRecorder.start();
//
//    var audioChunks = [];
//    mediaRecorder.ondataavailable = function(e) {
//      audioChunks.push(e.data);
//    };
//
//    mediaRecorder.onstop = function(e) {
//        audioBlob = new Blob(audioChunks, {type:'audio/ogg'});
//        blobUrl = URL.createObjectURL(audioBlob);
//        saveAudio(audioBlob);
////        saveAudio(ID, blobUrl);
//        console.log(blobUrl);
////        console.log(audioBlob.arrayBuffer());
//    };
//   
//  });

var demographic = { // DEMOGRAPHICS FORM
    type: 'survey-html-form',
    preamble: "Thank you for taking part in the experiment today. We would now like you to complete the following questionnaire.",
    html: demo
};

var exclusion = { // DEMOGRAPHICS FORM
    type: 'survey-html-form',
    preamble: "Thank you for taking part in the experiment today. Before you begin, please answer the following demographic questions.",
    html: exclu
};

/*
var infosheet = {
    type: 'external-html',
    url: 'infosheet-h.html',
    cont_btn: "continue"
};
*/

var instructions = {
    type: 'external-html',
    url: 'instructions-h.html',
    cont_btn: "continue"
};

var info2 = {
    type: 'external-html',
    url: 'info2.html',
    cont_btn: "continue"
};

var prepractice = {
	type: 'external-html',
	url: 'prepractice.html',
    cont_btn: "continue"
};

var postpractice = {
	type: 'external-html',
	url: 'postpractice.html',
    cont_btn: "continue"
};

var paymenthtml = ` <div class = 'payment code'
	 <p>Please enter your completion code in MTurk to confirm your participation. Your unique completion code is:</p>
    <p class='larger'>${ID}</p>
    <p>You are reminded that all the data has been de-identified. Should you wish to access data relevant to your participation you will be required to use the unique completion code provided.</p>
    <p> If you require any information regarding this study, or your participation in it, please contact:</p>
    <p>
    	Dr Benjamin Cowan <a href='mailto: ucd.ics.research@gmail.com'>(ucd.ics.research@gmail.com)</a><br>
    </p>
    <p>Thank you once again, the time and effort you have taken to participate in this study is greatly appreciated.</p>
</div>`


var payment = {
	type: 'html-keyboard-response',
	stimulus: paymenthtml,
	choices: jsPsych.NO_KEYS
};


var reject_part = {
	timeline: [{
		type: 'html-keyboard-response',
		choices: jsPsych.NO_KEYS,
		stimulus: `Unfortunately you have not met the requirments for this experiment and are not eligible to participate.`
    }],
	conditional_function: function () {
		var data = jsPsych.data.get().filter({
			trial_type: 'survey-html-form'
		}).values()[0].responses;
		data = JSON.parse(data);

		if ((data.impairment_condition == 'Yes') || (data.normal_hearing == 'No') || (data.normal_vision == 'No') || ((data.native_speaker == 'No'))) {
			return true
		} else {
			return false
		}

	}
}
//
timeline.push(info2, consent, exclusion, reject_part, instructions, prepractice, initialize, practimeline, postpractice, initialize, expproc,demographic,debrief, payment);
//timeline.push(prepractice, initialize, practimeline, postpractice, initialize, expproc,demographic,debrief, payment);




//    timeline.push(proc);

// Save completion code to IndexDB
function saveInfo(name, data){
  try {
  	localStorage.setItem(name, data);
    } catch (e) {
  	if (e == QUOTA_EXCEEDED_ERR) {
  	  alert('Storage limit exceeded');
  	}
  }
}


var prevent_leave = true;
window.onbeforeunload = function (e) {
	e = e || window.event;

	if (prevent_leave) {
		// Cancel the event
		e.preventDefault();
		e.returnValue = 'Your progress will not be saved if you leave the site. Are you sure you want to continue?';
	} else {
		delete e['returnValue'];
	}

};

// Check if experiment already completed
if (localStorage.getItem('completion_code')) {
  var completion_code = localStorage.getItem('completion_code');
  alert("You have already completed this experiment. Your completion code is: " + completion_code);
}

//Here we'll try to save the data and the demographics separately
function saveData(name, data) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'write_data.php'); // 'write_data.php' is the path to the php file described above.
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
        filename: name,
        filedata: data
    }));
}

function appendDemographics(values){
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'append_data.php'); // 'write_data.php' is the path to the php file described above.
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
        filedata: values
    }));
}
// Change demos questionnnaire depending on answers
function demoCheck() {
	// Add extra questions based on use of assistants
	$('#speech').change(function () {
		if (this.value != 'Never') {
			$('.optionals').removeClass('hidden');
		} else {
			$('.optionals').addClass('hidden');
		}
	});

	// Add textbox for 'other'
	$('#assistant').change(function () {
		if (this.value == 'Other') {
			$('#ass_holder').removeClass('hidden');
		} else {
			$('#ass_holder').addClass('hidden');
		}
	});

	$('#device').change(function () {
		if (this.value == 'Other') {
			$('#dev_holder').removeClass('hidden');
		} else {
			$('#dev_holder').addClass('hidden');
		}
	});

	$('#native').change(function () {
		if (this.value == 'No') {
			$('#english_holder').removeClass('hidden');
		} else {
			$('#english_holder').addClass('hidden');
		}
	});
}


function saveInfo(name, data) {
	try {
		localStorage.setItem(name, data);
	} catch (e) {
		if (e == QUOTA_EXCEEDED_ERR) {
			alert('Storage limit exceeded');
		}
	}
}

// Check if experiment already completed
if (localStorage.getItem('completion_code')) {
	var completion_code = localStorage.getItem('completion_code');
	alert("You have already completed this experiment. Your completion code is: " + completion_code);
}

//DJR In corresponding startExperimentc function there's an 'on_finish' parameter. Should this be here too?
function startExperiment() {
    jsPsych.init({
        exclusions: {
            min_width: 600,
            min_height: 600,
            audio: true
        },
        timeline: timeline,
        preload_images: stimuli,
        preload_audio: audio
    });
};
//startExperiment();
//
//</script>
//
//</html>
