const Days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

const analyzeToday = (todayDate) => {
  const date = todayDate.getDate();
  const month = todayDate.getMonth();
  const year = todayDate.getFullYear();

  return {
    firstDate: new Date(year, month, 1),
    lastDate: new Date(year, month + 1, 0),
  };
};

const paintCalendar = () => {
  const calendarArray = [];
  const today = new Date();
  const { firstDate, lastDate } = analyzeToday(today);

  // 이번달 1일의 요일에 맞게 앞칸을 빈칸으로
  for (let i = 0; i < firstDate.getDay(); i++) {
    calendarArray.push({ day: i, date: "" });
  }
  // 그리고 이번달을 날짜를 push하고
  for (let i = 0; i < lastDate.getDate(); i++) {
    calendarArray.push({
      day: (firstDate.getDay() + i) % 7,
      date: firstDate.getDate() + i,
    });
  }
  // 이번달 마지막 날짜에 맞게 마지막 칸을 빈칸으로
  for (let i = 1; i < 7 - lastDate.getDay(); i++) {
    calendarArray.push({ day: lastDate.getDay() + i, date: "" });
  }
  // 길이가 7의 배수인 배열이 만들이지고 이걸 Grid로 넘겨버리기
};

paintCalendar();
