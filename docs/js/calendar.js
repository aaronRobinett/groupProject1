
var auditTask = function(taskEl) {
    // get date from element
    var date = $(taskEl)
      .find("span")
      .text()
      .trim();
  
    // convert to moment 
    var time = moment(date, "L").set("hour", 17);

    // convert text field into a jquery date picker
$("#modalDate").datepicker({
    // force user to select a future date
    minDate: 1
  });