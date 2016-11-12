
/**
* Converts Unix time (in ms since Jan 1 1970 UTC) to a
* string in the local time zone.
*/

export function unixTimeToString(time)
{
  return new Date(time).toLocaleString();
}
