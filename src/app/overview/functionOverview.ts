export function getListOfDate(start, end): Date[] {
  const arr = [];
  for (const dt = new Date(start); dt <= end; dt.setDate(dt.getDate() + 1)) {
    arr.push(new Date(dt));
  }
  return arr;
}

export function getISODate(day: Date, time: string): string {
  let d = day.toLocaleDateString().split('.');
  let t = time.split(':');
  let month = +d[1] - 1;
  let m;
  if (month < 10) {
    m = '0' + month;
  } else {
    m = month.toString();
  }
  let result = new Date(+d[2], m, +d[0], +t[0] + 1, +t[1]);
  return result.toISOString();
}
