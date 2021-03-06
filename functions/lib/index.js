"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GeoFire = require('geofire');
const functions = require("firebase-functions");
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
const geoFire = new GeoFire(admin.database().ref(`/items`));
exports.AddItemLocation = functions.firestore.document('/items/{itemid}')
    .onCreate(event => {
    const location = event.data().location;
    return geoFire.set(event.id, [location.latitude, location.longitude]);
});
exports.UpdateItemLocation = functions.firestore.document('/items/{itemid}')
    .onUpdate(event => {
    const location = event.after.data().location;
    return geoFire.set(event.after.id, [location.latitude, location.longitude]);
});
exports.RemoveItemLocation = functions.firestore.document('/items/{itemid}')
    .onDelete(event => {
    return geoFire.remove(event.id);
});
//# sourceMappingURL=index.js.map