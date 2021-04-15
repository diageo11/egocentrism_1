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


jsPsych.plugins['show-grid'] = (function () {

	var plugin = {};

    var currentTarget = "";
    var betterName = "";    
    var keyHeldTime;
    var rawGrid;
    
	jsPsych.pluginAPI.registerPreload('show-grid', 'stimuli', 'image');

  //DJR a nice pretty grid function
  function prettyGrid(grid){
      var prettyGrid = new Array(grid.length);

      for (var i = 0; i < grid.length; i++) {
        prettyGrid[i] = new Array(grid.length);
      }
     for(var i = 0; i < grid.length; i++){
         for(var j = 0; j < grid[0].length; j++){
             if(String(grid[i][j]).includes("png")){
                prettyGrid[i][j] = getBetterImageName(grid[i][j]);
             }
             else{
                prettyGrid[i][j] = grid[i][j];
             }
        }
     }
     return prettyGrid;
  }
  function getBetterImageName(oldName){
  //DJR another merciless hack to find the image name
        var newname = "";
        if(oldName.includes("sg.png")){
            newname += "small grey ";
        }     
        else if(oldName.includes("s.png")){
            newname += "small ";
        }
        else if(oldName.includes("g.png")){
            newname += "grey ";
        }
   
        if(oldName.includes("13"))
            newname += "bed";
        else if(oldName.includes("12"))
            newname += "moon";
        else if(oldName.includes("11"))
            newname += "car";
        else if(oldName.includes("10"))
            newname += "drum";
        else if(oldName.includes("9"))
            newname += "sheep";
        else if(oldName.includes("8"))
            newname += "cat";
        else if(oldName.includes("7"))
            newname += "flower";
        else if(oldName.includes("6"))
            newname += "hammer";
        else if(oldName.includes("5"))
            newname += "ring";
        else if(oldName.includes("4"))
            newname += "bone";
        else if(oldName.includes("3"))
            newname += "house";        
        else if(oldName.includes("2"))
            newname += "banana";
        else if(oldName.includes("1"))
            newname += "plane";
        
        return newname;
  }
	plugin.info = {
		name: 'show-grid',
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
			delay: {
				type: jsPsych.plugins.parameterType.INT,
				pretty_name: 'Trial Delay',
				default: 1500,
				description: 'How long to wait after button press to end trial.'
			},
			response_ends_trial: {
				type: jsPsych.plugins.parameterType.BOOL,
				pretty_name: 'Response ends trial',
				default: false,
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

		// Create stimulus using plugin function
		display_element.innerHTML = plugin.generate_stimulus(trial.stimuli, trial.image_size);

		// Initialise global variables
		var keyboardListener;
		var mediaRecorder;
        var startTime;
		var response = {
			rt: null,
			key: null
		};



		// function to end trial when it is time
		function end_trial() {

			// kill any remaining setTimeout handlers
			jsPsych.pluginAPI.clearAllTimeouts();

			// kill keyboard listeners
			jsPsych.pluginAPI.cancelAllKeyboardResponses();


			var trial_data = {
				"rt": response.rt,
				"key_press": response.key,
                "keyHeldt" : keyHeldTime,
                "condition": trial.condition,
                "target" : betterName, //DJR includes intended target object
                "rawGrid": rawGrid
			};

			// clear the display
			display_element.innerHTML = '';

			// move on to the next trial
			jsPsych.finishTrial(trial_data);
		};

		// Function to start recording data
		function startRecording() {
			var audioChunks = [];

			console.log('recording');
			
			// Records data
			navigator.mediaDevices.getUserMedia({
				audio: true
			}).then(function (stream) {
				window.streamReference = stream;
				mediaRecorder = new MediaRecorder(stream);
				mediaRecorder.start();

				mediaRecorder.ondataavailable = event => {
					audioChunks.push(event.data);
				};
				
				// Gets called when mediarecorder is told to stop by button presss
				mediaRecorder.onstop = event => {
					const audioBlob = new Blob(audioChunks, {
						'type': 'audio/webm'
					});
					
					// Uses PHP to save file as .webm
					upload(audioBlob);
					const audioUrl = URL.createObjectURL(audioBlob);
					const audio = new Audio(audioUrl);
					console.log(audioUrl);
					
					// Ends trial after everything is saved
					end_trial();

				};
			}).catch(e => {
				var user_friendly = `\n\nYou either did not give us permission to acess your microphone or do not have one attached. Unfortunately you can't participate in the experiment. If you would like to take part and have fixed the issue, please refresh the page.`;
				alert(String(e) + user_friendly);
			});
			
            function addUpListener(info){
                startTime = new Date();       
                document.addEventListener('keyup', (e) => {
                //DJR A wee hack so long as 't' is the trigger key 
                if(e.code === 'KeyT'){
                    stop(info);
                }
                });
            }
			// Required function that's called once button is pressed
			function stop(info) {
                var endTime = new Date();       
                keyHeldTime = endTime - startTime; //in ms

				// Only record the first response
				if (response.key == null) {
					response = info;
				}

				if (mediaRecorder) {

					jsPsych.pluginAPI.setTimeout(() => {
						
                        if(mediaRecorder.state != 'inactive'){
						// Calls end of mediarecorded, starts function onstop
						mediaRecorder.stop();

						console.log('recording stopped');
						}
						// Closes all recording instances
						window.streamReference.getAudioTracks()
							.forEach(function (track) {
								track.stop();
							});

					}, trial.delay); // waits 1500 ms to catch any stragglers
				}
			}
			
			// upload function needed for onstop saving call
			function upload(blob) {
				console.log(blob.type);
				var fd = new FormData();
				fd.append('name',
					`${ID}_${jsPsych.currentTimelineNodeID()}`);

				fd.append('audio', blob);

				fetch("/grid_game2/experiment/upload.php", {
						method: "POST",
						body: fd
					})
					.then(response => {
						if (response.ok) return response;
						else throw Error(`Server returned ${response.status}: ${response.statusText}`)
					})
					.then(response => console.log(response.text()))
					.catch(err => {
						alert(err);
					});

			}

			// start the response listener (needs to be inside startRecording function to call stop function)
			if (trial.choices != jsPsych.NO_KEYS) {
				keyboardListener = jsPsych.pluginAPI.getKeyboardResponse({
					callback_function: addUpListener,
					valid_responses: trial.choices,
					rt_method: 'performance',
					persist: false,
					allow_held_key: false
				});
			}
		}

		// Starts the whole recording process
		startRecording();

	};



	plugin.generate_stimulus = function (pattern, image_size) {
        rawGrid = prettyGrid(pattern);
		var nrows = pattern.length;
		var ncols = pattern[0].length;
		//    var greyed = 0;
		var checked = 0;

		// create blank element to hold code that we generate
		var html = '<div id="jspsych-vsl-grid-scene-dummy" css="display: none;" <h1>Press T to speak</h1>';


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
				}


				html += '<td id="jspsych-vsl-grid-scene-table-' + row + '-' + col + '" ' +
					'style="padding: ' + (0) + 'px ' + (0) + 'px; border: 1px solid #555;' + addBlack + addGray + '">' +
					'<div id="jspsych-vsl-grid-scene-table-cell-' + row + '-' + col + '" style="width: ' + image_size[0] + 'px; height: ' + image_size[1] + 'px;">';

				if ((pattern[row][col] !== 0) && (pattern[row][col] != 1)) {
					html += '<img ' +
						'src="' + pattern[row][col] + '" style="width: ' + image_size[0] + 'px; height: ' + image_size[1] + '"></img>';
				}
                //DJR a horrible hack. Truly horrible
                if(String(pattern[row][col]).includes("r")){
                    betterName = getBetterImageName(String(pattern[row][col]));
            /*        currentTarget = String(pattern[row][col]);
                    if(currentTarget.includes("sr")){
                        betterName += "small ";
                    }
                if(currentTarget.includes("13"))
                    betterName += "bed";
                else if(currentTarget.includes("12"))
                    betterName += "moon";
                else if(currentTarget.includes("11"))
                    betterName += "car";
                else if(currentTarget.includes("10"))
                    betterName += "drum";
                else if(currentTarget.includes("9"))
                    betterName += "sheep";
                else if(currentTarget.includes("8"))
                    betterName += "cat";
                else if(currentTarget.includes("7"))
                    betterName += "flower";
                else if(currentTarget.includes("6"))
                    betterName += "hammer";
                else if(currentTarget.includes("5"))
                    betterName += "ring";
                else if(currentTarget.includes("4"))
                    betterName += "bone";
                else if(currentTarget.includes("3"))
                    betterName += "house";        
                else if(currentTarget.includes("2"))
                    betterName += "banana";
                else if(currentTarget.includes("1"))
                    betterName += "plane";        */            
                }
				html += '</div>';
				html += '</td>';
			}
			html += '</tr>';
		}

		html += '</table>';
		html += '</div>';


		return html;

	};


	return plugin;
})();
