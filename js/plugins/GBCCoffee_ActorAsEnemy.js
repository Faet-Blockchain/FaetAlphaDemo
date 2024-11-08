/*:
 * @url https://coffeenahc.itch.io/
 * @target MZ
 * @author coffeenahc
 * @plugindesc Created by coffee_chan of Fiverr on comission of Faet Studios.
 */

Object.defineProperty(Game_Enemy.prototype, "level", {
    get: function() {
    return this._level;
    },
 configurable: true
});

let gbccoffee_animatedenemies_battlemanager_updateeventmain = BattleManager.updateEventMain;
BattleManager.updateEventMain = function() {
    $gameTroop.requestMotionRefresh();
    return gbccoffee_animatedenemies_battlemanager_updateeventmain.call(this);
};

let gbccoffee_actorasenemy_gameaction_setenemyaction = Game_Action.prototype.setEnemyAction;
Game_Action.prototype.setEnemyAction = function(action) {
    if (this.subject()._enemyActor) {
        if (action.skillId == 1){
            action.skillId = this.subject()._enemyActor.attackSkillId();
        }
    }
    gbccoffee_actorasenemy_gameaction_setenemyaction.call(this, action);
};

Game_Troop.prototype.requestMotionRefresh = function() {
    for (const enemy of this.members()) {
        // Only refresh motions for enemies that are "actor as enemies"
        if (enemy.isEnemyActor()) {
            enemy.requestMotionRefresh();
        }
    }
};


Game_Troop.prototype.setup = function(troopId) {
    this.clear();
    this._troopId = troopId;
    this._enemies = [];
    for (const member of this.troop().members) {
        let dataEnemy = $dataEnemies[member.enemyId];
        if (dataEnemy) {
            const enemyId = member.enemyId;
            const x = member.x;
            const y = member.y;
            let enemy = null;
            // Check if the enemy has <useActor> metadata
            if (dataEnemy.meta.useActor) {
                enemy = new Game_EnemyActor(enemyId, x, y);
                enemy.setActor($gameActors.actor(parseInt(dataEnemy.meta.useActor)));
            } else {
                // Create a regular Game_Enemy if <useActor> is not defined
                enemy = new Game_Enemy(enemyId, x, y);
            }
            if (member.hidden) {
                enemy.hide();
            }
            this._enemies.push(enemy);
        }
    }
    this.makeUniqueNames();
};


function Game_EnemyActor() {
    this.initialize(...arguments);
}

Game_EnemyActor.prototype = Object.create(Game_Enemy.prototype);
Game_EnemyActor.prototype.constructor = Game_EnemyActor;

Game_EnemyActor.prototype.initialize = function(enemyId, x, y) {
    Game_Battler.prototype.initialize.call(this);
    this.setup(enemyId, x, y);
};

Game_EnemyActor.prototype.performAction = function(action) {
    Game_Battler.prototype.performAction.call(this, action);
    if (action.isAttack()) {
        this.performAttack();
    } else if (action.isGuard()) {
        this.requestMotion("guard");
    } else if (action.isMagicSkill()) {
        this.requestMotion("spell");
    } else if (action.isSkill()) {
        this.requestMotion("skill");
    } else if (action.isItem()) {
        this.requestMotion("item");
    }
};

Game_EnemyActor.prototype.performAttack = function() {
    const weapons = this._enemyActor.weapons();
    const wtypeId = weapons[0] ? weapons[0].wtypeId : 0;
    const attackMotion = $dataSystem.attackMotions[wtypeId];
    if (attackMotion) {
        if (attackMotion.type === 0) {
            this.requestMotion("thrust");
        } else if (attackMotion.type === 1) {
            this.requestMotion("swing");
        } else if (attackMotion.type === 2) {
            this.requestMotion("missile");
        }
        this.startWeaponAnimation(attackMotion.weaponImageId);
    }
};

Game_EnemyActor.prototype.performDamage = function() {
    Game_Battler.prototype.performDamage.call(this);
    if (this.isSpriteVisible()) {
        console.log("request motion damage");
        this.requestMotion("damage");
    } else {
        $gameScreen.startShake(5, 5, 10);
    }
    SoundManager.playEnemyDamage();
    this.requestEffect("blink");
};

Game_EnemyActor.prototype.performEvasion = function() {
    Game_Battler.prototype.performEvasion.call(this);
    this.requestMotion("evade");
};

Game_EnemyActor.prototype.performMagicEvasion = function() {
    Game_Battler.prototype.performMagicEvasion.call(this);
    this.requestMotion("evade");
};

Game_EnemyActor.prototype.setActor = function(actor) {
    this._enemyActor = actor;
};

Game_EnemyActor.prototype.isEnemyActor = function() {
    return this._enemyActor != null;
};

Game_Enemy.prototype.isEnemyActor = function() {
    return false;
};

Game_EnemyActor.prototype.traitObjects = function() {
    if (!this.isEnemyActor()) return Game_Enemy.prototype.traitObjects.call(this);
    return this._enemyActor.traitObjects().concat(this.states());
};

Game_EnemyActor.prototype.paramBase = function(paramId) {
    if (!this.isEnemyActor()) return Game_Enemy.prototype.paramBase.call(this, paramId);
    return this._enemyActor.paramBase(paramId);
};

Game_EnemyActor.prototype.paramPlus = function(paramId) {
    if (!this.isEnemyActor()) return Game_Enemy.prototype.paramPlus.call(this,paramId);
    return this._enemyActor.paramPlus(paramId);
};

Game_EnemyActor.prototype.originalName = function() {
    if (!this.isEnemyActor()) return Game_Enemy.prototype.originalName.call(this);
    return this._enemyActor.name();
};

Spriteset_Battle.prototype.createEnemies = function() {
    const enemies = $gameTroop.members();
    const sprites = [];
    for (const enemy of enemies) {
        // Check if the enemy is an "actor as enemy" or a regular enemy
        if (enemy.isEnemyActor()) {
            sprites.push(new Sprite_EnemyActor(enemy));
        } else {
            sprites.push(new Sprite_Enemy(enemy));
        }
    }
    sprites.sort(this.compareEnemySprite.bind(this));
    for (const sprite of sprites) {
        this._battleField.addChild(sprite);
    }
    this._enemySprites = sprites;
};


function Sprite_EnemyActor() {
    this.initialize(...arguments);
}

Sprite_EnemyActor.prototype = Object.create(Sprite_Actor.prototype);
Sprite_EnemyActor.prototype.constructor = Sprite_EnemyActor;

Sprite_EnemyActor.prototype.initialize = function(battler) {
    Sprite_Battler.prototype.initialize.call(this, battler);
    this.moveToStartPosition();
};

Sprite_EnemyActor.prototype.moveToStartPosition = function() {};

Sprite_EnemyActor.prototype.setActorHome = function(index) {
    this.setHome(this._battler.screenX(), this._battler.screenY());
};

Sprite_EnemyActor.prototype.initMembers = function() {
    Sprite_Actor.prototype.initMembers.call(this);
    this._mainSprite.scale.set(-1,1);
    this._shadowSprite.scale.set(-1,1);
    this._weaponSprite.scale.set(-1,1);
    this._stateSprite.scale.set(-1,1);
};

Sprite_EnemyActor.prototype.setBattler = function(battler) {
    Sprite_Battler.prototype.setBattler.call(this, battler);
    if (battler !== this._actor) {
        this._actor = battler;
        if (battler) {
            this.setActorHome();
        } else {
            this._mainSprite.bitmap = null;
            this._battlerName = "";
        }
        this.startEntryMotion();
        this._stateSprite.setup(battler);
    }
};

Sprite_EnemyActor.prototype.updateBitmap = function() {
    Sprite_Battler.prototype.updateBitmap.call(this);
    const name = this._actor._enemyActor.battlerName();
    if (this._battlerName !== name) {
        this._battlerName = name;
        this._mainSprite.bitmap = ImageManager.loadSvActor(name);
    }
};

Sprite_EnemyActor.prototype.stepForward = function() {
    this.startMove(48, 0, 12);
};