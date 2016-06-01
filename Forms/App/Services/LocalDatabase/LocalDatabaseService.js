
var databaseVersion = "1.0";
function LocalDatabaseService() {
}

LocalDatabaseService.prototype.CreateDatabase = function () {
    var database = new localStorageDB("FormsDatabase", localStorage);
    if (database.isNew()) {
        this.SeedDatabase();
    }
    else {
        var version = database.queryAll("Version");
        if (version[0].Id !== databaseVersion) {
            database.drop();
            database.commit();
            this.SeedDatabase();
        }
        else {
            //TODO: Synchronize?
        }
    }
}

LocalDatabaseService.prototype.SeedDatabase = function () {
    var database = new localStorageDB("FormsDatabase", localStorage);
    database.createTable("Version", ["Id"]);
    database.insert("Version", databaseVersion);
    database.createTable("Form", ["Id","Name","Description","PublishUrl","UserId","CreatedDateTime","ModifiedDateTime"]);
    database.commit();
}

LocalDatabaseService.prototype.Synchronize = function () {
    //Run via interval in background when app is open?
}