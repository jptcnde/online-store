export default function toTitleCase(str) {
  return str.replace(
      /\w\S*/g,
      // eslint-disable-next-line func-names
      function(txt) {
          return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      }
  );
}