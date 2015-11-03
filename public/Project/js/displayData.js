$(document).ready(function(){
	$(".btn").on("click", function(e){
		var iname = $("input[name=itemName]").val();
		var idescription = $("input[name=itemDescription]").val();
		var iprice = $("input[name=itemPrice]").val();
		$.ajax({
			url:"/users",
			method:"POST",
			data:{itemName:iname, itemDescription:idescription, itemPrice:iprice},
			success:function(data){
				$("#d1").append('<div class="well row"><div class="col-md-8"><h3>'+data.itemName+'</h3><p>'+data.itemDescription+'</p></div><div class="col-md-4"><button class="btn btn-primary">$'+data.itemPrice+'</button><span class="glyphicon glyphicon-remove-sign"></span></div></div>');
			}
		});
		e.preventDefault();
	});
});