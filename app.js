
const api_url = 
`https://dev.onebanc.ai/assignment.asmx/GetTransactionHistory?userId=1&recipientId=2`;
async function getapi(url) {
    const response = await fetch(url);
    
    var data = await response.json();
    show(data);
}
getapi(api_url);
  


function show(data) {
    let str=''
for(let item of data.transactions)

{	
	const months = ["Jan", "Feb", "Mar","Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	var current_datetime = new Date(item.startDate);
	var current_datetime2 = new Date(item.endDate);

	let formatted_date = current_datetime.getDate() + " " + months[current_datetime.getMonth()] + " " + current_datetime.getFullYear();
	let formatted_date2 = current_datetime2.getDate() + " " + months[current_datetime2.getMonth()] + " " + current_datetime2.getFullYear();
    let time = current_datetime2.toLocaleTimeString();

	let str2 = formatted_date2 + "," + time;
    let dir = item.direction;
	let status="";
	let type = item.type;
     let btn;
	 let transaction="";
     let img = false;
    if(type === 2)
	{
		if(dir === 2)
		{
          let btn1 = `<input type="submit" value="Pay"/>`;
		  let btn2 = `<input type="submit" value="Decline"/>`;

		  btn = btn1 +" " + btn2;
		  status = "Request received";
		}

		else if(dir === 1)
		{
			btn = `<input type="submit" value="Cancel"/>`;
			status = "You requested";

		}

		img = true;

	}
	else{

		btn = item.id;
		transaction = "Transaction ID";
		if(dir === 1)
		{
			status = "You paid";
		}
		else if(dir === 2)
		{
			status = "You received";
		}
	}
	 str+=`
				<div class="title">
					<span>${formatted_date}</span>
				</div>
				<div class="${item.direction===2?'row':'row active'}">
					<div class="card">
						<div class="line1">
							<div class="l">
								<big><i class="fa fa-rupee"></i>${item.amount}</big>
								<br>
								<tt>${transaction}</tt>
								<br>
								<code>${btn}</code>
							</div>
							<div class="r">
								<big><i class=" ${img === true? ' fa fa-clock-o ': ' fa fa-check '} "></i> ${status}</big>
								<br>
								<br>
								<i class="fa   fa-chevron-right"></i>
							</div>
						</div>
						<div class="line2">
							${str2}
						</div>
					</div>
					<div class="item"></div>
				</div>
	`
	document.querySelector(".modal-body").innerHTML=str
}
}

