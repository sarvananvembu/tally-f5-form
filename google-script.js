// Variable to hold request
var request;

// Bind to the submit event of our form
$("#foo").submit(function(event){

    // Abort any pending request
    if (request) {
        request.abort();
    }
    // setup some local variables
    var $form = $(this);

    // Let's select and cache all the fields
    var $inputs = $form.find("input, select, button, textarea");

    // Serialize the data in the form
    var serializedData = $form.serialize();

    // Let's disable the inputs for the duration of the Ajax request.
    // Note: we disable elements AFTER the form data has been serialized.
    // Disabled form elements will not be serialized.
    $inputs.prop("disabled", true);

    // Fire off the request to /form.php
    request = $.ajax({
        url: "https://script.google.com/macros/s/AKfycby0YK2AP6vBA6CofnwVU7pIbp4Fzq5ch_2JDchNROkTBoSPyE2O/exec",
        type: "post",
        data: serializedData
    });

    // Callback handler that will be called on success
    request.done(function (response, textStatus, jqXHR){
        // Log a message to the console
        console.log("Hooray, it worked!");
        console.log(response);
        console.log(textStatus);
        console.log(jqXHR);
    });

    // Callback handler that will be called on failure
    request.fail(function (jqXHR, textStatus, errorThrown){
        // Log the error to the console
        console.error(
            "The following error occurred: "+
            textStatus, errorThrown
        );
    });

    // Callback handler that will be called regardless
    // if the request failed or succeeded
    request.always(function () {
        // Reenable the inputs
        $inputs.prop("disabled", false);
    });

    // Prevent default posting of form
    event.preventDefault();
});
//form
var currentTab = 0; // Current tab is set to be the first tab (0)
showTab(currentTab); // Display the current tab

function showTab(n) {
  // This function will display the specified tab of the form...
  var x = document.getElementsByClassName("tab");
  x[n].style.display = "block";
  //... and fix the Previous/Next buttons:
  if (n == 0||n == 3) {
    document.getElementById("prevBtn").style.display = "none";
  } else {
    document.getElementById("prevBtn").style.display = "inline";
  }
  if (n == 0|| n ==1 || n == 3) {
    document.getElementById("submit").style.display = "none";
  }else {
    document.getElementById("submit").style.display = "inline";
  }
  if (n == (x.length - 1)|| n == 2 || n == 3) {
    document.getElementById("nextBtn").innerHTML = "";
    document.getElementById("nextBtn").style.display = "none";

  }if (n == (x.length - 1)|| n == 2 || n == 3) {
    document.getElementById("formerror").innerHTML = "";
    document.getElementById("formerror").style.display = "none";

  } else {
    document.getElementById("nextBtn").innerHTML = "Next";
    document.getElementById("nextBtn").style.display = "inline";

  }
  //... and run a function that will display the correct step indicator:
  fixStepIndicator(n)
}

function nextPrev(n) {
  // This function will figure out which tab to display
  var x = document.getElementsByClassName("tab");
  // Exit the function if any field in the current tab is invalid:
  if (n == 1 && !validateForm()) return false;
  // Hide the current tab:
  x[currentTab].style.display = "none";
  // Increase or decrease the current tab by 1:
  currentTab = currentTab + n;
  // if you have reached the end of the form...
  if (currentTab >= x.length) {
    // ... the form gets submitted:
    document.getElementById("regForm").submit();
    return false;
  }
  // Otherwise, display the correct tab:
  showTab(currentTab);
}
 //submitbutton
 function submits(n) {
   // This function will figure out which tab to display
   var x = document.getElementsByClassName("tab");
   // Exit the function if any field in the current tab is invalid:
   if (n == 1 && !validateForm()) return false;
   // Hide the current tab:
   x[currentTab].style.display = "none";
   // Increase or decrease the current tab by 1:
   currentTab = currentTab + n;
   // if you have reached the end of the form...
   if (currentTab >= x.length) {
     // ... the form gets submitted:
     document.getElementById("regForm").submit();
     return false;
   }
   // Otherwise, display the correct tab:
   showTab(currentTab);
 }


function validateForm() {
  // This function deals with validation of the form fields
  var x, y, i, valid = true;
  x = document.getElementsByClassName("tab");
  y = x[currentTab].getElementsByTagName("input");

  // A loop that checks every input field in the current tab:
  for (i = 0; i < y.length; i++) {
    // If a field is empty...
    if (y[i].value == "" || phone.value <= 999999999) {
      // add an "invalid" class to the field:
      y[i].className += " invalid";
      document.getElementById("mobileerror").innerHTML = "";
      document.getElementById("formerror").innerHTML = "Kindly fill up all the fields";


      // and set the current valid status to false
      valid = false;
    }
  }
  // If the valid status is true, mark the step as finished and valid:
  if (valid) {
    document.getElementsByClassName("step")[currentTab].className += " finish";
  }
  return valid; // return the valid status
}

function fixStepIndicator(n) {
  // This function removes the "active" class of all steps...
  var i, x = document.getElementsByClassName("step");
  for (i = 0; i < x.length; i++) {
    x[i].className = x[i].className.replace(" active", "");
  }
  //... and adds the "active" class on the current step:
  x[n].className += " active";
}
//select box with checkbox
var expanded = false;

function showCheckboxes() {
  var checkboxes = document.getElementById("checkboxes");
  if (!expanded) {
    checkboxes.style.display = "block";
    expanded = true;
  } else {
    checkboxes.style.display = "none";
    expanded = false;
  }
}
//saving checkbox value in input type text
function checkbox(){

  var checkboxes = document.getElementsByName('educational-background');
  var checkboxesChecked = [];
  // loop over them all
  for (var i=0; i<checkboxes.length; i++) {
     // And stick the checked ones onto an array...
     if (checkboxes[i].checked) {
        checkboxesChecked.push(checkboxes[i].value);
     }
  }
  document.getElementById("education-status").value = checkboxesChecked;

}

$('.expected').click(function(){
    var text = "";
    $('.expected:checked').each(function(){
        text += $(this).val()+',';
    });
    text = text.substring(0,text.length-1);

    $('#expectations').val(text);
});
