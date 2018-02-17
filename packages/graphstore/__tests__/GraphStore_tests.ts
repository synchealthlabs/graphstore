import { useStrict as MobxUseStrict, autorun, observable, extendObservable } from 'mobx';
import { GraphStoreMemory, GraphStoreFirebase, GraphStore, IFireDatabase } from '@besync/graphstore';
import { mockData } from '@besync/graphstore-test-mockdata';
import * as fs from 'fs';
import * as path from 'path';
import * as admin from 'firebase-admin';

MobxUseStrict(true);

var DatabaseCases: GraphStore[] = [];

// Firebase Setup
if (fs.existsSync(path.resolve(__dirname, '../../../../firebase.secrets.json'))) {
    var config = require('../../../../firebase.secrets.json');
    admin.initializeApp({ credential: admin.credential.cert(config), databaseURL: `https://${config.project_id}.firebaseio.com` });
    var fb = admin.database() as IFireDatabase;
    DatabaseCases.push(new GraphStoreFirebase(fb));
}

// In Memory Database Setup
DatabaseCases.push(new GraphStoreMemory(mockData()));

DatabaseCases.forEach((db) => {

    describe(db.constructor["name"], () => {

        it('should get item', done => {
            var keys = { userid: "google-Jk0wcm5svSaBAU6Doh5UlPqBrZj1:0" };
            var primaryKeys = ["userid"];
            var path = "analytics/users/google-Jk0wcm5svSaBAU6Doh5UlPqBrZj1:0";
            var model = observable(
                {
                    loading: true,
                    _deleted: false,
                    _source: 0,
                    _isDirty: false,
                    exists: false,
                    userid: null,
                    lastOpened: null
                }
            );
            var unsubscribe: () => void;
            autorun((r) => {
                if (!model.loading) {
                    expect(isFunction(unsubscribe)).toBe(true);
                    expect(model._deleted).toBe(false);
                    expect(model._source).toBe(0);
                    expect(model._isDirty).toBe(false);
                    expect(model.loading).toBe(false);
                    expect(model.lastOpened).toBe(1513704137);
                    expect(model.exists).toBe(true);
                    expect(model.userid).toBe("google-Jk0wcm5svSaBAU6Doh5UlPqBrZj1:0");
                    r.dispose();
                    unsubscribe();
                    done();
                }
            })

            unsubscribe = db.observeDocument(keys, path, primaryKeys, model);
        });


        it('should not find missing item', done => {

            var keys = { userid: "us-east-1:MISSING" };
            var primaryKeys = ["userid"];
            var path = "analytics/users/us-east-1:MISSING";
            var model = observable(
                {
                    loading: true,
                    _deleted: false,
                    _source: 0,
                    _isDirty: false,
                    exists: false,
                    lastOpened: null
                }
            );
            var unsubscribe: () => void;
            autorun((r) => {
                if (!model.loading) {
                    expect(isFunction(unsubscribe)).toBe(true);
                    expect(model._deleted).toBe(false);
                    expect(model._source).toBe(0);
                    expect(model._isDirty).toBe(false);
                    expect(model.loading).toBe(false);
                    expect(model.exists).toBe(false);
                    r.dispose();
                    unsubscribe();
                    done();
                }
            })

            unsubscribe = db.observeDocument(keys, path, primaryKeys, model);
        });

        it('should get collection of one item', done => {

            var keys = { userid: "google-Jk0wcm5svSaBAU6Doh5UlPqBrZj1:0" };
            var primaryKeys = ["userid", "id"];
            var path = "awesomeLinks/google-Jk0wcm5svSaBAU6Doh5UlPqBrZj1:0";
            var Model = function (item) {
                extendObservable(this, {
                    loading: true,
                    _deleted: false,
                    _source: 0,
                    _isDirty: false,
                    exists: false,
                    "id": item.id,
                    "created": item.created,
                    "lastViewed": item.lastViewed,
                    "link": item.link,
                    "name": item.name,
                    "type": item.type
                });
            }
            var modelCollection = observable.array([]);
            modelCollection["loading"] = true;
            var unsubscribe: () => void;
            autorun((r) => {
                var _ = modelCollection.length;
                if (!modelCollection["loading"]) {
                    expect(modelCollection.length).toBe(1);
                    var model = modelCollection[0];
                    expect(model._deleted).toBe(false);
                    expect(model._source).toBe(0);
                    expect(model._isDirty).toBe(false);
                    expect(model.loading).toBe(false);
                    expect(model.exists).toBe(true);
                    expect(model.id).toBe("-KvSbMLWe4jOphJBUo7N");
                    expect(model.created).toBe(1506956637.638);
                    expect(model.lastViewed).toBe(1506963118);
                    expect(model.link).toBe("https://github.com/besync/graphstore");
                    expect(model.name).toBe("Here's a link for a great repository");
                    expect(model.type).toBe("link");
                    r.dispose();
                    unsubscribe();
                    done();
                }
            })

            unsubscribe = db.observeCollection(keys, path, primaryKeys, modelCollection, Model)
        });

        it('should get collection of multiple item', done => {

            var keys = { userid: "google-Jk0wcm5svSaBAU6Doh5UlPqBrZj1:0" };
            var primaryKeys = ["userid", "id"];
            var path = "graphState/google-Jk0wcm5svSaBAU6Doh5UlPqBrZj1:0";
            var Model = function (item) {
                extendObservable(this, {
                    loading: true,
                    _deleted: false,
                    _source: 0,
                    _isDirty: false,
                    exists: false,
                    "userid": item.userid,
                    "id": item.id,
                    "encData": item.encData
                });
            }
            var modelCollection = observable.array([]);
            modelCollection["loading"] = true;
            var unsubscribe: () => void;
            autorun((r) => {
                var _ = modelCollection.length;
                if (!modelCollection["loading"]) {
                    expect(modelCollection.length >= 1 && modelCollection.length <= 2).toBe(true);
                    if (modelCollection.length == 2) {
                        var model = modelCollection[0];
                        expect(model._deleted).toBe(false);
                        expect(model._source).toBe(0);
                        expect(model._isDirty).toBe(false);
                        expect(model.loading).toBe(false);
                        expect(model.exists).toBe(true);
                        expect(model.userid).toBe("google-Jk0wcm5svSaBAU6Doh5UlPqBrZj1:0");
                        expect(model.id).toBe("WFG7110obuVK70l5hKUX");
                        expect(model.encData).toMatch("m9OeVCezNXActLlta27amI73h")
                        model = modelCollection[1];
                        expect(model._deleted).toBe(false);
                        expect(model._source).toBe(0);
                        expect(model._isDirty).toBe(false);
                        expect(model.loading).toBe(false);
                        expect(model.exists).toBe(true);
                        expect(model.userid).toBe("google-Jk0wcm5svSaBAU6Doh5UlPqBrZj1:0");
                        expect(model.id).toBe("urn:device:screensessiontracker");
                        expect(model.encData).toMatch("QZ6rFD9FbzCHf5CQt2qpFzmzI");
                        r.dispose();
                        unsubscribe();
                        done();
                    }
                }
            })

            unsubscribe = db.observeCollection(keys, path, primaryKeys, modelCollection, Model)
        });

        it('should get large collection of multiple items with multiple primary keys', done => {
            var keys = { userid_from: "google-Bk0ksad9asdadasdasdasdk0gggg:0" };
            var primaryKeys = ["userid_from", "userid_to", "id"];
            var path = "chats/google-Bk0ksad9asdadasdasdasdk0gggg:0";
            var Model = function (item) {
                extendObservable(this, {
                    loading: true,
                    _deleted: false,
                    _source: 0,
                    _isDirty: false,
                    exists: false,
                    "userid_from": item.userid_from,
                    "userid_to": item.userid_to,
                    "id": item.id,
                    "encData": item.encData,
                    "signature": item.signature
                });
            }
            var modelCollection = observable.array([]);
            modelCollection["loading"] = true;
            var unsubscribe: () => void;
            autorun((r) => {
                var _ = modelCollection.length;
                if (!modelCollection["loading"]) {
                    expect(modelCollection.length >= 1 && modelCollection.length <= 22).toBe(true);
                    if (modelCollection.length == 22) {
                        var model = modelCollection[0];
                        expect(model._deleted).toBe(false);
                        expect(model._source).toBe(0);
                        expect(model._isDirty).toBe(false);
                        expect(model.loading).toBe(false);
                        expect(model.exists).toBe(true);
                        expect(model.userid_from).toBe("google-Bk0ksad9asdadasdasdasdk0gggg:0");
                        expect(model.userid_to).toBe("google-Jk0wcm5svSaBAU6Doh5UlPqBrZj1:0");
                        expect(model.id).toBe("-KflG_KP98yDWN0z6DIM");
                        expect(model.encData).toMatch("X3JrEw7ppT5eV3ySDCGrV/YzH0ltbMIlsj;1")
                        expect(model.signature).toMatch("9FbzCHf5CQt2qpFzmzI0nL7OiCYd8Msdf")
                        model = modelCollection[4];
                        expect(model._deleted).toBe(false);
                        expect(model._source).toBe(0);
                        expect(model._isDirty).toBe(false);
                        expect(model.loading).toBe(false);
                        expect(model.exists).toBe(true);
                        expect(model.userid_from).toBe("google-Bk0ksad9asdadasdasdasdk0gggg:0");
                        expect(model.userid_to).toBe("google-Jk0wcm5svSaBAU6Doh5UlPqBrZj1:0");
                        expect(model.id).toBe("-KiIdo-XauJtJ-ew00VM");
                        expect(model.encData).toMatch("X3JrEw7ppT5eV3ySDCGrV/YzH0ltbMIlsj;5")
                        expect(model.signature).toMatch("9FbzCHf5CQt2qpFzmzI0nL7OiCYd8Msdf")
                        r.dispose();
                        unsubscribe();
                        done();
                    }
                }
            })

            unsubscribe = db.observeCollection(keys, path, primaryKeys, modelCollection, Model)
        });

        it('should get collection of items with JSON sub array and JSON sub object', done => {

            var keys = { userid: "google-Jk0wcm5svSaBAU6Doh5UlPqBrZj1:0" };
            var primaryKeys = ["userid", "id"];
            var path = "logs/google-Jk0wcm5svSaBAU6Doh5UlPqBrZj1:0";
            var Model = function (item) {
                extendObservable(this, {
                    loading: true,
                    _deleted: false,
                    _source: 0,
                    _isDirty: false,
                    exists: false,
                    "userid": item.userid,
                    "id": item.id,
                    "entries": item.entries,
                    "labels": item.labels
                });
            }
            var modelCollection = observable.array([]);
            modelCollection["loading"] = true;
            var unsubscribe: () => void;
            autorun((r) => {
                var _ = modelCollection.length;
                if (!modelCollection["loading"]) {
                    expect(modelCollection.length >= 1 && modelCollection.length <= 2).toBe(true);
                    if (modelCollection.length == 2) {
                        var model = modelCollection[0];
                        expect(model._deleted).toBe(false);
                        expect(model._source).toBe(0);
                        expect(model._isDirty).toBe(false);
                        expect(model.loading).toBe(false);
                        expect(model.exists).toBe(true);
                        expect(model.userid).toBe("google-Jk0wcm5svSaBAU6Doh5UlPqBrZj1:0");
                        expect(model.id).toBe("-L2MntzvsZ04jC9WV982");
                        expect(model.entries.length).toBe(2);
                        expect(model.entries[1].timestamp).toBe(1515449195.718174);
                        expect(model.entries[1].severity).toBe("NOTICE");
                        expect(model.entries[1].message).toMatch("Ping timer first started");
                        expect(model.labels.device).toBe("E62AD9DE-5814-4444-A212-AE928FD70558");
                        expect(model.labels.service).toBe("life.besync.graphstore.staging.ios");
                        model = modelCollection[1];
                        expect(model._deleted).toBe(false);
                        expect(model._source).toBe(0);
                        expect(model._isDirty).toBe(false);
                        expect(model.loading).toBe(false);
                        expect(model.exists).toBe(true);
                        expect(model.userid).toBe("google-Jk0wcm5svSaBAU6Doh5UlPqBrZj1:0");
                        expect(model.id).toBe("-L2MntzvsZ04jC9WV983");
                        expect(model.entries.length).toBe(2);
                        expect(model.entries[0].timestamp).toBe(1515449195.587967);
                        expect(model.entries[0].severity).toBe("DEBUG");
                        expect(model.entries[0].message).toMatch("Started up the server");
                        expect(model.labels.device).toBe("E62AD9DE-5814-4444-A212-AE928FD70558");
                        expect(model.labels.service).toBe("life.besync.graphstore.staging.ios");
                        r.dispose();
                        unsubscribe();
                        done();
                    }
                }
            })

            unsubscribe = db.observeCollection(keys, path, primaryKeys, modelCollection, Model)
        });

        it('should get item with object-based primary keys and item_value', done => {

            var keys = { orgid: "dunder-mifflin", userid: "google-Jk0wcm5svSaBAU6Doh5UlPqBrZj1:0", role_id: "consumer" };
            var primaryKeys = ["orgid", "userid", "role_id"];
            var path = "orgUsers/dunder-mifflin/google-Jk0wcm5svSaBAU6Doh5UlPqBrZj1:0/consumer";
            var Model = function (item) {
                extendObservable(this, {
                    loading: true,
                    _deleted: false,
                    _source: 0,
                    _isDirty: false,
                    exists: false,
                    "orgid": item.orgid,
                    "userid": item.userid,
                    "role_id": item.role_id,
                    "item_value": item.item_value
                });
            }
            var unsubscribe: () => void;
            var model = new Model({});
            autorun((r) => {
                if (!model["loading"]) {
                    expect(model._deleted).toBe(false);
                    expect(model._source).toBe(0);
                    expect(model._isDirty).toBe(false);
                    expect(model.loading).toBe(false);
                    expect(model.exists).toBe(true);
                    expect(model.orgid).toBe("dunder-mifflin");
                    expect(model.userid).toBe("google-Jk0wcm5svSaBAU6Doh5UlPqBrZj1:0");
                    expect(model.role_id).toBe("consumer");
                    expect(model.item_value).toBe(true);
                    r.dispose();
                    unsubscribe();
                    done();
                }
            })

            unsubscribe = db.observeDocument(keys, path, primaryKeys, model)
        });

        it('should get item collection with object-based primary keys and item_value', done => {

            var keys = { orgid: "dunder-mifflin", userid: "google-Jk0wcm5svSaBAU6Doh5UlPqBrZj1:0" };
            var primaryKeys = ["orgid", "userid", "role_id"];
            var path = "orgUsers/dunder-mifflin/google-Jk0wcm5svSaBAU6Doh5UlPqBrZj1:0";
            var Model = function (item) {
                extendObservable(this, {
                    loading: true,
                    _deleted: false,
                    _source: 0,
                    _isDirty: false,
                    exists: false,
                    "orgid": item.orgid,
                    "userid": item.userid,
                    "role_id": item.role_id,
                    "item_value": item.item_value
                });
            }
            var modelCollection = observable.array([]);
            modelCollection["loading"] = true;
            var unsubscribe: () => void;
            autorun((r) => {
                var _ = modelCollection.length;
                if (!modelCollection["loading"]) {
                    expect(modelCollection.length >= 1 && modelCollection.length <= 3).toBe(true);
                    if (modelCollection.length == 3) {
                        var model = modelCollection[0];
                        expect(model._deleted).toBe(false);
                        expect(model._source).toBe(0);
                        expect(model._isDirty).toBe(false);
                        expect(model.loading).toBe(false);
                        expect(model.exists).toBe(true);
                        expect(model.orgid).toBe("dunder-mifflin");
                        expect(model.userid).toBe("google-Jk0wcm5svSaBAU6Doh5UlPqBrZj1:0");
                        expect(model.role_id).toBe("admin");
                        expect(model.item_value).toBe(true);
                        model = modelCollection[1];
                        expect(model.role_id).toBe("consumer");
                        expect(model.item_value).toBe(true);
                        model = modelCollection[2];
                        expect(model.role_id).toBe("supervisor");
                        expect(model.item_value).toBe(true);
                        r.dispose();
                        unsubscribe();
                        done();
                        db.db.goOffline();
                    }
                }
            })

            unsubscribe = db.observeCollection(keys, path, primaryKeys, modelCollection, Model)
        });

    })
});

function isFunction(functionToCheck) {
    return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
}