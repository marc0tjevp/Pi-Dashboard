import moment from "moment";

export function getCurrentDate(): string {
  return moment().format("DD-MM-YYYY");
}

export function getCurrentISODate(): string {
  return moment().format("YYYY-MM-DD");
}

export function getCurrentTime(): string {
  return moment().format("HH:mm");
}

export function getCurrentTimeWithSeconds(): string {
  return moment().format("HH:mm:ss");
}

export function formatUnixDate(day: number): string {
  return moment.unix(day).format("DD/MM");
}

export function formatTodoDate(day: string): string {
  return moment(day).format("DD-MM");
}

export function formatTemperature(temp: number) {
  return Math.round(temp * 10) / 10 + "°";
}

export function isBefore(first: string, second: string) {
  return moment(first).isBefore(second);
}
