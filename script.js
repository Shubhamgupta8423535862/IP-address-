function getIp() {
    $.getJSON("https://api.ipify.org?format=json", function (data) {
        $("#ip-address").html(data.ip);
        const userIp = data.ip
        console.log(userIp)

    })
}
getIp();