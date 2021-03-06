/*
 * Copyright © 2017 Logistimo.
 *
 * This file is part of Logistimo.
 *
 * Logistimo software is a mobile & web platform for supply chain management and remote temperature monitoring in
 * low-resource settings, made available under the terms of the GNU Affero General Public License (AGPL).
 *
 * This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General
 * Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any
 * later version.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied
 * warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU Affero General Public License
 * for more details.
 *
 * You should have received a copy of the GNU Affero General Public License along with this program.  If not, see
 * <http://www.gnu.org/licenses/>.
 *
 * You can be released from the requirements of the license by purchasing a commercial license. To know more about
 * the commercial license, please contact us at opensource@logistimo.com
 */

var entityServices = angular.module('entityServices', []);
entityServices.factory('entityService', ['APIService', function (apiService) {
    return {
        get: function (entityId,skipAuthCheck) {
            var oParams = "";
            if (typeof(skipAuthCheck) !== 'undefined') {
                oParams += "?skipAuthCheck=" + skipAuthCheck;
            }
            return apiService.get('/s2/api/entities/entity/' + entityId + oParams);
        },
        getLinksCount: function (entityId,searchkey,linkedEntityId,entityTag) {
            var oParams = "";
            if(typeof searchkey !== 'undefined') {
                oParams += "?q=" + searchkey;
            }
            if(typeof linkedEntityId !== 'undefined') {
                oParams += (oParams == '' ? "?" : "&") + "linkedEntityId=" + linkedEntityId;
            }
            if(typeof entityTag !== 'undefined') {
                oParams += (oParams == '' ? "?" : "&") + "entityTag=" + entityTag;
            }
            return apiService.get('/s2/api/entities/entity/linkscount/' + entityId + oParams);
        },
        getCustomers: function (entityId,size,offset,searchkey,linkedEntityId,entityTag) {
            var oParams = "";
            if(typeof offset !== 'undefined'){
                oParams += "?offset=" + offset.toString();
            }
            if(typeof size !== 'undefined'){
                oParams += (oParams == '' ? "?" : "&") + "size=" + size.toString();
            }
            if(typeof searchkey !== 'undefined') {
                oParams += (oParams == '' ? "?" : "&") + "q=" + searchkey;
            }
            if(typeof linkedEntityId !== 'undefined') {
                oParams += (oParams == '' ? "?" : "&") + "linkedEntityId=" + linkedEntityId;
            }
            if(typeof entityTag !== 'undefined') {
                oParams += (oParams == '' ? "?" : "&") + "entityTag=" + entityTag;
            }
            return apiService.get('/s2/api/entities/entity/' + entityId + '/customers' + oParams);
        },
        getVendors: function (entityId,size,offset,searchKey,linkedEntityId,entityTag) {
            var oParams = "";
            if(typeof offset !== 'undefined'){
                oParams += "?offset=" + offset.toString();
            }
            if(typeof size !== 'undefined'){
                oParams += (oParams == '' ? "?" : "&") + "size=" + size.toString();
            }
            if(typeof searchKey !== 'undefined') {
                oParams += (oParams == '' ? "?" : "&") + "q=" + searchKey;
            }
            if(typeof linkedEntityId !== 'undefined') {
                oParams += (oParams == '' ? "?" : "&") + "linkedEntityId=" + linkedEntityId;
            }
            if(typeof entityTag !== 'undefined') {
                oParams += (oParams == '' ? "?" : "&") + "entityTag=" + entityTag;
            }

            return apiService.get('/s2/api/entities/entity/' + entityId + '/vendors' + oParams);
        },
        getAll: function (offset, size,tag, q, mt, excludedTag, linkedEntityId) {
            offset = typeof offset !== 'undefined' ? offset : 0;
            size = typeof size !== 'undefined' ? size : 50;
            var urlStr = "/s2/api/entities/?offset=" + offset + "&size=" + size;
            if (checkNotNullEmpty(tag)) {
                urlStr = urlStr + "&tag=" + tag;
            }else if(checkNotNullEmpty(excludedTag)){
                urlStr = urlStr + "&extag=" + excludedTag;
            }
            if (checkNotNullEmpty(q)) {
                urlStr = urlStr + "&q=" + q;
            }
            if(checkNotNullEmpty(mt)) {
                urlStr = urlStr + "&mt=" + mt;
            }
            if(checkNotNullEmpty(linkedEntityId)) {
                urlStr = urlStr + "&linkedEntityId=" + linkedEntityId;
            }
            return apiService.get(urlStr);
        },
        deleteEntities: function (entities) {
            return apiService.post("'" + entities + "'", '/s2/api/entities/delete/');
        },
        createEntity: function (entity) {
            return apiService.post(entity, '/s2/api/entities/');
        },
        update: function (entity) {
            return apiService.post(entity, "/s2/api/entities/update");
        },
        getFilteredEntity: function (text, sourceDomainOnly) {
            var urlStr = '/s2/api/entities/filter?text=' + text;
            if(checkNotNullEmpty(sourceDomainOnly)){
                urlStr += '&sdOnly=true';
            }
            return apiService.get(urlStr);
        },
        addRelation: function (relation) {
            return apiService.post(relation, "/s2/api/entities/addrelation");
        },
        addMaterials: function (materials, entityIds, overwrite) {
            return apiService.post({
                materials: materials,
                entityIds: entityIds,
                overwrite: overwrite
            }, "/s2/api/entities/materials/");
        },
        editMaterials: function (entityId, materials) {
            return apiService.post({"materials": materials}, "/s2/api/entities/" + entityId + "/materials/");
        },
        getMaterials: function (entityId, tag, offset, size) {
            offset = typeof offset !== 'undefined' ? offset : 0;
            size = typeof size !== 'undefined' ? size : 50;
            var urlStr = "/s2/api/entities/" + entityId + "/materials?offset=" + offset + "&size=" + size;
            if (checkNotNullEmpty(tag)) {
                urlStr = urlStr + "&tag=" + tag;
            }
            return apiService.get(urlStr);
        },
        getMaterialStats: function (entityId, tag, offset, size) {
            offset = typeof offset !== 'undefined' ? offset : 0;
            size = typeof size !== 'undefined' ? size : 50;
            var urlStr = "/s2/api/entities/" + entityId + "/materials/materialStats?offset=" + offset + "&size=" + size;
            if (checkNotNullEmpty(tag)) {
                urlStr = urlStr + "&tag=" + tag;
            }
            return apiService.get(urlStr);
        },
        removeMaterials: function (materials, entityIds) {
            return apiService.post({materials: materials, entityIds: entityIds}, "/s2/api/entities/materials/remove/");
        },
        updateEntityOrder: function (ordEntities, lt, eid, isRTAvailable) {
            return apiService.post({
                ordEntities: ordEntities,
                lt: lt,
                eid: eid,
                rta: isRTAvailable
            }, "/s2/api/entities/reorder");
        },
        updateEntityRelation: function (relationData) {
            return apiService.post(relationData, "/s2/api/entities/updaterelation");
        },
        updateManagedEntityOrder: function (ordEntities, uid, isRTAvailable) {
            return apiService.post({
                ordEntities: ordEntities,
                uid: uid,
                rta: isRTAvailable
            }, "/s2/api/entities/manreorder");
        },
        removeEntityRelation: function (linkIds) {
            return apiService.post(linkIds, "/s2/api/entities/deleteRelation");
        },
        getMonthlyUsageStats: function (entityId) {
            return apiService.get("/s2/api/entities/monthlyStats/" + entityId);
        },
        getUserEntities: function (userId,size,offset) {
            var oParams = "";
            if(typeof offset !== 'undefined'){
                oParams += "?offset=" + offset.toString();
            }
            if(typeof size !== 'undefined'){
                oParams += (oParams == '' ? "?" : "&") + "size=" + size.toString();
            }
            return apiService.get('/s2/api/entities/user/' + userId + oParams);
        },
        setPermission: function (per) {
            return apiService.post(per, '/s2/api/entities/permission');
        },
        getPermission: function (eid) {
            return apiService.get('/s2/api/entities/permission?eId=' + eid);
        },
        checkEntityAvailability: function (enm) {
            return apiService.get('/s2/api/entities/check/?enm=' + enm);
        },
        setStockBoardConfig: function(stockboard){
            return apiService.post(stockboard, '/s2/api/entities/stockboard');
        },
        getStockBoard: function(entityId){
            return apiService.get('/s2/api/entities/stockboard?entityId=' + entityId);
        },
        moveEntity: function(kids,did) {
            return apiService.post(null, '/s2/api/entities/move?kids=' + kids + '&dDid=' + did);
        },
        getDomainData: function(entityId) {
            return apiService.get('/s2/api/entities/domains?eId=' + entityId);
        },
        getFilteredDomains: function(entityId,text) {
            return apiService.get('/s2/api/entities/filterdomains?eId=' + entityId + '&text=' + text + '');
        },
        domainUpdate: function(entityIds,domainIds,type) {
            return apiService.post(null, '/s2/api/entities/domainupdate?eIds=' + entityIds + '&dIds=' + domainIds + '&type=' + type);
        },
        getDomainEntities: function(offset, size, tag, q) {
            offset = typeof offset !== 'undefined' ? offset : 0;
            size = typeof size !== 'undefined' ? size : 50;
            var urlStr = "/s2/api/entities/domain?offset=" + offset + "&size=" + size;
            if (checkNotNullEmpty(tag)) {
                urlStr = urlStr + "&tag=" + tag;
            }
            if (checkNotNullEmpty(q)) {
                urlStr = urlStr + "&q=" + q;
            }
            return apiService.get(urlStr);
        },
        getRelationship: function(entityId) {
            return apiService.get('/s2/api/entities/' + entityId + '/relationship');
        },
        getNetworkView: function(domainId) {
            return apiService.get('/s2/api/entities/networkview?domainId=' + domainId);
        },
        getLocationSuggestion: function (text, type, parentLocation) {
            var urlStr = '/s2/api/entities/location?text=' + text + '&type=' + type;
            if(checkNotNullEmpty(parentLocation)){
                urlStr += '&parentLoc='+JSON.stringify(parentLocation);
            }
            return apiService.get(urlStr);
        },
        setApprovers: function (data) {
            return apiService.post(data, '/s2/api/entities/approvers');
        },
        getApprovers: function(kioskId) {
            return apiService.get('/s2/api/entities/approvers?kioskId=' + kioskId);
        }
    }
}]);
