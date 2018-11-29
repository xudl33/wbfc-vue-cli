#!/usr/bin/env node
'use strict';
const program = require('commander');
const packageJson = require('../package.json');
const initHandler = require('../bin/init.js');

program
  .version(packageJson.version)
  .usage('<command> [options]') // 使用命令格式


program.command('init')
  .option('-v, --overwrite', 'Overwrite wbfc-vue.json if it exists')
  .description('create a new wbfc-vue\'s config file named wbfc-vue.json')
  .action((cmd) => {
    // const args = {}
    // cmd.options.forEach(o => {
    //   const key = o.long.replace(/^--/, '');
    //   args[key] = cmd[key];
    // })  
    initHandler(cmd);
  });

program.parse(process.argv); 

if(program.args.length == 0){
    //这里是处理默认没有输入参数或者命令的时候，显示help信息
    program.help();
}