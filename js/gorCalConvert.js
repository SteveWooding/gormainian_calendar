/**
 * @fileoverview Converts Gregorian dates to Gormanian dates. It uses the
 * date picker from jQuery UI. When the web page loads, it sets the input
 * date to today's date. When the user wants to convert a date, the convert()
 * function is called and the result element of the web page is updated.
 * @author contact@stevenwooding.com (Steven Wooding)
 */

// Function for iQuery UI date picker
$(function() {
        $('#datepicker').datepicker({
            dateFormat: 'dd/mm/yy',
            defaultDate: 0,
            onSelect: function () {
                $('#datepicker').attr('value', this.value);
            }
        });
    });

// Fill in today's date in the input field
var date = new Date();
var dd = date.getDate();
var mm = date.getMonth() + 1; //January is 0!
var yyyy = date.getFullYear();

var ddStr = dd.toString();
if (dd < 10) {
    ddStr = '0' + ddStr;
}

var mmStr = mm.toString();
if (mm < 10) {
    mmStr = '0' + mmStr;
}

var today = ddStr + '/' + mmStr + '/' + yyyy;
$('#datepicker').attr('value', today);


/**
 * Converts from the Gregorian date to the Gormanian date.
 */
function convert() {
    var inputDate = $('#datepicker').attr('value');
    // First calculate the day number in the year
    var days_in_months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    // Parse the date to be converted
    var inputDateElements = inputDate.split('/');
    var dayNum = parseInt(inputDateElements[0]);
    var monthNum = parseInt(inputDateElements[1]);
    var yearNum = parseInt(inputDateElements[2]);

    // Account for leap years
    if (yearNum % 4 == 0) {
        days_in_months[1] = 29;
    }

    var nthDay = 0;
    for (var i = 0; i < monthNum - 1; i++) {
        nthDay += days_in_months[i];
    }
    nthDay += dayNum;

    // Define the Gormanian months
    var gormanMonths = ['March', 'April', 'May', 'June', 'Quintilis', 'Sextilis',
                        'September', 'October', 'November', 'December', 'January',
                        'February', 'Gormanuary'];

    // Calculate the Gorman day and month
    var gormanMonth = Math.floor(nthDay/28);
    var gormanDay = nthDay % 28;
    if (gormanDay == 0) {
        gormanDay = 28;
        gormanMonth -= 1;
    }

    // Set the date modifier
    var dateMod = 'th';
    switch (gormanDay) {
        case 1:
        case 21:
            dateMod = 'st';
            break;
        case 2:
        case 22:
            dateMod = 'nd';
            break;
        case 3:
        case 23:
            dateMod = 'rd';
            break;
    }

    // Set the Gorman date string
    var gormanDate = 'Intermission';
    if (nthDay < 365) {
        gormanDate = gormanDay.toString() + dateMod + ' ' + gormanMonths[gormanMonth] + ' ' + yearNum.toString();
    }

    $('#result').html("<p><b>Gormanian Date:</b></p>" + gormanDate);
}