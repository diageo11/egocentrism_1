/**
 * jsPsych plugin for showing scenes that mimic the experiments described in
 *
 * Fiser, J., & Aslin, R. N. (2001). Unsupervised statistical learning of
 * higher-order spatial structures from visual scenes. Psychological science,
 * 12(6), 499-504.
 *
 * Josh de Leeuw
 *
 * documentation: docs.jspsych.org
 *
 */

jsPsych.plugins['ego-grid'] = (function () {

    var plugin = {};

    jsPsych.pluginAPI.registerPreload('ego-grid', 'stimuli', 'image');

    plugin.info = {
        name: 'ego-grid',
        description: '',
        parameters: {
            stimuli: {
                type: jsPsych.plugins.parameterType.IMAGE,
                pretty_name: 'Stimuli',
                array: true,
                default: undefined,
                description: 'An array that defines a grid.'
            },
            condition: {
                type: jsPsych.plugins.parameterType.STRING,
                pretty_name: 'Condition',
                default: undefined,
                description: 'Which condition was this stimulus in.'
            },
            image_size: {
                type: jsPsych.plugins.parameterType.INT,
                pretty_name: 'Image size',
                array: true,
                default: [100, 100],
                description: 'Array specifying the width and height of the images to show.'
            },
            trial_duration: {
                type: jsPsych.plugins.parameterType.INT,
                pretty_name: 'Trial duration',
                default: null,
                description: 'How long to show the stimulus for in milliseconds.'
            },
            response_ends_trial: {
                type: jsPsych.plugins.parameterType.BOOL,
                pretty_name: 'Response ends trial',
                default: true,
                description: 'If true, the trial will end when user makes a response.'
            },
            choices: {
                type: jsPsych.plugins.parameterType.KEYCODE,
                array: true,
                pretty_name: 'Choices',
                default: jsPsych.ALL_KEYS,
                description: 'The keys the subject is allowed to press to respond to the stimulus.'
            },
        }
    }

    plugin.trial = function (display_element, trial) {

        display_element.innerHTML = plugin.generate_stimulus(trial.stimuli, trial.image_size);

        var response = {
            rt: null,
            key: null
        };

        //function for some sleep  
        function sleep(milliseconds) {
            var start = new Date().getTime();
            for (var i = 0; i < 1e7; i++) {
                if ((new Date().getTime() - start) > milliseconds) {
                    break;
                }
            }
        };

        // function to end trial when it is time
        function end_trial() {

            // kill any remaining setTimeout handlers
            jsPsych.pluginAPI.clearAllTimeouts();

            // kill keyboard listeners
            jsPsych.pluginAPI.cancelAllKeyboardResponses();


            var trial_data = {
                "rt": response.rt,
                "stimulus": trial.stimulus,
                "key_press": response.key,
                "condition": trial.condition
            };

            // clear the display
            display_element.innerHTML = '';

            // move on to the next trial
            jsPsych.finishTrial(trial_data);
        };

        var after_response = function (info) {

            // only record the first response
            if (response.key == null) {
                response = info;
            }

            if (trial.response_ends_trial) {
//                addEventListener("keyup", function(event) {
                var t = Math.floor((Math.random() * 1500) + 3000);
                sleep(t);
                end_trial();
            }
        };

        // start the response listener
        if (trial.choices != jsPsych.NO_KEYS) {
            var keyboardListener = jsPsych.pluginAPI.getKeyboardResponse({
                callback_function: after_response,
                valid_responses: trial.choices,
                rt_method: 'date',
                persist: false,
                allow_held_key: false
            });
        }


        // end trial if time limit is set
        if (trial.trial_duration !== null) {
            jsPsych.pluginAPI.setTimeout(function () {
                end_trial();
            }, trial.trial_duration);
        }

    }; 



    plugin.generate_stimulus = function (pattern, image_size) {
        var nrows = pattern.length;
        var ncols = pattern[0].length;
        var greyed = 0;
        var checked = 0;
        var critpos = [];
        var redname = "";
        var crit = false;


        for (var r = 0; r <= 4; r++) {
            for (var c = 0; c <= 4; c++) {
                var eachname = String(pattern[r][c]);
                if (eachname.includes("r.")) {
                    redname = eachname;
                }
            }
        }
        for (var r = 0; r <= 4; r++) {
            for (var c = 0; c <= 4; c++) {
                var eachname = String(pattern[r][c]);
                if ((redname.substring(0, redname.indexOf(")")) == eachname.substring(0, eachname.indexOf(")"))) && (!eachname.includes("r."))) {
                    critpos.push(r);
                    critpos.push(c);
                }
            }
        }

        // create blank element to hold code that we generate
        var html = '<div id="jspsych-vsl-grid-scene-dummy" css="display: none;">';

        // create table
        html += '<table id="jspsych-vsl-grid-scene table" ' +
            'style="border-collapse: collapse; margin-left: auto; margin-right: auto;">';

        for (var row = 0; row < nrows; row++) {
            html += '<tr id="jspsych-vsl-grid-scene-table-row-' + row + '" css="height: ' + image_size[1] + 'px;">';

            for (var col = 0; col < ncols; col++) {
                var addBlack = "";
                var addGray = "";


                if (pattern[row][col] == 1) {
                    addBlack = 'background-color: black;';
                } else if (pattern[row][col] != 0 && greyed < 2) {
                    var name = String(pattern[row][col]);

                    if (critpos[0] == row && critpos[1] == col) {
                        greyed++;
                        checked++;
                        crit = true;
                        addGray = ' outline: 100px solid rgba(0, 0, 0, 0.5) !important; outline-offset: -100px; overflow: hidden;    position: relative; height: 150px; width: 150px;';
                    } else {
                        if (name.includes("r.")) {
                            checked++;
                        } else {
                            checked++;
                            if (!crit && checked < 10 && greyed == 0 && Math.floor(Math.random() * 12) < 2) {
                                greyed++;
                                addGray = ' outline: 100px solid rgba(0, 0, 0, 0.5) !important; outline-offset: -100px; overflow: hidden;    position: relative; height: 150px; width: 150px;';
                            } else if (((crit && greyed == 1) || (greyed == 0)) && checked >= 10) {
                                greyed++;
                                addGray = ' outline: 100px solid rgba(0, 0, 0, 0.5) !important; outline-offset: -100px; overflow: hidden;    position: relative; height: 150px; width: 150px;';
                            }
                        }
                    }
                }

                html += '<td id="jspsych-vsl-grid-scene-table-' + row + '-' + col + '" ' +
                    'style="padding: ' + (0) + 'px ' + (0) + 'px; border: 1px solid #555;' + addBlack + addGray + '">' +
                    '<div id="jspsych-vsl-grid-scene-table-cell-' + row + '-' + col + '" style="width: ' + image_size[0] + 'px; height: ' + image_size[1] + 'px;">';

                if ((pattern[row][col] !== 0) && (pattern[row][col] != 1)) {
                    html += '<img ' +
                        'src="' + pattern[row][col] + '" style="width: ' + image_size[0] + 'px; height: ' + image_size[1] + '"></img>';
                }
                html += '</div>';
                html += '</td>';
            }
            html += '</tr>';
        }

        html += '</table>';
        html += '</div>';

        console.log(checked, greyed, crit);
        return html;


    };

    return plugin;
})();