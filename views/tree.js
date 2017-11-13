var tree = {
	id:"tree",	
	view:"treetable",
	columns:[ 
		{ id:"id", header:"", width:50}, 
		{ id:"title", header:"Film title", width:250, 
		template:"{common.treetable()} #title#"}, 
		{ id:"price", header:"Price", width:200} 
	],

	select:false,

	data: treeInfo,
	
	on:{
		"onAfterLoad":function(){
			$$("tree").openAll();
		}
	}
		
};
