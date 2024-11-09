/*:
 * @url https://coffeenahc.itch.io/
 * @target MZ
 * @author coffeenahc
 * @plugindesc Created by coffee_chan of Fiverr on comission of Faet Studios.
 * 
 * @param startRange
 * @type number
 * @text Start Range
 * @desc The starting token ID for the range to query.
 * @default 0
 *
 * @param endRange
 * @type number
 * @text End Range
 * @desc The ending token ID for the range to query (exclusive).
 * @default 1000
 * 
 * @param nftContractAddress
 * @type text
 * @text NFT Contract Address
 * @desc Contract address of the NFT
 */

var GBCCoffee = GBCCoffee || {};
GBCCoffee.FaetGame = {
    minTokenId: parseInt(PluginManager.parameters("GBCCoffee_FaetPlugin")["startRange"]),
    maxTokenId: parseInt(PluginManager.parameters("GBCCoffee_FaetPlugin")["endRange"]),
    nftContractAddress: PluginManager.parameters("GBCCoffee_FaetPlugin")["nftContractAddress"],
};
var FaetGame = GBCCoffee.FaetGame;

let gbccoffee_faetplugin_input_shouldpreventdefault = Input._shouldPreventDefault;
Input._shouldPreventDefault = function(keyCode) {
    const formContainer = document.querySelector('.form-container');
    if (formContainer.style.display == "block") {
        switch (keyCode) {
            case 9: // tab
            case 33: // pageup
            case 34: // pagedown
                return true;
        }
        return false;
    } else {
        return gbccoffee_faetplugin_input_shouldpreventdefault.call(this, keyCode);
    }
};

let gbccoffee_faetplugin_datamanager_creategameobjects = DataManager.createGameObjects;
DataManager.createGameObjects = function() {
    gbccoffee_faetplugin_datamanager_creategameobjects.call(this);
    $gameNftActors = new Game_NFTActors();
};

let gbccoffee_faetplugin_datamanager_makesavecontents = DataManager.makeSaveContents;
DataManager.makeSaveContents = function() {
    let contents = gbccoffee_faetplugin_datamanager_makesavecontents.call(this);
    contents.nftActors = $gameNftActors;
    return contents;
};

let gbccoffee_faetplugin_datamanager_extractsavecontents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function(contents) {
    gbccoffee_faetplugin_datamanager_extractsavecontents.call(this, contents);
    $gameNftActors = contents.nftActors;
};

let gbccoffee_faetplugin_imagemanager_loadbitmap = ImageManager.loadBitmap;
ImageManager.loadBitmap = function(folder, filename) {
    if (filename.includes("https://")) {
        return this.loadBitmapFromUrl(filename);
    } else if (filename.includes("ipfs://")) {
        filename = filename.replace("ipfs://", "https://gateway.pinata.cloud/ipfs/");
        return this.loadBitmapFromUrl(filename);
    } else {
        return gbccoffee_faetplugin_imagemanager_loadbitmap.call(this, folder, filename);
    }
};

Game_Action.prototype.setSubject = function(subject) {
    if (subject.isActor()) {
        this._subjectTokenId = subject._tokenId != null ? subject.tokenId() : subject.actorId();
        this._isSubjectNft = subject._tokenId != null;
        this._subjectEnemyIndex = -1;
    } else {
        this._subjectEnemyIndex = subject.index();
        this._subjectTokenId = -1;
    }
};

Game_Action.prototype.subject = function() {
    if (this._subjectTokenId >= 0) {
        if (this._isSubjectNft) {
            return $gameNftActors.actor(this._subjectTokenId);
        } else {
            return $gameActors.actor(this._subjectTokenId);
        }
    } else {
        return $gameTroop.members()[this._subjectEnemyIndex];
    }
};

Game_Action.prototype.updateLastSubject = function() {
    const subject = this.subject();
    if (subject.isActor()) {
        $gameTemp.setLastSubjectActorId(subject._tokenId != null ? subject.tokenId() : subject.actorId());
    } else {
        $gameTemp.setLastSubjectEnemyIndex(subject.index() + 1);
    }
};

Game_Action.prototype.updateLastTarget = function(target) {
    if (target.isActor()) {
        $gameTemp.setLastTargetActorId(target._tokenId != null ? target.tokenId() : target.actorId());
    } else {
        $gameTemp.setLastTargetEnemyIndex(target.index() + 1);
    }
};

Game_Party.prototype.setupStartingMembers = function() {
    this._actors = ["D1"];
    this._nonNftActors = [$gameActors.actor(1)];
    this.retrieveNfts();
};

Game_Party.prototype.removeInvalidMembers = function() {
    this._nftActors = [];
    this._isRetrievingNfts = true;

    this.validateNftCount(FaetGame.minTokenId, FaetGame.maxTokenId)
        .then(() => GBCCoffee.Metamask.getOwnedNFTsPromise("", FaetGame.nftContractAddress, FaetGame.minTokenId, FaetGame.maxTokenId))
        .then((result) => {
            console.log("Found NFT token IDs: " + result);
            result.forEach(tokenId => {
                let nftActor = $gameNftActors.actor(tokenId);
                this._nftActors.push(nftActor);
            });

            this._actors = this._actors.filter(tokenId => result.includes(tokenId) || tokenId === null);
            console.log(`Remaining valid actors: ${this._actors}`);
            
            this._isRetrievingNfts = false;
            $gamePlayer.refresh();
        })
        .catch((error) => {
            console.error("Error during removeInvalidMembers:", error);
            this._isRetrievingNfts = false;
        });
};

Game_Party.prototype.retrieveNfts = function() {
    console.log("RETRIEVING NFTS...");
    this._nftActors = [];
    this._isRetrievingNfts = true;

    this.validateNftCount(FaetGame.minTokenId, FaetGame.maxTokenId)
        .then(() => GBCCoffee.Metamask.getOwnedNFTsPromise("", FaetGame.nftContractAddress, FaetGame.minTokenId, FaetGame.maxTokenId))
        .then((result) => {
            console.log("Retrieved NFT token IDs: " + result);
            result.forEach(tokenId => {
                let nftActor = $gameNftActors.actor(tokenId);
                this._nftActors.push(nftActor);
            });

            this._isRetrievingNfts = false;
        })
        .catch((error) => {
            console.error("Error during retrieveNfts:", error);
            this._isRetrievingNfts = false;
        });
};


Game_Party.prototype.validateNftCount = function (minTokenId, maxTokenId) {
    console.log("VALIDATING NFT COUNT...");
    this._isValidatingNfts = true;

    return new Promise(async (resolve) => {
        for (let tokenId = minTokenId; tokenId <= maxTokenId; tokenId++) {
            try {
                await GBCCoffee.Metamask.getOwnedNFTsPromise("", FaetGame.nftContractAddress, tokenId, tokenId);
                console.log(`Token ID ${tokenId} exists.`);
            } catch (error) {
                console.warn(`Token ID ${tokenId} validation failed or does not exist. Stopping validation.`);
                
                // Adjust maxTokenId and stop the loop
                FaetGame.maxTokenId = tokenId - 1;
                break;
            }
        }

        this._isValidatingNfts = false;
        console.log(`Validation complete. Final maxTokenId: ${FaetGame.maxTokenId}`);
        resolve();
    });
};





Game_Party.prototype.isRetrievingNfts = function() {
    return this._isRetrievingNfts;
};

Game_Party.prototype.isRetrievingNftMetadatas = function() {
    return this._nftActors.some(nftActor => !nftActor.hasRetrievedNftMetadata());
};

Game_Party.prototype.setMenuActor = function(menuActor) {
    this._menuActor = menuActor;
};

Game_Party.prototype.menuActor = function() {
    return this._menuActor || this.members()[0];
};

Game_Party.prototype.setTargetActor = function(actor) {
    this._targetActor = actor;
};

Game_Party.prototype.targetActor = function() {
    return this._targetActor || this.members()[0];
};

Game_Party.prototype.allMembers = function() {
    return this._actors.filter(id => id != null).map(id => {
        if (!Number.isInteger(id) && id.includes("D")) {
            return $gameActors.actor(parseInt(id.substring(1)));
        } else {
            return $gameNftActors.actor(id);
        }
    })
};

function Game_NFTActors() {
    this.initialize(...arguments);
}

Game_NFTActors.prototype.initialize = function() {
    this._data = [];
};

Game_NFTActors.prototype.actor = function(tokenId) {
    if (!this._data[tokenId]) {
        this._data[tokenId] = new Game_NFTActor(tokenId);
    }
    return this._data[tokenId];
};

function Game_NFTActor() {
    this.initialize(...arguments);
};

Game_NFTActor.prototype = Object.create(Game_Actor.prototype);
Game_NFTActor.prototype.constructor = Game_NFTActor;

Object.defineProperty(Game_NFTActor.prototype, "level", {
    get: function() {
        return this._level;
    },
    configurable: true
});

Game_NFTActor.prototype.initialize = function(tokenId) {
    Game_Battler.prototype.initialize.call(this);
    this._hasRetrievedNftMetadata = false;
    this._failedToGetMetadata = false;
    this._isRetrievingMetadata = false;
    this._retriesBeforeTimeout = 5;
    this._retryCount = 0;
    this.setup(tokenId);
};

Game_NFTActor.prototype.setup = function(tokenId) {
    if (this._isRetrievingMetadata) return;
    this._isRetrievingMetadata = true;
    GBCCoffee.Metamask.getTokenMetadataPromise(FaetGame.nftContractAddress, tokenId).then((result) => {
        this._tokenId = tokenId;
        this._metadata = result;
        this._actorData = result.actorData;
        this._actorId = tokenId;
        this._name = result.actorData.name
        this._nickname = result.actorData.nickname;
        this._profile = result.actorData.profile;
        this._classId = result.actorData.classId;
        this._level = result.actorData.initialLevel;
        this._characterName = result.actorData.characterName;
        this._characterIndex = result.actorData.characterIndex;
        this._faceName = result.actorData.faceName;
        this._faceIndex = result.actorData.faceIndex;
        this._battlerName = result.actorData.battlerName;
        this.initExp();
        this.initSkills();
        this.initEquips(result.equips ? result.equips : [0,0,0,0,0]);
        this.clearParamPlus();
        this.recoverAll();
        this._hasRetrievedNftMetadata = true;
        this._isRetrievingMetadata = false;
        this._retryCount = 0;
        console.log(`Retrieved metadata for token ${tokenId}.`);
    }).catch(error => {
        this._isRetrievingMetadata = false;
        console.error(`Failed to get metadata for token id ${tokenId}. ${error.message}`);
        if (this._retryCount < this._retriesBeforeTimeout) {
            this._retryCount++;
            console.error(`Fetching metadata again for ${tokenId}. Retry count: ${this._retryCount}.`);
            this.setup();
        } else {
            console.error(`Max retry count for fetching metadata for token id ${tokenId} reached.`);
            this._failedToGetMetadata = true;
        }
    });
};

Game_NFTActor.prototype.hasRetrievedNftMetadata = function() {
    return this._hasRetrievedNftMetadata;
};

Game_NFTActor.prototype.tokenId = function() {
    return this._tokenId;
};

Game_NFTActor.prototype.actor = function() {
    return this._actorData;
};

Bitmap.prototype._startLoading = function() {
    this._image = new Image();
    this._image.crossOrigin = "anonymous";
    this._image.onload = this._onLoad.bind(this);
    this._image.onerror = this._onError.bind(this);
    this._destroyCanvas();
    this._loadingState = "loading";
    this._image.src = this._url;
    if (this._image.complete && this._image.width > 0) {
        this._image.onload = null;
        this._onLoad();
    }
};

let gbccoffee_faetplugin_scenemenu_createcommandwindow = Scene_Menu.prototype.createCommandWindow;
Scene_Menu.prototype.createCommandWindow = function() {
    gbccoffee_faetplugin_scenemenu_createcommandwindow.call(this);
    this._commandWindow.setHandler("swapTeam", this.commandSwapTeam.bind(this));
    this._commandWindow.setHandler("playerProfile", this.commandPlayerProfile.bind(this));
    this._commandWindow.setHandler("sendTransaction", this.commandSendTransaction.bind(this));
};

Scene_Menu.prototype.commandSwapTeam = function() {
    SceneManager.push(Scene_TeamSwap);
};

Scene_Menu.prototype.commandPlayerProfile = function() {
    SceneManager.push(Scene_PlayerProfile);
};

Scene_Menu.prototype.commandSendTransaction = function() {
    SceneManager.push(Scene_SendTransaction);
};

Window_MenuStatus.prototype.processOk = function() {
    Window_StatusBase.prototype.processOk.call(this);
    const actor = this.actor(this.index());
    $gameParty.setMenuActor(actor);
};

Window_MenuCommand.prototype.addFormationCommand = function() {};

let gbccoffee_faetplugin_windowmenucommand_addoriginalcommands = Window_MenuCommand.prototype.addOriginalCommands;
Window_MenuCommand.prototype.addOriginalCommands = function() {
    gbccoffee_faetplugin_windowmenucommand_addoriginalcommands.call(this);
    this.addCommand("Swap Team", "swapTeam", true);
    this.addCommand("Player Profile", "playerProfile", true);
    this.addCommand("Send Transaction", "sendTransaction", true);
};

function Scene_TeamSwap() {
    this.initialize(...arguments);
}

Scene_TeamSwap.prototype = Object.create(Scene_MenuBase.prototype);
Scene_TeamSwap.prototype.constructor = Scene_TeamSwap;

Scene_TeamSwap.prototype.initialize = function() {
    Scene_MenuBase.prototype.initialize.call(this);
};

Scene_TeamSwap.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
    this.createAllWindows();
};

Scene_TeamSwap.prototype.createAllWindows = function() {
    this.createCommandWindow();
    this.createTeamWindow();
    this.createNftListWindow();
};

Scene_TeamSwap.prototype.createCommandWindow = function() {
    this._commandWindow = new Window_TeamSwapCommand(this.commandWindowRect());
    this._commandWindow.setHandler("swap", this.commandSwap.bind(this));
    this._commandWindow.setHandler("refreshNfts", this.commandRefreshNfts.bind(this));
    this._commandWindow.setHandler("cancel", this.commandCancel.bind(this));
    this.addWindow(this._commandWindow);
};

Scene_TeamSwap.prototype.commandWindowRect = function() {
    let x = 0;
    let y = this.mainAreaTop();
    let ww = Graphics.boxWidth;
    let wh = this.calcWindowHeight(1, true);
    return new Rectangle(x,y,ww,wh);
};

Scene_TeamSwap.prototype.commandSwap = function() {
    if ($gameParty.isRetrievingNfts() || $gameParty.isRetrievingNftMetadatas()) {
        this._commandWindow.activate();
        return;
    }
    this._teamWindow.activate();
    this._teamWindow.select(0);
};

Scene_TeamSwap.prototype.commandRefreshNfts = function() {
    this._commandWindow.activate();
    if ($gameParty.isRetrievingNfts() || $gameParty.isRetrievingNftMetadatas()) {
        console.log("commandRefreshNfts failed due to reason: Already retrieving NFT or metadata.")
        return;
    }
    $gameParty.retrieveNfts();
    this._listWindow.setDueForReload(true);
};

Scene_TeamSwap.prototype.commandCancel = function() {
    SceneManager.pop();
};

Scene_TeamSwap.prototype.createTeamWindow = function() {
    this._teamWindow = new Window_ActiveTeam(this.teamWindowRect());
    this._teamWindow.setHandler("ok", this.onTeamOk.bind(this));
    this._teamWindow.setHandler("cancel", this.onTeamCancel.bind(this));
    this.addWindow(this._teamWindow);
};

Scene_TeamSwap.prototype.teamWindowRect = function() {
    let x = 0;
    let y = this.commandWindowRect().y + this.commandWindowRect().height;
    let ww = Graphics.boxWidth;
    let wh = 200;
    return new Rectangle(x,y,ww,wh);
};

Scene_TeamSwap.prototype.onTeamOk = function() {
    this._listWindow.activate();
    this._listWindow.select(0);
};

Scene_TeamSwap.prototype.onTeamCancel = function() {
    this._commandWindow.activate();
    this._commandWindow.reselect();
    this._teamWindow.deselect();
};

Scene_TeamSwap.prototype.createNftListWindow = function() {
    this._listWindow = new Window_NftList(this.listWindowRect(), true);
    this._listWindow.setHandler("ok", this.onListOk.bind(this));
    this._listWindow.setHandler("cancel", this.onListCancel.bind(this));
    if ($gameParty.isRetrievingNfts() || $gameParty.isRetrievingNftMetadatas()) {
        this._listWindow.setDueForReload(true);
    } else {
        this._listWindow.setup();
    }
    this.addWindow(this._listWindow);
};

Scene_TeamSwap.prototype.listWindowRect = function() {
    let x = 0;
    let y = this.teamWindowRect().y + this.teamWindowRect().height;
    let ww = Graphics.boxWidth;
    let wh = Graphics.boxHeight - this.mainAreaTop() - this.commandWindowRect().height - this.teamWindowRect().height;
    return new Rectangle(x,y,ww,wh);
};

Scene_TeamSwap.prototype.onListOk = function() {
    let index = this._teamWindow._index; // The currently selected slot in the active team
    let item = this._listWindow.item();  // The selected NFT or non-NFT actor from the list

    if (item == "remove") {
        $gameParty._actors[index] = null; // Remove the actor from the slot
    } else {
        let existingIndex = item._tokenId != null 
            ? $gameParty._actors.indexOf(item.tokenId()) 
            : $gameParty._actors.indexOf("D" + item.actorId());

        // If this actor is already in another slot, swap them
        if (existingIndex >= 0) {
            $gameParty._actors[existingIndex] = $gameParty._actors[index];
        }
        // Assign the selected NFT/non-NFT actor to the chosen slot
        $gameParty._actors[index] = item._tokenId != null 
            ? item.tokenId() 
            : "D" + item.actorId();
    }

    SoundManager.playEquip();
    this._teamWindow.refresh();  // Refresh the team display
    $gamePlayer.refresh();       // Refresh the player display

    // Move to the next slot automatically
    this._teamWindow.select((index + 1) % this._teamWindow.maxItems());
    this._listWindow.activate(); // Return focus to the NFT list
};


Scene_TeamSwap.prototype.onListCancel = function() {
    this._teamWindow.activate();
    this._teamWindow.reselect();
    this._listWindow.scrollTo(0,0);
    this._listWindow.deselect();
};

function Window_TeamSwapCommand() {
    this.initialize(...arguments);
}

Window_TeamSwapCommand.prototype = Object.create(Window_HorzCommand.prototype);
Window_TeamSwapCommand.prototype.constructor = Window_TeamSwapCommand;

Window_TeamSwapCommand.prototype.initialize = function(rect) {
    Window_HorzCommand.prototype.initialize.call(this, rect);
};

Window_TeamSwapCommand.prototype.maxCols = function() {
    return 2;
};

Window_TeamSwapCommand.prototype.makeCommandList = function() {
    this.addCommand("Swap", "swap");
    this.addCommand("Refresh NFTs", "refreshNfts");
};

function Window_ActiveTeam() {
    this.initialize(...arguments);
}

Window_ActiveTeam.prototype = Object.create(Window_Selectable.prototype);
Window_ActiveTeam.prototype.constructor = Window_ActiveTeam;

Window_ActiveTeam.prototype.initialize = function(rect) {
    Window_Selectable.prototype.initialize.call(this, rect);
    this._list = [];
    this._clientArea.removeChild(this._cursorSprite);
    this._clientArea.addChild(this._cursorSprite);
    this.refresh();
};

Window_ActiveTeam.prototype.itemRect = function(index) {
    let rect = Window_Selectable.prototype.itemRect.call(this, index);
    rect.y += 30;
    rect.height -= 30;
    return rect;
};

Window_ActiveTeam.prototype.drawAllItems = function() {
    Window_Selectable.prototype.drawAllItems.call(this);
    this.contents.fillRect(0,0,this.innerWidth,30,"rgba(0,0,0,0.4)");
    this.drawText("Active Team", 0,-2,this.innerWidth, "center");
};

Window_ActiveTeam.prototype.refresh = function() {
    this._list = $gameParty._actors;
    Window_Selectable.prototype.refresh.call(this);
};

Window_ActiveTeam.prototype.maxCols = function() {
    return 4;
};

Window_ActiveTeam.prototype.itemHeight = function() {
    return this.innerHeight;
};

Window_ActiveTeam.prototype.maxItems = function() {
    return 4;
};

Window_ActiveTeam.prototype.drawItem = function(index) {
    const item = this.item(index);
    const rect = this.itemRect(index);
    if (item) {
        if (this.isNft(item)) {
            const metadata = item._metadata;
            if (metadata) {
                if (metadata.image) {
                    const bitmap = ImageManager.loadBitmap(null, item._metadata.image);
                    bitmap.addLoadListener(() => {
                        const aspectBitmap = bitmap.width / bitmap.height;
                        const aspectRect = rect.width / rect.height;
        
                        let sw, sh, sx = 0, sy = 0;
        
                        if (aspectBitmap > aspectRect) {
                            sh = bitmap.height;
                            sw = sh * aspectRect;
                            sx = (bitmap.width - sw) / 2;
                        } else {
                            sw = bitmap.width;
                            sh = sw / aspectRect;
                            sy = (bitmap.height - sh) / 2;
                        }
        
                        this.contents.blt(bitmap, sx, sy, sw, sh, rect.x, rect.y, rect.width, rect.height);
                        this.contents.fillRect(rect.x, rect.y, rect.width, 30, "rgba(0,0,0,0.3)");
                        this.changeTextColor(ColorManager.normalColor());
                        this.drawText(metadata.name, rect.x, rect.y - 5, rect.width, "center");
                        this.changeTextColor(ColorManager.systemColor());
                        this.drawText(`Slot ${index + 1}`, rect.x, (rect.y + rect.height) - 30, rect.width, "center");
                    });
                } else {
                    this.contents.fillRect(rect.x, rect.y, rect.width, 35, rgba(0,0,0,0.3));
                    this.changeTextColor(ColorManager.normalColor());
                    this.drawText(metadata.name, rect.x, rect.y - 5, rect.width, "center");
                    this.changeTextColor(ColorManager.systemColor());
                    this.drawText(`Slot ${index + 1}`, rect.x, (rect.y + rect.height) - 30, rect.width, "center");
                }
            }
        } else {
            const bitmap = ImageManager.loadPicture("Actor"+item._actorId);
            bitmap.addLoadListener(() => {
                const aspectBitmap = bitmap.width / bitmap.height;
                const aspectRect = rect.width / rect.height;

                let sw, sh, sx = 0, sy = 0;

                if (aspectBitmap > aspectRect) {
                    sh = bitmap.height;
                    sw = sh * aspectRect;
                    sx = (bitmap.width - sw) / 2;
                } else {
                    sw = bitmap.width;
                    sh = sw / aspectRect;
                    sy = (bitmap.height - sh) / 2;
                }

                this.contents.blt(bitmap, sx, sy, sw, sh, rect.x, rect.y, rect.width, rect.height);
                this.contents.fillRect(rect.x, rect.y, rect.width, 30, "rgba(0,0,0,0.3)");
                this.changeTextColor(ColorManager.normalColor());
                this.drawText(item._name, rect.x, rect.y - 5, rect.width, "center");
                this.changeTextColor(ColorManager.systemColor());
                this.drawText(`Slot ${index + 1}`, rect.x, (rect.y + rect.height) - 30, rect.width, "center");
            });
        }
    } else {
        this.changeTextColor(ColorManager.systemColor());
        this.drawText(`Slot ${index + 1}`, rect.x, (rect.y + rect.height) - 30, rect.width, "center");
    }
};

Window_ActiveTeam.prototype.item = function(index) {
    const actorId = this._list[index];
    if (actorId != null) {
        return !Number.isInteger(actorId) && actorId.includes("D") ? $gameActors.actor(parseInt(actorId.substring(1))) : $gameNftActors.actor(actorId);
    } 
    return null;
};

Window_ActiveTeam.prototype.isNft = function(item) {
    return item._tokenId != null;
};

Window_ActiveTeam.prototype.resetFontSettings = function() {
    this.contents.fontFace = $gameSystem.mainFontFace();
    this.contents.fontSize = $gameSystem.mainFontSize() * 0.7;
    this.resetTextColor();
};


Window_ActiveTeam.prototype.updatePadding = function() {
    this.padding = 8;
};

function Window_NftList() {
    this.initialize(...arguments);
};

Window_NftList.prototype = Object.create(Window_Selectable.prototype);
Window_NftList.prototype.constructor = Window_NftList;

Window_NftList.prototype.initialize = function(rect, selectable) {
    Window_Selectable.prototype.initialize.call(this, rect);
    if (selectable) {
        this._list = ["remove"];
    } else {
        this._list = [];
    }
    this._selectable = selectable;
    this._isDueForReload = false;
};

Window_NftList.prototype.update = function() {
    Window_Selectable.prototype.update.call(this);
    if (this._isDueForReload) {
        if (!$gameParty.isRetrievingNfts() && !$gameParty.isRetrievingNftMetadatas()) {
            this.setup();
            this._isDueForReload = false;
        }
    }
};

Window_NftList.prototype.setup = function() {
    if (this._selectable) {
        this._list = ["remove", ...$gameParty._nonNftActors, ...$gameParty._nftActors];
    } else {
        this._list = [...$gameParty._nonNftActors, ...$gameParty._nftActors];
    }
    this.refresh();
};

Window_NftList.prototype.setDueForReload = function(bool) {
    this._isDueForReload = bool;
};

Window_NftList.prototype.item = function() {
    return this._list[this._index];
};

Window_NftList.prototype.maxCols = function() {
    return 2;
};

Window_NftList.prototype.itemHeight = function() {
    return 200;
};

Window_NftList.prototype.maxItems = function() {
    return this._list.length;
};

Window_NftList.prototype.drawItem = function(index) {
    const item = this._list[index];
    const rect = this.itemRect(index);
    console.log(item == "remove");
    if (item == "remove") {
        this.contents.fontSize = $gameSystem.mainFontSize();
        this.drawText("Remove actor", rect.x, rect.y + (rect.height / 2) - (this.contents.fontSize / 2), rect.width, "center");
    } else {
        if (this.isNft(item)) {
            const metadata = item._metadata;
            if (metadata.image) {
                const bitmap = ImageManager.loadBitmap(null, item._metadata.image);
                bitmap.addLoadListener(() => {
                    this.contents.blt(bitmap, 0, 0, bitmap.width, bitmap.height, rect.x, rect.y, 200, rect.height);
                    this.contents.fillRect(rect.x + 200, rect.y, rect.width - 200, 35, "rgba(0,0,0,0.3)");
                    this.contents.fontSize = $gameSystem.mainFontSize();
                    this.drawText(metadata.name, rect.x + 200, rect.y, rect.width - 200, "center");
                    this.contents.fontSize = $gameSystem.mainFontSize() * 0.5;
                    this.drawText("Class: " + $dataClasses[metadata.classId].name, rect.x + 200 + 20, rect.y + 40, rect.width - 200 - 40, "left");
                    this.drawText("Description: " + metadata.description, rect.x + 200 + 20, rect.y + 70, rect.width - 200 - 40, "left");
                });
            } else {
                this.contents.fillRect(rect.x, rect.y, rect.width, 35, rgba(0,0,0,0.3));
                this.contents.fontSize = $gameSystem.mainFontSize();
                this.drawText(metadata.name, rect.x, rect.y, rect.width, "center");
                this.contents.fontSize = $gameSystem.mainFontSize() * 0.5;
                this.drawText("Class: " + $dataClasses[metadata.classId].name, rect.x + 20, rect.y + 40, rect.width - 40, "left");
                this.drawText("Description: " + metadata.description, rect.x + 20, rect.y + 70, rect.width - 40, "left");
            }
        } else {
            const bitmap = ImageManager.loadPicture("Actor"+item._actorId);
            bitmap.addLoadListener(() => {
                this.contents.blt(bitmap, 0, 0, bitmap.width, bitmap.height, rect.x, rect.y, 200, rect.height);
                this.contents.fillRect(rect.x + 200, rect.y, rect.width - 200, 35, "rgba(0,0,0,0.3)");
                this.contents.fontSize = $gameSystem.mainFontSize();
                this.drawText(item._name, rect.x + 200, rect.y, rect.width - 200, "center");
                this.contents.fontSize = $gameSystem.mainFontSize() * 0.5;
                this.drawText("Class: " + $dataClasses[item._classId].name, rect.x + 200 + 20, rect.y + 40, rect.width - 200 - 40, "left");
                this.drawText("Description: " + item._profile, rect.x + 200 + 20, rect.y + 70, rect.width - 200 - 40, "left");
            });
        }
    }
};

Window_NftList.prototype.isNft = function(item) {
    return item._tokenId != null;
};

function Scene_PlayerProfile() {
    this.initialize(...arguments);
}

Scene_PlayerProfile.prototype = Object.create(Scene_MenuBase.prototype);
Scene_PlayerProfile.prototype.constructor = Scene_PlayerProfile;

Scene_PlayerProfile.prototype.initialize = function() {
    Scene_MenuBase.prototype.initialize.call(this);
};

Scene_PlayerProfile.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
    this.createAllWindows();
};

Scene_PlayerProfile.prototype.createAllWindows = function() {
    this.createProfileWindow();
    this.createTeamWindow();
    this.createNftListWindow();
};

Scene_PlayerProfile.prototype.createProfileWindow = function() {
    this._profileWindow = new Window_Profile(this.profileWindowRect());
    this._profileWindow.setHandler("cancel", this.commandCancel.bind(this));
    this.addWindow(this._profileWindow);
};

Scene_PlayerProfile.prototype.commandCancel = function() {
    SceneManager.pop();
};

Scene_PlayerProfile.prototype.profileWindowRect = function() {
    let x = 0;
    let y = this.mainAreaTop();
    let ww = Graphics.boxWidth;
    let wh = this.calcWindowHeight(1, true);
    return new Rectangle(x,y,ww,wh);
};

Scene_PlayerProfile.prototype.createTeamWindow = function() {
    this._teamWindow = new Window_ActiveTeam(this.teamWindowRect());
    this.addWindow(this._teamWindow);
};

Scene_PlayerProfile.prototype.teamWindowRect = function() {
    let x = 0;
    let y = this.profileWindowRect().y + this.profileWindowRect().height;
    let ww = Graphics.boxWidth;
    let wh = 200;
    return new Rectangle(x,y,ww,wh);
};

Scene_PlayerProfile.prototype.createNftListWindow = function() {
    this._listWindow = new Window_NftList(this.listWindowRect());
    if ($gameParty.isRetrievingNfts() || $gameParty.isRetrievingNftMetadatas()) {
        this._listWindow.setDueForReload(true);
    } else {
        this._listWindow.setup();
    }
    this.addWindow(this._listWindow);
};

Scene_PlayerProfile.prototype.listWindowRect = function() {
    let x = 0;
    let y = this.teamWindowRect().y + this.teamWindowRect().height;
    let ww = Graphics.boxWidth;
    let wh = Graphics.boxHeight - this.mainAreaTop() - this.profileWindowRect().height - this.teamWindowRect().height;
    return new Rectangle(x,y,ww,wh);
};

function Window_Profile() {
    this.initialize(...arguments);
}

Window_Profile.prototype = Object.create(Window_Selectable.prototype);
Window_Profile.prototype.constructor = Window_Profile;

Window_Profile.prototype.initialize = function(rect) {
    Window_Selectable.prototype.initialize.call(this, rect);
    this._walletAddress = "";
    this._tokenBalance = "";
    this.activate();
    this.setup();
    this.createClipboardSprite()
};

Window_Profile.prototype.createClipboardSprite = function() {
    this._clipboardSprite = new Sprite_Clickable();
    this._clipboardSprite.position.set(this.innerWidth * 0.45, 30);
    this._clipboardSprite.onClick = () => {
        navigator.clipboard.writeText(this._walletAddress).then(() => {
            console.log("Wallet address copied to clipboard:", this._walletAddress);
        }).catch(err => {
            console.error("Failed to copy text: ", err);
        });
    };
    this._clipboardSprite.bitmap = ImageManager.loadSystem("CopyIcon");
    this.addChild(this._clipboardSprite);
};

Window_Profile.prototype.refresh = function() {
    this.contents.clear();
    this.changeTextColor(ColorManager.systemColor());
    this.drawText("Your Wallet Address: ", 0, -5, this.innerWidth * 0.5, "left");
    this.drawText("Your LSK Balance: ", this.innerWidth * 0.6, -5, this.innerWidth * 0.4, "left");
    this.changeTextColor(ColorManager.normalColor());
    this.drawText(this._walletAddress, 0, 15, this.innerWidth * 0.5, "left");
    this.drawText(this._tokenBalance, this.innerWidth * 0.6, 15, this.innerWidth * 0.4, "left");
};

Window_Profile.prototype.setup = function() {
    GBCCoffee.Metamask.getTokenBalancePromise("", "0x8a21CF9Ba08Ae709D64Cb25AfAA951183EC9FF6D").then((result) => {
        console.log(result);
        this._tokenBalance = (result / 1000000000000000000) + " LSK";
        this.refresh();
    }).catch(error => {
        this._tokenBalance = "0 LSK";
        console.error(error);
    });

    GBCCoffee.Metamask.getCurrentAddressPromise().then((result) => {
        console.log(result);
        this._walletAddress = result;
    }).catch(error => {
        this._walletAddress = "";
        console.error(error);
    });
};

Window_Profile.prototype.resetFontSettings = function() {
    this.contents.fontFace = $gameSystem.mainFontFace();
    this.contents.fontSize = $gameSystem.mainFontSize() * 0.6;
    this.resetTextColor();
};

function Scene_SendTransaction() {
    this.initialize(...arguments);
}

Scene_SendTransaction.prototype = Object.create(Scene_MenuBase.prototype);
Scene_SendTransaction.prototype.constructor = Scene_SendTransaction;

Scene_SendTransaction.prototype.initialize = function() {
    Scene_MenuBase.prototype.initialize.call(this);
    this.toggleForm(true);
    this.initSelectListener();
};

Scene_SendTransaction.prototype.initSelectListener = function() {
    const assetTypeSelect = document.getElementById('assetType');
    assetTypeSelect.addEventListener('change', this.handleAssetTypeChanged);
    assetTypeSelect.dispatchEvent(new Event('change'));
};

Scene_SendTransaction.prototype.removeSelectListener = function() {
    const assetTypeSelect = document.getElementById('assetType');
    assetTypeSelect.removeEventListener('change', this.handleAssetTypeChange);
};

Scene_SendTransaction.prototype.handleAssetTypeChanged = function() {
    const assetType = document.getElementById('assetType').value;
    const tokenAddressField = document.getElementById('tokenAddress');
    const tokenIdField = document.getElementById('tokenId');

    if (assetType === 'eth') {
        tokenAddressField.disabled = true;
        tokenIdField.disabled = true;
    } else if (assetType === 'erc20') {
        tokenAddressField.disabled = false;
        tokenIdField.disabled = true;
    } else if (assetType === 'erc721' || assetType === 'erc1155') {
        tokenAddressField.disabled = false;
        tokenIdField.disabled = false;
    }
};

Scene_SendTransaction.prototype.toggleForm = function(bool) {
    const formContainer = document.querySelector('.form-container');
    if (formContainer) {
        if (bool) {
            formContainer.style.display = 'block';
        } else {
            formContainer.style.display = 'none';
        }
    }
};

Scene_SendTransaction.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
    this.createTransactionWindow();
};

Scene_SendTransaction.prototype.createTransactionWindow = function() {
    this._transactionWindow = new Window_SendTransaction(this.transactionWindowRect());
    this._transactionWindow.setHandler("ok", this.onTransactionOk.bind(this));
    this._transactionWindow.setHandler("cancel", this.popScene.bind(this));
    this._transactionWindow.activate();
    this.addWindow(this._transactionWindow);
};

Scene_SendTransaction.prototype.onTransactionOk = function() {
    const form = document.getElementById('transferForm');
    const assetType = form.querySelector('#assetType').value;
    const amount = form.querySelector('#amount').value;
    const tokenAddress = form.querySelector('#tokenAddress').value;
    const tokenId = form.querySelector('#tokenId').value;
    const receivingAddress = form.querySelector('#receivingAddress').value;

    switch (assetType) {
        case "eth":
            GBCCoffee.Metamask.transferEthPromise(receivingAddress, amount).then(result => {
                console.log("Transfer eth successful");
                console.log(result);
                this._transactionWindow.activate();
                this.clearFormValues();
            }).catch(error => {
                console.log("Transfer eth error");
                console.log(error);
                this._transactionWindow.activate();
            });
            break;
        case "erc20":
            GBCCoffee.Metamask.transferErc20Promise(receivingAddress, amount, tokenAddress).then(result => {
                console.log("Transfer erc20 successful");
                console.log(result);
                this._transactionWindow.activate();
                this.clearFormValues();
            }).catch(error => {
                console.log("Transfer erc20 error");
                console.log(error);
                this._transactionWindow.activate();
            });
            break;
        case "erc721":
            GBCCoffee.Metamask.transferErc721Promise(receivingAddress, tokenId, tokenAddress).then(result => {
                console.log("Transfer erc721 successful");
                console.log(result);
                this._transactionWindow.activate();
                this.clearFormValues();
                $gameParty.removeInvalidMembers();
            }).catch(error => {
                console.log("Transfer erc721 error");
                console.log(error);
                this._transactionWindow.activate();
            });
            break;
        case "erc1155":
            GBCCoffee.Metamask.transferErc1155Promise(receivingAddress, tokenId, amount, tokenAddress).then(result => {
                console.log("Transfer erc1155 successful");
                console.log(result);
                this._transactionWindow.activate();
                this.clearFormValues();
            }).catch(error => {
                console.log("Transfer erc1155 error");
                console.log(error);
                this._transactionWindow.activate();
            });
            break;
    }
};

Scene_SendTransaction.prototype.clearFormValues = function() {
    form.querySelector('#amount').value = '';
    form.querySelector('#tokenAddress').value = '';
    form.querySelector('#tokenId').value = '';
    form.querySelector('#receivingAddress').value = '';
};

Scene_SendTransaction.prototype.popScene = function() {
    this.removeSelectListener();
    this.toggleForm(false);
    SceneManager.pop();
};

Scene_SendTransaction.prototype.transactionWindowRect = function() {
    let ww = 450;
    let wh = 500;
    let x = (Graphics.boxWidth - ww) / 2;
    let y = ((Graphics.boxHeight - 530) / 2) + 20;
    return new Rectangle(x,y,ww,wh);
};

function Window_SendTransaction() {
    this.initialize(...arguments);
}

Window_SendTransaction.prototype = Object.create(Window_Selectable.prototype);
Window_SendTransaction.prototype.constructor = Window_SendTransaction;

Window_SendTransaction.prototype.initialize = function(rect) {
    Window_Selectable.prototype.initialize.call(this, rect);
    this._list = ["Send Transaction"];
    this.refresh();
};

Window_SendTransaction.prototype.itemRect = function(index) {
    let rect = Window_Selectable.prototype.itemRect.call(this, index);
    rect.height = 50;
    rect.y = this.height - rect.height - 40;
    return rect;
};

Window_SendTransaction.prototype.maxItems = function() {
    return 1;
};

Window_SendTransaction.prototype.drawItem = function(index) {
    let rect = this.itemRect(index);
    this.drawText("Send Transaction", rect.x, rect.y + 5, rect.width, "center");
};

Window_SendTransaction.prototype.drawAllItems = function() {
    Window_Selectable.prototype.drawAllItems.call(this);
    this.drawText("Asset Type", 10, 0, this.innerWidth - 10, "left");
    this.drawText("Amount", 10, 80, this.innerWidth - 10, "left");
    this.drawText("Token Contract Address", 10, 160, this.innerWidth - 10, "left");
    this.drawText("Token ID", 10, 240, this.innerWidth - 10, "left");
    this.drawText("Receiving Address", 10, 320, this.innerWidth - 10, "left");
};
