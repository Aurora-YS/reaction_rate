const $screen = document.querySelector("#screen");
const $screen_p = document.querySelector("#screen p");
const $result = document.querySelector("#result");

let startTime;
let endTime;

const records = [];

let timeoutId;

$screen.addEventListener("click", function(){
    if($screen.classList.contains("waiting")){  // 대기 화면
        // 클래스명 중에서 waiting을 찾음(태그.classList.contains('클래스명')) ==> jquery = hasClass
        $screen.classList.remove("waiting");
        $screen.classList.add("ready");
        $screen_p.textContent = "초록색이 되면 빛보다 빠르게 클릭";
        $result.textContent = "";
        timeoutId = setTimeout(function(){
            startTime = new Date();
            $screen.classList.remove("ready");
            $screen.classList.add("now");
            $screen_p.textContent = "지금!!!!!!!";
        }, Math.floor(Math.random() * 1000) + 2000);    // 2000~3000 사이 수
    }else if($screen.classList.contains("ready")){  // 준비 화면
        clearTimeout(timeoutId);
        $screen.classList.remove("ready");
        $screen.classList.add("waiting");
        $screen_p.textContent = "너무 빨리 누르셨네요. 재도전?";
    }else if($screen.classList.contains("now")){    // 클릭 화면
        endTime = new Date();
        // $result.textContent = `${endTime - startTime}ms`;   // 종료한 시간 - 시작 시간 연산으로 초단위 계산
        const current = endTime - startTime;
        records.push(current);
        const average = records.reduce((a, c) => a + c) / records.length;
        // 배열.reduce((누적값, 현재값) => {return 새로운 누적값;}, 초깃값)
        $result.textContent = `현재 ${current}ms, 평균: ${average}ms`;
        startTime = null;   // 초기화
        endTime = null;
        $screen.classList.remove("now");
        $screen.classList.add("waiting");
        $screen_p.textContent = "클릭하면 시작";
    }
});