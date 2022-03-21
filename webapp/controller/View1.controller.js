sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/Fragment"
], function(Controller,Fragment) {
	"use strict";

	return Controller.extend("Demo.controller.View1", {
		init : function(){
			
		},
	
		plantHelp:function(oEvent){
			var mode = "Single";
			var ColsModel = new sap.ui.model.json.JSONModel();
			ColsModel.setData({
			"cols":[
				{
					"label" : "Plant Id",
					"template" : "ProductId"
				},
				{
					"label" : "Plant Name",
					"template" : "Name"
				}
				
				]
			});
			this.openValueHelp(mode,ColsModel);
		},
		materialHelp: function(oEvent){
			
			var mode = "Multi";
			var ColsModel = new sap.ui.model.json.JSONModel();
			ColsModel.setData({
			"cols":[
				{
					"label" : "Material Id",
					"template" : "ProductId"
				},
				{
					"label" : "Plant Name",
					"template" : "Name"
				}
				
				]
			});
			this.openValueHelp(mode,ColsModel);
			
		},
		exHelp: function(oEvent){
			
			var mode = "SingleInput";
			var ColsModel = new sap.ui.model.json.JSONModel();
			ColsModel.setData({
			"cols":[
				{
					"label" : "Quantity",
					"template" : "ProductId"
				},
				{
					"label" : "Category",
					"template" : "Name"
				}
				
				]
			});
			this.openValueHelp(mode,ColsModel);
			
		},
		
		openValueHelp : function(mode,ColsModel,oEvent){
			var oModel = this.getOwnerComponent().getModel("Products");
			this.getView().setModel(oModel);
			
			if(mode === "Single")
			{
			var oInput = this.getView().byId("multiInput1");
			var aCols = ColsModel.getData().cols;
			this._oValueHelpDialog = sap.ui.xmlfragment(          
				 "Demo.fragment.ex",
				 this
			);
				//this._oValueHelpDialog = oFragment;
				this.getView().addDependent(this._oValueHelpDialog);

				var oTable = this._oValueHelpDialog.getTable();
					oTable.setModel(oModel);
					oTable.setModel(ColsModel, "columns");

					if (oTable.bindRows) {
						oTable.bindAggregation("rows", "/ProductCollection");
					}

					if (oTable.bindItems) {
						oTable.bindAggregation("items", "/ProductCollection", function () {
							return new sap.m.ColumnListItem({
								cells: aCols.map(function (column) {
									return new sap.m.Label({ text: "{" + column.template + "}" });
								})
							});
						});
					}

					this._oValueHelpDialog.update();
			

				var oToken = new sap.m.Token();
				oToken.setKey(oInput.getSelectedKey());
				oToken.setText(oInput.getValue());
				this._oValueHelpDialog.setTokens([oToken]);
				this._oValueHelpDialog.open();
		
		
			}
			else if(mode === "Multi")
			{
				
			}
			else if(mode === "SingleInput")
			{
			 oInput = this.getView().byId("multiInput3");
			 aCols = ColsModel.getData().cols;
			this._oValueHelpDialog = sap.ui.xmlfragment(          
				 "Demo.fragment.ex",
				 this
			);
				//this._oValueHelpDialog = oFragment;
				this.getView().addDependent(this._oValueHelpDialog);

				 oTable = this._oValueHelpDialog.getTable();
					oTable.setModel(oModel);
					oTable.setModel(ColsModel, "columns");

					if (oTable.bindRows) {
						oTable.bindAggregation("rows", "/ProductCollection");
					}

					if (oTable.bindItems) {
						oTable.bindAggregation("items", "/ProductCollection", function () {
							return new sap.m.ColumnListItem({
								cells: aCols.map(function (column) {
									return new sap.m.Label({ text: "{" + column.template + "}" });
								})
							});
						});
					}

					this._oValueHelpDialog.update();
			

				var oToken = new sap.m.Token();
				oToken.setKey(oInput.getSelectedKey());
				oToken.setText(oInput.getValue());
				this._oValueHelpDialog.setTokens([oToken]);
				this._oValueHelpDialog.open();
			
			}
			
		},
		onValueHelpOkPress : function(oEvent){
			var aTokens = oEvent.getParameter("tokens");
			this.getView().byId("multiInput3").setSelectedKey(aTokens[0].getKey());
			this._oValueHelpDialog.close();
		},
		onValueHelpCancelPress : function(){
				this._oValueHelpDialog.close();
		}
	});
});