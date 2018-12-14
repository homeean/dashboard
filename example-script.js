/**
 * homeean custom dashboard
 */

let config;
loadJSON('config.json', function(data) {
    config = JSON.parse(data);
    start();
});

function start() {

    var ip_re = new RegExp("http:\\/\\/(.*)\\:7681", "g");
    var homee_ip = ip_re.exec(config.homee_url)[1] || null;

    if (homee_ip) {
        /* set default smart widgets */
        localStorage.setItem(homee_ip + '.smartWidgets', '[{"type":10,"trackId":1,"isActive":true,"objectType":"weather"},{"type":3,"trackId":2,"isActive":true,"objectType":"smartWidget","id":4},{"type":4,"trackId":3,"isActive":true,"objectType":"smartWidget","id":5},{"type":5,"trackId":4,"isActive":true,"objectType":"smartWidget","id":6},{"type":6,"trackId":5,"isActive":true,"objectType":"smartWidget","id":7},{"type":7,"trackId":6,"isActive":true,"objectType":"smartWidget","id":8},{"type":8,"trackId":7,"isActive":true,"objectType":"smartWidget","id":9},{"type":9,"trackId":8,"isActive":true,"objectType":"smartWidget","id":10}]');
    }

    /* add local netatmo stream to widget list, does not work in chrome for now */
    if (config.netatmo_url) {
        setTimeout(function() {
            var div = document.createElement('div');
            div.innerHTML = '<li style="margin: 15px"><video width="252" height="150" controls>' +
                '<source src="'+config.netatmo_url+'" type="application/x-mpegURL"></video></li>';
            document.getElementsByClassName('widgetsWrap')[0].appendChild(div.firstChild);
        }, 5000)
    }

}

function loadJSON(file, callback) {
    let xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', file, true);
    xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
            callback(xobj.responseText);
        }
    };
    xobj.send(null);
}