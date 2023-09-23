export const search = (target: string, regex: string) => {
  target = target.replaceAll("'", "").replaceAll("-", "");
  regex = regex.replaceAll("'", "").replaceAll("-", "");

  return !!target.match(regex);
};
