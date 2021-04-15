# Grid Game

This is the experiment code for an egocentrism study examining scalar modifier use when given privileged information. It contains two conditions, one where the partner is a computer agent, and another where the partner is a human agent. The experiment is a modified digital version of the Yoon, Koh, and Brown-Schmidt (2012) paper. Please consult that paper for further details on the methodology.

## The code

The experiment is designed to run online and is built using HTML, CSS, PHP, and Javascript. Additionally, the jsPsych library (de Leeuw, 2015) is used as it considered a reliable way to automate common functions of experiments. Please visit the [jsPsych website](https://www.jspsych.org/) for tutorials and further information. The experiment can be currently found at the [UCD HCI Research Lab website](https://icsresearch.ucd.ie/grid_game/experiment/experiment.html).

The base HTML file is `experiment.html`, which is where participants should be sent. This file brings together all the required javascript to run the experiment.

## The Results

At the end of the experiment, different information is collected from each participant. First, participants will be given a 15 character ID that is used to label their data. In the `data` folder, their actions within the experiment will be saved as a `.csv` file. Additionally a different file also labelled with the same ID will have the demographic information in it. In the `saved_audio` folder, each utterance made by the participant will be saved as a separate file with the participant ID and the location in the experiment where it was said.

# Warning

This experiment is made to be run on a server, and so will break if ran locally. It is also only tested with Google Chrome and Firefox, and so should not be ran using Safari, Internet Explorer, or any other browser. For Firefox users, they may have to select "remember this choice" when allowing microphone access during the experiment.

# References

de Leeuw, J. R. (2015). jsPsych: A JavaScript library for creating behavioral experiments in a web browser. Behavior Research Methods, 47(1), 1-12. doi:10.3758/s13428-014-0458-y.

Yoon, S.O., Koh, S. & Brown-Schmidt, S. Influence of perspective and goals on reference production in conversation. Psychon Bull Rev 19, 699–707 (2012). https://doi.org/10.3758/s13423-012-0262-6
