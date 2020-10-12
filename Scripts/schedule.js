/***** Declare variables *****/
var currentTime = "";
var scheduleStart = 6;
var scheduleEnd = 23;
var hourMarkedPresent = 0;
var motivationals = [
    "Just Do It!",
    "Time Will Pass Eitherway, Do Something With It",
    "Your Only Limit Is You",
    "Tough Times Don't Last, But Tough People Do",
    "One Small Step Toward a Large Task",
    "Just Get Started",
    "Saying Accounts For Little Without Action Behind It",
    "It Is Only Failure, If You Fail To Learn Something From it",
    "Envy Good Men Less and Study Them More",
    "Defeat Is Only Final When You Accept It"
];

/***** DOM elements *****/
let scheduleElement = $("#schedule");
let timeElement = $("#currentTime");
let motivationStartElement = $("#motivation-start");
let motivationEndElement = $("#motivation-end");

/***** Add event listeners *****/
var currentTimeInterval = setInterval(updateTime, 1000);

/***** Helper Functions *****/
// This function will update the time to the current time.
function updateTime(){
    currentTime = moment().format("MMM DD YYYY, h:mm:ss a");
    timeElement.text("It is "+currentTime);
    if(parseInt(moment().format("H")) !== hourMarkedPresent){
        updatePresentHr();
    }
}

// This function will prepare a time row
function printSchedule(){
    // Header Motivation
    motivationStartElement.html(motivationals[Math.floor(Math.random()*motivationals.length)]);

    // Clear schedule
    scheduleElement.html("");
    for(let i=scheduleStart; i<=scheduleEnd; i++){
        // Row
        var scheduleRowElement = $("<div>");
        scheduleRowElement.addClass("row row-eq-height time-block");
        // Hr column
        var scheduleHrElement = $("<div>");
        scheduleHrElement.addClass("col-1 hour text-right h-100");
        scheduleHrElement.attr("id","hr-"+i);
        scheduleHrElement.text(moment(i, "H").format("h A"));
        // Task Column
        var scheduleTaskElement = $("<textarea>");
        // Past Current and Future hours to use different colors.
        var currentHr = parseInt(moment().format("H"));
        if(i < currentHr){
            scheduleTaskElement.addClass("col border form-control past h-100");
        }else if (i > currentHr){
            scheduleTaskElement.addClass("col border form-control future h-100");
        }else{
            scheduleTaskElement.addClass("col border form-control present h-100");
            hourMarkedPresent = currentHr;
        }
        scheduleTaskElement.attr("data-hr",i);
        scheduleTaskElement.attr("placeholder","Task");
        // Save Column
        var scheduleSaveElement = $("<button>");
        scheduleSaveElement.addClass("col-1 saveBtn py-auto h-100");
        scheduleSaveElement.attr("data-save",i);
        // Save Icon
        var saveIconElement = $("<i>");
        saveIconElement.addClass("fas fa-save");
        saveIconElement.attr("data-save",i);

        scheduleSaveElement.append(saveIconElement);

        scheduleRowElement.append(scheduleHrElement);
        scheduleRowElement.append(scheduleTaskElement);
        scheduleRowElement.append(scheduleSaveElement);

        scheduleElement.append(scheduleRowElement);
    }

    // Footer Motivation
    motivationEndElement.html(motivationals[Math.floor(Math.random()*motivationals.length)]);
}

// This function will update the styling using passed in marked hr as present
function updatePresentHr(){
    $("textarea").each(function(index, element){
        var elHr = parserInt($(element).data("hr"));
        var prHr = parseInt(moment().format("H"));
        $(element).removeClass();   // Clears class attribute
        if(elHr < prHr){
            $(element).addClass("col border form-control past h-100");
        }else if (elHr > prHr){
            $(element).addClass("col border form-control future h-100");
        }else{
            $(element).addClass("col border form-control present h-100");
            hourMarkedPresent = prHr;
        }
    });
}

/***** Logic *****/
printSchedule();