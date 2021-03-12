const Discord = require('discord.js');
const client = new Discord.Client();
const { Board, Thermometer, Led, Piezo } = require("johnny-five");
const AsciiTable = require("ascii-table");
const board = new Board();
board.on("ready", () => {
	const led = new Led(13);
	const piezo = new Piezo(3);
	const thermometer = new Thermometer({
		controller: "LM35",
		pin: "A0"
	  });
	  


	client.on('message', msg => { 
		if (msg.content === "led-open") led.on()
		else if (msg.content === "led-close") led.off()
	});
	
	
	
	client.on('message', msg => { 
		const {celsius, fahrenheit, kelvin} = thermometer;
		if (msg.content === "weather-degrees") {
			var table = new AsciiTable()
			table
			  .addRow('°C:', celsius)
			  .addRow('°F:', fahrenheit)
			  .addRow('K:',  kelvin)
			  let embed = new Discord.RichEmbed()
			  .setDescription(`\`\`\`${table.toString()}\`\`\``)
			  msg.channel.send(embed)
		}
	  });

	client.on('message', msg => {
	if (msg.content === "music") { 
	led.blink();
	 board.repl.inject({
		piezo: piezo
	  });
	  piezo.play({
		song: "E D F D A - A A A A G G G G - - C D F D G - G G G G F F F F - -",
		beats: 1 / 4,
		tempo: 100
	  });	
	} else if (msg.content == "music-close") {
		led.stop()
	}
	})

})


client.login('Token'); //Token Here
