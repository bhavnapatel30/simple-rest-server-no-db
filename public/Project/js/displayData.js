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
				var create_div1 = $("<div></div>");
				var create_h1 = $("<h3>"+data.itemName+"</h3>");
				var create_p = $("<p>"+data.itemDescription+"</p>");
				create_div1.addClass("jumbotron");
				$("#d1").addClass("form-control");
				$("#d1").addClass("container");
				create_div1.append(create_h1);
				create_div1.append(create_p);
				$("#d1").append(create_div1);
			}
		});
		e.preventDefault();
	});
});