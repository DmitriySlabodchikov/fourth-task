var date = (new Date()).getFullYear();

var table = {
	view:"datatable",
	id: "datatable",
	select:true,
	columns:[
		{ id:"title",	header:["Film title", {content:"textFilter"}], sort:"string", width:200},
		{ id:"year",	header:["Released", {content:"textFilter"}] , sort:"int", width:120 },
		{ id:"votes",	header:["Votes", {content:"textFilter"}], sort:votes, width:120},
		{ id:"rating",	header:["Rating", {content:"textFilter"}], sort:rating, width:80},
		{ id:"rank",	header:["Rank", {content:"textFilter"}], sort:"int", width:80},
		
		
		
	],
	data:small_film_set,
	on:{
		"onItemClick":function(id){
			var item = $$("datatable").getSelectedItem();$$("form").setValues(item);
		}
	}
};
		
var form = {
	gravity: 0.7,
	view: "form",
	id: "form",
	elements:[
		{view:"template", template:"edit form", type:"section"},
		{ view:"text", value:"Title<input>", name:"title", invalidMessage: "Not empty!", label:"Title"},
		{ view:"text", value:"2017",name:"year", invalidMessage: "Enter year between 1970 and "+date, label:"Year"},
		{ view:"text", value:"5",name:"rating",invalidMessage: "Number, greater than 0", label:"Rating"},
		{ view:"text",value:"25", name:"votes",invalidMessage: "Must be less than 100000, not empty", label:"Votes"},
		{ cols:[
			{view:"button", value:"Add new", type:"form",
				click: function() {
					if ($$("form").validate()) {

						var item = $$("form").getValues();
						for (key in item){
							item[key] = item[key].replace(/<[^>]+>/g,'');
						}
						$$("datatable").add(item);
						webix.message("Data entered correctly");
						
					}
				}
			},
			{ view:"button", value:"Update", width:70, click: function() {
				if ($$("form").validate()) {

					
					var sel = $$("datatable").getSelectedId();
					
					var item = $$("form").getValues();
					for (key in item){
						item[key] = item[key].replace(/<[^>]+>/g,'');
					}
					
					
					$$("datatable").updateItem(sel, item);
				}	
			}	
			},
			{view:"button", value:"Delete", type:"danger", click: function() {
				var id = $$("datatable").getSelectedId(); //returns the ID of selected item
				$$("datatable").remove(id);
				}
			},
			{view:"button", value:"Clear form",click: function() {
				$$("form").clear();
				$$("form").clearValidation();
			}
		}
	]},
	{}
	], 
	rules:{
		title: webix.rules.isNotEmpty,
		year: function(value) {
			return value > 1970 && value <= date;
		  },

		votes: function(value) {
			return value > 0 && value < 100000;
		},

		rating: function(value) {
			return value > 0;
		}
	}, 
	on:{
		onValidationError: function(key, data) {
			webix.message({
				text: key.data + " field is incorrect",
				type: "error"
			});
		}
	}		
};

function votes(a,b){	
	a = a.votes.toString().replace(",",".");
	b = b.votes.toString().replace(",",".");
	return a > b ? 1 : -1;
};

function rating(a,b){	
	a = a.rating.toString().replace(",",".");
	b = b.rating.toString().replace(",",".");
	return a > b ? 1 : -1;
};