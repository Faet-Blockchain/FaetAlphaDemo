/*:
 * @url https://coffeenahc.itch.io/
 * @target MZ
 * @author coffeenahc
 * @plugindesc Created by coffee_chan of Fiverr on comission of Faet Studios.
 * 
 * @help
 * When making TP recovery items, add the effect 'Gain TP'. The engine limits this
 * value to 100, so in order to go beyond this value, add the following meta tags to 
 * the item in the notes section of the database:
 * 
 * <overrideTpGain>
 * <tpRecoverEffect1:percentage>
 * <tpRecoverEffect2:value>
 * 
 * Replace percentage or value with a number
 */

Object.defineProperties(Game_BattlerBase.prototype, {
    mtp: {
        get: function () {
            return this.param(1);
        },
        configurable: true
    }
});

Game_BattlerBase.prototype.maxTp = function () {
    return this.mtp;
};

let gbccoffee_tpasmp_gamebattlerbase_recoverall = Game_BattlerBase.prototype.recoverAll;
Game_BattlerBase.prototype.recoverAll = function () {
    gbccoffee_tpasmp_gamebattlerbase_recoverall.call(this);
    this._tp = this.mtp;
};

Game_BattlerBase.prototype.tpRate = function () {
    return this.mtp > 0 ? this.tp / this.mtp : 0;
};

Game_Battler.prototype.initTp = function () { };

Game_Battler.prototype.clearTp = function () { };

Game_Battler.prototype.chargeTpByDamage = function (damageRate) { };

Game_Action.prototype.itemEffectRecoverMp = function (target, effect) {
    let value = (target.mmp * effect.value1 + effect.value2) * target.rec;
    if (this.isItem()) {
        value *= this.subject().pha;
    }
    value = Math.floor(value);
    if (value !== 0) {
        target.gainMp(value);
        this.makeSuccess(target);
    }
};

let gbccoffee_tpasmp_gameaction_itemeffectgaintp = Game_Action.prototype.itemEffectGainTp;
Game_Action.prototype.itemEffectGainTp = function (target, effect) {
    if (this.item().meta.overrideTpGain) {
        let effect1 = this.item().meta.tpRecoverEffect1 ? Number(this.item().meta.tpRecoverEffect1) : 0;
        let effect2 = this.item().meta.tpRecoverEffect2 ? Number(this.item().meta.tpRecoverEffect2) : 0;
        let value = (target.mtp * effect1 + effect2) * target.rec;
        if (this.isItem()) {
            value *= this.subject().pha;
        }
        value = Math.floor(value);
        if (value !== 0) {
            target.gainTp(value);
            this.makeSuccess(target);
        }
    } else {
        gbccoffee_tpasmp_gameaction_itemeffectgaintp.call(this, target, effect);
    }
};

(() => {
    const isDualWield = (item) => {
        // Check for dual-wield trait: slot type with trait code 55 and dataId 1
        return item.traits.some(trait => trait.code === 55 && trait.dataId === 1);
    };

    const _Game_Actor_equipSlots = Game_Actor.prototype.equipSlots;

    Game_Actor.prototype.equipSlots = function () {
        let slots = _Game_Actor_equipSlots.call(this);

        // Remove shield slot (etypeId 2) entirely
        slots = slots.filter(slot => slot !== 2);

        return slots;
    };

    // Overriding the method that handles equipment changes
    const _Game_Actor_changeEquip = Game_Actor.prototype.changeEquip;
Game_Actor.prototype.changeEquip = function(slotId, item) {
    // Initialize _equips if undefined
    if (!this._equips) this.initEquips([]);

    // Validate the slotId to prevent out-of-bounds errors
    if (slotId < 0 || slotId >= this._equips.length) {
        return;
    }

    // If the item is a weapon and not dual-wield
    if (item && DataManager.isWeapon(item) && !isDualWield(item)) {
        // Unequip and add back any current weapons in slots 0 and 1
        for (let i = 0; i < 2; i++) {
            if (this._equips[i] && this._equips[i].object()) {
                $gameParty.gainItem(this._equips[i].object(), 1);
                this._equips[i].setObject(null);
            }
        }
        
        // Remove the newly equipped item from the inventory
        $gameParty.loseItem(item, 1);
        
        // Equip the non-dual-wield weapon in slot 0
        if (this._equips[0]) {
            this._equips[0].setObject(item);
        }
        this.refresh(); // Refresh the actor's stats and UI
    } else {
        // Call the original function for dual-wield or other items
        return _Game_Actor_changeEquip.call(this, slotId, item);
    }
};



})();


