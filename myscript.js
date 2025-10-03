 /*=============== For Digital Clock ================*/
function updateClock(){
      var now = new Date();
      var dname = now.getDay(),
          mo = now.getMonth(),
          dnum = now.getDate(),
          yr = now.getFullYear(),
          hou = now.getHours(),
          min = now.getMinutes(),
          sec = now.getSeconds(),
          pe = "AM";
		  
          if(hou >= 12){
            pe = "PM";
          }
          if(hou == 0){
            hou = 12;
          }
          if(hou > 12){
            hou = hou - 12;
          }

          Number.prototype.pad = function(digits){
            for(var n = this.toString(); n.length < digits; n = 0 + n);
            return n;
          }

          var months = ["January", "February", "March", "April", "May", "June", "July", "Augest", "September", "October", "November", "December"];
          var week = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
          var ids = ["dayname", "month", "daynum", "year", "hour", "minutes", "seconds", "period"];
          var values = [week[dname], months[mo], dnum.pad(2), yr, hou.pad(2), min.pad(2), sec.pad(2), pe];
          for(var i = 0; i < ids.length; i++)
          document.getElementById(ids[i]).firstChild.nodeValue = values[i];
    }

    function initClock(){
      updateClock();
      window.setInterval("updateClock()", 1);
    }
 
 /*=============== FOR TOOLS SELECTORS ================*/
 function showCalculator() {
        document.getElementById("calculator").style.display = "block";
    }

    function hideCalculator() {
        document.getElementById("calculator").style.display = "none";
    }


    function showRecorder() {
        document.getElementById("recorder").style.display = "block";
    }

    function hideRecorder() {
        document.getElementById("recorder").style.display = "none";
    }

    function showCalendar() {
        document.getElementById("calendar").style.display = "block";
    }

    function hideCalendar() {
        document.getElementById("calendar").style.display = "none";
    }
    function showVoice() {
        document.getElementById("voice").style.display = "block";
    }

    function hideVoice() {
        document.getElementById("voice").style.display = "none";
    }
 
 /*================ For Calculator ================*/
 var screen=document.querySelector('#screen');
    var btn=document.querySelectorAll('.btn');

    for(item of btn)
    {
        item.addEventListener('click',(e)=>{
            btntext=e.target.innerText;

            if(btntext =='×')
            {
                btntext= '*';
            }

            if(btntext=='÷')
            {
                btntext='/';
            }
            screen.value+=btntext;
        });
    }

    function sin()
    {
        screen.value=Math.sin(screen.value);
    }

    function cos()
    {
        screen.value=Math.cos(screen.value);
    }

    function tan()
    {
        screen.value=Math.tan(screen.value);
    }

    function pow()
    {
        screen.value=Math.pow(screen.value,2);
    }

    function sqrt()
    {
        screen.value=Math.sqrt(screen.value,2);
    }

    function log()
    {
        screen.value=Math.log(screen.value);
    }

    function pi()
    {
        screen.value= 3.14159265359;
    }

    function e()
    {
        screen.value=2.71828182846;
    }

    function fact()
    {
        var i, num, f;
        f=1
        num=screen.value;
        for(i=1; i<=num; i++)
        {
            f=f*i;
        }

        i=i-1;

        screen.value=f;
    }

    function backspc()
    {
        screen.value=screen.value.substr(0,screen.value.length-1);
    }


    /*================ For Sound-recorder ================*/
    const mic_btn = document.querySelector('#mic');
    const playback = document.querySelector('.playback');

    mic_btn.addEventListener('click', ToggleMic);

    let can_record =false;
    let is_recording = false;

    let recorder = null;

    let chunks = [];

    function SetupAudio() {
        console.log("Setup")
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia){
                navigator.mediaDevices
                .getUserMedia({
                    audio: true
                })
                .then(SetupStream) 
                .catch(err => {
                    console.error(err)
                });
            }
    }
    SetupAudio();

    function SetupStream(stream) {
        recorder = new MediaRecorder(stream);

        recorder.ondataavailable = e => {
            chunks.push(e.data);
        }

        recorder.onstop = e => {
            const blob = new Blob(chunks, { type: "audio/ogg; codecs=opus" });
            chunks = [];
            const audioURL = window.URL.createObjectURL(blob);
            playback.src = audioURL;
            showDownloadButton(blob);
        }

        can_record = true;
    }

    function showDownloadButton(blob) {
        let downloadBtn = document.getElementById('download-btn');
        if (!downloadBtn) {
            downloadBtn = document.createElement('button');
            downloadBtn.id = 'download-btn';
            downloadBtn.textContent = 'Download';
            downloadBtn.style.marginTop = '1rem';
            playback.parentNode.appendChild(downloadBtn);
        }
        downloadBtn.onclick = function() {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = 'recording.ogg';
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        };
        downloadBtn.style.display = 'inline-block';
    }

    function ToggleMic() {
        if (!can_record) return;

        is_recording = !is_recording;

        const icon = mic_btn.querySelector('i');

        if (is_recording) {
            recorder.start();
            mic_btn.classList.add("is-recording");

            // Change icon to pause
            if (icon) {
                icon.classList.remove('fa-microphone');
                icon.classList.add('fa-pause');
            }
        } else {
            recorder.stop();
            mic_btn.classList.remove("is-recording");

            // Change icon back to microphone
            if (icon) {
                icon.classList.remove('fa-pause');
                icon.classList.add('fa-microphone');
            }
        }
    }

    /*================ For Calender ================*/
document.addEventListener('DOMContentLoaded', function () {

        const monthYear = document.getElementById('month-year');
        const daysContainer = document.getElementById('days');
        const prevButton = document.getElementById('prev');
        const nextButton = document.getElementById('next');
        const months = [
                            'January', 
                            'February',
                            'March',
                            'April', 
                            'May', 
                            'June',
                            'July', 
                            'August', 
                            'September',
                            'October',
                            'November',
                            'December'
                        ];
        let currentDate = new Date();
        let today = new Date();
function renderCalendar(date) {
        const year = date.getFullYear();
        const month = date.getMonth();
            const firstDay = new Date(year, month, 1).getDay();
            const lastDay = new Date(year, month + 1, 0).getDate();
            monthYear.textContent = `${months[month]} ${year}`;
            daysContainer.innerHTML = '';
// Previous month's dates
const prevMonthLastDay = new Date(year, month, 0).getDate();
        for (let i = firstDay; i > 0; i--) {
            const dayDiv = document.createElement('div');
            dayDiv.textContent = prevMonthLastDay - i + 1;
            dayDiv.classList.add('fade');
            daysContainer.appendChild(dayDiv);
        }
// Current month's dates
        for (let i = 1; i <= lastDay; i++) {
            const dayDiv = document.createElement('div');
            dayDiv.textContent = i;
        if (i === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
            dayDiv.classList.add('today');
        }
            daysContainer.appendChild(dayDiv);
            
        }
// Next month's dates
const nextMonthStartDay = 7 - new Date(year, month + 1, 0).getDay() - 1;
        for (let i = 1; i <= nextMonthStartDay; i++) {
            const dayDiv = document.createElement('div');
            dayDiv.textContent = i;
            dayDiv.classList.add('fade');
            daysContainer.appendChild(dayDiv);
        }
        }
            prevButton.addEventListener('click', function () {
            currentDate.setMonth(currentDate.getMonth() - 1);
            renderCalendar(currentDate);
        });
            nextButton.addEventListener('click', function () {
            currentDate.setMonth(currentDate.getMonth() + 1);
            renderCalendar(currentDate);
        });
            
        });
         renderCalendar(currentDate);


    /*================ For Voice-to-Text ================*/
click_to_convert.addEventListener('click' ,function () {
    var speech = true;
    window.speechRecognition = window.webkitSpeechRecognition;
    const recognition = new  SpeechRecognition();
    recognition.interimResults = true;

    recognition.addEventListener("result", e=>{
        const transcript = Array.from(e.results)
            .map(result =>result[0])
            .map(result => result.transcript)

            convert_text.innerHTML = transcript;
    })
    if (speech == true) {
        recognition.start();

    }
})


/*================ For Menu ================*/
    function showMenu() {
        document.getElementById("sidebar").style.display = "block";
    }

    function closeMenu() {
        document.getElementById("sidebar").style.display = "none";
    }
    
   