const quotes = [
  { quote: "잠재력 말고 잠이랑 재력을 따로 주세요", author: "청육각형" },
  { quote: "바꾸기 위해선 변화가 필요하다", author: "고이즈미 신지로" },
  {
    quote: "자신의 인생이 재미없으면 남 사는 얘기가지고 논다",
  },
  {
    quote: "행복을 돈으로 살 수 없다면, 혹시 돈이 모자란건 아닌지 확인해보자",
  },
  {
    quote: "늦잠자는 놈들이 가는 지옥이 있는데, 그곳은 바로 다음날 아침이란다",
  },
];

const quote = document.querySelector(".quote span:first-child");
const author = document.querySelector(".quote span:last-child");

const todaysQuote = quotes[Math.floor(Math.random() * quotes.length)];
