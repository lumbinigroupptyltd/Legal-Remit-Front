const $ = require("jquery");

exports.error_input_validation = (form_id) => {
  $("#" + form_id)
    .find("input.required:visible")
    .each(function () {
      if ($(this).val() == "") {
        $(this).addClass("is-invalid").removeClass("is-valid");
        $(this).nextAll(".error").removeClass("d-none");
        $(this).nextAll(".email_message").addClass("d-none");
        $(this).on("keydown", function () {
          $(this).nextAll(".error").addClass("d-none");
          $(this).removeClass("is-invalid").addClass("is-valid");
        });
      } else {
        $(this).nextAll(".error").addClass("d-none");
        $(this).removeClass("is-invalid").addClass("is-valid");
        $(this).on("keydown", function () {
          $(this).nextAll(".error").removeClass("d-none");
          $(this).removeClass("is-valid").addClass("is-invalid");
        });
      }
    });

  $("#" + form_id)
    .find("textarea.required:visible")
    .each(function () {
      if ($(this).val() == "") {
        $(this).addClass("is-invalid").removeClass("is-valid");
        $(this).nextAll(".error").removeClass("d-none");
        $(this).on("keydown", function () {
          $(this).nextAll(".error").addClass("d-none");
          $(this).removeClass("is-invalid").addClass("is-valid");
        });
      } else {
        $(this).nextAll(".error").addClass("d-none");
        $(this).removeClass("is-invalid").addClass("is-valid");
        $(this).on("keydown", function () {
          $(this).nextAll(".error").addClass("d-none");
          $(this).removeClass("is-invalid").addClass("is-valid");
        });
      }
    });


  // To check the checkboxes start

  var anyCheck = false

  $("#" + form_id).find("input.requiredCheckBox:visible").each(function () {


  

    if ($(this).prop("checked")) {

      anyCheck = true

      // $(".error").addClass("d-none");
      // $(this).removeClass("is-invalid").addClass("is-valid");
    }
    else {
      // $(this).addClass("is-invalid").removeClass("is-valid");
      // $(".error").removeClass("d-none");
      // anyCheck = false

    }

  });

  if (anyCheck) {
    $(".checkboxError").addClass("d-none");
    $(this).removeClass("is-invalid").addClass("is-valid");
  } else {
    $(this).addClass("is-invalid").removeClass("is-valid");
    $(".checkboxError").removeClass("d-none");
  }
  // To check the checkboxes ends

  $("#" + form_id)
    .find("input.reflink:visible")
    .each(function () {
      if ($(this).val().length > 0) {
        $(this).addClass("is-invalid").removeClass("is-valid");
        $(this).nextAll(".error").removeClass("d-none");
        $(this).on("keydown", function () {
          $(this).nextAll(".error").addClass("d-none");
          $(this).removeClass("is-invalid").addClass("is-valid");
        });
      } else {
        $(this).nextAll(".error").addClass("d-none");
        $(this).removeClass("is-invalid").addClass("is-valid");
        $(this).on("keydown", function () {
          $(this).nextAll(".error").addClass("d-none");
          $(this).removeClass("is-invalid").addClass("is-valid");
        });
      }
    });
  /////////////////////////////

  $("#" + form_id)
    .find("input.moneysentvalue:visible")
    .each(function () {
     
      if ($(this).val() === "0" || $(this).val() === "" || $(this).val() === "0.00") {
        $(this).addClass("is-invalid").removeClass("is-valid");
        $(".merror").removeClass("d-none");
        $(this).on("change", function () {
          $(".merror").addClass("d-none");
          $(this).removeClass("is-invalid").addClass("is-valid");
        });
      } else {
        $(this).removeClass("is-invalid").addClass("is-valid");
        $(".merror").addClass("d-none");
        $(this).on("change", function () {
          $(".merror").addClass("d-none");
          $(this).removeClass("is-invalid").addClass("is-valid");
        });
      }
    });

  $("#" + form_id)
    .find("input.deliveryMethod:visible")
    .each(function () {
      
      if ($(this).val() === "Delivery Method") {
        $(this).addClass("is-invalid").removeClass("is-valid");
        $(".derror").removeClass("d-none");
        $(this).on("change", function () {
          $(".derror").addClass("d-none");
          $(this).removeClass("is-invalid").addClass("is-valid");
        });
      } else {
        $(this).removeClass("is-invalid").addClass("is-valid");
        $(".derror").addClass("d-none");
        $(this).on("change", function () {
          $(".derror").addClass("d-none");
          $(this).removeClass("is-invalid").addClass("is-valid");
        });
      }
    });

  $("#" + form_id)
    .find("input.paymentMethod:visible")
    .each(function () {
     
      if ($(this).val() === "Payment Method") {
        $(this).addClass("is-invalid").removeClass("is-valid");
        $(".perror").removeClass("d-none");
        $(this).on("change", function () {
          $(".perror").addClass("d-none");
          $(this).removeClass("is-invalid").addClass("is-valid");
        });
      } else {
        $(this).removeClass("is-invalid").addClass("is-valid");
        $(".perror").addClass("d-none");
        $(this).on("change", function () {
          $(".perror").addClass("d-none");
          $(this).removeClass("is-invalid").addClass("is-valid");
        });
      }
    });
  //////////////////////////

  $("#" + form_id)
    .find("textarea.required:visible")
    .each(function () {
      if ($(this).val() == "") {
        $(this).addClass("is-invalid").removeClass("is-valid");
      } else {
        $(this).removeClass("is-invalid").addClass("is-valid");
      }
    });

  $("#" + form_id)
    .find("select.required:visible")
    .each(function () {
      if ($(this).val() == "" || $(this).val() == null) {
        $(this).addClass("is-invalid").removeClass("is-valid");
        $(this).addClass("err-border").removeClass("no-border");
        $(this).nextAll(".error").removeClass("d-none");
        // $(this).on('click', function () {
        //     $(this).nextAll(".error").addClass('d-none');
        //     $(this).removeClass("is-invalid").addClass("is-valid");
        // });
      }else {
          $(this).nextAll(".error").addClass("d-none");
          $(this).removeClass("is-invalid").addClass("is-valid");
          $(this).removeClass("err-border").addClass("no-border");
        }

      $(this).on("click", function () {
        if ($(this).val() == "" || $(this).val() == null) {
          $(this).addClass("is-invalid").removeClass("is-valid");
          $(this).nextAll(".error").removeClass("d-none");
          // $(this).on('click', function () {
          //     $(this).nextAll(".error").addClass('d-none');
          //     $(this).removeClass("is-invalid").addClass("is-valid");
          // });
        } else if ($(this).val() != "") {
          $(this).nextAll(".error").addClass("d-none");
          $(this).removeClass("is-invalid").addClass("is-valid");
          $(this).removeClass("err-border").addClass("no-border");
        } else {
          $(this).nextAll(".error").addClass("d-none");
          $(this).removeClass("is-invalid").addClass("is-valid");
          $(this).removeClass("err-border").addClass("no-border");
        }
      });
    });

  $("#" + form_id)
    .find("input.email:visible")
    .each(function () {
      if ($(this).val() != "") {
       
        if (isEmail($(this).val())) {
          $(this).removeClass("is-invalid").addClass("is-valid");
          $(this).on("change", function () {
            $(this).nextAll(".email_message").addClass("d-none");
            $(this).nextAll(".error").addClass("d-none");
          });
        } else {
          $(this).addClass("is-invalid").removeClass("is-valid");
          $(this).nextAll(".email_message").removeClass("d-none");
          $(this).nextAll(".error").addClass("d-none");
        }
      }else{
      
        $(this).nextAll(".email_message").addClass("d-none");
      }
    });

  // $("#" + form_id).find("input.phone:visible").each(function () {
  //     if ($(this).val() != "") {
  //         if (this.isPhone($(this).val())) {
  //             $(this).removeClass("is-invalid").addClass("is-valid");
  //         }
  //         else {
  //             $(this).addClass("is-invalid").removeClass("is-valid");
  //         }
  //     }
  // });

  // to check if input is number start

  $("#" + form_id)
    .find("input.number:visible")
    .each(function () {
      var number = $(this).val();
      

      if ($.isNumeric(number)) {
        $(this).removeClass("is-invalid").addClass("is-valid");
      } else {
        if ($(this).val() == "") {
          $(this).addClass("is-invalid").removeClass("is-valid");
          $(this).nextAll(".error_message").removeClass("d-none");
          $(this).on("keydown", function () {
            $(".error_message").addClass("d-none");
          });
        } else {
          if (!$.isNumeric(number)) {
            $(this).nextAll(".error_message").removeClass("d-block");
            $(".error_message_number").addClass("d-block");
            $(".error_message_number").removeClass("d-none");
            $(this).addClass("is-invalid").removeClass("is-valid");
            $(this).on("keydown", function () {
              $(".error_message_number").removeClass("d-block");
              $(".error_message_number").addClass("d-none");
            });
          }
        }
      }
    });

  $("#" + form_id)
    .find("input.number1:visible")
    .each(function () {
      var number = $(this).val();
      

      if ($.isNumeric(number)) {
        $(this).removeClass("is-invalid").addClass("is-valid");
      } else {
        if ($(this).val() == "") {
          $(this).addClass("is-invalid").removeClass("is-valid");
          $(this).nextAll(".error_message").removeClass("d-none");
          $(this).on("keydown", function () {
            $(".error_message").addClass("d-none");
          });
        } else {
          if (!$.isNumeric(number)) {
            $(this).nextAll(".error_message").removeClass("d-block");
            $(".error_message_number1").addClass("d-block");
            $(".error_message_number1").removeClass("d-none");
            $(this).addClass("is-invalid").removeClass("is-valid");
            $(this).on("keydown", function () {
              $(".error_message_number1").removeClass("d-block");
              $(".error_message_number1").addClass("d-none");
            });
          }
        }
      }
    });

  $("#" + form_id)
    .find("input.number2:visible")
    .each(function () {
      var number = $(this).val();
     

      if ($.isNumeric(number)) {
        $(this).removeClass("is-invalid").addClass("is-valid");
      } else {
        if ($(this).val() == "") {
          $(this).addClass("is-invalid").removeClass("is-valid");
          $(this).nextAll(".error_message").removeClass("d-none");
          $(this).on("keydown", function () {
            $(".error_message").addClass("d-none");
          });
        } else {
          if (!$.isNumeric(number)) {
            $(this).nextAll(".error_message").removeClass("d-block");
            $(".error_message_number2").addClass("d-block");
            $(".error_message_number2").removeClass("d-none");
            $(this).addClass("is-invalid").removeClass("is-valid");
            $(this).on("keydown", function () {
              $(".error_message_number2").removeClass("d-block");
              $(".error_message_number2").addClass("d-none");
            });
          }
        }
      }
    });

  $("#" + form_id)
    .find("input.number3:visible")
    .each(function () {
      var number = $(this).val();
     

      if ($.isNumeric(number)) {
        $(this).removeClass("is-invalid").addClass("is-valid");
      } else {
        if ($(this).val() == "") {
          $(this).addClass("is-invalid").removeClass("is-valid");
          $(this).nextAll(".error_message").removeClass("d-none");
          $(this).on("keydown", function () {
            $(".error_message").addClass("d-none");
          });
        } else {
          if (!$.isNumeric(number)) {
            $(this).nextAll(".error_message").removeClass("d-block");
            $(".error_message_number3").addClass("d-block");
            $(".error_message_number3").removeClass("d-none");
            $(this).addClass("is-invalid").removeClass("is-valid");
            $(this).on("keydown", function () {
              $(".error_message_number3").removeClass("d-block");
              $(".error_message_number3").addClass("d-none");
            });
          }
        }
      }
    });

  $("#" + form_id)
    .find("input.number4:visible")
    .each(function () {
      var number = $(this).val();
  

      if ($.isNumeric(number)) {
        $(this).removeClass("is-invalid").addClass("is-valid");
      } else {
        if ($(this).val() == "") {
          $(this).addClass("is-invalid").removeClass("is-valid");
          $(this).nextAll(".error_message").removeClass("d-none");
          $(this).on("keydown", function () {
            $(".error_message").addClass("d-none");
          });
        } else {
          if (!$.isNumeric(number)) {
            $(this).nextAll(".error_message").removeClass("d-block");
            $(".error_message_number4").addClass("d-block");
            $(".error_message_number4").removeClass("d-none");
            $(this).addClass("is-invalid").removeClass("is-valid");
            $(this).on("keydown", function () {
              $(".error_message_number4").removeClass("d-block");
              $(".error_message_number4").addClass("d-none");
            });
          }
        }
      }
    });

  $("#" + form_id)
    .find("input.cardnumber:visible")
    .each(function () {
      var number = $(this).val();
      

      if ($.isNumeric(number)) {
        $(this).removeClass("is-invalid").addClass("is-valid");
      } else {
        if ($(this).val() == "") {
          $(this).addClass("is-valid").removeClass("is-invalid");
        } else {
          if (!$.isNumeric(number)) {
            $(this).nextAll(".error_message").removeClass("d-block");
            $(".error_message_number4").addClass("d-block");
            $(".error_message_number4").removeClass("d-none");
            $(this).addClass("is-invalid").removeClass("is-valid");
            $(this).on("keydown", function () {
              $(this).addClass("is-valid").removeClass("is-invalid");
              $(".error_message_number4").removeClass("d-block");
              $(".error_message_number4").addClass("d-none");
            });
          }
        }
      }
    });

  // to check if input is number end

  $("#" + form_id)
    .find("input.phone:visible")
    .each(function () {
      var countrycode = $($(".countrycode")[0]).val();
      if ($(this).val() != "") {
        if (isPhone($(this).val(), countrycode)) {
          $(this).removeClass("is-invalid").addClass("is-valid");
        } else {
          $(this).addClass("is-invalid").removeClass("is-valid");
          $(this).nextAll(".error_message").removeClass("d-none");
        }
      }
    });

  ///subarb /city ////
  $("#" + form_id)
    .find("input.cityvalidation:visible")
    .each(function () {
      if ($(this).val() != "") {
        if (isSubarb($(this).val())) {
          $(this).removeClass("is-invalid").addClass("is-valid");
        } else {
          $(this).addClass("is-invalid").removeClass("is-valid");
          $(this).nextAll(".error_message_city").removeClass("d-none");
        }
      }
    });
  ///////////////////

  // for link start
  $("#" + form_id)
    .find("input.link:visible")
    .each(function () {
      if ($(this).val().length > 0) {
        if (isSixDigit($(this).val()) || isLink($(this).val())) {
          $(this).removeClass("is-invalid").addClass("is-valid");
          $(".error_message").addClass("d-none");
        } else {
          $(this).addClass("is-invalid").removeClass("is-valid");
          $(this).nextAll(".error_message").removeClass("d-none");
        }
      }
    });
  // for link end

    // for website start
    $("#" + form_id)
    .find("input.website:visible")
    .each(function () {
      if ($(this).val().length > 0) {
        if (isLink($(this).val())) {
          $(this).removeClass("is-invalid").addClass("is-valid");
          $(".web_error_message").addClass("d-none");
        } else {
          $(this).addClass("is-invalid").removeClass("is-valid");
          $(this).nextAll(".web_error_message").removeClass("d-none");
        }
      }
    });
  // for link end

  // to match password and confirm password start

  $("#" + form_id)
    .find("input.password:visible")
    .each(function () {
      let pass = $(this).val();

      $("#" + form_id)
        .find("input.cpassword:visible")
        .each(function () {
          let cpass = $(this).val();

         

          if (pass == cpass) {
            $(this).nextAll(".error_message_matchpass").addClass("d-none");
            // $("is-invalid").addClass("is-valid");
          } else {
            $(this).addClass("is-invalid").removeClass("is-valid");
            if (cpass !== "") {
              $(".error_message_matchpass").removeClass("d-none");
              $("is-invalid").removeClass("is-valid");
              $(this).on("keydown", function () {
                $("is-invalid").removeClass("is-valid");
                $(".error_message_matchpass").addClass("d-none");
              });
            } else {
              $(".error_message_matchpass").addClass("d-none");
            }
          }
        });
    });
  // });

  // to check cpassword input rules end

  $("#" + form_id)
    .find("input.password:visible")
    .each(function () {
      if (passwordCheck($(this).val())) {
        $(this).removeClass("is-invalid").addClass("is-valid");
        $(this).on("keydown", function () {
          $(".password_error_message").addClass("d-none");
        });
      } else {
        $(this).addClass("is-invalid").removeClass("is-valid");
        if ($(this).val() != "") {
          $(".password_error_message").removeClass("d-none");
        }
        $(this).on("keydown", function () {
          $(".password_error_message").addClass("d-none");
        });
      }
    });

  // to check password input rules end

  // to check cpassword input rules start
  // $("#" + form_id).find("input.cpassword:visible").each(function () {

  //     if (passwordCheck($(this).val())) {

  //         $(this).removeClass("is-invalid").addClass("is-valid");
  //     }
  //     else {
  //         $(this).addClass("is-invalid").removeClass("is-valid");
  //     }
  // });

  if ($("#" + form_id).find(".is-invalid").length) {
    // $(document).scrollTop($("#" + form_id).find(".is-invalid").position().top);
    return false;
  } else {
    return true;
  }
};

const isEmail = (email) => {
  var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return regex.test(email);
};

const isPhone = (phone, countrycode = "0") => {
  // 

  var phoneno = /^(?!0|4)\d{5,15}$/;
  var phoneno1 = /^((04)|0)\d{8}$/; ///^(0\d{9})$/;
  var phoneno2 = /^4\d{8}$/;

  if (countrycode == "+61") {
    if (phone.match(phoneno1)) {
      return true;
    }
    else if (phone.match(phoneno2)) {
      return true;
    }
  }
  else if (phone.match(phoneno)) {
    return true;
  }
  else {
    return false;
  }
};

const isSubarb = (Subarb) => {
  // 
  var text = /^[^0-9]*$/;
  if (Subarb.match(text)) {
    return true;
  } else {
    return false;
  }
};

exports.isPhoneRange = (phoneCmp) => {
  var phoneno = /^\d{8,15}$/;
  if (phoneCmp.match(phoneno)) {
    return true;
  } else {
    return false;
  }
};

const isSixDigit = (digitCheck) => {
  var sixDigit = /^[a-zA-Z0-9]{6}$/;
  if (digitCheck.match(sixDigit)) {
    return true;
  } else {
    return false;
  }
};

const isLink = (linkCheck) => {
  var link =
    /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
  if (linkCheck.match(link)) {
    return true;
  } else {
    return false;
  }
};

const passwordCheck = (passwordStringCheck) => {
  var passwordString =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+~`|}{[\]:;\"'<,>.?\/\\])(?!.*\s).{6,}$/;
  if (passwordStringCheck.match(passwordString)) {
    return true;
  } else {
    return false;
  }
};

// to match password and confirm password End

// to check password input rules start

// $("#" + form_id).find("input.password:visible").each(function () {

//     if (passwordCheck($(this).val())) {

//         $(this).removeClass("is-invalid").addClass("is-valid");
//         $(this).on('keydown', function () {
//             $(".password_error_message").addClass("d-none");
//         });
//     }
//     else {
//         $(this).addClass("is-invalid").removeClass("is-valid");
//         if ($(this).val() != "") {
//             $(".password_error_message").removeClass("d-none");
//         }
//         $(this).on('keydown', function () {
//             $(".password_error_message").addClass("d-none");
//         });
//     }
// });

// to check password input rules end

// to check cpassword input rules start
// $("#" + form_id).find("input.cpassword:visible").each(function () {

//     if (passwordCheck($(this).val())) {

//         $(this).removeClass("is-invalid").addClass("is-valid");
//     }
//     else {
//         $(this).addClass("is-invalid").removeClass("is-valid");
//     }
// });

// to check cpassword input rules end
