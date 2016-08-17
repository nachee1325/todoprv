	function validateCode(id){
    var TCode = document.getElementById(id).value;
    if( /[^a-zA-Z0-9_ ]/.test( TCode ) ) {
       alert('Input is not alphanumeric');
       return false;
    }
    return true;     
 }
	var $task = $('#taskEdit');
	var $due = $('#dueEdit');
	function getData(id){ 
		$.getJSON('/_get_data',{taskID:id},function(data){
			$('#taskEdit').val(data.result[id].task);
			$('#dueEdit').val(data.result[id].due);
			var e = document.getElementById("sid");
			e.id = id;
			console.log(e.id);
			return(e.id)
	});
}
    function getTable(){
    	var table = document.getElementById("executeTable"); 
    	$.getJSON('/_get_table',{},function (data){

    		while(table.rows.length > 1){
    			table.deleteRow(1);
    		}
       	for(var i = 0 ; i < data.jsonn.length ; i++){
			tr = $('<tr/>');
			tr.append('<td>' + data.jsonn[i].task +'</td>')
			tr.append('<td>' + data.jsonn[i].due +'</td>')
			tr.append('<td>' + '<a href="#openModal"><input name = "btnEdit" type="button" onclick="getData(this.id)" value="Edit" id='+i+'>' + '</td></a>')
			tr.append('<td>' + '<input name = "btnDelete" type="button" onclick="deleteTask(this.id)" value="Delete" id='+i+'>' + '</td>')
						$("#executeTable").append(tr);
					}		
    		});

    	return false;
	}

	function deleteTask(id) {
		$.getJSON('/_delete_task',{taskID:id}, function(data){
		});
		getTable();
	}

	function closeModal(){
		var saveB = $('input[name = "btnSave"]').val()
		saveB.id = "sid"
		$.modal.close();
	}

	function editTask(id) {
		if (validateCode('taskEdit')){
		$("#status").fadeIn();
		$("#status").empty();
		$.getJSON('/_edit_task',{taskID:id,task:$('input[name = "txtEditTitle"]').val(),due:$('input[name = "txtEditDate"]').val()}, function(data){
		});
			$("status").empty();
			$("#status").append("Successfully Saved!");
			$("#taskEdit").val("");
			$("#dueEdit").val(""); 
			$("#status").fadeOut(1000);
			var e = document.getElementById(id);
			e.id = "sid";
		getTable();}
		else{
			$("status").empty();
			$("#status").append("Unable to edit task. Please check your input.");		

		}
	}
	function myFunction() {
		date = new Date($('input[name = "txtDate"]').val());
		dueDate = convertDate(date);

		if(validateCode('task')){
		$.getJSON('/_add_task',{task: $('input[name = "txtTitle"]').val(), due: dueDate}, function(data){
			$("#result").text(data.result);
			$("stat").empty();
			$("#stat").append("Successfully Saved!");
			$("#task").val("");
			$("#due").val(""); 
			});
		getTable();
	}
	else{
		$("stat").empty();
		$("#stat").append("Unable to save task. Please check your input.");	
		}
    }

    function convertDate(inputFormat) {
  		function pad(s) { return (s < 10) ? '0' + s : s; }
  		var d = new Date(inputFormat);
  		return [pad(d.getDate()), pad(d.getMonth()+1), d.getFullYear()].join('/');
	}
	