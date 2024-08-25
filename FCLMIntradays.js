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
    
    if(document.getElementByClassName("cp-submit-row")[0] != undefined && document.getElementsByTagName("table")[0] != undefined) {
        if (document.getElementById("menuDiv") == undefined) {
            for(let i = 0; i < document.getElementByTagName("table").length; i++) {
                if(document.getElementByTagName("table")[i].className == "") {
                    //continue the code here
                }
            }
        }
    }
    
}, 100);