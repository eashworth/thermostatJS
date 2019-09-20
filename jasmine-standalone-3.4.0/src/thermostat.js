
'use strict'

function Thermostat (){
  this.DEFAULT_TEMPERATURE = 20;
  this.temperature = this.DEFAULT_TEMPERATURE;
  this.MINIMUM_TEMPERATURE = 10;
  this.MAX_LIMIT_PSM_ON = 25;
  this.MAX_LIMIT_PSM_OFF = 32;
  this.isPowerSaving = true;
  this.MEDIUM_ENERGY_USAGE_LIMIT = 18;
}

Thermostat.prototype.getCurrentTemperature = function() {
  return this.temperature;
}

Thermostat.prototype.isPowerSavingModeOn = function() {
  return this.isPowerSaving;
}

Thermostat.prototype.isMaximumTemperature = function() {
  if (this.isPowerSavingModeOn() === false) {
    return this.getCurrentTemperature() === this.MAX_LIMIT_PSM_OFF;
  }
  return this.getCurrentTemperature() === this.MAX_LIMIT_PSM_ON;
}

Thermostat.prototype.up = function(){
  if (this.isMaximumTemperature()) {
    return;
  }
  this.temperature ++;
}

Thermostat.prototype.isMinimumTemperature = function() {
  return this.temperature === this.MINIMUM_TEMPERATURE
}

Thermostat.prototype.down = function(){
  if (this.isMinimumTemperature()) {
    return
  }
  this.temperature --;
}

Thermostat.prototype.powerSavingOff = function() {
  this.isPowerSaving = false;
}

Thermostat.prototype.powerSavingOn = function() {
  this.isPowerSaving = true;
}

Thermostat.prototype.resetTemperature = function() {
  this.temperature = this.DEFAULT_TEMPERATURE;
}

Thermostat.prototype.checkEnergyUsage = function(){
  if(this.temperature < this.MEDIUM_ENERGY_USAGE_LIMIT){
    return 'Low';
  }
  else if (this.temperature > this.MEDIUM_ENERGY_USAGE_LIMIT && this.temperature < this.MAX_LIMIT_PSM_ON){
    return 'Medium';
  }
  else {
    return 'High'
  }
}
