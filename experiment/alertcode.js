//DJR I'll just stick this code in here for now
function showAlert() {
    html = `<div class = 'alert_holder'><div class = 'answer_display'>
  		<h1>Experiment Interrupted</h1>
  		<p>We noticed that you left the experiment screen during the experiment.
  		Please refrain from doing so until the experiment is completed.
  		We thank you for your cooperation.</p>
  		<button id='alert_btn' onclick = 'contExp()' >I understand</button>
  	</div></div>`
    $('body').append($(html));
    console.log('blurred');
}

function contExp() {
    jsPsych.resumeExperiment();
    $('.alert_holder').remove();
}

$(window).blur(function () {
    showAlert();
    jsPsych.pauseExperiment();
});