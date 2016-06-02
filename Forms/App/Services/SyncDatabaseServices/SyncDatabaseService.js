(function (moment) {
    "use strict";
    angular.module('Services')
    .service('LocalDatabaseService', ['$http', '$q', 'breeze', 'breezeservice', 'FormService', 'FormDetailsService', 'FormDetailsOptionsService', 'FormDetailsTypeService',
        function ($http, $q, breeze, breezeservice, FormService, FormDetailsService, FormDetailsOptionsService, FormDetailsTypeService) {
            var databaseVersion = "1.0";
            var lastSyncThresholdInMilliseconds = "600000"; //Time in milliseconds before doing another sync (10 minutes)
            var databaseName = "FormsDatabase";
            var database = new localStorageDB(databaseName, localStorage);
            var pageSize = 100;
            //TODO: Remove later
            database.drop(); database.commit();
            var database = new localStorageDB(databaseName, localStorage);
            //

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

            //TODO: Add ability to hide forms with data in them without deleting the data (IsActive field)
            this.SeedDatabase = function () {
                database.createTable("SystemSettings", ["Id", "DatabaseVersion", "LastSyncDateTime"]);
                database.insert("SystemSettings", { Id: "0", DatabaseVersion: databaseVersion, LastSyncDateTime: null });

                database.createTable("Form", ["Id", "Name", "Description", "PublishUrl", "UserId", "CreatedDateTime", "ModifiedDateTime", "SyncDateTime"]);
                database.createTable("FormDetails", ["Id", "FormId", "Name", "Description", "Title", "FormDetailsTypeId", "IsRequired", "UserId", "CreatedDateTime", "ModifiedDateTime", "SyncDateTime"]);
                database.createTable("FormDetailsOptions", ["Id", "Name", "FormDetailsId", "CreatedDateTime", "ModifiedDateTime", "SyncDateTime"]);
                database.createTable("FormDetailsType", ["Id", "Name", "CreatedDateTime", "ModifiedDateTime", "SyncDateTime"]);
                database.createTable("Value", ["Id", "FormId", "UserId", "Latitude", "Longitude", "IsSent", "IsDeleted", "CreatedDateTime", "ModifiedDateTime", "SyncDateTime"]);
                database.createTable("ValueDetails", ["Id", "ValueId", "FormDetailsId", "Value", "UserId", "IsSent", "IsDeleted", "CreatedDateTime", "ModifiedDateTime", "SyncDateTime"]);
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
                    this.SynchronizeFormDetailsOptions();
                    this.SynchronizeFormDetailsType();
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
                        database.insertOrUpdate("FormDetails", { Id: value.Id }, {
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
                        database.deleteRows("FormDetails", function (row) {
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
                FormDetailsOptionsService.Search(null, 0, pageSize, false).then(function (data) {
                    //Capture current time
                    var syncDateTime = moment();
                    //Update record in database
                    angular.forEach(data, function (value, key) {
                        database.insertOrUpdate("FormDetailsOptions", { Id: value.Id }, {
                            Id: value.Id,
                            Name: value.Name,
                            FormDetailsId: value.FormDetailsId,
                            CreatedDateTime: value.CreatedDateTime,
                            ModifiedDateTime: value.ModifiedDateTime,
                            SyncDateTime: syncDateTime
                        });
                        //Delete records not on the server from local database
                        database.deleteRows("FormDetailsOptions", function (row) {
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
            this.SynchronizeFormDetailsType = function () {
                FormDetailsTypeService.Search(null, 0, pageSize, false).then(function (data) {
                    //Capture current time
                    var syncDateTime = moment();
                    //Update record in database
                    angular.forEach(data, function (value, key) {
                        database.insertOrUpdate("FormDetailsType", { Id: value.Id }, {
                            Id: value.Id,
                            Name: value.Name,
                            CreatedDateTime: value.CreatedDateTime,
                            ModifiedDateTime: value.ModifiedDateTime,
                            SyncDateTime: syncDateTime
                        });
                        //Delete records not on the server from local database
                        database.deleteRows("FormDetailsType", function (row) {
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
            this.SynchronizeValue = function () {

            }

            //TODO:
            this.SynchronizeValueDetails = function () {

            }
        }]);
})(moment);


