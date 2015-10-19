var program = require('commander');

program
  .version('0.0.1')
  .option('-f, --filepath', 'Specify file path of JSON file.')
  .option('-q, --query [search key]', 'Search terms for the file to search.')
  .option('-g --group [group search]', 'Search results are grouped into categoreies in which they are in the original file.')
  .option('-h --help', 'Display help on usage of application.')
  .parse(process.argv);
