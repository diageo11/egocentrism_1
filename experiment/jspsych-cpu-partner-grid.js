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

jsPsych.plugins['cpu-partner-grid'] = (function() {

  var plugin = {};
    var clickedImage = "";
  var betterName = "";

  var filename ="";    
    var requestedfile = "";
    var rawGrid;

  jsPsych.pluginAPI.registerPreload('cpu-partner-grid', 'stimuli', 'image', 'audio');
  
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
    name: 'cpu-partner-grid',
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
        default: [100,100],
        description: 'Array specifying the width and height of the images to show.'
      },
      trial_duration: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Trial duration',
        default: null,
        description: 'How long to show the stimulus for in milliseconds.'
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

  plugin.trial = function(display_element, trial) {
       

    display_element.innerHTML = plugin.generate_stimulus(trial.stimuli, trial.image_size);
      
    var fillernums = [1, 2, 7, 8, 9, 10, 13];
    var thePicnum =  fillernums[Math.floor(Math.random() * 6 )];
    var picstring = String("(" + thePicnum +")") ;
      
    var filename = String ("img/stimuli/" + picstring+ "c.ogg"); 
      
//     var file = $( "img[data-sound=true]" ).attr("src");;
//      filename = file.substring(file.indexOf("img"),file.indexOf(".")) + ".wav";
////      filename = String( "/img/" + filename + ""); 
     //DJR added this to log what the participant clicked (hopefully)
     $(".clickable").click(function(){
        clickedImage = $(this).find("img").attr("src");
        if(clickedImage != undefined){
            betterName = getBetterImageName(clickedImage);
        }
        else{
            betterName = "BLANK " + $(this).attr("id").substring(34); //to get rid of jspsych-vsl-grid-scene-table-cell-
        }
        end_trial();
     }); 
        //DJR Also got rid of this because it shouldn't now be needed...?
 //    $("#jspsych-vsl-grid-scene-dummy").click(function(){
   //     end_trial();
    //});
//      
       var t = Math.floor((Math.random() * 800) + 600)
//      //sleep(t);
//      console.log(source);
//      source.start(context.currentTime+t); 
      var audio = new Audio(filename); 
      setTimeout(function(){audio.play();},t);
      
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
        "stimulus": trial.stimulus,
        "condition": trial.condition,
        "audiofile":  filename,
                "requested": getBetterImageName(filename),
        "clickedimage" : betterName,
        "rawGrid": rawGrid
      };

      // clear the display
      display_element.innerHTML = '';

      // move on to the next trial
      jsPsych.finishTrial(trial_data);
    };

    var after_response = function(info) {

      
      if (trial.response_ends_trial) {
//        var t = Math.floor((Math.random() * 1500) + 3000);
//        sleep (t);
        end_trial();
      }
    };
      
    

    // end trial if time limit is set
    if (trial.trial_duration !== null) {
      jsPsych.pluginAPI.setTimeout(function() {
        end_trial();
      }, trial.trial_duration);
    }
  };


  plugin.generate_stimulus = function(pattern, image_size) {
    rawGrid = prettyGrid(pattern);
    var nrows = pattern.length;
    var ncols = pattern[0].length;
    var greyed = 0;
    var checked = 0;
    var sound = false;
      
   
      
      
    
    // create blank element to hold code that we generate
    var html = '<div id="jspsych-vsl-grid-scene-dummy" css="display: none;">';
       

    // create table
    html += '<table id="jspsych-vsl-grid-scene table" '+
      'style="border-collapse: collapse; margin-left: auto; margin-right: auto;">';

    for (var row = 0; row < nrows; row++) {
      html += '<tr id="jspsych-vsl-grid-scene-table-row-'+row+'" css="height: '+image_size[1]+'px;">';

      for (var col = 0; col < ncols; col++) {
          var addBlack = "";
          var addGray = "";
          var addSound = "";
          
          
       
          if (pattern[row][col] == 1) {
            addBlack = 'background-color: black;';
          }
//          if(pattern[row][col]!= 0 && pattern[row][col] !=1 && greyed<2){
//           if (!String(pattern[row][col]).includes("r.")) {
//               checked++;
//               if(checked+greyed<9 && Math.floor(Math.random() * 9)<3){
//            addGray = ' outline: 100px solid rgba(0, 0, 0, 0.5) !important; outline-offset: -100px; overflow: hidden;    position: relative; height: 150px; width: 150px;';
//                   greyed++;
//           }
//                  else if (checked+greyed>8 && greyed<2)
//                   {addGray = ' outline: 100px solid rgba(0, 0, 0, 0.5) !important; outline-offset: -100px; overflow: hidden;    position: relative; height: 150px; width: 150px;';
//                   greyed++;}
//           }
//          }
          
//          if(pattern[row][col] != 1 && pattern[row][col] != 0 && String(pattern[row][col]).includes(picstring)){
//                  sound = true;
//                  addSound = 'data-sound="true"';
//              };
//        
          
        html += '<td id="jspsych-vsl-grid-scene-table-' + row + '-' + col +'" '+
          'style="padding: '+ (0) + 'px ' + (0) + 'px; border: 1px solid #555;' + addBlack  + '">'+
          '<div class="clickable" id="jspsych-vsl-grid-scene-table-cell-' + row + '-' + col + '" style="width: '+image_size[0]+'px; height: '+image_size[1]+'px;">';
          
        if ((pattern[row][col] !== 0) && (pattern[row][col] != 1)) {
          html += '<img '+
            'src="'+pattern[row][col]+'" style="width: '+image_size[0]+'px; height: '+image_size[1]+ '"' + addSound + '></img>';
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
