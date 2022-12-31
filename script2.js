const lat = document.getElementById("lat");
const long = document.getElementById("Long");
const City = document.getElementById("City")
const region = document.getElementById("Region");
const org = document.getElementById("Organisation");
const host = document.getElementById("hostname");
const timezone = document.getElementById("Timezone");
const DateAndTime = document.getElementById("Date And Time")
const pincode = document.getElementById("Pincode");
const msg = document.getElementById("Message");
const map = document.getElementById("map-container");


function getIp() {
    $.getJSON("https://api.ipify.org?format=json", function (data) {
        $("#ip-address").html(data.ip);
        const userIp = data.ip
        console.log(userIp)

        async function getData(Ip) {
            try {
                const url = `https://ipinfo.io/${Ip}/geo`;
                const result = await fetch(url);
                output = await result.json();
                console.log(output)

                showdetails();
                getLocation();
                getPostOffice();
            }
            catch (err) {
                console.log(err)
            }
        }

        function showdetails() {
            City.innerHTML = output.city;
            region.innerHTML = output.region;
            org.innerHTML = output.org
            host.innerText = output.ip
            timezone.innerHTML = output.timezone;
            pincode.innerText = output.postal;
            let timeanddate = new Date().toLocaleString({ timeZone: `${output.timezone}` });
            DateAndTime.innerText = timeanddate;
        }


        function getLocation() {
            const location = output.loc;
            console.log(location);
            const latLong = location.split(",", 2);
            // console.log(latLong);
            lat.innerText = latLong[0];
            long.innerText = latLong[1];

            let link = `https://maps.google.com/maps?q=${latLong[0]},${latLong[1]} &output=embed`;
            const iframe = document.createElement("iframe");
            iframe.src = link;
            map.appendChild(iframe);
        }
async function getPostOffice() {
            try {
                const target = await fetch(`https://api.postalpincode.in/pincode/${output.postal}`)
                const responce = await target.json();
                console.log(responce);
                const product = responce[0];
                console.log(product);
                const post = product.PostOffice
                console.log(post);



                msg.innerText = product.Message;
                let postData = " ";
                post.map((item) => {
                    postData += `<ul style="height:399px ; width: 678px; border: 3px solid #000000;
                    border-radius: 10px;">
                    <li>Name: <span id="name">${item.Name}</span></li>
                    <li>Branch Type: <span id="Branch Type"> ${item.BranchType}</span></li>
                    <li>Delivery Status: <span id="Delivery Status"> ${item.DeliveryStatus}</span></li>
                    <li>District: <span id="District"> ${item.District}</span></li>
                    <li>Division: <span id=Division"> ${item.Division}</span></li>
                </ul>
                <br><br> `
                })

document.getElementById("postinfo").innerHTML = postData;
            }

            catch (error) {
                console.log(error);
            }
        }
        getData(userIp);
    })
}

getIp();


