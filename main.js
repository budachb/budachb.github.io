// JavaScript File for Risbane:
// V.0.4.0

// Main Global Varriables

var output = $("#output");
var mainOutput = $("#outText");
var startBTN = $("#startBTN");
var learnMoreBTN = $("#learnMoreBTN");
var input = $("#mainInput"); 

var battle = 0; // Keeps track of the battle you are on
var turn = 0; // Keeps track of the turn you are on
var skipTurn = false; // If it skips the enemy turn on certain actions. Ex: (Check The Enemy Stats)
var disoriented = false; // Enemy stunned or not.

// Player Varriables and Object
var Player = new Object();
Player.name;
Player.class;
Player.className;
Player.level;
Player.experience;
Player.nextLevel;

Player.luck;
Player.speed;
Player.intelligence;
Player.defense;
Player.health;
Player.skillPoints;
Player.statPoints;
Player.energy;
Player.energyRegen;

Player.defensivePowerCost;
Player.defensicePowerName;
Player.offensivePowerCost;
Player.offensivePowerName;

Player.currentWeapon;
Player.itemsRunes;
Player.inventory;
Player.inventoryEquipped;
Player.weaponInventory;


// Enemy varriable setup.
var enemyName;
var enemyLevel;
var enemyDefense;
var enemyHP;
var enemyDamage;
var enemyRange;
var enemyDistance;
var enemySpeed;
var enemyStatPointValue;
var enemySkillPointValue;
var enemyAbilities;
var enemyDrops;
var enemy;

// Enemy Stat Guesses and generation
var defenseGuess;
var attackGuess;
var distanceGuess;
var speedGuess;
var hpGuess;


// Weapon Object
function Weapon(name, type, baseDamage, fireDamage, iceDamage, poisonDamage, level, attributeSlots, attributes) {
	this.name = name;
	this.type = type;
	this.baseDamage = baseDamage;
	this.fireDamage = fireDamage;
	this.iceDamage = iceDamage;
	this.poisonDamage = poisonDamage;
	this.weaponLevel = level;
	this.attributeSlots = attributeSlots;
	this.attributes = attributes;
	// DEV NOTE Add Range
	// DEV NOTE Add Proc/Crit and Puncture?
}

// Initiate Game
$(document).ready(function() {
	input.hide();
	$("#inventoryOpt").hide();
	mainOutput.html("Hello and welcome to Risbane! <br>To begin the game, click start, to learn more about how to play click learn more.");
});

function learnMore() {
	startBTN.hide();
	learnMoreBTN.hide();
	mainOutput.html("this currently is not working"); // Info about how to play the game and what it is
}

// Begins the game
function startGame() {
	mainOutput.html("Please Enter Your Name:");
	startBTN.hide();
	learnMoreBTN.hide();
	input.show();
	input.focus();
	input.keypress(function(event) {
		var keycode = (event.keyCode ? event.keyCode : event.which);
		if (keycode == '13') {
			Player.name = input.val();
			chooseClass();
			input.off("keypress");
		}
		event.stopPropagation();
	});
}


function chooseClass() {
	input.hide();
	output.append("<input id='classIN'>");
	$("#classIN").focus();
	$("#classIN").blur(function() {
		$("#classIN").focus();
	});
	mainOutput.html("Cloose a class: <br>1. Mage <br>2. Soilder <br>3. Berserker <br>4. Tank");
	$("#classIN").keypress(function(event) {
		var keycode = (event.keyCode ? event.keyCode : event.which);
		if (keycode == '13') {
			switch ($("#classIN").val()) {
				case "1":
					Player.className = "Mage";
					Player.class = 1;
					break;
				case "2":
					Player.className = "Soilder";
					Player.class = 2;
					break;
				case "3":
					Player.className = "Berserker";
					Player.class = 3;
					break;
				case "4":
					Player.className = "Tank";
					Player.class = 4;
					break;
				default:
					Player.className = "Mage";
					Player.class = 1;
					break;
			}
			$("#classIN").off("keypress");
			$("#classIN").remove();
			playerStats();
		}
		event.stopPropagation();
	});
}


function playerStats() {
	var randomINT = Math.round(Math.random() * 5 + 1);
	var randomSPD = Math.round(Math.random() * 5 + 1);
	var randomLUK = Math.round(Math.random() * 5 + 1);
	var randomDEF = Math.round(Math.random() * 5 + 1);
	var randomENG = Math.round(Math.random() * 5 + 1);
	var randomRNG = Math.round(Math.random() * 5 + 1);
	var randomERG = Math.round(Math.random() * 2 + 1);
	var randomHP = Math.round(Math.random() * 50 + 1);
	output.text("");
	var defaultWeapon = new Weapon("Steel Sword", 1, 10, 0, 0, 0, 0, 0, [
		["", ""],
		[0, 0]
	]);
	if (Player.class == 1) {
		Player.intelligence = 10 + randomINT;
		Player.level = 1;
		Player.statPoints = 0;
		Player.experience = 0;
		Player.nextLevel = 100;
		Player.luck = 7 + randomLUK;
		Player.speed = 9 + randomSPD;
		Player.defense = 3 + randomDEF;
		Player.health = 30 + randomHP;
		Player.energy = 20 + randomENG;
		Player.energyRegen = 2 + randomERG;
		Player.offensivePowerName = "none";
		Player.offensivePowerCost = 0;
		Player.currentWeapon = defaultWeapon;
		Player.weaponInventory = [];
		Player.weaponInventory.push(defaultWeapon);
		Player.inventory = [
			["Weapons", ["Shards", ["Sword", []],
					["Axe", []],
					["Bow", []]
				],
				["Built", [defaultWeapon]]
			],
			["Runes", ["Shards", []],
				["Built", []]
			],
			["Attributes", ["Shards", []],
				["Built", []]
			],
			["Crystals", ["Health", [
					[],
					[]
				]],
				["Energy", [
					[],
					[]
				]]
			]
		];
		Player.inventoryEquipped = [
			[1],
			[2]
		];
	} else if (Player.class == 2) {
		Player.intelligence = 5 + randomINT;
		Player.luck = 4 + randomLUK;
		Player.level = 1;
		Player.experience = 0;
		Player.nextLevel = 100;
		Player.statPoints = 0;
		Player.speed = 5 + randomSPD;
		Player.defense = 6 + randomDEF;
		Player.health = 60 + randomHP;
		Player.energy = 10 + randomENG;
		Player.energyRegen = 1 + randomERG;
		Player.offensivePowerName = "none";
		Player.offensivePowerCost = 0;
		Player.currentWeapon = defaultWeapon;
		Player.weaponInventory = [];
		Player.weaponInventory.push(defaultWeapon);
		Player.inventory = [
			["Weapons", ["Shards", ["Sword", []],
					["Axe", []],
					["Bow", []]
				],
				["Built", [defaultWeapon]]
			],
			["Runes", ["Shards", []],
				["Built", []]
			],
			["Attributes", ["Shards", []],
				["Built", []]
			],
			["Crystals", ["Health", []],
				["Energy", []]
			]
		];
		Player.inventoryEquipped = [
			[1],
			[2]
		];
	} else if (Player.class == 3) {
		Player.intelligence = 5 + randomINT;
		Player.luck = 2 + randomLUK;
		Player.level = 1;
		Player.experience = 0;
		Player.nextLevel = 100;
		Player.statPoints = 0;
		Player.speed = 10 + randomSPD;
		Player.defense = 7 + randomDEF;
		Player.health = 50 + randomHP;
		Player.energy = 10 + randomENG;
		Player.energyRegen = 1 + randomERG;
		Player.offensivePowerName = "none";
		Player.offensivePowerCost = 0;
		Player.currentWeapon = defaultWeapon;
		Player.weaponInventory = [];
		Player.weaponInventory.push(defaultWeapon);
		Player.inventory = [
			["Weapons", ["Shards", ["Sword", []],
					["Axe", []],
					["Bow", []]
				],
				["Built", [defaultWeapon]]
			],
			["Runes", ["Shards", []],
				["Built", []]
			],
			["Attributes", ["Shards", []],
				["Built", []]
			],
			["Crystals", ["Health", []],
				["Energy", []]
			]
		];
		Player.inventoryEquipped = [
			[1],
			[2]
		];
	} else {
		Player.intelligence = 5 + randomINT;
		Player.luck = 7 + randomLUK;
		Player.speed = 2 + randomSPD;
		Player.level = 1;
		Player.experience = 0;
		Player.nextLevel = 100;
		Player.statPoints = 0;
		Player.defense = 10 + randomDEF;
		Player.health = 100 + randomHP;
		Player.energy = 5 + randomENG;
		Player.energyRegen = 1 + randomERG;
		Player.offensivePowerName = "none";
		Player.offensivePowerCost = 0;
		Player.currentWeapon = defaultWeapon;
		Player.weaponInventory = [];
		Player.weaponInventory.push(defaultWeapon);
		Player.inventory = [
			["Weapons", ["Shards", ["Sword", []],
					["Axe", []],
					["Bow", []]
				],
				["Built", [defaultWeapon]]
			],
			["Runes", ["Shards", []],
				["Built", []]
			],
			["Attributes", ["Shards", []],
				["Built", []]
			],
			["Crystals", ["Health", []],
				["Energy", []]
			]
		];
		Player.inventoryEquipped = [
			[1],
			[2]
		];
	}

	output.append("You have created a character with these stats:<br><br>Name: " + Player.name + "<br>Class: " + Player.className + "<br>Intelligence: " + Player.intelligence + "<br>Luck: " + Player.luck + "<br>Speed: " + Player.speed + "<br>Defense: " + Player.defense + "<br>Health: " + Player.health + "<br>Energy: " + Player.energy + "<br>Energy Regen: " + Player.energyRegen + "<br>Offensive Power Name: " + Player.offensivePowerName + "<br>Offensive Power Cost: " + Player.offensivePowerCost + "<br>Defensive Power Name: " + Player.defensivePowerName + "<br>Defensive Power Cost: " + Player.defensivePowerCost + "<br><br>Press enter to confirm stats.");

	$(document).keypress(function(event) {
		var keycode = (event.keyCode ? event.keyCode : event.which);
		if (keycode == 13) {
			output.text("");
			updateStats(true);
			$(document).off("keypress");
		}
		event.stopPropagation();
	});
}

function updateStats(start) {
	$("#sidebar").css("background-color", "#808080");
	$("#sidebar").css("color", "black");
	$("#sidebar").html("<div id='pstat'><h3>Player Stats:</h3><br>" + "Name: " + Player.name + "<br>Class: " + Player.className + "<br>Intelligence: " + Player.intelligence + "<br>Luck: " + Player.luck + "<br>Speed: " + Player.speed + "<br>Defense: " + Player.defense + "<br>Health: " + Math.round(Player.health) + "<br>Energy: " + Player.energy + "<br>Energy Regen: " + Player.energyRegen + "<br>Ofensive Power Name: " + Player.offensivePowerName + "<br>Offensive Power Cost: " + Player.offensivePowerCost + "<br>Defensive Power Name: " + Player.defensivePowerName + "<br>Defensive Power Cost: " + Player.defensivePowerCost + "<br>");
	
	if (Player.currentWeapon.fireDamage > 0 && Player.currentWeapon.iceDamage == 0 && Player.currentWeapon.poisonDamage == 0) {
			$("#sidebar").append("<h3 style='margin-bottom: 0px;'>Weapon Stats:</h3><br><div id='weaponContainer'><img class='weapon fire lvl" + Player.currentWeapon.weaponLevel + "' src='sword_shard.png' width='10px' height='10px'><div id='wStatContainer'>Name: " + Player.currentWeapon.name + "<br>Type: " + Player.currentWeapon.type + "<br>Damage: " + Player.currentWeapon.baseDamage + "<br>Elemental Damage:<br>Range:<br>Attributes: </div></div></div>");
		} else if (Player.currentWeapon.iceDamage > 0 && Player.currentWeapon.fireDamage == 0 && Player.currentWeapon.poisonDamage == 0) {
			$("#sidebar").append("<h3 style='margin-bottom: 0px;'>Weapon Stats:</h3><br><div id='weaponContainer'><img class='weapon ice lvl" + Player.currentWeapon.weaponLevel + "' src='sword_shard.png' width='10px' height='10px'><div id='wStatContainer'>Name: " + Player.currentWeapon.name + "<br>Type: " + Player.currentWeapon.type + "<br>Damage: " + Player.currentWeapon.baseDamage + "<br>Elemental Damage:<br>Range:<br>Attributes: </div></div></div>");
		} else if (Player.currentWeapon.poisonDamage > 0 && Player.currentWeapon.iceDamage == 0 && Player.currentWeapon.fireDamage == 0) {
			$("#sidebar").append("<h3 style='margin-bottom: 0px;'>Weapon Stats:</h3><br><div id='weaponContainer'><img class='weapon poison lvl" + Player.currentWeapon.weaponLevel + "' src='sword_shard.png' width='10px' height='10px'><div id='wStatContainer'>Name: " + Player.currentWeapon.name + "<br>Type: " + Player.currentWeapon.type + "<br>Damage: " + Player.currentWeapon.baseDamage + "<br>Elemental Damage:<br>Range:<br>Attributes: </div></div></div>");
		} else {
			$("#sidebar").append("<h3 style='margin-bottom: 0px;'>Weapon Stats:</h3><br><div id='weaponContainer'><img class='weapon lvl" + Player.currentWeapon.weaponLevel + "' src='sword_shard.png' width='10px' height='10px'><div id='wStatContainer'>Name: " + Player.currentWeapon.name + "<br>Type: " + Player.currentWeapon.type + "<br>Damage: " + Player.currentWeapon.baseDamage + "<br>Elemental Damage:<br>Range:<br>Attributes: </div></div></div>");
		}
	
		
	if (start) {
		Battle();
	}
}

function Battle() {
	battle++;
	$("#inventoryOpt").hide();
	console.log(battle);

	// Enemy Creation
	if (battle >= 1 && battle <= 10) {
		enemyLevel = 1;
		enemyName = "Placeholder";
		enemyExperience = Math.floor(Math.random() * 80 + 20);
		enemyDefense = Math.floor(Math.random() * 15 + 1);
		enemyHP = Math.floor(Math.random() * 30 + 1);
		enemyDamage = Math.floor(Math.random() * (100 / (Math.random() * Player.luck + Player.intelligence) / enemyLevel) + (enemyLevel * 10 / (Math.random() * Player.luck)) + 5);
		if (enemyDamage <= 0) {
			enemyDamage = 1;
		}
		enemyRange = Math.floor(Math.random() * 15 + 1);
		enemySpeed = Math.floor(Math.random() * (30 / (enemyDefense / enemyLevel)));
		enemyDistance = Math.floor((Math.random() * ((enemyLevel * 10) / (Math.random() * Player.luck + 1)) + 5));
		enemySkillPointValue = 0.01;
		enemyStatPointValue = Math.floor(Math.random() * 2 + 1);
		enemyAbilities = "none";
		enemyDrops = [
			["Sword Shard", 1, 0.3, "ss"],
			["Bow Shard", 1, 0.3, "bs"],
			["Axe Shard", 1, 0.3, "axs"],
			["Rune Fragment", 1, 0.2, "rf"],
			["Attribute Shard", 1, 0.2, "as"],
			["Small Health Crystal", 1, 0.8, "hc"],
			["Small Energy Crystal", 1, 0.8, "ec"]
		];
	} else if (battle > 10 && battle <= 20) {
		enemyLevel = 2;
		enemyName = "Placeholder LVL 2";
		enemyDefense = Math.floor(Math.random() * 15 + 1);
		enemyHP = Math.floor(Math.random() * 30 + 1);
		enemyDamage = Math.floor(Math.random() * (100 / (Math.random() * Player.luck + Player.intelligence) / enemyLevel) + (enemyLevel * 10 / (Math.random() * Player.luck)) + 5);
		if (enemyDamage <= 0) {
			enemyDamage = 1;
		}
		enemyRange = Math.floor(Math.random() * 15 + 1);
		enemySpeed = Math.floor(Math.random() * (30 / (enemyDefense / enemyLevel)));
		enemyDistance = Math.floor((Math.random() * ((enemyLevel * 10) / (Math.random() * Player.luck + 1)) + 5));
		enemySkillPointValue = 0.01;
		enemyStatPointValue = Math.floor(Math.random() * 2 + 1);
		enemyAbilities = "none";
		enemyDrops = [
			["Sword Shard", 1, 0.5, "ss"],
			["Fine Sword Shard", 2, 0.3, "ss"],
			["Bow Shard", 1, 0.3, "bs"],
			["Axe Shard", 1, 0.3, "axs"],
			["Rune Fragment", 1, 0.2, "rf"],
			["Attribute Shard", 1, 0.2, "as"],
			["Small Health Crystal", 1, 0.8, "hc"],
			["Small Energy Crystal", 1, 0.8, "ec"]
		];
	} else if (battle > 20 && battle <= 30) {

	} else {

	}

	var defenseRand = Math.random();
	var attackRand = Math.random();
	var distanceRand = Math.random();
	var speedRand = Math.random();
	var hpRand = Math.random();
	if (defenseRand > 0.5) {
		defenseGuess = Math.round(Math.random() * (20 * enemyLevel) / (Player.luck + Player.intelligence));
		if (defenseGuess < 0) {
			defenseGuess = enemyDefense;
		} else {
			defenseGuess = enemyDefense - defenseGuess;
		}
	} else {
		defenseGuess = Math.round(Math.random() * (20 * enemyLevel) / (Player.luck + Player.intelligence));
		if (defenseGuess < 0) {
			defenseGuess = enemyDefense;
		} else {
			defenseGuess = enemyDefense + defenseGuess;
		}
	}
	if (attackRand > 0.5) {
		attackGuess = Math.round(Math.random() * (20 * enemyLevel) / (Player.luck + Player.intelligence));
		if (attackGuess < 0) {
			attackGuess = enemyDamage;
		} else {
			attackGuess = enemyDamage - attackGuess;
		}
	} else {
		attackGuess = Math.round(Math.random() * (20 * enemyLevel) / (Player.luck + Player.intelligence));
		if (attackGuess < 0) {
			attackGuess = enemyDamage;
		} else {
			attackGuess = enemyDamage + attackGuess;
		}
	}
	if (distanceRand > 0.5) {
		distanceGuess = Math.round(Math.random() * (20 * enemyLevel) / (Player.luck + Player.intelligence));
		if (distanceGuess < 0) {
			distanceGuess = enemyDistance;
		} else {
			distanceGuess = enemyDistance - distanceGuess;
		}
	} else {
		distanceGuess = Math.round(Math.random() * (20 * enemyLevel) / (Player.luck + Player.intelligence));
		if (distanceGuess < 0) {
			distanceGuess = enemyDistance;
		} else {
			distanceGuess = enemyDistance + distanceGuess;
		}
	}
	if (hpRand > 0.5) {
		hpGuess = Math.round(Math.random() * (40 * enemyLevel) / (Player.luck + Player.intelligence));
		if (hpGuess < 0) {
			hpGuess = enemyHP;
		} else {
			hpGuess = enemyHP - hpGuess;
		}
	} else {
		hpGuess = Math.round(Math.random() * (50 * enemyLevel) / (Player.luck + Player.intelligence));
		if (hpGuess < 0) {
			hpGuess = enemyHP;
		} else {
			hpGuess = enemyHP - hpGuess;
		}
	}
	if (speedRand > 0.5) {
		speedGuess = Math.round(Math.random() * (20 * enemyLevel) / ((((Math.random() * Player.luck) + Player.intelligence)) / enemyLevel));
		if (speedGuess < 0) {
			speedGuess = enemySpeed;
		} else {
			speedGuess = enemySpeed - speedGuess;
		}
	} else {
		speedGuess = Math.round(Math.random() * (20 * enemyLevel) / ((((Math.random() * Player.luck) + Player.intelligence)) / enemyLevel));
		if (speedGuess < 0) {
			speedGuess = enemySpeed;
		} else {
			speedGuess = enemySpeed - speedGuess;
		}
	}

	output.append("<br><h3>Battle:</h3><br>Enemy Name: " + enemyName + "<br>Enemy Level: " + enemyLevel + "<br>Enemy Defense Guess: " + defenseGuess + "<br>Enemy Damage Guess: " + attackGuess + "<br>Enemy Distance Guess: " + distanceGuess + "<br>Enemy HP Guess: " + Math.round(hpGuess) + "<br>Enemy Speed Guess: " + speedGuess);
	Turn();
}

function Turn() {
	if (!skipTurn) {
		turn += 1;
	}
	skipTurn = false;
	$("#turnCounter").text("Turn: " + turn);
	output.append("<div id='turnAction'><br><h3>Turn:</h3><br>" + "<br>Your Options:" + "<br>1. Attack " + "<br>2. Move " + "<br>3. Run Away " + "<br>4. Use Magic " + "<br>5. Review Enemy Stats<br>6. Equipped Inventory<br><input id='action'></div>");
	$("#action").focus();
	$("#action").blur(function() {
		$("#action").focus();
	});
	$("#action").keypress(function(event) {
		var keycode = (event.keyCode ? event.keyCode : event.which);
		if (keycode == 13) {
			switch ($("#action").val()) {
				case "1":
					$("#action").remove();
					Attack(Player.currentWeapon);
					break;
				case "2":
					$("#action").remove();
					Move(0);
					break;
				case "3":
					$("#action").remove();
					runAway();
					break;
				case "4":
					break;
				case "5":
					$("#action").remove();
					reviewEnemy();
					break;
				case "6":
					$("#action").remove();
					battleInventory();
					break;
			} 
		}
		event.stopPropagation();
	});
	updateStats(false);
}


function Attack(weapon) {
	var attackBonus = Math.round(Math.random() * (Player.luck / enemyLevel) + 1);
	if (attackBonus >= enemyDefense && enemyDefense > 1) {
		attackBonus = enemyDefense - 1;
	} else if (enemyDefense <= 1) {
		enemyDefense = 2;
		attackBonus = 1;
	} else if (attackBonus > 8) {
		attackBonus = 8;
	}

	if (Player.currentWeapon.type == 1) {
		var randomRoll = Math.round(Math.random() * ((Math.random() * Player.luck) + (Player.intelligence + enemyLevel)) + 1); // Added damage to attack
		var attackDamage = weapon.baseDamage + randomRoll;
		output.append("<br><br>Your attack damage: " + attackDamage);
		if (enemyDistance <= 5) {
			if ((attackDamage > enemyDefense)) {
				enemyHP -= (attackDamage / (enemyDefense / attackBonus)); // Enemy Damage midigation
				hpGuess -= (attackDamage / (enemyDefense / attackBonus));
				output.append("<br>You have hit the enemy with your " + weapon.name);
				output.append("<br>Hit: " + Math.round((attackDamage / (enemyDefense / attackBonus))));
			} else {
				// Dodge and retaliation
				output.append("<br>The enemy dodged!");
				if (randomRoll > 0.15) {
					output.append("<br>The enemy has retalliated");
					Player.health -= (enemyDamage / Player.defense);
					output.append("<br>The enemy did " + Math.round(enemyDamage / Player.health) + " points of damage!");
					output.append("<br>Your health is now at: " + Math.round(Player.health));
					if (Player.health <= 0) {
						output.append("<br><br><br><br> Game over! You Have Died.<br> Restart program to play again.");
						return;
					}
				}
			}
		} else {
			// Range has to be 5 for sword hit.
			output.append("<br>You are not in range to hit the enemy.");
		}
	} else if (weapon.type == 2) {
		var randomRoll = Math.round(Math.random() * ((Math.random() * Player.luck) + (Player.intelligence + enemyLevel)) + 1);
		var attackDamage = Player.currentWeapon.baseDamage + randomRoll;
		output.append("<br><br>Your attack damage: " + attackDamage);
		if (enemyDistance <= (Player.range / (enemySpeed / ((Math.random() * Player.luck * 2) + Player.intelligence)))) { // Replace with weapon range.
			if (attackDamage > enemyDefense) {
				enemyHP -= (attackDamage / (enemyDefense / attackBonus));
				hpGuess -= (attackDamage / (enemyDefense / attackBonus));
				output.append("<br>You have hit the enemy with your " + weapon.name);
				output.append("<br>Hit: " + Math.round((attackDamage / (enemyDefense / attackBonus))));
			} else {
				output.append("<br>The enemy dodged!");
				if (randomRoll > 0.25) {
					output.append("The enemy has retalliated");
					Player.health -= (enemyDamage / Player.defense);
					output.append("The enemy did " + Math.round(enemyDamage / Player.defense) + " points of damage!");
					output.append("Your health is now at: " + Math.round(Player.health));
					if (Player.health <= 0) {
						output.append("<br><br><br> Game over! You Have Died.<br> Restart program to play again.");
						return;
					}
				}
			}
		} else {
			output.append("<br>You are not in range to hit the enemy.");
		}
	}
	enemyTurn();
}

function enemyTurn() {
	if (enemyHP > 0) {
		// Enemy Turn
		output.append("<br>Enemy Health Guess: " + Math.round(hpGuess));
		output.append("<br><br><h3>Enemy Turn:<h3>");
		var enemyMove = Math.random(); // Random chance of them not doing anything
		if (enemyMove >= (0.125 + (Player.luck / 100)) && !disoriented) {
			if (enemyLevel == 1) {
				if (enemyDistance >= enemyRange) {
					output.append("<br>The enemy moves 1 space closer");
					enemyDistance -= 1;
					distanceGuess -= 1;
					output.append("<br>The distance guess is now: " + distanceGuess);
				} else {
					if (enemyDamage > (Player.defense + ((Math.random() * Player.luck) / 2))) {
						Player.health -= (enemyDamage / Player.defense);
						output.append("<br>The enemy has attacked!");
						output.append("<br>Dealing " + Math.round(enemyDamage / Player.defense) + " damage.");
						output.append("<br>Your health is now at " + Math.round(Player.health));
						if (Player.health <= 0) {
							output.append("<br><br><br><br> Game over! You Have Died.<br> Restart program to play again.");
							return;
						}
					} else {
						output.append("<br>The enemy attempted to attack but missed!");
					}
				}
			} else if (enemyLevel == 2) {
				if (Player.currentWeapon.type == 1 && enemyDistance <= 5) {
					if (enemyRange >= (enemyDistance + 2) && enemyRange > 6) {
						output.append("<br>The enemy moves 2 spaces away");
						enemyDistance += 2;
						distanceGuess += 2;
						output.append("<br>The distance guess is now: " + distanceGuess);
					} else if (enemyRange >= (enemyDistance + 1) && enemyRange > 5) {
						output.append("<br>The enemy moves 1 space away");
						enemyDistance += 1;
						distanceGuess += 1;
						output.append("<br>The distance guess is now: " + distanceGuess);
					} else {
						if (enemyDamage > (Player.defense + ((Math.random() * Player.luck) / 2))) {
							Player.health -= (enemyDamage / Player.defense);
							output.append("<br>The enemy has attacked!");
							output.append("<br>Dealing " + Math.round(enemyDamage / Player.defense) + " damage.");
							output.append("<br>Your health is now at " + Math.round(Player.health));
							if (Player.health <= 0) {
								output.append("<br><br><br><br> Game over! You Have Died.<br> Restart program to play again.");
								return;
							}
						} else {
							output.append("<br>The enemy attempted to attack but missed!");
						}
					}
				}
			}
		} else {
			output.append("<br>The enemy does nothing in its turn.");
		}
		Turn(); // Next Turn
	} else if (enemyHP <= 0) {
		// Enemy Death
		output.append("<br><br>Enemy now has HP: 0<br>The enemy has died.<br><br>Drops: ");
		Player.statPoints += enemyStatPointValue;
		// Enemy Drops
		for (var drop = 0; drop < enemyDrops.length; drop++) {
			var dropChance = Math.random();
			if (dropChance <= enemyDrops[drop][2]) {
				output.append("<br><br><div class='rarity" + enemyDrops[drop][1].toString() + "'>Item: " + enemyDrops[drop][0] + " <br>Rarity: " + enemyDrops[drop][1] + "</div>");
				if (enemyDrops[drop][3] == "ss") {
					Player.inventory[0][1][1][1].push(enemyDrops[drop][0]);
				} else if (enemyDrops[drop][3] == "bs") {
					Player.inventory[0][1][3][1].push(enemyDrops[drop][0]);
				} else if (enemyDrops[drop][3] == "axs") {
					Player.inventory[0][1][2][1].push(enemyDrops[drop][0]);
				} else if (enemyDrops[drop][3] == "rf") {
					Player.inventory[1][1][1].push(enemyDrops[drop][0]);
				} else if (enemyDrops[drop][3] == "as") {
					Player.inventory[2][1][1].push(enemyDrops[drop][0]);
				} else if (enemyDrops[drop][3] == "hc") {
					Player.inventory[3][1][1][0].push(enemyDrops[drop][0]);
					Player.inventory[3][1][1][1].push(enemyDrops[drop][1]);
				} else if (enemyDrops[drop][3] == "ec") {
					Player.inventory[3][2][1][0].push(enemyDrops[drop][0]);
					Player.inventory[3][2][1][1].push(enemyDrops[drop][1]);
				}
			}
		}

		experiencePoints(enemyExperience);
		output.append("<br><br> Press enter to continue.<br><input id='continue'>");
		$("#continue").focus();
		$("#continue").blur(function() {
			$("#continue").focus();
		});
		$("#continue").keypress(function(event) {
			var keycode = (event.keyCode ? event.keyCode : event.which);
			if (keycode == 13) {
				inventoryPage();
				$("#continue").off(keypress);
			}
			event.stopPropagation();
		});
	}
}

function inventoryPage() {
	turn = 0;
	var slotID = 0;
	var rowNumber = 1;
	$("#turnCounter").text("Turn: " + turn);
	$("#tableContainter").focus();
	output.html("");
	$("#inventoryBack").remove();
	output.css("width", "32.5%");
	output.append("<div id='tableContainer'><table id='invTable'><thead><th>Inventory:</th></thead><tbody><tr id='tr1'></tr></tbody></table></div>");
	$("#inventoryOpt").show();
	$("#inventoryOpt").html("<div><h2>Player Options</h2><button id='statUp'>Upgrade Stats</button><button id='inventoryBTN'>Inventory</button><button>Skill Tree</button></div><br><div><h2>Weapon Options</h2><button id='forge'>Forge Weapon</button><button>Upgrade Weapon</button><button>Scrap Weapon</button><button id='weaponEq'>Equip Weapon</button></div><br><div><h2>Other Item Options</h2><button id='othforge'>Forge Gems</button><button>Forge Attribute</button><button>Forge Rune</button></div>");

	for (var sShards = 0; sShards < Player.inventory[0][1][1][1].length; sShards++) {
		slotID++;
		if (slotID >= 5) {
			rowNumber += 1;
			slotID = 1;
			$("#invTable").append("<tr id='tr" + rowNumber.toString() + "'></tr>");
		}
		$("#tr" + rowNumber.toString()).append("<td><div class='select unselected swordshard' id='" + "slot" + rowNumber.toString() + slotID.toString() + "'> <img src='sword_shard.png'>" + Player.inventory[0][1][1][1][sShards] + "<span class='info'>" + sShards + "</span></div></td>");
	}
	for (var aShards = 0; aShards < Player.inventory[0][1][2][1].length; aShards++) {
		slotID++;
		if (slotID >= 5) {
			rowNumber += 1;
			slotID = 1;
			$("#invTable").append("<tr id='tr" + rowNumber.toString() + "'></tr>");
		}
		$("#tr" + rowNumber.toString()).append("<td><div class='select unselected axeshard' id='" + "slot" + rowNumber.toString() + slotID.toString() + "'> <img src='axe_shard.png'><br>" + Player.inventory[0][1][2][1][aShards] + "<span class='info'>" + aShards + "</span></div></td>");
	}
	for (var bShards = 0; bShards < Player.inventory[0][1][3][1].length; bShards++) {
		slotID++;
		if (slotID >= 5) {
			rowNumber += 1;
			slotID = 1;
			$("#invTable").append("<tr id='tr" + rowNumber.toString() + "'></tr>");
		}
		$("#tr" + rowNumber.toString()).append("<td><div class='select unselected bowshard' id='" + "slot" + rowNumber.toString() + slotID.toString() + "'> <img src='bow_shard.png'>" + Player.inventory[0][1][3][1][bShards] + "<span class='info'>" + bShards + "</span></div></td>");
	}
	for (var hCrystal = 0; hCrystal < Player.inventory[3][1][1][0].length; hCrystal++) {
		slotID++;
		if (slotID >= 5) {
			rowNumber += 1;
			slotID = 1;
			$("#invTable").append("<tr id='tr" + rowNumber.toString() + "'></tr>");
		}
		$("#tr" + rowNumber.toString()).append("<td><div class='select unselected healthcrystal lvl" + Player.inventory[3][1][1][1][hCrystal].toString() + "' id='" + "slot" + rowNumber.toString() + slotID.toString() + "'> <img src='healthcrystal.png'>" + Player.inventory[3][1][1][0][hCrystal] + "<span class='info'>" + hCrystal + "</span></div></td>");
	}
	for (var eCrystal = 0; eCrystal < Player.inventory[3][2][1][0].length; eCrystal++) {
		slotID++;
		if (slotID >= 5) {
			rowNumber += 1;
			slotID = 1;
			$("#invTable").append("<tr id='tr" + rowNumber.toString() + "'></tr>");
		}
		$("#tr" + rowNumber.toString()).append("<td><div class='select unselected energycrystal lvl" + Player.inventory[3][2][1][1][eCrystal].toString() + "' id='" + "slot" + rowNumber.toString() + slotID.toString() + "'> <img src='energycrystal.png'>" + Player.inventory[3][2][1][0][eCrystal] + "<span class='info'>" + eCrystal + "</span></div></td>");
	}

	for (var rFragment = 0; rFragment < Player.inventory[1][1][1].length; rFragment++) {
		slotID++;
		if (slotID >= 5) {
			rowNumber += 1;
			slotID = 1;
			$("#invTable").append("<tr id='tr" + rowNumber.toString() + "'></tr>");
		}
		$("#tr" + rowNumber.toString()).append("<td><div class='select unselected runefragment' id='" + "slot" + rowNumber.toString() + slotID.toString() + "'> <img src='rune_fragment.png'>" + Player.inventory[1][1][1][rFragment] + "<span class='info'>" + rFragment + "</span></div></td>");
	}

	for (var attShard = 0; attShard < Player.inventory[2][1][1].length; attShard++) {
		slotID++;
		if (slotID >= 5) {
			rowNumber += 1;
			slotID = 1;
			$("#invTable").append("<tr id='tr" + rowNumber.toString() + "'></tr>");
		}
		$("#tr" + rowNumber.toString()).append("<td><div class='select unselected attributeshard' id='" + "slot" + rowNumber.toString() + slotID.toString() + "'> <img src='attribute_shard.png'>" + Player.inventory[2][1][1][attShard] + "<span class='info'>" + attShard + "</span></div></td>");
	}

	for (var weaponSel = 0; weaponSel < Player.weaponInventory.length; weaponSel++) {
		slotID++;
		if (slotID >= 5) {
			rowNumber += 1;
			slotID = 1;
			$("#invTable").append("<tr id='tr" + rowNumber.toString() + "'></tr>");
		}
		if (Player.weaponInventory[weaponSel].fireDamage > 0 && Player.weaponInventory[weaponSel].iceDamage == 0 && Player.weaponInventory[weaponSel].poisonDamage == 0) {
			$("#tr" + rowNumber.toString()).append("<td><div class='select unselected weapon fire type" + Player.weaponInventory[weaponSel].type + " lvl" + Player.weaponInventory[weaponSel].weaponLevel + "' id='" + "slot" + rowNumber.toString() + slotID.toString() + "'> <img src='sword.png'>" + Player.weaponInventory[weaponSel].name + "<span class='info'>" + weaponSel + "</span></div></td>");
		} else if (Player.weaponInventory[weaponSel].iceDamage > 0 && Player.weaponInventory[weaponSel].fireDamage == 0 && Player.weaponInventory[weaponSel].poisonDamage == 0) {
			$("#tr" + rowNumber.toString()).append("<td><div class='select unselected weapon ice type" + Player.weaponInventory[weaponSel].type + " lvl" + Player.weaponInventory[weaponSel].weaponLevel + "' id='" + "slot" + rowNumber.toString() + slotID.toString() + "'> <img src='sword.png'>" + Player.weaponInventory[weaponSel].name + "<span class='info'>" + weaponSel + "</span></div></td>");
		} else if (Player.weaponInventory[weaponSel].poisonDamage > 0 && Player.weaponInventory[weaponSel].iceDamage == 0 && Player.weaponInventory[weaponSel].fireDamage == 0) {
			$("#tr" + rowNumber.toString()).append("<td><div class='select unselected weapon poison type" + Player.weaponInventory[weaponSel].type + " lvl" + Player.weaponInventory[weaponSel].weaponLevel + "' id='" + "slot" + rowNumber.toString() + slotID.toString() + "'> <img src='sword.png'>" + Player.weaponInventory[weaponSel].name + "<span class='info'>" + weaponSel + "</span></div></td>");
		} else {
			$("#tr" + rowNumber.toString()).append("<td><div class='select unselected weapon type" + Player.weaponInventory[weaponSel].type + " lvl" + Player.weaponInventory[weaponSel].weaponLevel + "' id='" + "slot" + rowNumber.toString() + slotID.toString() + "'> <img src='sword.png'>" + Player.weaponInventory[weaponSel].name + "<span class='info'>" + weaponSel + "</span></div></td>");
		}
	}

	var selected = [];
	inventoryActionUpdate(selected);

	$(".select").click(function() {
		if ($(this).hasClass('unselected')) {
			$(this).css("border", "1px solid blue");
			$(this).removeClass("unselected").addClass("selected");
			if ($(this).hasClass('swordshard')) {
				selected.push("swordshard");
				inventoryActionUpdate(selected);
			} else if ($(this).hasClass('axeshard')) {
				selected.push("axeshard");
				inventoryActionUpdate(selected);
			} else if ($(this).hasClass('bowshard')) {
				selected.push("bowshard");
				inventoryActionUpdate(selected);
			} else if ($(this).hasClass("healthcrystal")) {
				if ($(this).hasClass("lvl1")) {
					selected.push("healthcrystal");
					inventoryActionUpdate(selected);
				} else if ($(this).hasClass("lvl2")) {
					selected.push("healthcrystal2");
					inventoryActionUpdate(selected);
				}
			} else if ($(this).hasClass("energycrystal")) {
				if ($(this).hasClass("lvl1")) {
					selected.push("energycrystal");
					inventoryActionUpdate(selected);
				} else if ($(this).hasClass("lvl2")) {
					selected.push("energycrystal2");
					inventoryActionUpdate(selected);
				}
			} else if ($(this).hasClass("weapon")) {
				selected.push($(this).text());
				inventoryActionUpdate(selected);
			}
		} else {
			$(this).css("border", "1px solid white");
			$(this).removeClass("selected").addClass("unselected");
			if ($(this).hasClass('swordshard')) {
				for (var f = 0; f < selected.length; f++) {
					if (selected[f] == "swordshard") {
						selected.splice(f, 1);
						f = selected.length;
						inventoryActionUpdate(selected);
					}
				}
			} else if ($(this).hasClass('axeshard')) {
				for (var f = 0; f < selected.length; f++) {
					if (selected[f] == "axeshard") {
						selected.splice(f, 1);
						f = selected.length;
						inventoryActionUpdate(selected);
					}
				}
			} else if ($(this).hasClass('bowshard')) {
				for (var f = 0; f < selected.length; f++) {
					if (selected[f] == "bowshard") {
						selected.splice(f, 1);
						f = selected.length;
						inventoryActionUpdate(selected);
					}
				}
			} else if ($(this).hasClass('healthcrystal')) {
				for (var f = 0; f < selected.length; f++) {
					if (selected[f] == "healthcrystal") {
						selected.splice(f, 1);
						f = selected.length;
						inventoryActionUpdate(selected);
					} else if (selected[f] == "healthcrystal2") {
						selected.splice(f, 1);
						f = selected.length;
						inventoryActionUpdate(selected);
					}
				}
			} else if ($(this).hasClass('energycrystal')) {
				for (var f = 0; f < selected.length; f++) {
					if (selected[f] == "energycrystal") {
						selected.splice(f, 1);
						f = selected.length;
						inventoryActionUpdate(selected);
					} else if (selected[f] == "energycrystal2") {
						selected.splice(f, 1);
						f = selected.length;
						inventoryActionUpdate(selected);
					}
				}
			} else if ($(this).hasClass('weapon')) {
				for (var f = 0; f < selected.length; f++) {
					if (selected[f] == $(this).text()) {
						selected.splice(f, 1);
						f = selected.length;
						inventoryActionUpdate(selected);
					}
				}
			}
		}
	});


	$("#statUp").click(function() {
		$("#inventoryOpt").html("");
		statUpgrade();
		$("#statUp").remove();
		$("#nextBattle").remove();
	});
	
	$("#weaponEq").click( function() {
		$("#inventoryOpt").html("");
		equipWeapon("ask");
		$("#weaponEq").remove();
		$("#nextBattle").remove();
	});

	$("#inventoryBTN").click(function() {
		$("#inventoryOpt").html("");
		inventoryPlayer();
		$("#inventoryBTN").remove();
		$("#nextBattle").remove();
	});

	$("#othforge").click(function() {
		$("#nextBattle").remove();
		$("#inventoryOpt").html("<h1>Forge Gem:</h1><br><br><p>Please select 3 gems of the same type to be forged into a better gem.</p>");
		$("#bottombar").append("<button id='inventoryBack'>Back</button>");
		$("#inventoryBack").click(function() {
			$('#inventoryBack').remove();
			inventoryPage();
		});
		
		var craftGBtn = $("<button>/", {
			text: 'Combine Crystals',
			click: function() {
				if (selected.length == 3 && selected[0] == "healthcrystal" && selected[1] == "healthcrystal" && selected[2] == "healthcrystal") {
					$("#inventoryOpt").html("<h1>Combine Gem</h1>");
					$("#nextBattle").remove();
					$(craftGBtn).remove();
					$("#othforge").remove();
					combineGem(1);
				} else if (selected.length == 3 && selected[0] == "energycrystal" && selected[1] == "energycrystal" && selected[2] == "energycrystal") {
					$("#inventoryOpt").html("<h1>Combine Gem</h1>");
					$("#nextBattle").remove();
					$(craftGBtn).remove();
					$("#othforge").remove();
					combineGem(2);
				} else {
					$("#nextBattle").remove();
					$(craftGBtn).remove();
					$("#othforge").remove();
					inventoryPage();
				}
			}
		});
		$("#inventoryOpt").append(craftGBtn);
		$("#othforge").remove();
	});

	$("#forge").click(function() {
		$("#nextBattle").remove();
		$("#inventoryOpt").html("<h1>Forge Weapon:</h1><br><br><p>Please select 3 sword shards to be forged into a new sword.</p>");
		$("#bottombar").append("<button id='inventoryBack'>Back</button>");
		$("#inventoryBack").click(function() {
			$('#inventoryBack').remove();
			inventoryPage();
		});
		
		var swordForge = $("<button>/", {
			text: 'Sword',
			click: function() {
				if (selected.length == 3 && selected[0] == "swordshard" && selected[1] == "swordshard" && selected[2] == "swordshard") {
					$("#inventoryOpt").html("<h1>Forge Sword</h1>");
					$("#nextBattle").remove();
					$(swordForge).remove();
					$("#forge").remove();
					createWeapon(1, 1);
				} else {
					$("#nextBattle").remove();
					$(swordForge).remove();
					$("#forge").remove();
					inventoryPage();
				}
			}
		});
		var axeForge = $("<button>/", {
			text: 'Axe',
			click: function() {
				$("#inventoryOpt").html("<h1>Forge Axe</h1>");
				$(axeForge).remove();
				createWeapon(2);
			}
		});
		var bowForge = $("<button>/", {
			text: 'Bow',
			click: function() {
				$("#inventoryOpt").html("<h1>Forge Bow</h1>");
				$(bowForge).remove();
				createWeapon(3);
			}
		});
		$("#inventoryOpt").append(swordForge);
		$("#inventoryOpt").append(axeForge);
		$("#inventoryOpt").append(bowForge);
		$("#forge").remove();
	});

	$("#bottombar").append("<button id='nextBattle'>Next Battle</button>");

	$("#nextBattle").click(function() {
		output.html("");
		selected = [];
		$("#nextBattle").remove();
		output.css("width", "75%");
		Battle();
		$("#nextBattle").off(click);
	});
}

function inventoryActionUpdate(selected) {
	if (selected.length > 0) {
		$("#sidebar").html("<h3>Multiple Items Selected</h3>");
		$("#sidebar").css("background-color", "#808080");
		$("#sidebar").css("color", "black");
	} else {
		updateStats(false);
	}
	for (var item = 0; item < selected.length; item++) {
		if (selected[item] == "swordshard" && selected.length == 1) {
			$("#sidebar").html("<center><h2 style='margin-bottom: 0px, font-weight: bold;'>Sword Shard:</h2><br><br></center><p>Description: a fragmented piece of metal that once was part of a sword. If three of these are melted down they can be used to forge a new sword. <br><br>Scrap Value: 100 xp<br>Scrap Items: None<br><br>Equipable: no<br><br>Level: 0</p>");
		} else if (selected[item] == "axeshard" && selected.length == 1) {
			$("#sidebar").html("<center><h2 style='margin-bottom: 0px, font-weight: bold;'>Axe Shard:</h2><br><br></center><p>Description: a fragmented piece of metal and bits of wooden handle that once was part of an axe. If three of these are melted down and combined they can be used to forge a new axe. <br><br>Scrap Value: 100 xp<br>Scrap Items: None<br><br>Equipable: no<br><br>Level: 0</p>");
		} else if (selected[item] == "bowshard" && selected.length == 1) {
			$("#sidebar").html("<center><h2 style='margin-bottom: 0px, font-weight: bold;'>Bow Shard:</h2><br><br></center><p>Description: a fragmented piece of wood and string that once was part of a bow. If three of these are combined they can be used to forge a new bow. <br><br>Scrap Value: 100 xp<br>Scrap Items: None<br><br>Equipable: no<br><br>Level: 0</p>");
		} else if (selected[item] == "healthcrystal" && selected.length == 1) {
			$("#sidebar").html("<center><h2 style='margin-bottom: 0px, font-weight: bold;'>Small Health Crystal:</h2><br><br></center><p>Description: a small crystal enchanted with healing energy. This can be used any time in battle to heal 1 health. Combine three of these magic crystals to forge an average health crystal which can restore more health.<br><br>Scrap Value: 20 xp<br>Scrap Items: None<br><br>Equipable: yes<br><br>Level: 1</p>");
		} else if (selected[item] == "healthcrystal2" && selected.length == 1) {
			$("#sidebar").html("<center><h2 style='margin-bottom: 0px, font-weight: bold;'>Average Health Crystal:</h2><br><br></center><p>Description: an average sized crystal enchanted with healing energy. This can be used any time in battle to heal 3 health. Combine three of these magic crystals to forge a smooth health crystal which can restore more health.<br><br>Scrap Value: 40 xp<br>Scrap Items: Small Health Crystal (1-2)<br><br>Equipable: yes<br><br>Level: 2</p>");
		} else if (selected[item] == "energycrystal" && selected.length == 1) {
			$("#sidebar").html("<center><h2 style='margin-bottom: 0px, font-weight: bold;'>Small Energy Crystal:</h2><br><br></center><p>Description: a small crystal enchanted to restore energy upon use. This can be used any time in battle to give 10 energy. Combine three of these energy crystals to forge an average energy crystal which can restore more energy.<br><br>Scrap Value: 20 xp<br>Scrap Items: None<br><br>Equipable: yes<br><br>Level: 1</p>");
		} else if (selected[item] == "energycrystal2" && selected.length == 1) {
			$("#sidebar").html("<center><h2 style='margin-bottom: 0px, font-weight: bold;'>Average Energy Crystal:</h2><br><br></center><p>Description: an average sized crystal enchanted to restore energy upon use. This can be used any time in battle to give 20 energy. Combine three of these energy crystals to forge a smooth energy crystal which can restore more energy.<br><br>Scrap Value: 40 xp<br>Scrap Items: Small Energy Crystal (1-2)<br><br>Equipable: yes<br><br>Level: 2</p>");
		} else if (selected.length == 1) {
			for (var weps = 0; weps < Player.weaponInventory.length; weps++) {
				var name = selected[item].replace(/[0-9]/g, '').trim();
				var level = parseInt(selected[item].replace(/[a-z]/g, '').replace(/[A-Z]/g, '')) + 1;
				if (Player.weaponInventory[weps].name == name) {
					 $("#sidebar").css("background-color", "#202020");
					 $("#sidebar").css("color", "#F5F5F5");
					 $("#sidebar").html("<div id='weaponStC'><center><h2 style='margin-bottom: 0px, font-weight: bold;'>" + name + ":</h2><br><br></center><p><b>Description:</b><div class='stat_secondary'> a weapon with stats</div><br><br><b>Scrap Value:</b> <div class='stat_secondary'>100 xp</div><br><b>Scrap Items:</b> <div class='stat_secondary'>Sword Shards (1-3)</div><br><br><b>Equipable:</b><div class='stat_secondary'> yes</div><br><br><b>Level:</b><div class='stat_secondary'> " + Player.weaponInventory[weps].weaponLevel + "</div><br><br><h2 style='margin: 0px; padding: 0px;'><b>Stats:</b></h2><br><br><b>Base Stats:</b><br><div class='stat_secondary'>Damage: " + Player.weaponInventory[weps].baseDamage + "<br>Proc Chance: 0%<br>Crit Chance: 0%<br>Puncture: 0</div><br><br><b>Elemental Damage: </b><br><div class='stat_secondary'><div id='d_fire'>Fire Damage: " + Player.weaponInventory[weps].fireDamage + "</div><br><div id='d_ice'>Ice Damage: " + Player.weaponInventory[weps].iceDamage + "</div><br><div id='d_poison'>Poison Damage: " + Player.weaponInventory[weps].poisonDamage + "</div></div><br><br><b>Attributes:</b><br><div class='stat_secondary'>Attribute Slots: " + Player.weaponInventory[weps].attributeSlots + "</p></div></div>");
					 weps = Player.weaponInventory.length;
				} 
			}
		}
	}
}

function reviewEnemy() {
	skipTurn = true;
	output.append("<br><br>Enemy Name: " + enemyName + "<br>Enemy Level: " + enemyLevel + "<br>Enemy Defense Guess: " + defenseGuess + "<br>Enemy Damage Guess: " + attackGuess + "<br>Enemy Distance Guess: " + distanceGuess + "<br>Enemy HP Guess: " + Math.round(hpGuess) + "<br>Enemy Speed Guess: " + speedGuess);
	Turn();
}

function Move(update) {
	if (update === 0) {
		output.append("<br><br>1. Move Closer<br>2. Move Away<br><input id='moveIn'>");
		$("#moveIn").focus();
		$("#moveIn").blur(function() {
			$("#moveIn").focus();
		});

		$("#moveIn").keypress(function(event) {
			var keycode = (event.keyCode ? event.keyCode : event.which);
			if (keycode == '13') {
				switch ($("#moveIn").val()) {
					case "1":
						Move(1);
						break;
					case "2":
						Move(2);
						break;
					default:
						Move(2);
						break;
				}
			}
			event.stopPropagation();
		});
	} else if (update == 1) {
		$("#moveIn").remove();
		output.append("<br>Move Closer:");
		output.append("<br>1. Move 1 space closer");
		if (Player.speed >= 5) {
			output.append("<br>2. Move 2 spaces closer");
		}
		if (Player.speed >= 10) {
			output.append("<br>3. Move 3 spaces closer");
		}
		if (Player.speed > 15) {
			output.append("<br>4. Move 4 spaces closer");
		}
		if (Player.speed > 20) {
			output.append("<br>5. Move 5 spaces closer");
		}
		output.append("<br><input id='clm'>");
		$("#clm").focus();
		$("#clm").blur(function() {
			$("#clm").focus();
		});
		$("#clm").keypress(function(event) {
			var keycode = (event.keyCode ? event.keyCode : event.which);
			if (keycode == 13) {
				if ($("#clm").val() == "1") {
					output.append("<br><br>You have moved 1 space closer!");
					enemyDistance -= 1;
					distanceGuess -= 1;
					output.append("<br>The new distance guess is: " + distanceGuess);
				} else if ($("#clm").val() == "2" && Player.speed >= 5) {
					output.append("<br><br>You have moved 2 spaces closer!");
					enemyDistance -= 2;
					distanceGuess -= 2;
					output.append("<br>The new distance guess is: " + distanceGuess);
				} else if ($("#clm").val() == "3" && Player.speed >= 10) {
					output.append("<br><br>You have moved 3 spaces closer!");
					enemyDistance -= 3;
					distanceGuess -= 3;
					output.append("<br>The new distance guess is: " + distanceGuess);
				} else if ($("#clm").val() == "4" && Player.speed >= 15) {
					output.append("<br><br>You have moved 4 spaces closer!");
					enemyDistance -= 4;
					distanceGuess -= 4;
					output.append("<br>The new distance guess is: " + distanceGuess);
				} else if ($("#clm").val() == "5" && Player.speed >= 20) {
					output.append("<br><br>You have moved 5 spaces closer!");
					enemyDistance -= 5;
					distanceGuess -= 5;
					output.append("<br>The new distance guess is: " + distanceGuess);
				}
				$("#clm").remove();
				enemyTurn();
			}
			event.stopPropagation();
		});
	} else {
		$("#moveIn").remove();
		output.append("<br>Move Away:");
		output.append("<br>1. Move 1 space away");
		if (Player.speed >= 5) {
			output.append("<br>2. Move 2 spaces away");
		}
		if (Player.speed >= 10) {
			output.append("<br>3. Move 3 spaces away");
		}
		if (Player.speed > 15) {
			output.append("<br>4. Move 4 spaces away");
		}
		if (Player.speed > 20) {
			output.append("<br>5. Move 5 spaces away");
		}
		output.append("<br><input id='clm'>");
		$("#clm").focus();
		$("#clm").blur(function() {
			$("#clm").focus();
		});
		$("#clm").keypress(function(event) {
			var keycode = (event.keyCode ? event.keyCode : event.which);
			if (keycode == 13) {
				if ($("#clm").val() == "1") {
					output.append("<br><br>You have moved 1 space away!");
					enemyDistance += 1;
					distanceGuess += 1;
					output.append("<br>The new distance guess is: " + distanceGuess);
				} else if ($("#clm").val() == "2" && Player.speed >= 5) {
					output.append("<br><br>You have moved 2 spaces away!");
					enemyDistance += 2;
					distanceGuess += 2;
					output.append("<br>The new distance guess is: " + distanceGuess);
				} else if ($("#clm").val() == "3" && Player.speed >= 10) {
					output.append("<br><br>You have moved 3 spaces away!");
					enemyDistance += 3;
					distanceGuess += 3;
					output.append("<br>The new distance guess is: " + distanceGuess);
				} else if ($("#clm").val() == "4" && Player.speed >= 15) {
					output.append("<br><br>You have moved 4 spaces away!");
					enemyDistance += 4;
					distanceGuess += 4;
					output.append("<br>The new distance guess is: " + distanceGuess);
				} else if ($("#clm").val() == "5" && Player.speed >= 20) {
					output.append("<br><br>You have moved 5 spaces away!");
					enemyDistance += 5;
					distanceGuess += 5;
					output.append("<br>The new distance guess is: " + distanceGuess);
				}
				$("#clm").remove();
				enemyTurn();
			}
			event.stopPropagation();
		});
	}
}

function runAway() {
	if (Player.speed > ((enemySpeed * enemyLevel) / ((Math.random() * Player.luck) / enemyLevel))) {
		output.append("<br><br>You have escaped the enemy!");
		output.append("<br><br> Press enter to continue.<br><input id='continue'>");
		$("#continue").focus();
		$("#continue").blur(function() {
			$("#continue").focus();
		});
		$("#continue").keypress(function(event) {
			var keycode = (event.keyCode ? event.keyCode : event.which);
			if (keycode == 13) {
				battle--;
				inventoryPage();
				$("#continue").off(keypress);
			}
			event.stopPropagation();
		});
	} else {
		output.append("<br><br>You were not fast enough and the enemy cought you.");
		Player.health -= (enemyDamage / Player.defense);
		enemyDistance = 0;
		output.apend("<br>Your health is now at " + Player.health);
		if (player.health <= 0) {
			output.append("<br><br><br> Game over! You Have Died.<br> Restart program to play again.");
			return;
		}
		enemyTurn();
	}
}


function createWeapon(type, level) {
	var createweapon = false;
	var randomDMG = Math.round(Math.random() * Player.luck + 10);
	var poisonDamage = 0;
	var fireDamage = 0;
	var iceDamage = 0;
	var weaponName = "";
	var bonusDamageChance = Math.random();
	var bonusType = Math.random();
	if (Math.random() > bonusDamageChance) {
		if (bonusType <= 0.33) {
			fireDamage = Math.round(Math.random() * Player.luck + Player.intelligence);
		} else if (bonusType <= 0.66) {
			iceDamage = Math.round(Math.random() * Player.luck + Player.intelligence);
		} else {
			poisonDamage = Math.round(Math.random() * Player.luck + Player.intelligence);
		}
	}
	$("#inventoryOpt").html("<h1>Weapon Creation:</h1><br><br><div id='wepNameIn'><b>Enter a name for your new sword:</b><br><input id='nameInput'></div>");
	
	$("#nameInput").keypress( function(event) {
		var keycode = (event.keyCode ? event.keyCode : event.which);
		var s = $("#nameInput").val().toString().trim();
		var ls = s.replace(/[0-9]/g, '');
		if (keycode == '13') {
			for (var wepsNameCheck = 0; wepsNameCheck < Player.weaponInventory.length; wepsNameCheck++) {
				if (Player.weaponInventory[wepsNameCheck].name == s) {
					alert("Name already exists!");
					createweapon = false;
					wepsNameCheck = Player.weaponInventory.length;
				} else if (ls.length < s.length) {
					alert("You can not have numbers in the name!");
					createweapon = false;
					wepsNameCheck = Player.weaponInventory.length;
				} else if (s.length > 25) {
					alert("Sorry that name is too long.");
					createweapon = false;
					wepsNameCheck = Player.weaponInventory.length;
				} else {
					createweapon = true;
				}
			}
			if (createweapon) {
				var combined = 0;
				var weapon = new Weapon(s, type, randomDMG, fireDamage, iceDamage, poisonDamage, level, 1, [""]); 
				if (level == 1) {
					for (var z = 0; z === 0;) {
						if (combined < 3) {
							for (var inv = 0; inv <= Player.inventory[0][1][1][1].length; inv++) {
								Player.inventory[0][1][1][1].splice(inv, 1);
								combined++;
							}
						} else {
							z = 1;
						}
					}
				}
				Player.currentWeapon = weapon;
				Player.weaponInventory.push(weapon);
				inventoryPage();
			} else {
				inventoryPage();
			}
		}
		event.stopPropagation();
	});
}


function combineGem(type) {
	var combined = 0;
	var invLengthEnergy = Player.inventory[3][2][1][0].length;
	var invLengthHealth = Player.inventory[3][1][1][0].length;
	if (type == 1) {
		for (var z = 0; z === 0;) {
			if (combined < 3) {
				for (var inv = 0; inv <= invLengthHealth; inv++) {
					if (Player.inventory[3][1][1][1][inv] == 1 && combined < 3) {
						Player.inventory[3][1][1][0].splice(inv, 1);
						Player.inventory[3][1][1][1].splice(inv, 1);
						combined++;
					}
				}
			} else {
				z = 1;
			}
		}
		Player.inventory[3][1][1][0].push("Average Health Crystal");
		Player.inventory[3][1][1][1].push(2);
	} else if (type == 2) {
		for (var z = 0; z === 0;) {
			if (combined < 3) {
				for (var inv = 0; inv <= invLengthEnergy; inv++) {
					if (Player.inventory[3][2][1][1][inv] == 1 && combined < 3) {
						Player.inventory[3][2][1][0].splice(inv, 1);
						Player.inventory[3][2][1][1].splice(inv, 1);
						combined++;
					}
				}
			} else {
				z = 1;
			}
		}
		Player.inventory[3][2][1][0].push("Average Energy Crystal");
		Player.inventory[3][2][1][1].push(2);
	} else {
		alert("Not " + type);
	}
	inventoryPage();
}


function experiencePoints(xp) {
	Player.experience += xp;
	var widthPercent;
	if (Player.experience >= Player.nextLevel) {
		Player.level += 1;
		$("#clevel").html("Level: " + Player.level);
		$("#nlevel").html("Level: " + (Player.level + 1));
		Player.skillPoints += 1;
		Player.experience = Player.experience - Player.nextLevel;
		Player.nextLevel = Player.nextLevel + (Player.nextLevel * 1.5);
		widthPercent = Player.experience / Player.nextLevel;
		widthPercent = Math.round(widthPercent * 100);
		$("#xpPercent").css("width", widthPercent + "%");
		$("#numXP").html(widthPercent + "%");
	} else {
		widthPercent = Player.experience / Player.nextLevel;
		widthPercent = Math.round(widthPercent * 100);
		$("#xpPercent").width(widthPercent + "%");
		$("#numXP").html(widthPercent + "%");
	}
}

function statUpgrade() {
	$("#inventoryOpt").html("<h2>Upgrade Stats:</h2><br><br><h3>Your Stat Points: " + Player.statPoints + "</h3><p>1. Increase Defense<br>2. Increase Luck<br>3. Increase Intelligence<br>4. Increase Speed<br>5. Increase Energy Regen</p><br><br>");
	$("#inventoryOpt").append("<input id='increaseSt'>");
	$("#increaseSt").focus();

	$("#increaseSt").blur(function() {
		$("#increaseSt").focus();
	});
	
	$('#inventoryBack').remove();
	$("#bottombar").append("<button id='inventoryBack'>Back</button>");
	$("#inventoryBack").click(function() {
		$('#inventoryBack').remove();
		inventoryPage();
	});

	$("#increaseSt").keypress(function(event) {
		var keycode = (event.keyCode ? event.keyCode : event.which);
		if (keycode == '13') {
			switch ($("#increaseSt").val()) {
				case "1":
					$("#inventoryOpt").html("<div style='padding: 20px' width='100%' height='100%'><center><h1>Increase Defense:</h1><br><p>Stat Points: " + Player.statPoints + "</p><br><button class='inc 1'>Increase by 1</button><button class='inc 2'>Increase by 5</button><button class='inc 3'>Increase by 10</button><center></div>");
					$(".inc").click(function() {
						if ($(this).hasClass("1") && Player.statPoints >= 1) {
							statUpgradeClick("defense", 1, 1);
						} else if ($(this).hasClass("2") && Player.statPoints >= 5) {
							statUpgradeClick("defense", 5, 5);
						} else if ($(this).hasClass("3") && Player.statPoints >= 10) {
							statUpgradeClick("defense", 10, 10);
						} else {
							$("#inventoryOpt").append("<br><br><p style='color: red'>You do not have enough stat points to do that!</p>");
						}
					});
					break;
				case "2":
					$("#inventoryOpt").html("<div style='padding: 20px' width='100%' height='100%'><center><h1>Increase Luck:</h1><br><p>Stat Points: " + Player.statPoints + "</p><br><button class='inc 1'>Increase by 1</button><button class='inc 2'>Increase by 5</button><button class='inc 3'>Increase by 10</button><center></div>");
					$(".inc").click(function() {
						if ($(this).hasClass("1") && Player.statPoints >= 1) {
							statUpgradeClick("luck", 1, 1);
						} else if ($(this).hasClass("2") && Player.statPoints >= 5) {
							statUpgradeClick("luck", 5, 5);
						} else if ($(this).hasClass("3") && Player.statPoints >= 10) {
							statUpgradeClick("luck", 10, 10);
						} else {
							$("#inventoryOpt").append("<br><br><p style='color: red'>You do not have enough stat points to do that!</p>");
						}
					});
					break;
				case "3":
					$("#inventoryOpt").html("<div style='padding: 20px' width='100%' height='100%'><center><h1>Increase Intelligence:</h1><br><p>Stat Points: " + Player.statPoints + "</p><br><button class='inc 1'>Increase by 1</button><button class='inc 2'>Increase by 5</button><button class='inc 3'>Increase by 10</button><center></div>");
					$(".inc").click(function() {
						if ($(this).hasClass("1") && Player.statPoints >= 1) {
							statUpgradeClick("intelligence", 1, 1);
						} else if ($(this).hasClass("2") && Player.statPoints >= 5) {
							statUpgradeClick("intelligence", 5, 5);
						} else if ($(this).hasClass("3") && Player.statPoints >= 10) {
							statUpgradeClick("intelligence", 10, 10);
						} else {
							$("#inventoryOpt").append("<br><br><p style='color: red'>You do not have enough stat points to do that!</p>");
						}
					});
					break;
				case "4":
					$("#inventoryOpt").html("<div style='padding: 20px' width='100%' height='100%'><center><h1>Increase Speed:</h1><br><p>Stat Points: " + Player.statPoints + "</p><br><button class='inc 1'>Increase by 1</button><button class='inc 2'>Increase by 5</button><button class='inc 3'>Increase by 10</button><center></div>");
					$(".inc").click(function() {
						if ($(this).hasClass("1") && Player.statPoints >= 1) {
							statUpgradeClick("speed", 1, 1);
						} else if ($(this).hasClass("2") && Player.statPoints >= 5) {
							statUpgradeClick("speed", 5, 5);
						} else if ($(this).hasClass("3") && Player.statPoints >= 10) {
							statUpgradeClick("speed", 10, 10);
						} else {
							$("#inventoryOpt").append("<br><br><p style='color: red'>You do not have enough stat points to do that!</p>");
						}
					});
					break;
				case "5":
					$("#inventoryOpt").html("<div style='padding: 20px' width='100%' height='100%'><center><h1>Increase Energy Regen:</h1><br><p>Stat Points: " + Player.statPoints + "</p><br><button class='inc 1'>Increase by 1</button><button class='inc 2'>Increase by 5</button><button class='inc 3'>Increase by 10</button><center></div>");
					$(".inc").click(function() {
						if ($(this).hasClass("1") && Player.statPoints >= 1) {
							statUpgradeClick("eregen", 1, 1);
						} else if ($(this).hasClass("2") && Player.statPoints >= 5) {
							statUpgradeClick("eregen", 5, 5);
						} else if ($(this).hasClass("3") && Player.statPoints >= 10) {
							statUpgradeClick("eregen", 10, 10);
						} else {
							$("#inventoryOpt").append("<br><br><p style='color: red'>You do not have enough stat points to do that!</p>");
						}
					});
					break;
			}
		}
		event.stopPropagation();
	});
}

function statUpgradeClick(stat, upgrade, cost) {
	if (stat == "defense") {
		Player.defense += upgrade;
		Player.statPoints -= cost;
		statUpgrade();
	} else if (stat == "luck") {
		Player.luck += upgrade;
		Player.statPoints -= cost;
		statUpgrade();
	} else if (stat == "intelligence") {
		Player.intelligence += upgrade;
		Player.statPoints -= cost;
		statUpgrade();
	} else if (stat == "speed") {
		Player.speed += upgrade;
		Player.statPoints -= cost;
		statUpgrade();
	} else if (stat == "eregen") {
		Player.energyRegen += upgrade;
		Player.statPoints -= cost;
		statUpgrade();
	}
}

function inventoryPlayer() {
	/* Player.inventoryEquipped.push([(Player.inventoryEquipped.length+1)]); Increase inventory slots script, for when skill tree exists. */
	$("#inventoryOpt").html("<h1>Gear:</h1><br><p>Select an inventory slot to equip an item</p>");
	var rowNumber = 1;
	var slotID = 0;
	var currentSlot = 0;
	output.html("");
	output.append("<div id='tableContainer'><table id='invTable'><thead><th>Inventory:</th></thead><tbody><tr id='tr1'></tr></tbody></table></div>");
	$("#bottombar").append("<button id='inventoryBack'>Back</button>");
	$("#inventoryBack").click(function() {
		$('#inventoryBack').remove();
		inventoryPage();
	});
	for (var invslots = 0; invslots < Player.inventoryEquipped.length; invslots++) {
		slotID++;
		currentSlot++;
		if (currentSlot >= 5) {
			rowNumber += 1;
			currentSlot = 1;
			$("#invTable").append("<tr id='tr" + rowNumber.toString() + "'></tr>");
		}
		if (Player.inventoryEquipped[(slotID - 1)].length > 1) {
			if (Player.inventoryEquipped[(slotID - 1)][1] == "energycrystal") {
				$("#tr" + rowNumber.toString()).append("<td><div class='select unselected invslot energycrystal lvl1 filled' id='" + "slot" + slotID.toString() + "'><img src='energycrystal.png'>Small Energy Crystal</div></td>");
			} else if (Player.inventoryEquipped[(slotID - 1)][1] == "energycrystal2") {
				$("#tr" + rowNumber.toString()).append("<td><div class='select unselected invslot energycrystal lvl2 filled' id='" + "slot" + slotID.toString() + "'><img src='energycrystal.png'>Average Energy Crystal</div></td>");
			} else if (Player.inventoryEquipped[(slotID - 1)][1] == "healthcrystal") {
				$("#tr" + rowNumber.toString()).append("<td><div class='select unselected invslot healthcrystal lvl1 filled' id='" + "slot" + slotID.toString() + "'><img src='healthcrystal.png'>Small Health Crystal</div></td>");
			} else if (Player.inventoryEquipped[(slotID - 1)][1].toString() == "healthcrystal2") {
				$("#tr" + rowNumber.toString()).append("<td><div class='select unselected invslot healthcrystal lvl2 filled' id='" + "slot" + slotID.toString() + "'><img src='healthcrystal.png'>Average Health Crystal</div></td>");
			}
		} else {
			$("#tr" + rowNumber.toString()).append("<td><div class='select unselected invslot empty' id='" + "slot" + slotID.toString() + "'><img src=''>Slot " + slotID + "</div></td>");
		}
	}

	var selected = [];
	inventoryActionUpdate(selected);

	$(".select").click(function() {
		if ($(this).hasClass('unselected')) {
			$(this).removeClass("unselected").addClass("selected");
			if ($(this).hasClass('empty')) {
				$('#inventoryBack').remove();
				equipItem("empty", $(this).attr('id'));
			} else if ($(this).hasClass('filled')) {
				$('#inventoryBack').remove();
				equipItem("replace", $(this).attr('id'));
			}
		}
	});
}

function equipItem(action, slot) {
	if (action == "empty") {
		var slotID = 0;
		var rowNumber = 1;

		output.html("");
		output.append("<div id='tableContainer'><table id='invTable'><thead><th>Inventory:</th></thead><tbody><tr id='tr1'></tr></tbody></table></div>");
		$("#inventoryOpt").html("<h1>Gear:</h1><br><p style='color: black'>Select an item to equip.</p>");
		$("#inventoryOpt").show();

		for (var sShards = 0; sShards < Player.inventory[0][1][1][1].length; sShards++) {
			slotID++;
			if (slotID >= 5) {
				rowNumber += 1;
				slotID = 1;
				$("#invTable").append("<tr id='tr" + rowNumber.toString() + "'></tr>");
			}
			$("#tr" + rowNumber.toString()).append("<td><div class='select unselected swordshard' id='" + "slot" + rowNumber.toString() + slotID.toString() + "'> <img src='sword_shard.png'>" + Player.inventory[0][1][1][1][sShards] + "<span class='info'>" + sShards + "</span></div></td>");
		}
		for (var aShards = 0; aShards < Player.inventory[0][1][2][1].length; aShards++) {
			slotID++;
			if (slotID >= 5) {
				rowNumber += 1;
				slotID = 1;
				$("#invTable").append("<tr id='tr" + rowNumber.toString() + "'></tr>");
			}
			$("#tr" + rowNumber.toString()).append("<td><div class='select unselected axeshard' id='" + "slot" + rowNumber.toString() + slotID.toString() + "'> <img src='axe_shard.png'><br>" + Player.inventory[0][1][2][1][aShards] + "<span class='info'>" + aShards + "</span></div></td>");
		}
		for (var bShards = 0; bShards < Player.inventory[0][1][3][1].length; bShards++) {
			slotID++;
			if (slotID >= 5) {
				rowNumber += 1;
				slotID = 1;
				$("#invTable").append("<tr id='tr" + rowNumber.toString() + "'></tr>");
			}
			$("#tr" + rowNumber.toString()).append("<td><div class='select unselected bowshard' id='" + "slot" + rowNumber.toString() + slotID.toString() + "'> <img src='bow_shard.png'>" + Player.inventory[0][1][3][1][bShards] + "<span class='info'>" + bShards + "</span></div></td>");
		}
		for (var hCrystal = 0; hCrystal < Player.inventory[3][1][1][0].length; hCrystal++) {
			slotID++;
			if (slotID >= 5) {
				rowNumber += 1;
				slotID = 1;
				$("#invTable").append("<tr id='tr" + rowNumber.toString() + "'></tr>");
			}
			$("#tr" + rowNumber.toString()).append("<td><div class='select unselected healthcrystal lvl" + Player.inventory[3][1][1][1][hCrystal].toString() + "' id='" + "slot" + rowNumber.toString() + slotID.toString() + "'> <img src='healthcrystal.png'>" + Player.inventory[3][1][1][0][hCrystal] + "<span class='info'>" + hCrystal + "</span></div></td>");
		}
		for (var eCrystal = 0; eCrystal < Player.inventory[3][2][1][0].length; eCrystal++) {
			slotID++;
			if (slotID >= 5) {
				rowNumber += 1;
				slotID = 1;
				$("#invTable").append("<tr id='tr" + rowNumber.toString() + "'></tr>");
			}
			$("#tr" + rowNumber.toString()).append("<td><div class='select unselected energycrystal lvl" + Player.inventory[3][2][1][1][eCrystal].toString() + "' id='" + "slot" + rowNumber.toString() + slotID.toString() + "'> <img src='energycrystal.png'>" + Player.inventory[3][2][1][0][eCrystal] + "<span class='info'>" + eCrystal + "</span></div></td>");
		}

		for (var rFragment = 0; rFragment < Player.inventory[1][1][1].length; rFragment++) {
			slotID++;
			if (slotID >= 5) {
				rowNumber += 1;
				slotID = 1;
				$("#invTable").append("<tr id='tr" + rowNumber.toString() + "'></tr>");
			}
			$("#tr" + rowNumber.toString()).append("<td><div class='select unselected runefragment' id='" + "slot" + rowNumber.toString() + slotID.toString() + "'> <img src='rune_fragment.png'>" + Player.inventory[1][1][1][rFragment] + "<span class='info'>" + rFragment + "</span></div></td>");
		}

		for (var attShard = 0; attShard < Player.inventory[2][1][1].length; attShard++) {
			slotID++;
			if (slotID >= 5) {
				rowNumber += 1;
				slotID = 1;
				$("#invTable").append("<tr id='tr" + rowNumber.toString() + "'></tr>");
			}
			$("#tr" + rowNumber.toString()).append("<td><div class='select unselected attributeshard' id='" + "slot" + rowNumber.toString() + slotID.toString() + "'> <img src='attribute_shard.png'>" + Player.inventory[2][1][1][attShard] + "<span class='info'>" + attShard + "</span></div></td>");
		}

		for (var weaponSel = 0; weaponSel < Player.weaponInventory.length; weaponSel++) {
			slotID++;
			if (slotID >= 5) {
				rowNumber += 1;
				slotID = 1;
				$("#invTable").append("<tr id='tr" + rowNumber.toString() + "'></tr>");
			}
			$("#tr" + rowNumber.toString()).append("<td><div class='select unselected weapon type" + Player.weaponInventory[weaponSel].type + " lvl" + Player.weaponInventory[weaponSel].weaponLevel + "' id='" + "slot" + rowNumber.toString() + slotID.toString() + "'> <img src='sword.png'>" + Player.weaponInventory[weaponSel].name + "<span class='info'>" + weaponSel + "</span></div></td>");
		}

		var selected = [];
		inventoryActionUpdate(selected);

		$(".select").click(function() {
			if ($(this).hasClass('unselected')) {
				$(this).css("border", "1px solid blue");
				$(this).removeClass("unselected").addClass("selected");
				if ($(this).hasClass('swordshard')) {
					selected.push("swordshard");
					inventoryActionUpdate(selected);
					slotInstall(selected, slot, "empty");
				} else if ($(this).hasClass('axeshard')) {
					selected.push("axeshard");
					inventoryActionUpdate(selected);
					slotInstall(selected, slot, "empty");
				} else if ($(this).hasClass('bowshard')) {
					selected.push("bowshard");
					inventoryActionUpdate(selected);
					slotInstall(selected, slot, "empty");
				} else if ($(this).hasClass("healthcrystal")) {
					if ($(this).hasClass("lvl1")) {
						selected.push("healthcrystal");
						inventoryActionUpdate(selected);
						slotInstall(selected, slot, "empty");
					} else if ($(this).hasClass("lvl2")) {
						selected.push("healthcrystal2");
						inventoryActionUpdate(selected);
						slotInstall(selected, slot, "empty");
					} else if ($(this).hasClass("weapon")) {
						selected.push($(this).text());
						inventoryActionUpdate(selected);
					}
				} else if ($(this).hasClass("energycrystal")) {
					if ($(this).hasClass("lvl1")) {
						selected.push("energycrystal");
						inventoryActionUpdate(selected);
						slotInstall(selected, slot, "empty");
					} else if ($(this).hasClass("lvl2")) {
						selected.push("energycrystal2");
						inventoryActionUpdate(selected);
						slotInstall(selected, slot, "empty");
					}
				}
			} else {
				$(this).css("border", "1px solid white");
				$(this).removeClass("selected").addClass("unselected");
				if ($(this).hasClass('swordshard')) {
					for (var f = 0; f < selected.length; f++) {
						if (selected[f] == "swordshard") {
							selected.splice(f, 1);
							f = selected.length;
							inventoryActionUpdate(selected);
							slotInstall(selected, slot, "empty");
						}
					}
				} else if ($(this).hasClass('axeshard')) {
					for (var f = 0; f < selected.length; f++) {
						if (selected[f] == "axeshard") {
							selected.splice(f, 1);
							f = selected.length;
							inventoryActionUpdate(selected);
							slotInstall(selected, slot, "empty");
						}
					}
				} else if ($(this).hasClass('bowshard')) {
					for (var f = 0; f < selected.length; f++) {
						if (selected[f] == "bowshard") {
							selected.splice(f, 1);
							f = selected.length;
							inventoryActionUpdate(selected);
							slotInstall(selected, slot, "empty");
						}
					}
				} else if ($(this).hasClass('healthcrystal')) {
					for (var f = 0; f < selected.length; f++) {
						if (selected[f] == "healthcrystal") {
							selected.splice(f, 1);
							f = selected.length;
							inventoryActionUpdate(selected);
							slotInstall(selected, slot, "empty");
						} else if (selected[f] == "healthcrystal2") {
							selected.splice(f, 1);
							f = selected.length;
							inventoryActionUpdate(selected);
							slotInstall(selected, slot, "empty");
						}
					}
				} else if ($(this).hasClass('energycrystal')) {
					for (var f = 0; f < selected.length; f++) {
						if (selected[f] == "energycrystal") {
							selected.splice(f, 1);
							f = selected.length;
							inventoryActionUpdate(selected);
							slotInstall(selected, slot, "empty");
						} else if (selected[f] == "energycrystal2") {
							selected.splice(f, 1);
							f = selected.length;
							inventoryActionUpdate(selected);
							slotInstall(selected, slot, "empty");
						}
					}
				} else if ($(this).hasClass('weapon')) {
					for (var f = 0; f < selected.length; f++) {
						if (selected[f] == $(this).text()) {
							selected.splice(f, 1);
							f = selected.length;
							inventoryActionUpdate(selected);
							slotInstall(selected, slot, "empty");
						}
					}
				}
			}
		});
	} else if (action == "replace") {
		var slotID = 0;
		var rowNumber = 1;

		output.html("");
		output.append("<div id='tableContainer'><table id='invTable'><thead><th>Inventory:</th></thead><tbody><tr id='tr1'></tr></tbody></table></div>");
		$("#inventoryOpt").html("<h1>Gear:</h1><br><p style='color: black'>Select an item to equip.</p>");
		$("#inventoryOpt").show();

		for (var sShards = 0; sShards < Player.inventory[0][1][1][1].length; sShards++) {
			slotID++;
			if (slotID >= 5) {
				rowNumber += 1;
				slotID = 1;
				$("#invTable").append("<tr id='tr" + rowNumber.toString() + "'></tr>");
			}
			$("#tr" + rowNumber.toString()).append("<td><div class='select unselected swordshard' id='" + "slot" + rowNumber.toString() + slotID.toString() + "'> <img src='sword_shard.png'>" + Player.inventory[0][1][1][1][sShards] + "<span class='info'>" + sShards + "</span></div></td>");
		}
		for (var aShards = 0; aShards < Player.inventory[0][1][2][1].length; aShards++) {
			slotID++;
			if (slotID >= 5) {
				rowNumber += 1;
				slotID = 1;
				$("#invTable").append("<tr id='tr" + rowNumber.toString() + "'></tr>");
			}
			$("#tr" + rowNumber.toString()).append("<td><div class='select unselected axeshard' id='" + "slot" + rowNumber.toString() + slotID.toString() + "'> <img src='axe_shard.png'><br>" + Player.inventory[0][1][2][1][aShards] + "<span class='info'>" + aShards + "</span></div></td>");
		}
		for (var bShards = 0; bShards < Player.inventory[0][1][3][1].length; bShards++) {
			slotID++;
			if (slotID >= 5) {
				rowNumber += 1;
				slotID = 1;
				$("#invTable").append("<tr id='tr" + rowNumber.toString() + "'></tr>");
			}
			$("#tr" + rowNumber.toString()).append("<td><div class='select unselected bowshard' id='" + "slot" + rowNumber.toString() + slotID.toString() + "'> <img src='bow_shard.png'>" + Player.inventory[0][1][3][1][bShards] + "<span class='info'>" + bShards + "</span></div></td>");
		}
		for (var hCrystal = 0; hCrystal < Player.inventory[3][1][1][0].length; hCrystal++) {
			slotID++;
			if (slotID >= 5) {
				rowNumber += 1;
				slotID = 1;
				$("#invTable").append("<tr id='tr" + rowNumber.toString() + "'></tr>");
			}
			$("#tr" + rowNumber.toString()).append("<td><div class='select unselected healthcrystal lvl" + Player.inventory[3][1][1][1][hCrystal].toString() + "' id='" + "slot" + rowNumber.toString() + slotID.toString() + "'> <img src='healthcrystal.png'>" + Player.inventory[3][1][1][0][hCrystal] + "<span class='info'>" + hCrystal + "</span></div></td>");
		}
		for (var eCrystal = 0; eCrystal < Player.inventory[3][2][1][0].length; eCrystal++) {
			slotID++;
			if (slotID >= 5) {
				rowNumber += 1;
				slotID = 1;
				$("#invTable").append("<tr id='tr" + rowNumber.toString() + "'></tr>");
			}
			$("#tr" + rowNumber.toString()).append("<td><div class='select unselected energycrystal lvl" + Player.inventory[3][2][1][1][eCrystal].toString() + "' id='" + "slot" + rowNumber.toString() + slotID.toString() + "'> <img src='energycrystal.png'>" + Player.inventory[3][2][1][0][eCrystal] + "<span class='info'>" + eCrystal + "</span></div></td>");
		}

		for (var rFragment = 0; rFragment < Player.inventory[1][1][1].length; rFragment++) {
			slotID++;
			if (slotID >= 5) {
				rowNumber += 1;
				slotID = 1;
				$("#invTable").append("<tr id='tr" + rowNumber.toString() + "'></tr>");
			}
			$("#tr" + rowNumber.toString()).append("<td><div class='select unselected runefragment' id='" + "slot" + rowNumber.toString() + slotID.toString() + "'> <img src='rune_fragment.png'>" + Player.inventory[1][1][1][rFragment] + "<span class='info'>" + rFragment + "</span></div></td>");
		}

		for (var attShard = 0; attShard < Player.inventory[2][1][1].length; attShard++) {
			slotID++;
			if (slotID >= 5) {
				rowNumber += 1;
				slotID = 1;
				$("#invTable").append("<tr id='tr" + rowNumber.toString() + "'></tr>");
			}
			$("#tr" + rowNumber.toString()).append("<td><div class='select unselected attributeshard' id='" + "slot" + rowNumber.toString() + slotID.toString() + "'> <img src='attribute_shard.png'>" + Player.inventory[2][1][1][attShard] + "<span class='info'>" + attShard + "</span></div></td>");
		}

		for (var weaponSel = 0; weaponSel < Player.weaponInventory.length; weaponSel++) {
			slotID++;
			if (slotID >= 5) {
				rowNumber += 1;
				slotID = 1;
				$("#invTable").append("<tr id='tr" + rowNumber.toString() + "'></tr>");
			}
			$("#tr" + rowNumber.toString()).append("<td><div class='select unselected weapon type" + Player.weaponInventory[weaponSel].type + " lvl" + Player.weaponInventory[weaponSel].weaponLevel + "' id='" + "slot" + rowNumber.toString() + slotID.toString() + "'> <img src='sword.png'>" + Player.weaponInventory[weaponSel].name + "<span class='info'>" + weaponSel + "</span></div></td>");
		}

		var selected = [];
		inventoryActionUpdate(selected);

		$(".select").click(function() {
			if ($(this).hasClass('unselected')) {
				$(this).css("border", "1px solid blue");
				$(this).removeClass("unselected").addClass("selected");
				if ($(this).hasClass('swordshard')) {
					selected.push("swordshard");
					inventoryActionUpdate(selected);
					slotInstall(selected, slot, "replace");
				} else if ($(this).hasClass('axeshard')) {
					selected.push("axeshard");
					inventoryActionUpdate(selected);
					slotInstall(selected, slot, "replace");
				} else if ($(this).hasClass('bowshard')) {
					selected.push("bowshard");
					inventoryActionUpdate(selected);
					slotInstall(selected, slot, "replace");
				} else if ($(this).hasClass("healthcrystal")) {
					if ($(this).hasClass("lvl1")) {
						selected.push("healthcrystal");
						inventoryActionUpdate(selected);
						slotInstall(selected, slot, "replace");
					} else if ($(this).hasClass("lvl2")) {
						selected.push("healthcrystal2");
						inventoryActionUpdate(selected);
						slotInstall(selected, slot, "replace");
					} else if ($(this).hasClass("weapon")) {
						selected.push($(this).text());
						inventoryActionUpdate(selected);
					}
				} else if ($(this).hasClass("energycrystal")) {
					if ($(this).hasClass("lvl1")) {
						selected.push("energycrystal");
						inventoryActionUpdate(selected);
						slotInstall(selected, slot, "replace");
					} else if ($(this).hasClass("lvl2")) {
						selected.push("energycrystal2");
						inventoryActionUpdate(selected);
						slotInstall(selected, slot, "replace");
					}
				}
			} else {
				$(this).css("border", "1px solid white");
				$(this).removeClass("selected").addClass("unselected");
				if ($(this).hasClass('swordshard')) {
					for (var f = 0; f < selected.length; f++) {
						if (selected[f] == "swordshard") {
							selected.splice(f, 1);
							f = selected.length;
							inventoryActionUpdate(selected);
							slotInstall(selected, slot, "replace");
						}
					}
				} else if ($(this).hasClass('axeshard')) {
					for (var f = 0; f < selected.length; f++) {
						if (selected[f] == "axeshard") {
							selected.splice(f, 1);
							f = selected.length;
							inventoryActionUpdate(selected);
							slotInstall(selected, slot, "replace");
						}
					}
				} else if ($(this).hasClass('bowshard')) {
					for (var f = 0; f < selected.length; f++) {
						if (selected[f] == "bowshard") {
							selected.splice(f, 1);
							f = selected.length;
							inventoryActionUpdate(selected);
							slotInstall(selected, slot, "replace");
						}
					}
				} else if ($(this).hasClass('healthcrystal')) {
					for (var f = 0; f < selected.length; f++) {
						if (selected[f] == "healthcrystal") {
							selected.splice(f, 1);
							f = selected.length;
							inventoryActionUpdate(selected);
							slotInstall(selected, slot, "replace");
						} else if (selected[f] == "healthcrystal2") {
							selected.splice(f, 1);
							f = selected.length;
							inventoryActionUpdate(selected);
							slotInstall(selected, slot, "replace");
						}
					}
				} else if ($(this).hasClass('energycrystal')) {
					for (var f = 0; f < selected.length; f++) {
						if (selected[f] == "energycrystal") {
							selected.splice(f, 1);
							f = selected.length;
							inventoryActionUpdate(selected);
							slotInstall(selected, slot, "replace");
						} else if (selected[f] == "energycrystal2") {
							selected.splice(f, 1);
							f = selected.length;
							inventoryActionUpdate(selected);
							slotInstall(selected, slot, "replace");
						}
					}
				} else if ($(this).hasClass('weapon')) {
					for (var f = 0; f < selected.length; f++) {
						if (selected[f] == $(this).text()) {
							selected.splice(f, 1);
							f = selected.length;
							inventoryActionUpdate(selected);
							slotInstall(selected, slot, "replace");
						}
					}
				}
			}
		});
	}
}

function slotInstall(item, slot, action) {
	if (item.length > 1) {
		$("#inventoryOpt").html("<h1>Gear:</h1><br><p style='color: red'>Please only select one item.</p>");
	} else if (item.length == 1) {
		$("#inventoryOpt").html("<h1>Gear:</h1><br><p style='color: black'>Would you like to equip this item to " + slot + "?</p><br><button id='eqConfirm'>Confirm</button>");
	} else {
		$("#inventoryOpt").html("<h1>Gear:</h1><br><p style='color: black'>Select an item to equip.</p>");
	}
	
	var location = slot.replace("slot", "");
	if (action == "empty") {
		$("#eqConfirm").click(function() {
		location = parseInt(location);
		location = location - 1;
		Player.inventoryEquipped[location].push(item);
		if (item == "energycrystal") {
			for (var f = 0; f < Player.inventory[3][2][1][0].length; f++) {
				if (Player.inventory[3][2][1][0][f] == "Small Energy Crystal") {
					Player.inventory[3][2][1][0].splice(f, 1);
					Player.inventory[3][2][1][1].splice(f, 1);
					f = Player.inventory[3][2][1][0].length;
				}
			}
		} else if (item == "energycrystal2") {
			for (var f = 0; f < Player.inventory[3][2][1][0].length; f++) {
				if (Player.inventory[3][2][1][0][f] == "Average Energy Crystal") {
					Player.inventory[3][2][1][0].splice(f, 1);
					Player.inventory[3][2][1][1].splice(f, 1);
					f = Player.inventory[3][2][1][0].length;
				}
			}
		} else if (item == "healthcrystal") {
			for (var f = 0; f < Player.inventory[3][1][1][0].length; f++) {
				if (Player.inventory[3][1][1][0][f] == "Small Health Crystal") {
					Player.inventory[3][1][1][0].splice(f, 1);
					Player.inventory[3][1][1][1].splice(f, 1);
					f = Player.inventory[3][1][1][0].length;
				} 
			}
		} else if (item == "healthcrystal2") {
			for (var f = 0; f < Player.inventory[3][1][1][0].length; f++) {
				if (Player.inventory[3][1][1][0][f] == "Average Health Crystal") {
					Player.inventory[3][1][1][0].splice(f, 1);
					Player.inventory[3][1][1][1].splice(f, 1);
					f = Player.inventory[3][1][1][0].length;
				}
			}
		} 
		
		$("#eqConfirm").remove();
		inventoryPlayer();
	});
	} else if (action == "replace") {
		$("#eqConfirm").click(function() {
		location = parseInt(location);
		location = location - 1;
		
		// Adds Item Being Replaced Back to Inventory
		if (Player.inventoryEquipped[location][1] == "energycrystal") {
			Player.inventory[3][2][1][0].push("Small Energy Crystal");
			Player.inventory[3][2][1][1].push(1);
		} else if (Player.inventoryEquipped[location][1] == "energycrystal2") {
			Player.inventory[3][2][1][0].push("Average Energy Crystal");
			Player.inventory[3][2][1][1].push(2);
		} else if (Player.inventoryEquipped[location][1] == "healthcrystal") {
			Player.inventory[3][1][1][0].push("Small Health Crystal");
			Player.inventory[3][1][1][1].push(1);
		} else if (Player.inventoryEquipped[location][1] == "healthcrystal2") {
			Player.inventory[3][1][1][0].push("Average Health Crystal");
			Player.inventory[3][1][1][1].push(2);
		}
		
		// Adds item to equipped and removes from inventory.
		Player.inventoryEquipped[location].splice(1, Player.inventoryEquipped[location].length);
		Player.inventoryEquipped[location].push(item);
		if (item == "energycrystal") {
			for (var f = 0; f < Player.inventory[3][2][1][0].length; f++) {
				if (Player.inventory[3][2][1][0][f] == "Small Energy Crystal") {
					Player.inventory[3][2][1][0].splice(f, 1);
					Player.inventory[3][2][1][1].splice(f, 1);
					f = Player.inventory[3][2][1][0].length;
				}
			}
		} else if (item == "energycrystal2") {
			for (var f = 0; f < Player.inventory[3][2][1][0].length; f++) {
				if (Player.inventory[3][2][1][0][f] == "Average Energy Crystal") {
					Player.inventory[3][2][1][0].splice(f, 1);
					Player.inventory[3][2][1][1].splice(f, 1);
					f = Player.inventory[3][2][1][0].length;
				}
			}
		} else if (item == "healthcrystal") {
			for (var f = 0; f < Player.inventory[3][1][1][0].length; f++) {
				if (Player.inventory[3][1][1][0][f] == "Small Health Crystal") {
					Player.inventory[3][1][1][0].splice(f, 1);
					Player.inventory[3][1][1][1].splice(f, 1);
					f = Player.inventory[3][1][1][0].length;
				} 
			}
		} else if (item == "healthcrystal2") {
			for (var f = 0; f < Player.inventory[3][1][1][0].length; f++) {
				if (Player.inventory[3][1][1][0][f] == "Average Health Crystal") {
					Player.inventory[3][1][1][0].splice(f, 1);
					Player.inventory[3][1][1][1].splice(f, 1);
					f = Player.inventory[3][1][1][0].length;
				}
			}
		} 
	
		$("#eqConfirm").remove();
		inventoryPlayer();
	});
	}
}

function equipWeapon(weapon) {
		if (weapon == "ask") {
			$("#bottombar").append("<button id='inventoryBack'>Back</button>");
			$("#inventoryBack").click(function() {
				$('#inventoryBack').remove();
				inventoryPage();
			});
		
		var slotID = 0;
		var rowNumber = 1;

		output.html("");
		output.append("<div id='tableContainer'><table id='invTable'><thead><th>Inventory:</th></thead><tbody><tr id='tr1'></tr></tbody></table></div>");
		$("#inventoryOpt").html("<h1>Gear:</h1><br><p style='color: black'>Select an item to equip.</p>");
		$("#inventoryOpt").show();
		
		for (var weaponSel = 0; weaponSel < Player.weaponInventory.length; weaponSel++) {
			slotID++;
			if (slotID >= 5) {
				rowNumber += 1;
				slotID = 1;
				$("#invTable").append("<tr id='tr" + rowNumber.toString() + "'></tr>");
			}
			if (Player.weaponInventory[weaponSel].fireDamage > 0 && Player.weaponInventory[weaponSel].iceDamage == 0 && Player.weaponInventory[weaponSel].poisonDamage == 0) {
			$("#tr" + rowNumber.toString()).append("<td><div class='select unselected weapon fire type" + Player.weaponInventory[weaponSel].type + " lvl" + Player.weaponInventory[weaponSel].weaponLevel + "' id='" + "slot" + rowNumber.toString() + slotID.toString() + "'> <img src='sword.png'>" + Player.weaponInventory[weaponSel].name + "<span class='info'>" + weaponSel + "</span></div></td>");
		} else if (Player.weaponInventory[weaponSel].iceDamage > 0 && Player.weaponInventory[weaponSel].fireDamage == 0 && Player.weaponInventory[weaponSel].poisonDamage == 0) {
			$("#tr" + rowNumber.toString()).append("<td><div class='select unselected weapon ice type" + Player.weaponInventory[weaponSel].type + " lvl" + Player.weaponInventory[weaponSel].weaponLevel + "' id='" + "slot" + rowNumber.toString() + slotID.toString() + "'> <img src='sword.png'>" + Player.weaponInventory[weaponSel].name + "<span class='info'>" + weaponSel + "</span></div></td>");
		} else if (Player.weaponInventory[weaponSel].poisonDamage > 0 && Player.weaponInventory[weaponSel].iceDamage == 0 && Player.weaponInventory[weaponSel].fireDamage == 0) {
			$("#tr" + rowNumber.toString()).append("<td><div class='select unselected weapon poison type" + Player.weaponInventory[weaponSel].type + " lvl" + Player.weaponInventory[weaponSel].weaponLevel + "' id='" + "slot" + rowNumber.toString() + slotID.toString() + "'> <img src='sword.png'>" + Player.weaponInventory[weaponSel].name + "<span class='info'>" + weaponSel + "</span></div></td>");
		} else {
			$("#tr" + rowNumber.toString()).append("<td><div class='select unselected weapon type" + Player.weaponInventory[weaponSel].type + " lvl" + Player.weaponInventory[weaponSel].weaponLevel + "' id='" + "slot" + rowNumber.toString() + slotID.toString() + "'> <img src='sword.png'>" + Player.weaponInventory[weaponSel].name + "<span class='info'>" + weaponSel + "</span></div></td>");
		}
		}

		var selected = [];
		inventoryActionUpdate(selected);
		
		$(".select").click(function() {
			if ($(this).hasClass('unselected')) {
				$(this).css("border", "1px solid blue");
				$(this).removeClass("unselected").addClass("selected");
				if ($(this).hasClass("weapon")) {
						selected.push($(this).text());
						inventoryActionUpdate(selected);
				}
			} else {
				$(this).css("border", "1px solid white");
				$(this).removeClass("selected").addClass("unselected");
				if ($(this).hasClass('weapon')) {gi
					for (var f = 0; f < selected.length; f++) {
						if (selected[f] == $(this).text()) {
							selected.splice(f, 1);
							f = selected.length;
							inventoryActionUpdate(selected);
						}
					}
				}
			}
		});
		
		$("#inventoryOpt").html("<h1>Equip Weapon:</h1><br><p>Please select a weapon to equip.</p><br><button id='eqb'>Equip</button>");	
		
		$("#eqb").click( function() {
			if (selected.length == 1) {
				equipWeapon(selected);
				$("#eqb").remove();
			} else if (selected.length > 1) {
				alert("You can only select one weapon.");
			} else {
				alert("Please select a weapon first.");
			}
		});
	} else {
		for (var wps = 0; wps < Player.weaponInventory.length; wps++) {
			var name = weapon.toString().replace(/[0-9]/g, '').trim();
			if (Player.weaponInventory[wps].name == name) {
				Player.currentWeapon = Player.weaponInventory[wps];
				inventoryPage();
			}
		}
	}
}

// The equiped items the player can access during battle.
function battleInventory() {
	$("#inventoryOpt").show();
	$("#inventoryOpt").html("<h1>Select An Item:</h1><br><p>Select an equipped item to see actions.</p>");
	var rowNumber = 1;
	var slotID = 0;
	var currentSlot = 0;
	var selectable = true;
	output.html("");
	output.append("<div id='tableContainer'><table id='invTable'><thead><th>Inventory:</th></thead><tbody><tr id='tr1'></tr></tbody></table></div>");
	
	// Back Function
	$("#bottombar").append("<button id='inventoryBack'>Back</button>");
	$("#inventoryBack").click(function() {
		$('#inventoryBack').remove();
		$("#inventoryOpt").hide();
		output.html("");
		output.css("width", "75%");
		skipTurn = true;
		Turn();
	});
	
	for (var invslots = 0; invslots < Player.inventoryEquipped.length; invslots++) {
		slotID++;
		currentSlot++;
		if (currentSlot >= 5) {
			rowNumber += 1;
			currentSlot = 1;
			$("#invTable").append("<tr id='tr" + rowNumber.toString() + "'></tr>");
		}
		if (Player.inventoryEquipped[(slotID - 1)].length > 1) {
			if (Player.inventoryEquipped[(slotID - 1)][1] == "energycrystal") {
				$("#tr" + rowNumber.toString()).append("<td><div class='select unselected invslot energycrystal lvl1 filled' id='" + "slot" + slotID.toString() + "'><img src='energycrystal.png'>Small Energy Crystal</div></td>");
			} else if (Player.inventoryEquipped[(slotID - 1)][1] == "energycrystal2") {
				$("#tr" + rowNumber.toString()).append("<td><div class='select unselected invslot energycrystal lvl2 filled' id='" + "slot" + slotID.toString() + "'><img src='energycrystal.png'>Average Energy Crystal</div></td>");
			} else if (Player.inventoryEquipped[(slotID - 1)][1] == "healthcrystal") {
				$("#tr" + rowNumber.toString()).append("<td><div class='select unselected invslot healthcrystal lvl1 flilled' id='" + "slot" + slotID.toString() + "'><img src='healthcrystal.png'>Small Health Crystal</div></td>");
			} else if (Player.inventoryEquipped[(slotID - 1)][1].toString() == "healthcrystal2") {
				$("#tr" + rowNumber.toString()).append("<td><div class='select unselected invslot healthcrystal lvl2 filled' id='" + "slot" + slotID.toString() + "'><img src='healthcrystal.png'>Average Health Crystal</div></td>");
			}
		} else {
			$("#tr" + rowNumber.toString()).append("<td><div class='select unselected invslot empty' id='" + "slot" + slotID.toString() + "'><img src=''>Slot " + slotID + "</div></td>");
		}
	}

	var selected = [];

	$(".select").click(function() {
		if ($(this).hasClass('unselected')) {
			if (selectable) {
				selectable = false;
				$(this).css("border", "1px solid blue");
			$(this).removeClass("unselected").addClass("selected");
			if ($(this).hasClass('swordshard')) {
				selected.push("swordshard");
				battleInventoryAction(selected, $(this).attr("id"));
			} else if ($(this).hasClass('axeshard')) {
				selected.push("axeshard");
				battleInventoryAction(selected, $(this).attr("id"));
			} else if ($(this).hasClass('bowshard')) {
				selected.push("bowshard");
				battleInventoryAction(selected, $(this).attr("id"));
			} else if ($(this).hasClass("healthcrystal")) {
				if ($(this).hasClass("lvl1")) {
					selected.push("healthcrystal");
					battleInventoryAction(selected, $(this).attr("id"));
				} else if ($(this).hasClass("lvl2")) {
					selected.push("healthcrystal2");
					battleInventoryAction(selected, $(this).attr("id"));
				}
			} else if ($(this).hasClass("energycrystal")) {
				if ($(this).hasClass("lvl1")) {
					selected.push("energycrystal");
					battleInventoryAction(selected, $(this).attr("id"));
				} else if ($(this).hasClass("lvl2")) {
					selected.push("energycrystal2");
					battleInventoryAction(selected, $(this).attr("id"));
				}
			} else if ($(this).hasClass("weapon")) {
				selected.push($(this).text());
				battleInventoryAction(selected, $(this).attr("id"));
			}
			} else {
				alert("You can only select One Item at a time!");
			}
		} else {
			selectable = true;
			$(this).css("border", "1px solid white");
			$(this).removeClass("selected").addClass("unselected");
			if ($(this).hasClass('swordshard')) {
				for (var f = 0; f < selected.length; f++) {
					if (selected[f] == "swordshard") {
						selected.splice(f, 1);
						f = selected.length;
						battleInventoryAction(selected, $(this).attr("id"));
					}
				}
			} else if ($(this).hasClass('axeshard')) {
				for (var f = 0; f < selected.length; f++) {
					if (selected[f] == "axeshard") {
						selected.splice(f, 1);
						f = selected.length;
						battleInventoryAction(selected, $(this).attr("id"));
					}
				}
			} else if ($(this).hasClass('bowshard')) {
				for (var f = 0; f < selected.length; f++) {
					if (selected[f] == "bowshard") {
						selected.splice(f, 1);
						f = selected.length;
						battleInventoryAction(selected, $(this).attr("id"));
					}
				}
			} else if ($(this).hasClass('healthcrystal')) {
				for (var f = 0; f < selected.length; f++) {
					if (selected[f] == "healthcrystal") {
						selected.splice(f, 1);
						f = selected.length;
						battleInventoryAction(selected);
					} else if (selected[f] == "healthcrystal2") {
						selected.splice(f, 1);
						f = selected.length;
						battleInventoryAction(selected, $(this).attr("id"));
					}
				}
			} else if ($(this).hasClass('energycrystal')) {
				for (var f = 0; f < selected.length; f++) {
					if (selected[f] == "energycrystal") {
						selected.splice(f, 1);
						f = selected.length;
						battleInventoryAction(selected, $(this).attr("id"));
					} else if (selected[f] == "energycrystal2") {
						selected.splice(f, 1);
						f = selected.length;
						battleInventoryAction(selected, $(this).attr("id"));
					}
				}
			} else if ($(this).hasClass('weapon')) {
				for (var f = 0; f < selected.length; f++) {
					if (selected[f] == $(this).text()) {
						selected.splice(f, 1);
						f = selected.length;
						battleInventoryAction(selected, $(this).attr("id"));
					}
				}
			}
		}
	});
}

function battleInventoryAction(item, slot) {
	// Give options for each item
	$("#inventoryOpt").html("<h1>Select An Item:</h1><br><p>Select an equipped item to see actions.</p>");
	for (var x = 0; x < item.length; x++) {
		if (item[x] == "swordshard" && item.length == 1) {
			$("#inventoryOpt").html("<center><h2 style='margin-bottom: 0px, font-weight: bold;'>Sword Shard:</h2><br><br></center><p>Description: a fragmented piece of metal that once was part of a sword. If three of these are melted down they can be used to forge a new sword. <br><br>Scrap Value: 100 xp<br>Scrap Items: None<br><br>Equipable: no<br><br>Level: 0</p>");
		} else if (item[x] == "axeshard" && item.length == 1) {
			$("#inventoryOpt").html("<center><h2 style='margin-bottom: 0px, font-weight: bold;'>Axe Shard:</h2><br><br></center><p>Description: a fragmented piece of metal and bits of wooden handle that once was part of an axe. If three of these are melted down and combined they can be used to forge a new axe. <br><br>Scrap Value: 100 xp<br>Scrap Items: None<br><br>Equipable: no<br><br>Level: 0</p>");
		} else if (item[x] == "bowshard" && item.length == 1) {
			$("#inventoryOpt").html("<center><h2 style='margin-bottom: 0px, font-weight: bold;'>Bow Shard:</h2><br><br></center><p>Description: a fragmented piece of wood and string that once was part of a bow. If three of these are combined they can be used to forge a new bow. <br><br>Scrap Value: 100 xp<br>Scrap Items: None<br><br>Equipable: no<br><br>Level: 0</p>");
		} else if (item[x] == "healthcrystal" && item.length == 1) {
			$("#inventoryOpt").html("<center><h2 style='margin-bottom: 0px, font-weight: bold;'>Small Health Crystal:</h2><br><br></center><p>Description: a small crystal enchanted with healing energy. This can be used any time in battle to heal 1 health. Combine three of these magic crystals to forge an average health crystal which can restore more health.<br><br>Scrap Value: 20 xp<br>Scrap Items: None<br><br>Equipable: yes<br><br>Level: 1</p><br><h3 style='margin-left: 10px;'>Actions:</h3><br><button class='useBTN' id='healthcrystal'>Use Crystal</button>");
		} else if (item[x] == "healthcrystal2" && item.length == 1) {
			$("#inventoryOpt").html("<center><h2 style='margin-bottom: 0px, font-weight: bold;'>Average Health Crystal:</h2><br><br></center><p>Description: an average sized crystal enchanted with healing energy. This can be used any time in battle to heal 3 health. Combine three of these magic crystals to forge a smooth health crystal which can restore more health.<br><br>Scrap Value: 40 xp<br>Scrap Items: Small Health Crystal (1-2)<br><br>Equipable: yes<br><br>Level: 2</p><br><h3 style='margin-left: 10px;'>Actions:</h3><br><button class='useBTN' id='healthcrystal2'>Use Crystal</button>");
		} else if (item[x] == "energycrystal" && item.length == 1) {
			$("#inventoryOpt").html("<center><h2 style='margin-bottom: 0px, font-weight: bold;'>Small Energy Crystal:</h2><br><br></center><p>Description: a small crystal enchanted to restore energy upon use. This can be used any time in battle to give 10 energy. Combine three of these energy crystals to forge an average energy crystal which can restore more energy.<br><br>Scrap Value: 20 xp<br>Scrap Items: None<br><br>Equipable: yes<br><br>Level: 1</p><br><h3 style='margin-left: 10px;'>Actions:</h3><br><button class='useBTN' id='energycrystal'>Use Crystal</button>");
			x = item.length;
		} else if (item[x] == "energycrystal2" && item.length == 1) {
			$("#inventoryOpt").html("<center><h2 style='margin-bottom: 0px, font-weight: bold;'>Average Energy Crystal:</h2><br><br></center><p>Description: an average sized crystal enchanted to restore energy upon use. This can be used any time in battle to give 20 energy. Combine three of these energy crystals to forge a smooth energy crystal which can restore more energy.<br><br>Scrap Value: 40 xp<br>Scrap Items: Small Energy Crystal (1-2)<br><br>Equipable: yes<br><br>Level: 2</p><br><h3 style='margin-left: 10px;'>Actions:</h3><br><button class='useBTN' id='energycrystal2'>Use Crystal</button>");
		} 
	}
	
	// Use Item When Button Clicked
	$(".useBTN").click( function () {
		var clicked = $(this).attr("id");
		useItem(clicked, slot);
	});
}

function useItem(item, slot) {
	$("#inventoryBack").remove();
	var location = slot.replace("slot", ""); // Gets just the slot number 
	location = parseInt(location); // Turns the number from a string to an int
	location = location - 1; // Subtracts 1 to turn it into the index
	
	// Carries out Action
	if (item == "energycrystal") {
		Player.energy += 10;
		alert("Your energy has been increased by 10");
		Player.inventoryEquipped[location].splice(1, Player.inventoryEquipped[location].length);
		updateStats(false);
		battleInventory();
	} else if (item == "energycrystal2") {
		Player.energy += 20;
		alert("Your energy has been increased by 20");
		Player.inventoryEquipped[location].splice(1, Player.inventoryEquipped[location].length);
		updateStats(false);
		battleInventory();
	} else if (item == "healthcrystal") {
		Player.health += 1;
		alert("Your health has been increased by 1");
		Player.inventoryEquipped[location].splice(1, Player.inventoryEquipped[location].length);
		updateStats(false);
		battleInventory();	  
	} else if (item == "healthcrystal2") {
		Player.health += 3;
		alert("Your health has been increased by 3");
		Player.inventoryEquipped[location].splice(1, Player.inventoryEquipped[location].length);
		updateStats(false);
		battleInventory();		  
	}
	
}