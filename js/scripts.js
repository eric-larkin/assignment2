$(document).ready(function () {
  //$("#submit").click(validateForm);
  $('form').submit(function (e) {
    debugger;
    /* prevent reload of page */
    e.preventDefault();

    /* validate */
    validateForm();
  });
});

function validateForm() {

  var valid = true;
  var foundErrorMsg = false;
  var siblings;

  $.each($('input'), function () {
    debugger;
    var name = this["name"];

    switch(name) {
      case "First Name":
      case "Last Name":
        if(this.value === "") {
          valid = false;
          createErrorMsg(this, "Please enter a value");
        } /* if value === "" */
        else if(/^[a-zA-Z]*$/.test(this.value) === false) { /* check for bad value */
          valid = false;
          createErrorMsg(this, "Only letters allowed in your name!");
        }
        else {
          /* remove an error element if it was there previously */
          removeErrorIfExists(this);
        }
        break;
      case "Address Line 1":
      case "City":
        if(this.value === "") {
          valid = false;
          createErrorMsg(this, "Please enter a value");
        }
        else if(/^[a-zA-Z0-9 ]*$/.test(this.value) === false) { /* check special characters */
          valid = false;
          createErrorMsg(this, "No special characters in your address!");
        }
        else {
          removeErrorIfExists(this);
        }
        break;
      case "Address Line 2":
        /* allow it to be empty but check special characters */
        if(/^[a-zA-Z0-9 ]*$/.test(this.value) === false) {
          valid = false;
          createErrorMsg(this, "No special characters in your address!");
        }
        else {
          removeErrorIfExists(this);
        }
        break;
      case "Zip Code":
        if(this.value === "") {
          valid = false;
          createErrorMsg(this, "Please enter a value");
        }
        else if(/^[0-9]*$/.test(this.value) === false) { /* check special characters */
          valid = false;
          createErrorMsg(this, "Only digits allowed");
        }
        else if(this.value.length !== 5) {
          valid = false;
          createErrorMsg(this, "Enter a 5 digit code");
        }
        else {
          removeErrorIfExists(this);
        }
        break;
    }

    /* reset */
    foundErrorMsg = false;
  });

  /* if the form is valid, remove it from the DOM and show success message */
  if(valid === true) {
    $('#myForm').remove();
    $('<div/>', {
      class: "success",
      text: "Form submission success"
    }).appendTo($('body'));

  }
  return false;
};

function createErrorMsg(obj, msg) {
  /* remove previous errors */
  removeErrorIfExists(obj);

  /* create and insert an error element above the input element */
  var img = $('<img/>', {
    src: "images/redx.png",
    width: "10px",
    height: "10px"
  });

  var msg = $('<div/>', {
    class: "inputError",
    text: msg
  });

  img.appendTo(msg);

  $(obj).before(msg);
}

function removeErrorIfExists(obj) {
  var siblings = $(obj).siblings();
  $.each(siblings, function () {
    if($(this).hasClass("inputError")) {
      this.remove();
    }
  });
}
