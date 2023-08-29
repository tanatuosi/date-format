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
  const dataInfo: DateInfo = {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
    hour: date.getHours(),
    minute: date.getMinutes(),
    second: date.getSeconds(),
    yyyy: String( date.getFullYear()),
    MM:  String(date.getMonth() + 1),
    dd: String(date.getDate()),
    hh: String(date.getHours()),
    mm: String(date.getMinutes()),
    ss: String(date.getSeconds()),
  };
  if (typeof formatter === "string") {
    let timeString = formatter;
    const getPadTime = (value: string) =>
    isPad ? value.padStart(2, "0") : value;
    if (formatter === "date") {
      timeString = "yyyy-MM-dd"
    }
    if (formatter === "datetime") {
      timeString = "yyyy-MM-dd hh:mm:ss"
    }
    const replacements: Record<string, string | number> = {
      yyyy: dataInfo.year,
      MM: getPadTime(dataInfo.MM),
      dd: getPadTime(dataInfo.dd),
      hh: getPadTime(dataInfo.hh),
      mm: getPadTime(dataInfo.mm),
      ss: getPadTime(dataInfo.ss)
    };

    return timeString.replace(/yyyy|MM|dd|hh|mm|ss/g, (matched) => replacements[matched].toString());
  }
  if (typeof formatter === "function") {
    return formatter(dataInfo);
  }
  return "";
}
