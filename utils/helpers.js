module.exports = {
  format_time: (date) => {
    return date.toLocaleTimeString();
  },
  format_date: (date) => {
    return date.toLocaleDateString();;
  },
  line_breaks: (string) => {
    // replace line breaks with <br> tags
    return string.replace(/(\r\n|\n|\r)/gm, '<br>');
  }
};
