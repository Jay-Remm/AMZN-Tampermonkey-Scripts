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

let firstBreakDaysHour = 10;
let firstBreakDaysMinute = 0;
let secondBreakDaysHour = 14;
let secondBreakDaysMinute = 0;

let firstBreakNightsHour = 22;
let firstBreakNightsMinute = 0;
let secondBreakNightsHour = 2;
let secondBreakNightsMinute = 0;

if(localStorage.getItem("dayShiftStartHour") != null) {
    dayShiftStartHour = localStorage.getItem("dayShiftStartHour");
    dayShiftStartMinute = localStorage.getItem("dayShiftStartMinute");
    dayShiftEndHour = localStorage.getItem("dayShiftEndHour");
    dayShiftEndMinute = localStorage.getItem("dayShiftEndMinute");
    nightShiftStartHour = localStorage.getItem("nightShiftStartHour");
    nightShiftStartMinute = localStorage.getItem("nightShiftStartMinute");
    nightShiftEndHour = localStorage.getItem("nightShiftEndHour");
    nightShiftEndMinute = localStorage.getItem("nightShiftEndMinute");
    firstBreakDaysHour = localStorage.getItem("firstBreakDaysHour");
    firstBreakDaysMinute = localStorage.getItem("firstBreakDaysMinute");
    secondBreakDaysHour = localStorage.getItem("secondBreakDaysHour");
    secondBreakDaysMinute = localStorage.getItem("secondBreakDaysMinute");
    firstBreakNightsHour = localStorage.getItem("firstBreakNightsHour");
    firstBreakNightsMinute = localStorage.getItem("firstBreakNightsMinute");
    secondBreakNightsHour = localStorage.getItem("secondBreakNightsHour");
    secondBreakNightsMinute = localStorage.getItem("secondBreakNightsMinute");
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
                   document.getElementById("periodSelectorMenu").style.visibility = "hidden";
                } else {
                    document.getElementById("menuDiv").style.visibility = "visible";
                    if (localStorage.getItem("periodButtons")) {
                        document.getElementById("periodSelectorMenu").style.visibility = "visible";
                    }
                }
            }

            // Menu to configure the hour selections buttons
            let menuDiv = document.createElement("div");
            menuDiv.id = "menuDiv";
            menuDiv.style = "position: fixed; visibility: hidden; background-color: #d8ffe2; border-style: solid; border-color: black; border-size: 2px; border-radius: 4px; width: 215px; height: 400px; left: 10px; top: 15%;";
            menuDiv.innerHTML =
                '<div id="menuD" style="padding: 5px;">' +
                    '<div style="text-align: left;">Start Day Shift: ' +
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
                        'End Day Shift:  ' +
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

                    '<div style="text-align: left;">Start Night Shift: ' +
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
                        'End Night Shift:  ' +
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
                    '<input type="checkbox" id="empty_lines_checkbox">Hide Empty Lines?<hr>' +
                    // Adding a selector to add period buttons
                    '<input type="checkbox" id="periodButtonsCheckbox">Add period adjusters?  <details><summary>details</summary>Period buttons work in conjuction with the Intraday buttons. In order for the inputs to work: You must first click the Intraday button for the shift you want to view and THEN select the period button for that shift.</details><br>' +
                    // Adding an extra selections for break times to calculate period seperators
                    '<div id="periodSelectorMenu" style="text-align: left; visibility: hidden;">1st Break Days: ' +
                        '<select id="firstBreakDaysHour" name="firstBreakDaysHourSelect" class="cs-select no-expand">' +
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
                        '<select id="firstBreakDaysMinute" name="firstBreakDaysMinuteSelect" class="cp-select no-expand">' +
                            '<option value="0" selected="selected">00</option>' +
                            '<option value="15">15</option>' +
                            '<option value="30">30</option>' +
                            '<option value="45">45</option>' +
                        '</select></br>' +
                        '2nd Break Days: ' +
                        '<select id="secondBreakDaysHour" name="secondBreakDaysHourSelect" class="cs-select no-expand">' +
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
                        '<select id="secondBreakDaysMinute" name="secondBreakDaysMinuteSelect" class="cp-select no-expand">' +
                            '<option value="0" selected="selected">00</option>' +
                            '<option value="15">15</option>' +
                            '<option value="30">30</option>' +
                            '<option value="45">45</option>' +
                        '</select><hr>' +
                        '1st Break Nights: ' +
                        '<select id="firstBreakNightsHour" name="firstBreakNightsHourSelect" class="cs-select no-expand">' +
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
                        '<select id="firstBreakNightsMinute" name="firstBreakNightsMinuteSelect" class="cp-select no-expand">' +
                            '<option value="0" selected="selected">00</option>' +
                            '<option value="15">15</option>' +
                            '<option value="30">30</option>' +
                            '<option value="45">45</option>' +
                        '</select></br>' +
                        '2nd Break Nights: ' +
                        '<select id="secondBreakNightsHour" name="secondBreakNightsHourSelect" class="cs-select no-expand">' +
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
                        '<select id="secondBreakNightsMinute" name="secondBreakNightsMinuteSelect" class="cp-select no-expand">' +
                            '<option value="0" selected="selected">00</option>' +
                            '<option value="15">15</option>' +
                            '<option value="30">30</option>' +
                            '<option value="45">45</option>' +
                        '</select><hr>' +
                    '</div>' +
                    // finishing off with our save and clear buttons
                    '<input type="button" id="saveButton" value="Save"><input type="button" id="clearButton" value="Clear">' +
                '</div>';

            document.getElementsByClassName("cp-submit-row")[0].appendChild(menuDiv);
            const adjustPlanCheckbox = document.getElementById("adjust_plan_checkbox");
            const emptyLinesCheckbox = document.getElementById("empty_lines_checkbox");
            const periodButtonsCheckbox = document.getElementById("periodButtonsCheckbox");

            // Add an event listener to display the period menu
            periodButtonsCheckbox.addEventListener("change", (e) => {
                const periodSelectorMenu = document.getElementById("periodSelectorMenu");
                if (e.target.checked) {
                    periodSelectorMenu.style.visibility = "visible";
                } else {
                    periodSelectorMenu.style.visibility = "hidden";
                }
            });

            // Set the button configuration settings to the local storage values if local storage values are present
            if(localStorage.getItem("dayShiftStartHour") != null) {
                document.getElementById("startHourDayShift").value = localStorage.getItem("dayShiftStartHour");
                document.getElementById("startMinuteDayShift").value = localStorage.getItem("dayShiftStartMinute");
                document.getElementById("endHourDayShift").value = localStorage.getItem("dayShiftEndHour");
                document.getElementById("endMinuteDayShift").value = localStorage.getItem("dayShiftEndMinute");
                document.getElementById("startHourNightShift").value = localStorage.getItem("nightShiftStartHour");
                document.getElementById("startMinuteNightShift").value = localStorage.getItem("nightShiftStartMinute");
                document.getElementById("endHourNightShift").value = localStorage.getItem("nightShiftEndHour");
                document.getElementById("endMinuteNightShift").value = localStorage.getItem("nightShiftEndMinute");
                adjustPlanCheckbox.checked = localStorage.getItem("adjustPlan");
                emptyLinesCheckbox.checked = localStorage.getItem("emptyLines");
                periodButtonsCheckbox.checked = localStorage.getItem("periodButtons");
                if (localStorage.getItem("firstBreakDaysHour") != null) {
                    document.getElementById('firstBreakDaysHour').value = localStorage.getItem("firstBreakDaysHour");
                    document.getElementById('firstBreakDaysMinute').value = localStorage.getItem("firstBreakDaysMinute");
                    document.getElementById('secondBreakDaysHour').value = localStorage.getItem("secondBreakDaysHour");
                    document.getElementById('secondBreakDaysMinute').value = localStorage.getItem("secondBreakDaysMinute");
                    document.getElementById('firstBreakNightsHour').value = localStorage.getItem("firstBreakNightsHour");
                    document.getElementById('firstBreakNightsMinute').value = localStorage.getItem("firstBreakNightsMinute");
                    document.getElementById('secondBreakNightsHour').value = localStorage.getItem("secondBreakNightsHour");
                    document.getElementById('secondBreakNightsMinute').value = localStorage.getItem("secondBreakNightsMinute");
                }
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
                localStorage.setItem("adjustPlan", adjustPlanCheckbox.checked);
                localStorage.setItem("emptyLines", emptyLinesCheckbox.checked);
                localStorage.setItem("periodButtons", periodButtonsCheckbox.checked);
                if (periodButtonsCheckbox.checked) {
                    localStorage.setItem("firstBreakDaysHour", document.getElementById('firstBreakDaysHour').value)
                    localStorage.setItem("firstBreakDaysMinute", document.getElementById('firstBreakDaysMinute').value)
                    localStorage.setItem("secondBreakDaysHour", document.getElementById('secondBreakDaysHour').value)
                    localStorage.setItem("secondBreakDaysMinute", document.getElementById('secondBreakDaysMinute').value)
                    localStorage.setItem("firstBreakNightsHour", document.getElementById('firstBreakNightsHour').value)
                    localStorage.setItem("firstBreakNightsMinute", document.getElementById('firstBreakNightsMinute').value)
                    localStorage.setItem("secondBreakNightsHour", document.getElementById('secondBreakNightsHour').value)
                    localStorage.setItem("secondBreakNightsMinute", document.getElementById('secondBreakNightsMinute').value)
                }

                document.getElementById("menuDiv").style.visibility = "hidden";
                document.getElementById("periodSelectorMenu").style.visibility = "hidden";

                if (periodButtonsCheckbox.checked) {
                    periodButtons.style.visibility = "visible";
                } else {
                    periodButtons.style.visibility = "hidden";
                }
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
                localStorage.removeItem("adjustPlan");
                localStorage.removeItem("emptyLines");
                localStorage.removeItem("periodButtons");
                localStorage.removeItem("firstBreakDaysHour");
                localStorage.removeItem("firstBreakDaysMinute");
                localStorage.removeItem("secondBreakDaysHour");
                localStorage.removeItem("secondBreakDaysMinute");
                localStorage.removeItem("firstBreakNightsHour");
                localStorage.removeItem("firstBreakNightsMinute");
                localStorage.removeItem("secondBreakNightsHour");
                localStorage.removeItem("secondBreakNightsMinute");

                document.getElementById("startHourDayShift").value = localStorage.getItem("dayShiftStartHour");
                document.getElementById("startMinuteDayShift").value = localStorage.getItem("dayShiftStartMinute");
                document.getElementById("endHourDayShift").value = localStorage.getItem("dayShiftEndHour");
                document.getElementById("endMinuteDayShift").value = localStorage.getItem("dayShiftEndMinute");
                document.getElementById("startHourNightShift").value = localStorage.getItem("nightShiftStartHour");
                document.getElementById("startMinuteNightShift").value = localStorage.getItem("nightShiftStartMinute");
                document.getElementById("endHourNightShift").value = localStorage.getItem("nightShiftEndHour");
                document.getElementById("endMinuteNightShift").value = localStorage.getItem("nightShiftEndMinute");
                adjustPlanCheckbox.checked = localStorage.getItem("adjustPlan");
                emptyLinesCheckbox.checked = localStorage.getItem("emptyLines");
                periodButtonsCheckbox.checked = localStorage.getItem("periodButtons");
                document.getElementById("periodSelectorMenu").style.visibility = "hidden";
                if (localStorage.getItem("firstBreakDaysHour") != null) {
                    document.getElementById('firstBreakDaysHour').value = localStorage.getItem("firstBreakDaysHour");
                    document.getElementById('firstBreakDaysMinute').value = localStorage.getItem("firstBreakDaysMinute");
                    document.getElementById('secondBreakDaysHour').value = localStorage.getItem("secondBreakDaysHour");
                    document.getElementById('secondBreakDaysMinute').value = localStorage.getItem("secondBreakDaysMinute");
                    document.getElementById('firstBreakNightsHour').value = localStorage.getItem("firstBreakNightsHour");
                    document.getElementById('firstBreakNightsMinute').value = localStorage.getItem("firstBreakNightsMinute");
                    document.getElementById('secondBreakNightsHour').value = localStorage.getItem("secondBreakNightsHour");
                    document.getElementById('secondBreakNightsMinute').value = localStorage.getItem("secondBreakNightsMinute");
                }

                if (periodButtonsCheckbox.checked) {
                    periodButtons.style.visibility = "visible";
                } else {
                    periodButtons.style.visibility = "hidden";
                }
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
            let periodStyle = 'background-color:  #d8ffe2; color: black; border-radius: 4px; border: 2px solid black; text-align: center;';

            // Creating the Day and Night shift intraday input buttons
            let intradaysDiv = document.createElement("div");
            intradaysDiv.id = "intradaysDiv";
            intradaysDiv.style = "display: contents;";
            intradaysDiv.innerHTML = '<input type="button" id="dayShiftYesterday" value="Day Shift (Yesterday)" class="cp-submit" style="float: left; font-size: 10px; ' + dayStyle + '">' +
                '<input type="button" id="nightShiftYesterday" value="Night Shift (Yesterday)" class="cp-submit" style="float: left; font-size: 10px; ' + nightStyle + '">' +
                '<input type="button" id="dayShiftToday" value="Day Shift (Today)" class="cp-submit" style="float: left; font-size: 10px; ' + dayStyle + '">' +
                '<input type="button" id="nightShiftToday" value="Night Shift (Today)" class="cp-submit" style="float: left; font-size: 10px; ' + nightStyle + '">' +
                '<span id="periodButtons" style="visibility: none;">' +
                '<input type="button" id="p1" value=" P1 " class="cp-submit" style="float: left; font-size: 10px; ' + periodStyle + '">' +
                '<input type="button" id="p2" value=" P2 " class="cp-submit" style="float: left; font-size: 10px; ' + periodStyle + '">' +
                '<input type="button" id="p3" value=" P3 " class="cp-submit" style="float: left; font-size: 10px; ' + periodStyle + '">' +
                '</span>';
            document.getElementsByClassName("cp-submit-row")[0].appendChild(intradaysDiv);
            // Show period buttons if the local storage value for the period buttons is true (if the checkbox in the menu was selected)
            const periodButtons = document.getElementById("periodButtons");
            if (localStorage.getItem("periodButtons")) {
                periodButtons.style.visibility = "visible";
            } else {
                periodButtons.style.visibility = "hidden";
            }

            document.getElementById("dayShiftYesterday").addEventListener("click", buttonClickDayYesterday, false);
            document.getElementById("nightShiftYesterday").addEventListener("click", buttonClickNightYesterday, false);
            document.getElementById("dayShiftToday").addEventListener("click", buttonClickDayToday, false);
            document.getElementById("nightShiftToday").addEventListener("click", buttonClickNightToday, false);

            document.getElementById("p1").addEventListener("click", buttonClickP1, false);
            document.getElementById("p2").addEventListener("click", buttonClickP2, false);
            document.getElementById("p3").addEventListener("click", buttonClickP3, false);
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

            // ON EVERY BUTTON FUNCTION I NEED TO CHECK THE CHECKBOXES THAT ARE SAVED IN LOCAL STORAGE - need access to the DOM to see the element names to check them.
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

                document.getElementById("adjustPlanHours1").checked = localStorage.getItem("adjustPlan");
                document.getElementById("hideEmptyLineItems1").checked = localStorage.getItem("emptyLines");
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
                    document.getElementById("endDateIntraday").value = todayString;
                }

                document.getElementById("startHourIntraday").value = nightShiftStartHour;
                document.getElementById("startMinuteIntraday").value = nightShiftStartMinute;
                document.getElementById("endHourIntraday").value = nightShiftEndHour;
                document.getElementById("endMinuteIntraday").value = nightShiftEndMinute;

                document.getElementById("adjustPlanHours1").checked = localStorage.getItem("adjustPlan");
                document.getElementById("hideEmptyLineItems1").checked = localStorage.getItem("emptyLines");
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

                document.getElementById("adjustPlanHours1").checked = localStorage.getItem("adjustPlan");
                document.getElementById("hideEmptyLineItems1").checked = localStorage.getItem("emptyLines");
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

                document.getElementById("adjustPlanHours1").checked = localStorage.getItem("adjustPlan");
                document.getElementById("hideEmptyLineItems1").checked = localStorage.getItem("emptyLines");
            }

            // Period button functions will capture the shift start date and time and decide weather day or night and then behave off inputted break times to set the period.
            function buttonClickP1(e) {
                if(document.getElementsByName("spanType").length > 0) {
                    document.getElementsByName("spanType")[document.getElementsByName("spanType").length - 1].checked = true;
                }

                let shiftStartDate = document.getElementById("startDateIntraday").value;
                let shiftEndDate = document.getElementById("endDateIntraday").value;
                let shiftStartHour = document.getElementById("startHourIntraday").value;

                if (shiftStartHour == dayShiftStartHour) {
                    document.getElementById("startDateIntraday").value = shiftStartDate;
                    document.getElementById("endDateIntraday").value = shiftStartDate;

                    console.log("dayShiftStartHour:", dayShiftStartHour);
                    console.log("shiftStartHour:", shiftStartHour);

                    document.getElementById("startHourIntraday").value = dayShiftStartHour;
                    document.getElementById("startMinuteIntraday").value = dayShiftStartMinute;
                    document.getElementById("endHourIntraday").value = firstBreakDaysHour;
                    document.getElementById("endMinuteIntraday").value = firstBreakDaysMinute;
                } else if (shiftStartHour == nightShiftStartHour) {
                    if (firstBreakNightsHour < nightShiftStartHour) {
                        document.getElementById("startDateIntraday").value = shiftStartDate;
                        document.getElementById("endDateIntraday").value = shiftEndDate;
                    } else {
                        document.getElementById("startDateIntraday").value = shiftStartDate;
                        document.getElementById("endDateIntraday").value = shiftStartDate;
                    }

                    document.getElementById("startHourIntraday").value = nightShiftStartHour;
                    document.getElementById("startMinuteIntraday").value = nightShiftStartMinute;
                    document.getElementById("endHourIntraday").value = firstBreakNightsHour;
                    document.getElementById("endMinuteIntraday").value = firstBreakNightsMinute;
                }
            }

            function buttonClickP2(e) {
                if(document.getElementsByName("spanType").length > 0) {
                    document.getElementsByName("spanType")[document.getElementsByName("spanType").length - 1].checked = true;
                }

                let shiftStartDate = document.getElementById("startDateIntraday").value;
                let shiftEndDate = document.getElementById("endDateIntraday").value;
                let shiftStartHour = document.getElementById("startHourIntraday").value;

                if (shiftStartHour == dayShiftStartHour) {
                    document.getElementById("startDateIntraday").value = shiftStartDate;
                    document.getElementById("endDateIntraday").value = shiftStartDate;

                    document.getElementById("startHourIntraday").value = firstBreakDaysHour;
                    document.getElementById("startMinuteIntraday").value = firstBreakDaysMinute;
                    document.getElementById("endHourIntraday").value = secondBreakDaysHour;
                    document.getElementById("endMinuteIntraday").value = secondBreakDaysMinute;
                } else if (shiftStartHour == nightShiftStartHour) {
                    if (secondBreakNightsHour < firstBreakNightsHour) {
                        document.getElementById("startDateIntraday").value = shiftStartDate;
                        document.getElementById("endDateIntraday").value = shiftEndDate;
                    } else {
                        document.getElementById("startDateIntraday").value = shiftStartDate;
                        document.getElementById("endDateIntraday").value = shiftStartDate;
                    }

                    document.getElementById("startHourIntraday").value = firstBreakNightsHour;
                    document.getElementById("startMinuteIntraday").value = firstBreakNightsMinute;
                    document.getElementById("endHourIntraday").value = secondBreakNightsHour;
                    document.getElementById("endMinuteIntraday").value = secondBreakNightsMinute;
                }
            }

            function buttonClickP3(e) {
                if(document.getElementsByName("spanType").length > 0) {
                    document.getElementsByName("spanType")[document.getElementsByName("spanType").length - 1].checked = true;
                }

                let shiftStartDate = document.getElementById("startDateIntraday").value;
                let shiftEndDate = document.getElementById("endDateIntraday").value;
                let shiftStartHour = document.getElementById("startHourIntraday").value;

                if (shiftStartHour == dayShiftStartHour) {
                    document.getElementById("startDateIntraday").value = shiftStartDate;
                    document.getElementById("endDateIntraday").value = shiftStartDate;

                    document.getElementById("startHourIntraday").value = secondBreakDaysHour;
                    document.getElementById("startMinuteIntraday").value = secondBreakDaysMinute;
                    document.getElementById("endHourIntraday").value = dayShiftEndHour;
                    document.getElementById("endMinuteIntraday").value = dayShiftEndMinute;
                } else if (shiftStartHour == nightShiftStartHour) {
                    if (nightShiftEndHour < secondBreakNightsHour) {
                        document.getElementById("startDateIntraday").value = shiftStartDate;
                        document.getElementById("endDateIntraday").value = shiftEndDate;
                    } else if (nightShiftEndHour < dayShiftStartHour && secondBreakNightsHour < dayShiftStartHour) {
                        document.getElementById("startDateIntraday").value = shiftEndDate;
                        document.getElementById("endDateIntraday").value = shiftEndDate;
                    } else {
                        document.getElementById("startDateIntraday").value = shiftStartDate;
                        document.getElementById("endDateIntraday").value = shiftStartDate;
                    }

                    document.getElementById("startHourIntraday").value = secondBreakNightsHour;
                    document.getElementById("startMinuteIntraday").value = secondBreakNightsMinute;
                    document.getElementById("endHourIntraday").value = nightShiftEndHour;
                    document.getElementById("endMinuteIntraday").value = nightShiftEndMinute;
                }
            }


            // Stop our interval
            clearInterval(interval);

        }
    }

}, 100);
