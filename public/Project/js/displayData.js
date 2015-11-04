$(document).ready(function(){
	var temp=0;;
	$.ajax({
		url:"/products",
		method:"GET",
		success:function(data){
			for(i=0; i<data.length; i++)
			{
				temp = data[i].id;
				$("#d1").append('<div class="well row"><div class="col-md-8"><h3>'+data[i].itemName+'</h3><p>'+data[i].itemDescription+'</p></div><div class="col-md-4"><button class="btn btn-primary">$'+data[i].itemPrice+'</button><a href="#"><span id='+data[i].id+' class="glyphicon glyphicon-remove-sign"></span></a></div></div>');
			}
		}
	});
	$(".btn").on("click", function(e){
		var iname = $("input[name=itemName]").val();
		var idescription = $("input[name=itemDescription]").val();
		var iprice = $("input[name=itemPrice]").val();
		$.ajax({
			url:"/products",
			method:"POST",
			data:{itemName:iname, itemDescription:idescription, itemPrice:iprice},
			success:function(data){
				temp++;
				$("#d1").append('<div class="well row"><div class="col-md-8"><h3>'+data.itemName+'</h3><p>'+data.itemDescription+'</p></div><div class="col-md-4"><button class="btn btn-primary">$'+data.itemPrice+'</button><a href="#"><span id='+temp+' class="glyphicon glyphicon-remove-sign"></span></a></div></div>');
			}
		});
		e.preventDefault();
	});
	$("#d1").on("click", function(e){
		var a = e.target;	
		if(e.target.nodeName === "SPAN")
		{
			var x = a.id;
			$.ajax({
				url:"/products/"+x,
				method:"DELETE",
				success:function(data){
					$("#d1 div.well:has(span[id="+x+"])").remove();
				}
			});
			
		}
	});
});