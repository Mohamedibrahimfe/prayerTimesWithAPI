// change background image every 15 seconds
window.onload = function () {
    // Array of Images
    let BackgroundImg=[
        "./images/pexels-fahribagirov-19288706.jpg",
        "./images/pexels-ibnulharezmi-9326088.jpg",
        "./images/pexels-kazmisalman-12912453.jpg",
        "./images/pexels-maksim-romashkin-13748551.jpg",
        "./images/pexels-mutecevvil-18712382.jpg",
        "./images/pexels-yasirgurbuz-11659955.jpg"
    ];
    setInterval(changeImage, 15000);
    function changeImage() {   
        let i = Math.floor((Math.random() * 6));
        document.body.style.backgroundImage = "url('"+BackgroundImg[i]+"')";
        }
}
// get the basic data without specifications

function getData(city) {
    fetch(`http://api.aladhan.com/v1/timingsByCity?city=${city}&country=Egypt`)
    .then(response => response.json())
    .then(data => {
        let timings=data.data.timings

        let todaysDate = data.data.date.readable
        document.getElementById('Date').innerHTML=todaysDate
        let todaysDate3 = data.data.date.hijri.weekday.en
        document.getElementById('dayName').innerHTML = todaysDate3
        let hijriYear=data.data.date.hijri.weekday.ar + " من شهر "+data.data.date.hijri.month.ar + " عام "+data.data.date.hijri.year
        document.getElementById('hijriDate').innerHTML=hijriYear
        
        fillTimePrayers("fajr",timings.Fajr)
        fillTimePrayers("sunrise",timings.Sunrise)
        fillTimePrayers("dhuhr", timings.Dhuhr)
        fillTimePrayers("asr", timings.Asr)
        fillTimePrayers("maghrib", timings.Maghrib)
        fillTimePrayers("isha", timings.Isha)
    }
    )
}

function fillTimePrayers(id,time){
    document.getElementById(id).innerHTML = time
}
let cityOptions="Cairo"
getData(cityOptions);
let cities=["Cairo","Alexandria","Giza","Dakahlia","Suez","Port Said","Aswan","Luxor","Qena","Qalyubia","Gharbia","Asyut","Ismailia","Faiyum","Damietta","Beheira","Minya","Beni Suef","Sohag","Red Sea","Kafr el-Sheikh","North Sinai","Sharqia","Matrouh"]
let countries=["Egypt","Tunis","Libya","Syria","Saudi Arabia","maghreb","Qatar","siria","Algeria"]
let citySelect=document.getElementById('citySelect')
citySelect.addEventListener('change',()=>{
    cityOptions=citySelect.options[citySelect.selectedIndex].value;
    document.getElementById('city').innerHTML=cityOptions
    getData(cityOptions)
})

for(city of cities){
    document.getElementById('citySelect').innerHTML += `<option value="${city}">${city}</option>`
}