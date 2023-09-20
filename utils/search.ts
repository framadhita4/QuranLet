export const search = (target: string, regex: string) => {
  let result = false;
  if (
    target.replaceAll("'", "").replaceAll("-", " ").match(regex) ||
    target.replaceAll("'", " ").replaceAll("-", "").match(regex) ||
    target.match(regex)
  )
    return true;

  return result;
};
