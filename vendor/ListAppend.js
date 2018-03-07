var VocData = JSON.parse("[]"),
    timeout = false,
    timeoutCircle = 0;
var voc_Data = "";
var arr = [],vocArr=[0,220,386,758,969,113,1292,1391,1510,1648,1675,1697,1809,1986,2044,2114,2411,2421,2602,2950,3125,3151,3203,3272,3273,3282];
var ulPosition=2;
$(function() {
    for (var i = 65; i < 91; i++) {
        arr.push(String.fromCharCode(i));
    }
	UlControl(0,4);
    if (localStorage.getItem("voc") != null) {
        VocData = JSON.parse(localStorage.getItem("voc"));

        console.log("local");
        showData(VocData);
    }
    console.log(VocData.length);
    if (VocData.length == 0) {
    	readData();      
        console.log("file");
    }
});


function UlControl(begin,end){
	$("#ulControl").html("");
	var str='<li class="page-item" id="ulLeft"><a class="page-link" href="#" aria-label="Previous"><span aria-hidden="true">&laquo;</span><span class="sr-only">Previous</span></a></li>';
	if(begin>0)
		str+='<li class="page-item"><a class="page-link" href="">...</a></li>';
	for(var i=begin;i<end;i++){
		str+='<li class="page-item"><a class="page-link" href="#'+vocArr[i]+'">'+arr[i]+'</a></li>';
	}	
	if(end<26)
		str+='<li class="page-item"><a class="page-link" href="">...</a></li>';
	str+='<li class="page-item" id="ulRight"><a class="page-link" href="#" aria-label="Next"><span aria-hidden="true">&raquo;</span><span class="sr-only">Next</span></a></li>';
	$("#ulControl").append(str);
	 $("#ulLeft").click(function(){
    	var begin,end;
    	ulPosition=ulPosition-5>=2?ulPosition-5:2;
    	begin=ulPosition-2<=0?0:ulPosition-2;
    	end=ulPosition+2>=26?26:ulPosition+2;
    	
    	UlControl(begin,end);
    });
	     $("#ulRight").click(function(){
    	var begin,end;
    	ulPosition=ulPosition+5<=24?ulPosition+5:24;
    	begin=ulPosition-2<=0?0:ulPosition-2;
    	end=ulPosition+2>=26?26:ulPosition+2;
    	
    	UlControl(begin,end);
    });

}

function readData() {
    $.get('./data/voc_all.json', function(data) {
        var obj = JSON.parse("[" + data + "]")
        for (var i = 0; i < obj.length; i++) {

            VocData.push(obj[i]);
        }
        showData(VocData);
    });   
}


function showData(data) {
    $("#VocList").html("");
    var str = "";
    for (var i = 0; i < data.length; i++) {

        if (i % 4 === 0) {
            str += '<div class="row">';
        }
        str += '<div class="col-lg-3 col-md-4 col-sm-6 portfolio-item" id="'+data[i].id+'"><div class="card h-100"><div class="card-body"><h4 class="card-title">'
        str += '<a href="">' + data[i].en + '</a></h4><p class="card-text">' + data[i].cn + '</p>';
        str += '</div></div></div>';

        if (i % 4 === 3) {
            str += '</div>';
        }
    }

    $("#VocList").append(str);
}
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById("myBtn").style.display = "block";
    } else {
        document.getElementById("myBtn").style.display = "none";
    }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}