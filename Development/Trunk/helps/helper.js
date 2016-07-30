exports.parseDate = function(date) {
    var res = "";
    var currentdate = new Date(date);
    var digitalmonth = ((currentdate.getMonth() + 1) >= 10) ? (currentdate.getMonth() + 1) : '0' + (currentdate.getMonth() + 1);
    var digitaldate = ((currentdate.getDate()) >= 10) ? (currentdate.getDate()) : '0' + (currentdate.getDate());
    res = currentdate.getFullYear() + "-" + digitalmonth + "-" + digitaldate;
    return res;
}