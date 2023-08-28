interface DateInfo {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  second: number;
  yyyy: string;
  MM: string;
  dd: string;
  hh: string;
  mm: string;
  ss: string;
}

export function formate(
  date: Date,
  formatter: string | ((dateInfo: DateInfo) => string),
  isPad = false
): string {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();
  const yyyy = String(year);
  const MM = String(month);
  const dd = String(day);
  const hh = String(hour);
  const mm = String(minute);
  const ss = String(second);
  const padMonth = month < 10 ? `0${month}` : MM;
  const padDay = day < 10 ? `0${day}` : dd;
  const padHour = hour < 10 ? `0${hour}` : hh;
  const padMinute = minute < 10 ? `0${minute}` : mm;
  const padSecond = second < 10 ? `0${second}` : ss;
  if (typeof formatter === "string") {
    if (isPad) {
      if (formatter === "date") {
        return `${year}-${padMonth}-${day}`;
      }
      if (formatter === "datetime") {
        return `${year}-${padMonth}-${padDay} ${padHour}:${padMinute}:${padSecond}`;
      }
      const timeOut = formatter
        .replaceAll("yyyy", yyyy)
        .replaceAll("MM", padMonth)
        .replaceAll("hh", padHour)
        .replaceAll("mm", padMinute)
        .replaceAll("ss", padSecond)
        .replaceAll("dd", padDay);
      return timeOut;
    }
    if (formatter === "date") return `${year}-${month}-${day}`;
    if (formatter === "datetime") {
      return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
    }
    const timeOut = formatter
      .replaceAll("yyyy", yyyy)
      .replaceAll("MM", MM)
      .replaceAll("hh", hh)
      .replaceAll("mm", mm)
      .replaceAll("ss", ss)
      .replaceAll("dd", dd);
    return timeOut;
  }
  if (typeof formatter === "function") {
    return formatter({
      year,
      month,
      day,
      hour,
      minute,
      second,
      yyyy,
      MM,
      dd,
      hh,
      mm,
      ss,
    });
  }
  return "";
}
