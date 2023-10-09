let lewyim = require('./config.json');

let botcuk = [
      {
        name: `${lewyim.GuildName}_Moderation`,
        namespace: `${lewyim.GuildName}`,
        script: 'lewy.js',
        watch: false,
        exec_mode: "cluster",
        max_memory_restart: "2G",
        cwd: "./Lewy-Bots/LewyCode-Main/LewyCode-Moderation"
      },
      {
        name: `${lewyim.GuildName}_Voucher`,
        namespace: `${lewyim.GuildName}`,
        script: 'lewy.js',
        watch: false,
        exec_mode: "cluster",
        max_memory_restart: "2G",
        cwd: "./Lewy-Bots/LewyCode-Main/LewyCode-Register"
      },
      {
        name: `${lewyim.GuildName}_Statistics`,
        namespace: `${lewyim.GuildName}`,
        script: 'lewy.js',
        watch: false,
        exec_mode: "cluster",
        max_memory_restart: "2G",
        cwd: "./Lewy-Bots/LewyCode-Main/LewyCode-Statistics"
      },
      {
        name: `${lewyim.GuildName}_Guard_I`,
        namespace: `${lewyim.GuildName}`,
        script: 'lewy.js',
        watch: false,
        exec_mode: "cluster",
        max_memory_restart: "2G",
        cwd: "./Lewy-Bots/LewyCode-Guard/Guard_I"
      },
      {
        name: `${lewyim.GuildName}_Guard_II`,
        namespace: `${lewyim.GuildName}`,
        script: 'lewy.js',
        watch: false,
        exec_mode: "cluster",
        max_memory_restart: "2G",
        cwd: "./Lewy-Bots/LewyCode-Guard/Guard_II"
      },
      {
        name: `${lewyim.GuildName}_Guard_III`,
        namespace: `${lewyim.GuildName}`,
        script: 'lewy.js',
        watch: false,
        exec_mode: "cluster",
        max_memory_restart: "2G",
        cwd: "./Lewy-Bots/LewyCode-Guard/Guard_III"
      }
    ]

  if(lewyim.Destek.Active) {
    botcuk.push(
      {
        name: `${lewyim.GuildName}_Destek`,
        namespace: `${lewyim.GuildName}`,
        script: 'lewy.js',
        watch: false,
        exec_mode: "cluster",
        max_memory_restart: "2G",
        cwd: "./Lewy-Bots/LewyCode-Destek"
      }
    )
  }
  if(lewyim.Welcome.Active) {
    botcuk.push(
      {
        name: `${lewyim.GuildName}_Welcomes`,
        namespace: `${lewyim.GuildName}`,
        script: 'Start.js',
        watch: false,
        exec_mode: "cluster",
        max_memory_restart: "2G",
        cwd: "./Lewy-Bots/LewyCode-Welcome"
      }
    )
  }

  module.exports = {
    apps: botcuk
  };