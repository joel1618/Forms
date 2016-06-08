var database = new localStorageDB("FormsDatabase", localStorage);
(function (moment) {
    "use strict";
    angular.module('Services')
    .service('LocalDatabaseService', ['$http', '$q', 'breeze', 'breezeservice', 'FormService', 'FormDetailsService',
        'FormDetailsOptionsService', 'FormDetailsTypeService', 'ValueService', 'ValueDetailsService', 'ValueCacheService', 'ValueDetailsCacheService',
        function ($http, $q, breeze, breezeservice, FormService, FormDetailsService, FormDetailsOptionsService, FormDetailsTypeService, ValueService, ValueDetailsService, ValueCacheService, ValueDetailsCacheService) {
            var databaseVersion = "1.0";
            //TODO: Increase this number
            var lastSyncThresholdInSeconds = "10"; //Time in seconds before doing another sync (10 minutes)
            var pageSize = 100;
            //TODO: Remove later
            //database.drop(); database.commit();
            //var database = new localStorageDB(databaseName, localStorage);
            //

            this.CreateDatabase = function () {
                if (database.isNew() || !database.tableExists("SystemSettings")) {
                    this.SeedDatabase();
                    this.Synchronize();
                }
                else {
                    var version = database.queryAll("SystemSettings");
                    if (version[0].DatabaseVersion !== databaseVersion) {
                        debugger;
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
                database.createTable("SystemSettings", ["Id", "DatabaseVersion", "LastSyncDateTime", "IsSyncing", "LastValueId"]);
                database.insert("SystemSettings", { Id: "0", DatabaseVersion: databaseVersion, LastSyncDateTime: null, IsSyncing: false, LastValueId: null });

                database.createTable("Form", ["Id", "Name", "Description", "PublishUrl", "UserId", "IsActive", "CreatedDateTime", "ModifiedDateTime", "SyncDateTime"]);
                database.createTable("FormDetails", ["Id", "FormId", "Name", "Description", "Title", "FormDetailsTypeId", "IsRequired", "UserId", "IsActive", "CreatedDateTime", "ModifiedDateTime", "SyncDateTime"]);
                database.createTable("FormDetailsOptions", ["Id", "Name", "FormDetailsId", "CreatedDateTime", "ModifiedDateTime", "SyncDateTime"]);
                database.createTable("FormDetailsType", ["Id", "Name", "CreatedDateTime", "ModifiedDateTime", "SyncDateTime"]);
                database.createTable("Value", ["Id", "ReferenceId", "FormId", "UserId", "Latitude", "Longitude", "IsSent", "IsDeleted", "CreatedDateTime", "ModifiedDateTime", "SyncDateTime"]);
                database.createTable("ValueDetails", ["Id", "ReferenceId", "ValueId", "FormDetailsId", "Value", "UserId", "IsSent", "IsDeleted", "CreatedDateTime", "ModifiedDateTime", "SyncDateTime"]);
                database.commit();
            }

            this.IsTimeForSync = function () {
                var items = database.queryAll("SystemSettings", { query: function (row) { if (row.Id == "0") { return true; } else { return false; } }, limit: 1 });
                var item = items[0];
                var duration = moment.duration(moment(moment().format("MM/DD/YYYY HH:mm:ss"), "MM/DD/YYYY HH:mm:ss").diff(moment(item.LastSyncDateTime, "MM/DD/YYYY HH:mm:ss")));
                var difference = duration.asSeconds();

                if (item.LastSyncDateTime === null || difference >= lastSyncThresholdInSeconds) {
                    database.insertOrUpdate("SystemSettings", { Id: "0" }, {
                        Id: "0",
                        Version: databaseVersion,
                        LastSyncDateTime: moment().format("MM/DD/YYYY HH:mm:ss")
                    });
                    database.commit();
                    return true;
                }
                return false;
            }

            this.Synchronize = function () {
                //Run via $interval in background when app is open?
                //TODO: Check if internet accessible
                if (this.IsTimeForSync()) {
                    //TODO: Notify globalscope variable somehow?
                    database.insertOrUpdate("SystemSettings", { Id: "0" }, { Id: "0", IsSyncing: true });
                    this.SynchronizeForm();
                    this.SynchronizeFormDetails();
                    this.SynchronizeFormDetailsOptions();
                    this.SynchronizeFormDetailsType();
                    this.SynchronizeValue();
                }
                database.insertOrUpdate("SystemSettings", { Id: "0" }, { Id: "0", IsSyncing: false });
            }

            this.SynchronizeForm = function () {
                FormService.Search(null, 0, pageSize, false).then(function (data) {

                    //Capture current time
                    var syncDateTime = moment().format("MM/DD/YYYY HH:mm:ss");
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
                    });

                    //Delete records not on the server from local database
                    database.deleteRows("Form", function (row) {
                        if (row.SyncDateTime == null || row.SyncDateTime < syncDateTime) {
                            return true;
                        } else {
                            return false;
                        }
                    });
                    database.commit();
                });
            }

            this.SynchronizeFormDetails = function () {
                FormDetailsService.Search(null, 0, pageSize, false).then(function (data) {
                    //Capture current time
                    var syncDateTime = moment().format("MM/DD/YYYY HH:mm:ss");
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
                    });
                    //Delete records not on the server from local database
                    database.deleteRows("FormDetails", function (row) {
                        if (row.SyncDateTime == null || row.SyncDateTime < syncDateTime) {
                            return true;
                        } else {
                            return false;
                        }
                    });
                    database.commit();
                });
            }

            this.SynchronizeFormDetailsOptions = function () {
                FormDetailsOptionsService.Search(null, 0, pageSize, false).then(function (data) {
                    //Capture current time
                    var syncDateTime = moment().format("MM/DD/YYYY HH:mm:ss");
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
                    });
                    //Delete records not on the server from local database
                    database.deleteRows("FormDetailsOptions", function (row) {
                        if (row.SyncDateTime == null || row.SyncDateTime < syncDateTime) {
                            return true;
                        } else {
                            return false;
                        }
                    });
                    database.commit();
                });
            }

            this.SynchronizeFormDetailsType = function () {
                FormDetailsTypeService.Search(null, 0, pageSize, false).then(function (data) {
                    //Capture current time
                    var syncDateTime = moment().format("MM/DD/YYYY HH:mm:ss");
                    //Update record in database
                    angular.forEach(data, function (value, key) {
                        database.insertOrUpdate("FormDetailsType", { Id: value.Id }, {
                            Id: value.Id,
                            Name: value.Name,
                            CreatedDateTime: value.CreatedDateTime,
                            ModifiedDateTime: value.ModifiedDateTime,
                            SyncDateTime: syncDateTime
                        });
                    });
                    //Delete records not on the server from local database
                    database.deleteRows("FormDetailsType", function (row) {
                        if (row.SyncDateTime == null || row.SyncDateTime < syncDateTime) {
                            return true;
                        } else {
                            return false;
                        }
                    });
                    database.commit();
                });
            }

            //TODO: Chain the header to the detail
            this.SynchronizeValue = function () {
                var predicate = function (row) { if (row.IsSent === false && row.IsDeleted === false) { return true; } else { return false; } };
                ValueCacheService.Search(predicate, 0, 100, false).then(function (items) {
                    angular.forEach(items, function (value, key) {
                        ValueService.Create(value).then(function (item) {
                            debugger;
                            database.insertOrUpdate("Value", { Id: item.data.Id }, {
                                IsSent: true
                            });
                            //Set the detail rows ValueId FK to the PK that came back from the server.
                            predicate = function (row) { if (row.ValueId === value.Id && row.IsSent === false && row.IsDeleted === false) { return true; } else { return false; } };
                            ValueDetailsCacheService.Search(predicate, 0, 100, false).then(function (items) {
                                angular.forEach(items, function (value, key) {
                                    ValueDetailsService.Create(value).then(function (data) {
                                        database.insertOrUpdate("ValueDetails", { Id: data.data.Id }, {
                                            IsSent: true
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
                database.commit();
                //Handle deletes
            }
        }]);
})(moment);


