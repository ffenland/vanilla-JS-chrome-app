const dfs_xy_conv = (code, v1, v2) => {
  // LCC DFS 좌표변환 ( code : "toXY"(위경도->좌표, v1:위도, v2:경도), "toLL"(좌표->위경도,v1:x, v2:y) )
  // LCC DFS 좌표변환을 위한 기초 자료
  const RE = 6371.00877; // 지구 반경(km)
  const GRID = 5.0; // 격자 간격(km)
  const SLAT1 = 30.0; // 투영 위도1(degree)
  const SLAT2 = 60.0; // 투영 위도2(degree)
  const OLON = 126.0; // 기준점 경도(degree)
  const OLAT = 38.0; // 기준점 위도(degree)
  const XO = 43; // 기준점 X좌표(GRID)
  const YO = 136; // 기1준점 Y좌표(GRID)

  const DEGRAD = Math.PI / 180.0;
  const RADDEG = 180.0 / Math.PI;
  const re = RE / GRID;
  const slat1 = SLAT1 * DEGRAD;
  const slat2 = SLAT2 * DEGRAD;
  const olon = OLON * DEGRAD;
  const olat = OLAT * DEGRAD;

  let sn =
    Math.tan(Math.PI * 0.25 + slat2 * 0.5) /
    Math.tan(Math.PI * 0.25 + slat1 * 0.5);
  sn = Math.log(Math.cos(slat1) / Math.cos(slat2)) / Math.log(sn);
  let sf = Math.tan(Math.PI * 0.25 + slat1 * 0.5);
  sf = (Math.pow(sf, sn) * Math.cos(slat1)) / sn;
  let ro = Math.tan(Math.PI * 0.25 + olat * 0.5);
  ro = (re * sf) / Math.pow(ro, sn);
  let rs = {};
  if (code == "toXY") {
    rs["lat"] = v1;
    rs["lng"] = v2;
    let ra = Math.tan(Math.PI * 0.25 + v1 * DEGRAD * 0.5);
    ra = (re * sf) / Math.pow(ra, sn);
    let theta = v2 * DEGRAD - olon;
    if (theta > Math.PI) theta -= 2.0 * Math.PI;
    if (theta < -Math.PI) theta += 2.0 * Math.PI;
    theta *= sn;
    rs["x"] = Math.floor(ra * Math.sin(theta) + XO + 0.5);
    rs["y"] = Math.floor(ro - ra * Math.cos(theta) + YO + 0.5);
  } else {
    rs["x"] = v1;
    rs["y"] = v2;
    const xn = v1 - XO;
    const yn = ro - v2 + YO;
    ra = Math.sqrt(xn * xn + yn * yn);
    if (sn < 0.0) -ra;
    let alat = Math.pow((re * sf) / ra, 1.0 / sn);
    alat = 2.0 * Math.atan(alat) - Math.PI * 0.5;

    if (Math.abs(xn) <= 0.0) {
      theta = 0.0;
    } else {
      if (Math.abs(yn) <= 0.0) {
        theta = Math.PI * 0.5;
        if (xn < 0.0) -theta;
      } else theta = Math.atan2(xn, yn);
    }
    const alon = theta / sn + olon;
    rs["lat"] = alat * RADDEG;
    rs["lng"] = alon * RADDEG;
  }
  return rs;
};

const toBaseDateTime = (dateObj) => {
  // date object를 받아서 날짜 8자리 시간 4자리 숫자 반환
  return {
    baseDate: `${dateObj.getFullYear()}${(dateObj.getMonth() + 1 + "").padStart(
      2,
      "0"
    )}${(dateObj.getDate() + "").padStart(2, "0")}`,
    baseTime: `${(dateObj.getHours() + "").padStart(2, "0")}${(
      dateObj.getMinutes() + ""
    ).padStart(2, "0")}`,
  };
};

const getCurrentDate = () => {
  const today = new Date();
  const YEAR = today.getFullYear();
  const MONTH = today.getMonth();
  const DATE = today.getDate();
  const HOUR = today.getHours();
  const MINUTE = today.getMinutes();
  if (MINUTE > 40) {
    return today;
  } else {
    return new Date(YEAR, MONTH, DATE, HOUR - 1, 0);
  }
};

const paintWeather = (resultArray) => {
  const weatherT1h = document.querySelector(".weather__t1h");
  const weatherReh = document.querySelector(".weather__reh");
  const weatherWsd = document.querySelector(".weather__wsd");
  const weatherRn1 = document.querySelector(".weather__rn1");
  let REH = ""; // 상대습도
  let T1H = ""; // 기온
  let WSD = ""; // 풍속
  let RN1 = ""; // 1시간 강수량
  resultArray.forEach((value) => {
    switch (value.category) {
      case "T1H":
        T1H = `기온 ${value.obsrValue} ℃`;
        break;
      case "REH":
        REH = `습도 ${value.obsrValue} %`;
        break;
      case "WSD":
        WSD = `풍속 ${value.obsrValue} m/s`;
        break;
      case "RN1":
        RN1 = `강수 ${value.obsrValue} mm`;
        break;
      default:
        break;
    }
  });
  weatherT1h.innerText = T1H;
  weatherReh.innerText = REH;
  weatherWsd.innerText = WSD;
  weatherRn1.innerText = RN1;
};

const paintAddress = (address) => {
  const weatherAddress = document.querySelector(".weather__address");
  weatherAddress.innerText = address;
};

const getLocation = (latitude, longitude) => {
  const geocoder = new window.kakao.maps.services.Geocoder();
  const callback = (result, status) => {
    if (status === window.kakao.maps.services.Status.OK) {
      const address = `${result[0].address.region_1depth_name} ${result[0].address.region_2depth_name} ${result[0].address.region_3depth_name}`;
      paintAddress(address);
    }
  };
  geocoder.coord2Address(longitude, latitude, callback);
};

const onGeoSuccess = async (geolocationPosition) => {
  const { latitude, longitude } = geolocationPosition.coords;
  getLocation(latitude, longitude);

  const rs = dfs_xy_conv("toXY", latitude, longitude);

  const SERVICE_KEY =
    "CO%2B6SC4kgIs5atXW%2FZDETfMu9T87tscntUhZ6cliQKjRsZM4xmiyOEfWFznoUwHkLKteqdM1e4ZpkZEopwBEMg%3D%3D";
  const X_VALUE = rs.x;
  const Y_VALUE = rs.y;

  const today = getCurrentDate();

  const base = toBaseDateTime(today);

  const BASE_DATE = base.baseDate;
  const BASE_TIME = base.baseTime;

  const url = `http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst?serviceKey=${SERVICE_KEY}&numOfRows=100&pageNo=1&dataType=JSON&base_date=${BASE_DATE}&base_time=${BASE_TIME}&nx=${X_VALUE}&ny=${Y_VALUE}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const result = data.response.body.items.item;
      paintWeather(result);
    });

  //   초단기실황	T1H	기온	℃	10
  // RN1	1시간 강수량	mm	8
  // UUU	동서바람성분	m/s	12
  // VVV	남북바람성분	m/s	12
  // REH	습도	%	8
  // PTY	강수형태	코드값	4
  // VEC	풍향	deg	10
  // WSD	풍속	m/s	10
};
const onGeoFail = () => {
  alert("Where are you?!");
};

navigator.geolocation.getCurrentPosition(onGeoSuccess, onGeoFail);
