/* See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * Esri Inc. licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
define([
    "dojo/_base/declare",
    "dojo/_base/lang",
    "dojo/_base/array",
    "dojo/dom-construct",
    "dojox/html/entities",
    "dijit/Dialog",
    "dijit/_TemplatedMixin",
    "dijit/_WidgetsInTemplateMixin",
    "dojo/i18n!app/nls/resources",
    "dojo/text!./templates/ItemData.html"
], function (declare, lang, array, domConstruct, entities, Dialog, TemplatedMixin, _WidgetsInTemplateMixin, i18n, template) {
    return declare("app.management.panels.customColumn", [Dialog, TemplatedMixin, _WidgetsInTemplateMixin], {
        templateString: template,
        i18n: i18n,
        
        postCreate: function() {
          this.inherited(arguments);
          array.filter(Object.keys(this.item), function(key) { return key.indexOf("src_")==0})
               .filter(function(key) { return !key.indexOf("src_source_")==0 && !key.indexOf("src_uri_")==0  && !key.indexOf("src_task_ref_")==0})
               .map(lang.hitch(this, function(key) {return {key: key, value: this.item[key]}}))
               .filter(function(kvp) {return kvp.value!=null && (typeof kvp.value == "string"? kvp.value.trim().length>0: true)})
               .map(function(kvp) { return {key: kvp.key.replace(/^src_/g, "").replace(/_[^_]+$/gi,"").replace(/_+/gi," "), value: kvp.value}})
               .forEach(lang.hitch(this, function(kvp){
                  this._appendData(kvp.key, kvp.value);
               }));
        },
        
        _appendData: function(name, value) {
          var row = domConstruct.create("tr", null, this.table);
          domConstruct.create("td", {innerHTML: entities.encode(""+name)}, row);
          domConstruct.create("td", {innerHTML: entities.encode(""+value)}, row);
        }
    });
});


