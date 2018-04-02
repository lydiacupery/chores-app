import * as moment from "moment";

export type Type = string & TimeStampMark;
enum TimeStampMark {}

export function fromString(
  s: string,
  format: string | moment.MomentBuiltinFormat = "YYYY-MM-DDTHH:mm:ssZ"
): Type | null {
  // takes a string and returns a valid ISO8601 formatted string
  const m = moment(s, format);
  if (m.isValid()) {
    return m.utc().format() as Type;
  } else {
    return null;
  }
}

export function isValid(s: string): s is Type {
  const isoRegex = /^(-?(?:[1-9][0-9]*)?[0-9]{4})-(1[0-2]|0[1-9])-(3[01]|0[1-9]|[12][0-9])T(2[0-3]|[01][0-9]):([0-5][0-9]):([0-5][0-9])(\\.[0-9]+)?(Z)$/;
  return isoRegex.test(s) && moment(s, moment.ISO_8601).isValid();
}

export function toUtc(s: string): string {
  if (isValid(s)) {
    return (
      moment(s)
        // .utc() eventually add this
        .format("YYYY-MM-DDTHH:mm:ssZ")
    );
  }
  return "";
}

export function nowInUtc(): string {
  return moment()
    .format("YYYY-MM-DDTHH:mm:ssZ")
    .toString();
}

export function hourMinutesFromTimestamp(s: string) {
  if (isValid(s)) {
    return moment(s).format("H:mm");
  }
  return "";
}

export function dayOfMonthFromTimestamp(s: string) {
  if (isValid(s)) {
    return moment(s).format("MMMM Do");
  }
}
