(function (moment) {
    "use strict";
    angular.module('Services')
    .service('LocalDatabaseService', ['$http', '$q', 'breeze', 'breezeservice', 'FormService', 'FormDetailsService',
        function ($http, $q, breeze, breezeservice, FormService, FormDetailsService) {
            var databaseVersion = "1.0";
            var lastSyncThresholdInMilliseconds = "600000"; //Time in milliseconds before doing another sync (10 minutes)
            var databaseName = "FormsDatabase";
            var database = new localStorageDB(databaseName, localStorage);
            var pageSize = 100;
            //TODO: Remove later
            database.drop(); database.commit();
            var database = new localStorageDB(databaseName, localStorage);

            this.CreateDatabase = function () {
                if (database.isNew()) {
                    this.SeedDatabase();
                    this.Synchronize();
                }
                else {
                    var version = database.queryAll("SystemSettings");
                    if (version[0].DatabaseVersion !== databaseVersion) {
                        database.drop();
                        database.commit();
                        this.SeedDatabase();
                    }
                    else {
                        this.Synchronize();
                    }
                }
            }

            this.SeedDatabase = function () {
                database.createTable("SystemSettings", ["Id", "DatabaseVersion", "LastSyncDateTime"]);
                database.insert("SystemSettings", { Id: "0", DatabaseVersion: databaseVersion, LastSyncDateTime: null });

                database.createTable("Form", ["Id", "Name", "Description", "PublishUrl", "UserId", "CreatedDateTime", "ModifiedDateTime", "SyncDateTime"]);
                database.createTable("FormDetails", ["Id", "FormId", "Name", "Description", "Title", "FormDetailsTypeId", "IsRequired", "UserId", "CreatedDateTime", "ModifiedDateTime", "SyncDateTime"]);
                database.createTable("FormDetailsOptions", ["Id", "Name", "FormDetail", "SyncDateTime"]);
                database.createTable("FormDetailsType", ["Id", "Name", "SyncDateTime"]);
                database.createTable("Value", ["Id", "FormId", "UserId", "CreatedDateTime", "ModifiedDateTime", "Latitude", "Longitude", "IsSent", "SyncDateTime"]);
                database.createTable("ValueDetails", ["Id", "ValueId", "FormDetailsId", "Value", "UserId", "CreatedDateTime", "ModifiedDateTime", "IsSent", "SyncDateTime"]);
                database.commit();
            }

            this.IsTimeForSync = function () {
                var items = database.queryAll("SystemSettings", { query: function (row) { if (row.Id == "0") { return true; } else { return false; } }, limit: 1 });
                var item = items[0];
                if (item.LastSyncDateTime === null || Math.abs(item.LastSyncDateTime - new Date()) > lastSyncThresholdInMilliseconds) {
                    database.insertOrUpdate("SystemSettings", { Id: "0" }, {
                        Id: "0",
                        Version: databaseVersion,
                        LastSyncDateTime: new Date().toLocaleString()
                    });
                    database.commit();
                    return true;
                }
                return false;
            }

            this.Synchronize = function () {
                //Run via interval in background when app is open?
                if (this.IsTimeForSync()) {
                    //TODO: Notify globalscope variable somehow?
                    //TODO: Add all sync routines
                    debugger;
                    this.SynchronizeForm();
                    this.SynchronizeFormDetails();
                }
            }

            //TODO:
            this.SynchronizeForm = function () {
                FormService.Search(null, 0, pageSize, false).then(function (data) {
                    //Capture current time
                    var syncDateTime = moment();
                    //Update record in database
                    angular.forEach(data, function (value, key) {
                        database.insertOrUpdate("Form", { Id: value.Id }, {
                            Id: value.Id,
                            Name: value.Name,
                            Description: value.Description,
                            PublishUrl: value.PublishUrl,
                            UserId: value.UserId,
                            CreatedDateTime: value.CreatedDateTime,
                            ModifiedDateTime: value.ModifiedDateTime,
                            SyncDateTime: syncDateTime
                        });
                        //Delete records not on the server from local database
                        database.deleteRows("Form", function (row) {
                            if (row.SyncDateTime == null || row.SyncDateTime < syncDateTime) {
                                return true;
                            } else {
                                return false;
                            }
                        });
                        database.commit()
                    });
                });
            }

            //TODO:
            this.SynchronizeFormDetails = function () {
                FormDetailsService.Search(null, 0, pageSize, false).then(function (data) {
                    //Capture current time
                    var syncDateTime = moment();
                    //Update record in database
                    angular.forEach(data, function (value, key) {
                        database.insertOrUpdate("Form", { Id: value.Id }, {
                            Id: value.Id,
                            FormId: value.FormId,
                            Name: value.Name,
                            Description: value.Description,
                            Title: value.Title,
                            FormDetailsTypeId: value.FormDetailsTypeId,
                            IsRequired: value.IsRequired,
                            UserId: value.UserId,
                            CreatedDateTime: value.CreatedDateTime,
                            ModifiedDateTime: value.ModifiedDateTime,
                            SyncDateTime: syncDateTime
                        });
                        //Delete records not on the server from local database
                        database.deleteRows("Form", function (row) {
                            if (row.SyncDateTime == null || row.SyncDateTime < syncDateTime) {
                                return true;
                            } else {
                                return false;
                            }
                        });
                        database.commit()
                    });
                });
            }

            //TODO:
            this.SynchronizeFormDetailsOptions = function () {

            }

            //TODO:
            this.SynchronizeFormDetailsType = function () {

            }

            //TODO:
            this.SynchronizeValue = function () {

            }

            //TODO:
            this.SynchronizeValueDetails = function () {

            }
        }]);
})(moment);


