module.exports = {
  format_time: (date) => {
    return date.toLocaleTimeString();
  },
  format_date: (date) => {
    return date.toLocaleDateString();;
  },
  line_breaks: (string) => {
    return string.replace(/(\r\n|\n|\r)/gm, '<br>');
  }
};
