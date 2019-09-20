'use strict'

describe('Thermostat', function () {
  var thermostat;
  beforeEach(function () {
    thermostat = new Thermostat();
  });
  // Thermostat starts at 20 degrees
  it('should have a default temperature of 20 degrees', function(){
    expect(thermostat.getCurrentTemperature()).toEqual(20)
  });
  // You can reset the temperature to 20 with a reset function
  describe('reset', function() {
    it('can reset the temperature back to 20', function() {
      thermostat.up();
      thermostat.resetTemperature();
      expect(thermostat.getCurrentTemperature()).toEqual(20)
    });
  });
  describe('up', function() {
    // You can increase the temperature with an up function
    it('can increase the temperature', function() {
      thermostat.up()
      expect(thermostat.getCurrentTemperature()).toBeGreaterThan(20)
    });
  });
  describe('down', function(){
    // You can decrease the temperature with a down function
    it('should reduce the temperature', function(){
      thermostat.down()
      expect(thermostat.getCurrentTemperature()).toBeLessThan(20)
    });
    it('the minimum temperature is 10', function() {
      for ( var i = 0; i < 12; i++ ) {
        thermostat.down()
      }
      expect(thermostat.getCurrentTemperature()).toEqual(10)
    });
  });
  describe('power saving mode', function(){
    // Power saving mode is on by default
    it('sets power save mode to be on by default', function(){
      expect(thermostat.isPowerSavingModeOn()).toBe(true);
    });
    describe('when power saving mode is on', function() {
      it('power saving mode can be switched off', function() {
        thermostat.powerSavingOff();
        expect(thermostat.isPowerSavingModeOn()).toBe(false);
      });
      // If power saving mode is on, the maximum temperature is 25 degrees
      it('the maximum temperature is 25', function() {
        for (var i = 0; i < 6; i++) {
          thermostat.up()
        }
        expect(thermostat.getCurrentTemperature()).toEqual(25)
      });
      describe('when power saving mode is off', function() {
        it('power save mode can be switched on', function() {
          thermostat.powerSavingOff();
          thermostat.powerSavingOn();
          expect(thermostat.isPowerSavingModeOn()).toBe(true);
        });
        // If power saving mode is off, the maximum temperature is 32 degrees
        it('the maximum temperature is 32', function(){
          thermostat.powerSavingOff()
          for (var i = 0; i < 14; i++){
            thermostat.up()
          }
          expect(thermostat.getCurrentTemperature()).toEqual(32)
        });
      });
    });
  });
  // You can ask about the thermostat's current energy usage: < 18 is low-usage,
  // < 25 is medium-usage, anything else is high-usage.
  describe('Check Energy Usage', function(){
    describe('when temperature is below 18', function() {
      it('returns low usage', function(){
        for (var i = 0; i < 4; i++){
          thermostat.down()
        }
        expect(thermostat.checkEnergyUsage()).toEqual('Low')
      });
    });
    describe('when temperature is between 18 and 25', function() {
      it('returns medium usage', function(){
        expect(thermostat.checkEnergyUsage()).toEqual('Medium')
      });
    });
    describe('when temperature is greater than 25', function() {
      it('returns high usage', function() {
        thermostat.powerSavingOff();
        for (var i = 0; i < 5; i++) {
          thermostat.up();
        }
        expect(thermostat.checkEnergyUsage()).toEqual('High')
      });
    });
  });
});
