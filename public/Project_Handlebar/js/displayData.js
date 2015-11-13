$(document).ready(function(){
	$.ajax({
		url:"/products",
		method:"GET",
		success:function(data){
			var source = $("#get-template").html();
			var template = Handlebars.compile(source); 
			var temp = template(data);
			$("#d1").append(temp);
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
				iname = $("input[name=itemName]").val("");
				idescription = $("input[name=itemDescription]").val("");
				iprice = $("input[name=itemPrice]").val("");
				
				var source = $("#get-template").html();
				var template = Handlebars.compile(source); 
				var temp = template([data]);
				$("#d1").append(temp);
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
				success:function(data, textStatus){
					if(textStatus === "success"){
						$("#d1 div.well:has(span[id="+x+"])").remove();
					}
				}
			});
			
		}
	});
});