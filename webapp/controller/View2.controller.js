sap.ui.define([
	"sap/ui/core/mvc/Controller",
		"sap/ui/core/util/Export",
	"sap/ui/core/util/ExportTypeCSV"
], function(Controller,Export,exportCSV) {
	"use strict";

	return Controller.extend("Demo.controller.View2", {

	
			onInit: function() {
			var oModel = this.getOwnerComponent().getModel("Products");
			this.getView().setModel(oModel,"ExportModel");
			this.getView().byId("table").setModel(oModel);
		},

	
		onSave:function(oEvent){
			var oModel = this.getView().getModel("ExportModel");
			var oTab = this.getView().byId("table");
			var input1 = this.getView().byId("input1");
			var input2 = this.getView().byId("input2");
			var oNewEntry = {};
				oNewEntry = {
				"First Name" : input1.getValue(),
				"Last Name" : input2.getValue()
				};
			var oModelExport = oModel.getProperty("/PersonalInfo");
			oModelExport.push(oNewEntry);
			 oModel.setProperty("/PersonalInfo", oModelExport);
			 oTab.setModel(oModel);
		},
		
		OnExport: function(oEvent){
		var oTab = this.getView().byId("table");
		var oModel = oTab.getModel();
		//var oBinding = oTab.getBinding();
		var oExport = new Export({
				exportType: new exportCSV({
					// for xls....
					fileExtension: "xls",
					separatorChar: "\t",
					charset: "utf-8",
					mimeType: "application/vnd.ms-excel"
				}),
			
				models: oModel,
				rows: {
					path: "/PersonalInfo"
				},
				columns: [{
					name: "First Name",
					template: {
						content: "{First Name}"
					}
				}, 
				{
					name: "Last Name",
					template: {
						content: "{Last Name}"
					}
				
			}]
		});
			oExport.saveFile().catch(function (oError) {
				sap.m.MessageToast.show("Generate is not possible beause no model was set");
			}).then(function () {
				oExport.destroy();
			});

				}
			
			
		
	
	
		
	});

});