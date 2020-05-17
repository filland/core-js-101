/* *******************************************************************************************
 *                                                                                           *
 * Plese read the following tutorial before implementing tasks:                              *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Numbers_and_dates#Date_object
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date     *
 *                                                                                           *
 ******************************************************************************************* */

/**
 * Parses a rfc2822 string date representation into date value
 * For rfc2822 date specification refer to : http://tools.ietf.org/html/rfc2822#page-14
 *
 * @param {string} value
 * @return {date}
 *
 * @example:
 *    'December 17, 1995 03:24:00'    => Date()
 *    'Tue, 26 Jan 2016 13:48:02 GMT' => Date()
 *    'Sun, 17 May 1998 03:00:00 GMT+01' => Date()
 */
function parseDataFromRfc2822(value) {
  return Date.parse(value);
}

/**
 * Parses an ISO 8601 string date representation into date value
 * For ISO 8601 date specification refer to : https://en.wikipedia.org/wiki/ISO_8601
 *
 * @param {string} value
 * @return {date}
 *
 * @example :
 *    '2016-01-19T16:07:37+00:00'    => Date()
 *    '2016-01-19T08:07:37Z' => Date()
 */
function parseDataFromIso8601(value) {
  return Date.parse(value);
}

/**
 * Returns true if specified date is leap year and false otherwise
 * Please find algorithm here: https://en.wikipedia.org/wiki/Leap_year#Algorithm
 *
 * @param {date} date
 * @return {bool}
 *
 * @example :
 *    Date(1900,1,1)    => false
 *    Date(2000,1,1)    => true
 *    Date(2001,1,1)    => false
 *    Date(2012,1,1)    => true
 *    Date(2015,1,1)    => false
 */
function isLeapYear(date) {
  const d = new Date(date);
  const year = d.getFullYear();

  if (year % 4 !== 0) {
    return false;
  } if (year % 100 !== 0) {
    return true;
  } if (year % 400 !== 0) {
    return false;
  }
  return true;
}

/**
 * Returns the string represention of the timespan between two dates.
 * The format of output string is "HH:mm:ss.sss"
 *
 * @param {date} startDate
 * @param {date} endDate
 * @return {string}
 *
 * @example:
 *    Date(2000,1,1,10,0,0),  Date(2000,1,1,11,0,0)   => "01:00:00.000"
 *    Date(2000,1,1,10,0,0),  Date(2000,1,1,10,30,0)       => "00:30:00.000"
 *    Date(2000,1,1,10,0,0),  Date(2000,1,1,10,0,20)        => "00:00:20.000"
 *    Date(2000,1,1,10,0,0),  Date(2000,1,1,10,0,0,250)     => "00:00:00.250"
 *    Date(2000,1,1,10,0,0),  Date(2000,1,1,15,20,10,453)   => "05:20:10.453"
 */
function timeSpanToString(startDate, endDate) {
  const diffInMilliseconds = endDate - startDate;

  const date = new Date('2000-01-01T03:00:00.000');
  const hBefore = date.getHours();
  const mBefore = date.getMinutes();
  const sBefore = date.getSeconds();
  date.setMilliseconds(diffInMilliseconds);

  const hAfter = date.getHours();
  const mAfter = date.getMinutes();
  const sAfter = date.getSeconds();
  const msAfter = date.getMilliseconds();

  const hoursDiff = hAfter - hBefore;
  const hours = hoursDiff > 9 ? hoursDiff : `0${hoursDiff}`;

  const minutesDiff = mAfter - mBefore;
  const minutes = minutesDiff > 9 ? minutesDiff : `0${minutesDiff}`;

  const secondsDiff = sAfter - sBefore;
  const seconds = secondsDiff > 9 ? secondsDiff : `0${secondsDiff}`;

  const tempVal = msAfter > 99 ? msAfter : `0${msAfter}`;

  const milliseconds = msAfter > 9 ? tempVal : `00${msAfter}`;

  const result = `${hours}:${minutes}:${seconds}.${milliseconds}`;
  return result;
}

/**
 * Returns the angle (in radians) between the hands of an analog clock
 * for the specified Greenwich time.
 * If you have problem with solution please read: https://en.wikipedia.org/wiki/Clock_angle_problem
 *
 * SMALL TIP: convert to radians just once, before return in order to not lost precision
 *
 * @param {date} date
 * @return {number}
 *
 * @example:
 *    Date.UTC(2016,2,5, 0, 0) => 0
 *    Date.UTC(2016,3,5, 3, 0) => Math.PI/2
 *    Date.UTC(2016,3,5,18, 0) => Math.PI
 *    Date.UTC(2016,3,5,21, 0) => Math.PI/2
 */
function angleBetweenClockHands(date) {
  const hourHandStepInDegrees = 360 / 12;
  const minutesHandStepInDegrees = 360 / 60;

  const minutes = date.getUTCMinutes();
  const hours = (date.getUTCHours() % 12) + minutes / 60;

  const minutesDegree = minutes * minutesHandStepInDegrees;
  const hoursDegree = hours * hourHandStepInDegrees;

  let degrees = 0;

  if (hoursDegree > minutesDegree) {
    degrees = hoursDegree - minutesDegree;
  } else {
    degrees = minutesDegree - hoursDegree;
  }

  return degrees > 180
    ? (360 - degrees) * (Math.PI / 180)
    : degrees * (Math.PI / 180);
}

module.exports = {
  parseDataFromRfc2822,
  parseDataFromIso8601,
  isLeapYear,
  timeSpanToString,
  angleBetweenClockHands,
};
