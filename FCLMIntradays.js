// ==UserScript==
// @name         FCLM Intradays
// @namespace    http://tampermonkey.net/
// @version      2.1
// @description  Add intra days buttons mapped to the shift corners
// @author       nowaratn rewritten and modified by remmerja
// @match        https://fclm-portal.amazon.com/*
// @icon         https://fclm-portal.amazon.com/resources/images/icon.jpg
// @grant        none
// ==/UserScript==

let dayShiftStartHour = 7;
let dayShiftStartMinute = 0;
let dayShiftEndHour = 17;
let dayShiftEndMinute = 3;

let nightShiftStartHour = 18;
let nightShiftStartMinute = 0;
let nightShiftEndHour = 6;
let nightShiftEndMinute = 3;

if(localStorage.getItem("dayShiftStartHour") != null) {
    dayShiftStartHour = localStorage.getItem("dayShiftStartHour");
    dayShiftStartMinute = localStorage.getItem("dayShiftStartMinute");
    dayShiftEndHour = localStorage.getItem("dayShiftEndHour");
    dayShiftEndMinute = localStorage.getItem("dayShiftEndMinute");
    nightShiftStartHour = localStorage.getItem("nightShiftStartHour");
    nightShiftStartMinute = localStorage.getItem("nightShiftStartMinute");
    nightShiftEndHour = localStorage.getItem("nightShiftEndHour");
    nightShiftEndMinute = localStorage.getItem("nightShiftEndMinute");
}

let interval = setInterval(function() {

    if(document.getElementsByClassName("cp-submit-row")[0] != undefined && document.getElementsByTagName("table")[0] != undefined) {
        if (document.getElementById("menuDiv") == undefined) {
            for(let i = 0; i < document.getElementsByTagName("table").length; i++) {

                // Set width to 800px to fit all the intradays buttons
                if(document.getElementsByTagName("table")[i].className == "") {
                    document.getElementsByTagName("table")[i].style.width = "800px";
                    i = 50;
                }
            }

            // Get rid of legacy link - it is depreciated anyways
            if(document.getElementsByClassName("legacy-link")[0] != undefined) {
                document.getElementsByClassName("legacy-link")[0].remove();
            }

            // Button to show or hide the menu
            // ***** Can be better stylized. *****
            let menuButtonDiv = document.createElement('div');
            menuButtonDiv.id = 'menuButtonDiv';
            menuButtonDiv.style.display = 'contents';

            let menuButton = document.createElement('input');
            menuButton.type = 'button';
            menuButton.id = 'menuButton';
            menuButton.value = '';
            menuButton.className = '';
            menuButton.style.float = 'left';
            menuButton.style.backgroundColor = '#ffff';
            menuButton.style.backgroundRepeat = 'no-repeat';
            menuButton.style.backgroundSize = '16px 16px';
            menuButton.style.width = '16px';
            menuButton.style.height = '16px';

            menuButtonDiv.appendChild(menuButton);
            document.getElementsByClassName("cp-submit-row")[0].appendChild(menuButtonDiv);
            menuButton.addEventListener('click', buttonClickMenu);

            function buttonClickMenu(e) {
                if(document.getElementById("menuDiv").style.visibility == "visible") {
                    document.getElementById("menuDiv").style.visibility = "hidden";
                } else {
                    document.getElementById("menuDiv").style.visibility = "visible";
                }
            }

            // Menu to configure the hour selections buttons
            let menuDiv = document.createElement("div");
            menuDiv.id = "menuDiv";
            menuDiv.style = "position: fixed; visibility: hidden; background-color: grey; border-style: solid; border-color: black; border-size: 2px; width: 210px; height: 200px; left: 10px; top: 15%;";
            menuDiv.innerHTML =
                '<div id="menuD" style="padding: 5px;">' +
                    '<div style="text-align: left;">Start Day Shift:' +
                        '<select id="startHourDayShift" name="startHourDayShiftSelect" class="cs-select no-expand">' +
                            '<option value="0" selected="selected">00</option>' +
                            '<option value="1">01</option>' +
                            '<option value="2">02</option>' +
                            '<option value="3">03</option>' +
                            '<option value="4">04</option>' +
                            '<option value="5">05</option>' +
                            '<option value="6">06</option>' +
                            '<option value="7">07</option>' +
                            '<option value="8">08</option>' +
                            '<option value="9">09</option>' +
                            '<option value="10">10</option>' +
                            '<option value="11">11</option>' +
                            '<option value="12">12</option>' +
                            '<option value="13">13</option>' +
                            '<option value="14">14</option>' +
                            '<option value="15">15</option>' +
                            '<option value="16">16</option>' +
                            '<option value="17">17</option>' +
                            '<option value="18">18</option>' +
                            '<option value="19">19</option>' +
                            '<option value="20">20</option>' +
                            '<option value="21">21</option>' +
                            '<option value="22">22</option>' +
                            '<option value="23">23</option>' +
                        '</select>' +
                        '<select id="startMinuteDayShift" name="startMinuteDayShiftSelect" class="cp-select no-expand">' +
                            '<option value="0" selected="selected">00</option>' +
                            '<option value="15">15</option>' +
                            '<option value="30">30</option>' +
                            '<option value="45">45</option>' +
                        '</select></br>' +
                        'End Day Shift:' +
                        '<select id="endHourDayShift" name="endHourDayShiftSelect" class="cs-select no-expand">' +
                            '<option value="0" selected="selected">00</option>' +
                            '<option value="1">01</option>' +
                            '<option value="2">02</option>' +
                            '<option value="3">03</option>' +
                            '<option value="4">04</option>' +
                            '<option value="5">05</option>' +
                            '<option value="6">06</option>' +
                            '<option value="7">07</option>' +
                            '<option value="8">08</option>' +
                            '<option value="9">09</option>' +
                            '<option value="10">10</option>' +
                            '<option value="11">11</option>' +
                            '<option value="12">12</option>' +
                            '<option value="13">13</option>' +
                            '<option value="14">14</option>' +
                            '<option value="15">15</option>' +
                            '<option value="16">16</option>' +
                            '<option value="17">17</option>' +
                            '<option value="18">18</option>' +
                            '<option value="19">19</option>' +
                            '<option value="20">20</option>' +
                            '<option value="21">21</option>' +
                            '<option value="22">22</option>' +
                            '<option value="23">23</option>' +
                        '</select>' +
                        '<select id="endMinuteDayShift" name="endMinuteDayShiftSelect" class="cp-select no-expand">' +
                            '<option value="0" selected="selected">00</option>' +
                            '<option value="15">15</option>' +
                            '<option value="30">30</option>' +
                            '<option value="45">45</option>' +
                        '</select><hr>' +
                    '</div>' + // wasnt closed on the previous code - but the previous code left us with an extra unclosed div

                    '<div style="text-align: left;">Start Night Shift:' +
                        '<select id="startHourNightShift" name="startHourNightShiftSelect" class="cs-select no-expand">' +
                            '<option value="0" selected="selected">00</option>' +
                            '<option value="1">01</option>' +
                            '<option value="2">02</option>' +
                            '<option value="3">03</option>' +
                            '<option value="4">04</option>' +
                            '<option value="5">05</option>' +
                            '<option value="6">06</option>' +
                            '<option value="7">07</option>' +
                            '<option value="8">08</option>' +
                            '<option value="9">09</option>' +
                            '<option value="10">10</option>' +
                            '<option value="11">11</option>' +
                            '<option value="12">12</option>' +
                            '<option value="13">13</option>' +
                            '<option value="14">14</option>' +
                            '<option value="15">15</option>' +
                            '<option value="16">16</option>' +
                            '<option value="17">17</option>' +
                            '<option value="18">18</option>' +
                            '<option value="19">19</option>' +
                            '<option value="20">20</option>' +
                            '<option value="21">21</option>' +
                            '<option value="22">22</option>' +
                            '<option value="23">23</option>' +
                        '</select>' +
                        '<select id="startMinuteNightShift" name="startMinuteNightShiftSelect" class="cp-select no-expand">' +
                            '<option value="0" selected="selected">00</option>' +
                            '<option value="15">15</option>' +
                            '<option value="30">30</option>' +
                            '<option value="45">45</option>' +
                        '</select></br>' +
                        'End Night Shift:' +
                        '<select id="endHourNightShift" name="endHourNightShiftSelect" class="cs-select no-expand">' +
                            '<option value="0" selected="selected">00</option>' +
                            '<option value="1">01</option>' +
                            '<option value="2">02</option>' +
                            '<option value="3">03</option>' +
                            '<option value="4">04</option>' +
                            '<option value="5">05</option>' +
                            '<option value="6">06</option>' +
                            '<option value="7">07</option>' +
                            '<option value="8">08</option>' +
                            '<option value="9">09</option>' +
                            '<option value="10">10</option>' +
                            '<option value="11">11</option>' +
                            '<option value="12">12</option>' +
                            '<option value="13">13</option>' +
                            '<option value="14">14</option>' +
                            '<option value="15">15</option>' +
                            '<option value="16">16</option>' +
                            '<option value="17">17</option>' +
                            '<option value="18">18</option>' +
                            '<option value="19">19</option>' +
                            '<option value="20">20</option>' +
                            '<option value="21">21</option>' +
                            '<option value="22">22</option>' +
                            '<option value="23">23</option>' +
                        '</select>' +
                        '<select id="endMinuteNightShift" name="endMinuteNightShiftSelect" class="cp-select no-expand">' +
                            '<option value="0" selected="selected">00</option>' +
                            '<option value="15">15</option>' +
                            '<option value="30">30</option>' +
                            '<option value="45">45</option>' +
                        '</select><hr>' +
                    '</div>' +

                    '<input type="checkbox" id="adjust_plan_checkbox">Adjust for Intradays?<br>' +
                    '<input type="checkbox" id="empty_lines_checkbox">Hide Empty Lines?<br>' +
                    '<input type="button" id="saveButton" value="Save"><input type="button" id="clearButton" value="Clear">' +
                '</div>';

            document.getElementsByClassName("cp-submit-row")[0].appendChild(menuDiv);

            // Set the botton settings according to the menu configuration selections
            if(localStorage.getItem("dayShiftStartHour") != null) {
                document.getElementById("startHourDayShift").value = localStorage.getItem("dayShiftStartHour");
                document.getElementById("startMinuteDayShift").value = localStorage.getItem("dayShiftStartMinute");
                document.getElementById("endHourDayShift").value = localStorage.getItem("dayShiftEndHour");
                document.getElementById("endMinuteDayShift").value = localStorage.getItem("dayShiftEndMinute");
                document.getElementById("startHourNightShift").value = localStorage.getItem("nightShiftStartHour");
                document.getElementById("startMinuteNightShift").value = localStorage.getItem("nightShiftStartMinute");
                document.getElementById("endHourNightShift").value = localStorage.getItem("nightShiftEndHour");
                document.getElementById("endMinuteNightShift").value = localStorage.getItem("nightShiftEndMinute");
            }

            // Update localstorage values when the menu's submit button is clicked
            document.getElementById("saveButton").addEventListener("click", buttonClickSubmit, false);

            function buttonClickSubmit(e) {
                localStorage.setItem("dayShiftStartHour", document.getElementById("startHourDayShift").value);
                localStorage.setItem("dayShiftStartMinute", document.getElementById("startMinuteDayShift").value);
                localStorage.setItem("dayShiftEndHour", document.getElementById("endHourDayShift").value);
                localStorage.setItem("dayShiftEndMinute", document.getElementById("endMinuteDayShift").value);
                localStorage.setItem("nightShiftStartHour", document.getElementById("startHourNightShift").value);
                localStorage.setItem("nightShiftStartMinute", document.getElementById("startMinuteNightShift").value);
                localStorage.setItem("nightShiftEndHour", document.getElementById("endHourNightShift").value);
                localStorage.setItem("nightShiftEndMinute", document.getElementById("endMinuteNightShift").value);

                document.getElementById("menuDiv").style.visibility = "hidden";
            }

            // Clear localstorage values when the menu's clear button is clicked
            document.getElementById("clearButton").addEventListener("click", buttonClickClear, false);

            function buttonClickClear(e) {
                localStorage.removeItem("dayShiftStartHour");
                localStorage.removeItem("dayShiftStartMinute");
                localStorage.removeItem("dayShiftEndHour");
                localStorage.removeItem("dayShiftEndMinute");
                localStorage.removeItem("nightShiftStartHour");
                localStorage.removeItem("nightShiftStartMinute");
                localStorage.removeItem("nightShiftEndHour");
                localStorage.removeItem("nightShiftEndMinute");

                document.getElementById("startHourDayShift").value = localStorage.getItem("dayShiftStartHour");
                document.getElementById("startMinuteDayShift").value = localStorage.getItem("dayShiftStartMinute");
                document.getElementById("endHourDayShift").value = localStorage.getItem("dayShiftEndHour");
                document.getElementById("endMinuteDayShift").value = localStorage.getItem("dayShiftEndMinute");
                document.getElementById("startHourNightShift").value = localStorage.getItem("nightShiftStartHour");
                document.getElementById("startMinuteNightShift").value = localStorage.getItem("nightShiftStartMinute");
                document.getElementById("endHourNightShift").value = localStorage.getItem("nightShiftEndHour");
                document.getElementById("endMinuteNightShift").value = localStorage.getItem("nightShiftEndMinute");
            }

            // Yellow disclaimer banner disappears
            const disclaimerElements = document.getElementsByClassName("disclaimer");
            if (disclaimerElements.length > 0) {
                // Access the first element and set its style
                disclaimerElements[0].style.display = "none";
            }

            // Variables for day and night style
            let dayStyle = 'background-color:  #baefff; color: black; border-radius: 4px; border: 2px solid black; text-align: center;';
            let nightStyle = 'background-color:  #000a80; color: white; border-radius: 4px; border: 2px solid black; text-align: center;';

            // Creating the Day and Night shift intraday input buttons
            let intradaysDiv = document.createElement("div");
            intradaysDiv.id = "intradaysDiv";
            intradaysDiv.style = "display: contents;";
            intradaysDiv.innerHTML = '<input type="button" id="dayShiftYesterday" value="Day Shift (Yesterday)" class="cp-submit" style="float: left; font-size: 10px; ' + dayStyle + '">' +
                '<input type="button" id="nightShiftYesterday" value="Night Shift (Yesterday)" class="cp-submit" style="float: left; font-size: 10px; ' + nightStyle + '">' +
                '<input type="button" id="dayShiftToday" value="Day Shift (Today)" class="cp-submit" style="float: left; font-size: 10px; ' + dayStyle + '">' +
                '<input type="button" id="nightShiftToday" value="Night Shift (Today)" class="cp-submit" style="float: left; font-size: 10px; ' + nightStyle + '">';
            document.getElementsByClassName("cp-submit-row")[0].appendChild(intradaysDiv);

            document.getElementById("dayShiftYesterday").addEventListener("click", buttonClickDayYesterday, false);
            document.getElementById("nightShiftYesterday").addEventListener("click", buttonClickNightYesterday, false);
            document.getElementById("dayShiftToday").addEventListener("click", buttonClickDayToday, false);
            document.getElementById("nightShiftToday").addEventListener("click", buttonClickNightToday, false);
            // We will set the funtions for these listeners after setting the dates

            // Next we are setting the dates to be used in intradays selections
            // Temp dates are used to calculate yesterday and tomorrow dates without messing with today date
            let temp = new Date();
            let temp2 = new Date();
            let temp3 = new Date();
            let today = new Date();
            let yesterday = new Date(temp2.setDate(temp2.getDate() - 1));
            let tomorrow = new Date(temp.setDate(temp.getDate() + 1));
            // Used for yesterday when nightshift flips to a new Date at midnight
            let yesteredAfterMidnight = new Date(temp3.setDate(temp3.getDate() - 2));

            let todayString;
            let yesterdayString;
            let tomorrowString;
            let yesterdayAfterMidnightString;

            let dd = String(today.getDate()).padStart(2, '0');
            let mm = String(today.getMonth() + 1).padStart(2, '0');
            let yyyy = today.getFullYear();

            let time = today.getHours();
            // Sets the font weight heavier when a specific shift is ocurring
            if(time >= 7 && time <= 18) {
                document.getElementById("dayShiftToday").style.fontWeight = "900";
            } else {
                document.getElementById("nightShiftToday").style.fontWeight = "900";
            }

            todayString = yyyy + '/' + mm + '/' + dd;

            // Set the yesterdayString and tomorrowString and yesterdayAfterMidnightString with values
            dd = String(yesterday.getDate()).padStart(2, '0');
            mm = String(yesterday.getMonth() + 1).padStart(2, '0');
            yyyy = yesterday.getFullYear();
            yesterdayString = yyyy + '/' + mm + '/' + dd;
            dd = String(tomorrow.getDate()).padStart(2, '0');
            mm = String(tomorrow.getMonth() + 1).padStart(2, '0');
            yyyy = tomorrow.getFullYear();
            tomorrowString = yyyy + '/' + mm + '/' + dd;
            dd = String(yesteredAfterMidnight.getDate()).padStart(2, '0');
            mm = String(yesteredAfterMidnight.getMonth() + 1).padStart(2, '0');
            yyyy = yesteredAfterMidnight.getFullYear();
            yesterdayAfterMidnightString = yyyy + '/' + mm + '/' + dd;

            // Button functions
            function buttonClickDayYesterday(e) {
                if(document.getElementsByName("spanType").length > 0) {
                    document.getElementsByName("spanType")[document.getElementsByName("spanType").length - 1].checked = true;
                }

                // if else() statement makes the shift date consistant for night shifts pulling data that after their shift crosses into a new date.
                if (today.getHours() < dayShiftStartHour) {
                    document.getElementById("startDateIntraday").value = yesterdayAfterMidnightString;
                    document.getElementById("endDateIntraday").value = yesterdayAfterMidnightString;
                } else {
                    document.getElementById("startDateIntraday").value = yesterdayString;
                    document.getElementById("endDateIntraday").value = yesterdayString;
                }

                document.getElementById("startHourIntraday").value = dayShiftStartHour;
                document.getElementById("startMinuteIntraday").value = dayShiftStartMinute;
                document.getElementById("endHourIntraday").value = dayShiftEndHour;
                document.getElementById("endMinuteIntraday").value = dayShiftEndMinute;
            }

            function buttonClickNightYesterday(e) {
                if(document.getElementsByName("spanType").length > 0) {
                    document.getElementsByName("spanType")[document.getElementsByName("spanType").length - 1].checked = true;
                }

                if (today.getHours() < dayShiftStartHour) {
                    document.getElementById("startDateIntraday").value = yesterdayAfterMidnightString;
                    document.getElementById("endDateIntraday").value = yesterdayString;
                } else {
                    document.getElementById("startDateIntraday").value = yesterdayString;
                    document.getElementById("endDateIntraday").value = yesterdayString;
                }

                document.getElementById("startHourIntraday").value = nightShiftStartHour;
                document.getElementById("startMinuteIntraday").value = nightShiftStartMinute;
                document.getElementById("endHourIntraday").value = nightShiftEndHour;
                document.getElementById("endMinuteIntraday").value = nightShiftEndMinute;
            }

            function buttonClickDayToday(e) {
                if(document.getElementsByName("spanType").length > 0) {
                    document.getElementsByName("spanType")[document.getElementsByName("spanType").length - 1].checked = true;
                }

                if (today.getHours() < dayShiftStartHour) {
                    document.getElementById("startDateIntraday").value = yesterdayString;
                    document.getElementById("endDateIntraday").value = yesterdayString;
                } else {
                    document.getElementById("startDateIntraday").value = todayString;
                    document.getElementById("endDateIntraday").value = todayString;
                }

                document.getElementById("startHourIntraday").value = dayShiftStartHour;
                document.getElementById("startMinuteIntraday").value = dayShiftStartMinute;
                document.getElementById("endHourIntraday").value = dayShiftEndHour;
                document.getElementById("endMinuteIntraday").value = dayShiftEndMinute;
            }

            function buttonClickNightToday(e) {
                if(document.getElementsByName("spanType").length > 0) {
                    document.getElementsByName("spanType")[document.getElementsByName("spanType").length - 1].checked = true;
                }

                if (today.getHours() < dayShiftStartHour) {
                    document.getElementById("startDateIntraday").value = yesterdayString;
                    document.getElementById("endDateIntraday").value = todayString;
                } else {
                    document.getElementById("startDateIntraday").value = todayString;
                    document.getElementById("endDateIntraday").value = tomorrowString;
                }

                document.getElementById("startHourIntraday").value = nightShiftStartHour;
                document.getElementById("startMinuteIntraday").value = nightShiftStartMinute;
                document.getElementById("endHourIntraday").value = nightShiftEndHour;
                document.getElementById("endMinuteIntraday").value = nightShiftEndMinute;
            }
            
            // Add button click for P1,P2,P3. If value of start hour and date is = to the value of a specific shift- P? is mapped to that shift.

            // Stop our interval
            clearInterval(interval);

        }
    }

}, 100);
