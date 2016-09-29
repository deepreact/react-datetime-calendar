/*
* @Author: Deep Prakash
* @Date:   2016-09-26 17:08:02
* @Last Modified by:   deepreact
* @Last Modified time: 2016-09-29 11:49:53
*/

import React from 'react';

class DateTimePicker extends React.Component{
	// Getting props and state
	constructor(props){
		super(props);
		this.state={
			dropdowndisplay:"none",
			calendarObj:[],
			currentMonth:0,
			currentMonth:0,
			currentYear:2016,
			todayDate:1,
			currentTime:0,
			Clock:"",
			Calendar:"",
			clockVisible:false,
			calendarVisible:true,
			submitTime:"none",
			dateFormat:"YYYY-MM-DD",
			timeFormat:"HH:MM",
			ampm:"",
		};
	}

	// when component is mount
	componentDidMount(){
		document.addEventListener("click",this.hideCalender.bind(this) ,false);

		var today = new Date();
		var currentMonth = today.getMonth() + 1;
		var day_on_first = new Date(currentMonth+"/"+"01/"+today.getFullYear());

		var calendar_start = day_on_first.getDay();
		var no_of_days = this.getDaysInMonth(currentMonth, 2016);

		// setting clock
		if(this.props.mode == "time" || this.props.mode == "datetime" || this.props.mode == undefined){
			var time;
			var ampm = "";
			// checking if time format is 12 hr
			if(this.props.timeFormat == "12"){
				if(parseInt(this.state.currentHour) > 12){
					time = parseInt(this.state.currentHour) - 12;
					ampm = "PM";
					this.setState({
						ampm:ampm
					});
				}
				else{
					time = this.state.currentHour;
					ampm = "AM";
					this.setState({
						ampm:ampm
					});
				}
			}
			else{
				time = this.state.currentHour;
				ampm = "";
				this.setState({
					ampm:ampm
				});
			}

			if(ampm == ""  || this.props.timeFormat == undefined || this.props.timeFormat.length == 0){
				this.refs.hour.value = time;
				this.refs.minutes.value = this.state.currentMinute;
			}
			else{
				this.refs.hour.value = time;
				this.refs.minutes.value = this.state.currentMinute;
				this.refs.ampm.value = ampm;
			}
			
		}
		if(this.props.mode == "time"){
			this.setState({
				Clock:"block",
				submitTime:"block"
			});
		}

		// setting format
		if(this.props.dateFormat != undefined){
			this.setState({
				dateFormat:this.props.dateFormat
			});	
		}
		if(this.props.timeFormat != undefined && this.props.timeFormat == '12'){
			this.setState({
				timeFormat:"HH:MM AM/PM"
			});
		}
		else{
			this.setState({
				timeFormat:"HH:MM"
			});
		}

		// getting calendar
		this.getCalendar(calendar_start, no_of_days, currentMonth, today.getFullYear());
	}

	// Component will mount
	componentWillMount(){
		var today = new Date();
		var currentMonth = today.getMonth() + 1;
		var currentYear = today.getFullYear();
		var currentDate = today.getDate();
		var currentHour = today.getHours();
		var currentMinute = today.getMinutes();
		this.setState({
			todayDate:today,
			currentMonth:currentMonth,
			currentYear:currentYear,
			currentHour:currentHour,
			currentMinute:currentMinute,
			Clock:"none",
		});	
	}

	// show calender when clicked on input box
	showCalendar(){
		this.setState({
			dropdowndisplay:"block"
		});
	}

	// Hiding calendar on clicking outside
	hideCalender(event){
		if(event.target.id != "DateTime"){
			var formatedtime;
			if((this.state.clockVisible == true && this.state.calendarVisible == false) || this.props.mode == "time"){
				var hr = "00";
				var min = "00";
				if(this.refs.hour.value.length == 1){
					hr = "0"+this.refs.hour.value;
				}
				else{
					hr = this.refs.hour.value;
				}
				if(this.refs.minutes.value.length == 1){
					min = "0"+this.refs.minutes.value;
				}
				else{
					min = this.refs.minutes.value;
				}
				// formatting time
				if(this.state.ampm.length != 0){
					formatedtime = hr+":"+min+":00 "+this.state.ampm;
				}
				else{
					formatedtime = hr+":"+min+":00";
				}
				this.refs.DateTimeInput.value = formatedtime;
			}

			this.setState({
				dropdowndisplay:"none"
			});
		}
	}

	// get calendar of a month
	getCalendar(calendar_start, no_of_days, currentMonth, currentYear){
		var calendarObj = [];
		var date_counter = 0;

		for(var i=1;i<=35;i++){
			if(i < calendar_start || date_counter>=no_of_days){
				calendarObj.push("");
			}
			else if(i>=calendar_start){
				date_counter += 1;
				calendarObj.push(date_counter);
			}
		}
		this.setState({
			calendarObj:calendarObj,
			currentMonth:currentMonth,
			currentYear:currentYear,
		});
	}

	// get nextmonth
	nextMonth(month, year){
		if(month < 12){
			var currentMonth = month + 1;
			var day_on_first = new Date(currentMonth+"/"+"01/"+year);

			var calendar_start = day_on_first.getDay();
			var no_of_days = this.getDaysInMonth(currentMonth, 2016);
			this.getCalendar(calendar_start,no_of_days,currentMonth,year);
		}
		else{
			month = 1;
			year += 1;
			var currentMonth = month;
			var day_on_first = new Date(currentMonth+"/"+"01/"+year);

			var calendar_start = day_on_first.getDay();
			var no_of_days = this.getDaysInMonth(currentMonth, 2016);
			this.getCalendar(calendar_start,no_of_days,currentMonth,year);

		}
	}

	// get Previsous Month
	prevMonth(month,year){
		if(month > 1){
			var currentMonth = month - 1;
			var day_on_first = new Date(currentMonth+"/"+"01/"+year);

			var calendar_start = day_on_first.getDay();
			var no_of_days = this.getDaysInMonth(currentMonth, 2016);
			this.getCalendar(calendar_start,no_of_days,currentMonth,year);
		}
		else{
			month = 12;
			year -= 1;
			var currentMonth = month;
			var day_on_first = new Date(currentMonth+"/"+"01/"+year);

			var calendar_start = day_on_first.getDay();
			var no_of_days = this.getDaysInMonth(currentMonth, 2016);
			this.getCalendar(calendar_start,no_of_days,currentMonth,year);

		}
	}

	// Select Date
	selectDate(date, month, year){
		var formateddate;
		var formatedtime;
		var months = [
			"JAN",
			"FEB",
			"MAR",
			"APR",
			"MAY",
			"JUN",
			"JUL",
			"AUG",
			"SEP",
			"OCT",
			"NOV",
			"DEC"
		]
		
		// adding 0 to single digit date
		if(date.toString().length == 1){
			date = "0"+date;
		}
		// fomatting date
		if(this.state.dateFormat == 'YYYY-MM-DD' || this.state.dateFormat == 'yyyy-mm-dd'){
			// adding 0 to single digit month
			if(month.toString().length == 1){
				month = "0"+month;
			}
			formateddate = year+"-"+month+"-"+date;
		}
		else if(this.state.dateFormat == 'DD-MM-YYYY' || this.state.dateFormat == 'dd-mm-yyyy'){
			// adding 0 to single digit month
			if(month.toString().length == 1){
				month = "0"+month;
			}
			formateddate = date+"-"+month+"-"+year;	
		}
		else if(this.state.dateFormat == 'YYYY/MM/DD' || this.state.dateFormat == 'yyyy/mm/dd'){
			// adding 0 to single digit month
			if(month.toString().length == 1){
				month = "0"+month;
			}
			formateddate = year+"/"+month+"/"+date;	
		}
		else if(this.state.dateFormat == 'DD/MM/YYYY' || this.state.dateFormat == 'dd/mm/yyyy'){
			// adding 0 to single digit month
			if(month.toString().length == 1){
				month = "0"+month;
			}
			formateddate = date+"/"+month+"/"+year;	
		}
		else if(this.state.dateFormat == 'MONTH DATE YEAR' || this.state.dateFormat == 'month date year'){
			formateddate = months[month-1]+" "+date+" "+year;
		}
		else if(this.state.dateFormat == 'DATE MONTH YEAR' || this.state.dateFormat == 'date month year'){
			formateddate = date+" "+months[month-1]+" "+year;
		}
		else{
			formateddate = year+"-"+month+"-"+date;
		}

		if(this.state.clockVisible == true){
			var hr = "00";
			var min = "00";
			if(this.refs.hour.value.length == 1){
				hr = "0"+this.refs.hour.value;
			}
			else{
				hr = this.refs.hour.value;
			}
			if(this.refs.minutes.value.length == 1){
				min = "0"+this.refs.minutes.value;
			}
			else{
				min = this.refs.minutes.value;
			}

			// formatting time
			if(this.state.ampm.length != 0){
				formatedtime = hr+":"+min+":00 "+this.state.ampm;
			}
			else{
				formatedtime = hr+":"+min+":00";
			}

			var datetime = formateddate+" "+formatedtime;
			this.refs.DateTimeInput.value = datetime;
		}
		else{
			var datetime = formateddate;
			this.refs.DateTimeInput.value = datetime;
		}
	}

	// get no. of days in the month
	getDaysInMonth(month,year) {    
		return new Date(year, month, 0).getDate();   
	}

	// change hour
	changeHour(task){
		var currentHour = parseInt(this.refs.hour.value);
		if(task == "INC" && currentHour < 23){
			this.refs.hour.value = currentHour + 1;
		}
		else if(task == "DEC" && currentHour > 0 ){
			this.refs.hour.value = currentHour - 1;
		}
		else if(currentHour >= 23){
			this.refs.hour.value = 0;
		}
		else if(currentHour <= 0){
			this.refs.hour.value = 23;
		}
	}

	// Change Minutes
	changeMinutes(task){
		var currentHour = parseInt(this.refs.minutes.value);
		if(task == "INC" && currentHour < 59){
			this.refs.minutes.value = currentHour + 1;
		}
		else if(task == "DEC" && currentHour > 0 ){
			this.refs.minutes.value = currentHour - 1;
		}
		else if(currentHour >= 59){
			this.refs.minutes.value = 0;
		}
		else if(currentHour <= 0){
			this.refs.minutes.value = 59;
		}
	}

	// Change AM PM
	changeAmPm(){
		if(this.refs.ampm.value == "AM"){
			this.refs.ampm.value = "PM";
			this.setState({
				ampm:"PM"
			});
		}
		else{
			this.refs.ampm.value = "AM";
			this.setState({
				ampm:"AM"
			});
		}
	}

	// Show clock
	showClock(){
		if(this.state.clockVisible == false){
			if(this.state.calendarVisible == false)
			{
				this.setState({
					Clock : "block",
					clockVisible:true,
					submitTime:"block"
				});
			}
			else{
				this.setState({
					Clock : "block",
					clockVisible:true,
					submitTime:"none"
				});
			}
		}
		else{
			this.setState({
				Clock : "none",
				clockVisible:false,
			});	
		}
	}

	// toggle Calendar
	toggleCalendar(){
		if(this.state.calendarVisible == true){
			if(this.state.clockVisible == true){
				this.setState({
					Calendar : "none",
					calendarVisible:false,
					submitTime:"block"
				});	
			}
			else{
				this.setState({
					Calendar : "none",
					calendarVisible:false,
				});	
			}
		}
		else{
			if(this.state.clockVisible == true){
				this.setState({
					Calendar : "block",
					calendarVisible:true,
					submitTime:"none"
				});
			}
			else{
				this.setState({
					Calendar : "block",
					calendarVisible:true,
				});
			}
		}
	}


	// Rendering the view
	render(){
		// styles
		var dropdownstyle;
		if(this.props.background != undefined){
			dropdownstyle = {
				background:this.props.background,
				display:this.state.dropdowndisplay,
				width:300,
				boxShadow:"1px 1px 2px 1px #bdc3c7",
				textAlign:"center"
			};
		}
		else{
			dropdownstyle = {
				background:"#ecf0f1",
				display:this.state.dropdowndisplay,
				width:300,
				boxShadow:"1px 1px 2px 1px #bdc3c7",
				textAlign:"center"
			};
		}

		var inputBoxWrapper = {
			width:300,
			borderStyle:"solid",
			borderWidth:1,
			borderColor:"#bdc3c7",
			fontFamily:"verdana",
			fontSize:16,
			textAlign:"center",
			borderRadius:2,
		};

		var calendarImgInline = {
			display:"inline-block",
			marginTop:"-5px",
		};
		
		var inputstyle={
			outline:"none",
			width:"90%",
			padding:4,
			borderStyle:"none",
			display:"inline-block"
		};
		var inlineBlocks = {
			display:"inline-block",
			width:"14%",
			borderStyle:"solid",
			borderWidth:1,
			borderColor:"#bdc3c7",
			cursor:"pointer"
		};
		var dateToday = {
			display:"inline-block",
			width:"14%",
			borderStyle:"solid",
			borderWidth:1,
			borderColor:"#bdc3c7",
			background:"#bdc3c7",
			fontWeight:"bold",
			cursor:"pointer"
		};
		var calendarStyle = {
			display:this.state.Calendar,
			width:"100%",
			padding:8,
			textAlign:"center"
		};
		var calendarHead = {
			fontWeight:"bold",
		};
		var nullBlock = {
			visibility:"hidden",
			display:"inline-block",
			width:"14%",
			borderStyle:"solid",
			borderWidth:1,
			borderColor:"#bdc3c7"
		};
		var calendarHeaderStyle = {
			marginBottom:4,
			fontWeight:"bold"
		};
		var navstyle={
			fontWeight:"bold",
			padding:6,
		};
		var navBlocks={
			display:"inline-block"
		};
		var prev={
			float:"left",
			display:"inline-block",
			backgroundImage:"url('img/prev.png')",
			backgroundSize:"100% 100%",
			backgroundColor:"transparent",
			borderStyle:"none",
			width:30,
			height:20,
			outline:"none"
		};
		var next={
			float:"right",
			display:"inline-block",
			backgroundImage:"url('img/next.png')",
			backgroundSize:"100% 100%",
			backgroundColor:"transparent",
			borderStyle:"none",
			width:30,
			height:20,
			outline:"none"
		};

		var clockStyle = {
			display:this.state.Clock,
			width:"100%",
			textAlign:"center",
		};
		var hourStyle = {
			display:"inline-block",
			margin:10,
		};
		var incDec = {
			fontWeight:"bold",
			fontSize:18,
			cursor:"pointer"
		};
		var timeInputStyle = {
			width:30,
			textAlign:"center"
		};
		var separator = {
			fontWeight:"bold",
			fontSize:20,
			display:"inline-block",
		};
		var hiddenBlock = {
			visibility:"hidden"
		};

		var selectTimeStyle={
			cursor:"pointer",
			padding:10,
		};

		var submitTime = {
			display:this.state.submitTime,
			padding:6,
			cursor:"pointer",
			borderStyle:"solid",
			borderWidth:1,
			borderColor:"#95a5a6"
		};

		// toggle Calendar
		const toggleCalendar = (
			<div id='DateTime' style={selectTimeStyle} onClick={this.toggleCalendar.bind(this)}><img id='DateTime' src='img/calendar.png' width='20' alt='Toggle Calendar' title='Toggle calendar'/></div>
		);

		// Calendar Nav
		const calendarNav = (
			<div style={navstyle}>
				<button id='DateTime' style={prev} onClick={this.prevMonth.bind(this, this.state.currentMonth, this.state.currentYear)}></button>
				<div style={navBlocks}>{this.state.currentMonth} / {this.state.currentYear}</div>
				<button id='DateTime' style={next} onClick={this.nextMonth.bind(this, this.state.currentMonth, this.state.currentYear)}></button>
			</div>
		);

		// calendar Header containing days
		const calendarHeader = (
			<div style={calendarHeaderStyle}>
				<div style={inlineBlocks}>Mon</div>
				<div style={inlineBlocks}>Tue</div>
				<div style={inlineBlocks}>Wed</div>
				<div style={inlineBlocks}>Thu</div>
				<div style={inlineBlocks}>Fri</div>
				<div style={inlineBlocks}>Sat</div>
				<div style={inlineBlocks}>Sun</div>
			</div>
		);

		// Calendar dates
		const calendar = this.state.calendarObj.map(function(index){
			if(index != "" && index != this.state.todayDate.getDate()){
				return (
					<div onClick={this.selectDate.bind(this, index, this.state.currentMonth, this.state.currentYear)} style={inlineBlocks}>{index}</div>
				);
			}
			else if(index == this.state.todayDate.getDate()){
				if(this.state.todayDate.getMonth()+1 == this.state.currentMonth && this.state.todayDate.getFullYear() == this.state.currentYear)
				{
					return (
						<div onClick={this.selectDate.bind(this, index, this.state.currentMonth, this.state.currentYear)} style={dateToday}>{index}</div>
					);
				}
				else{
					return (
						<div onClick={this.selectDate.bind(this, index, this.state.currentMonth, this.state.currentYear)} style={inlineBlocks}>{index}</div>
					);
				}
			}
			else{
				return (
					<div style={nullBlock}></div>
				);
			}
		}.bind(this));

		// Combining calendar header and dates
		const calendarData = (
			<div style={calendarStyle}>
				{calendarNav}
				{calendarHeader}
				{calendar}
			</div>
		);
		// input box
		const inputBox= (
			<div style={inputBoxWrapper}>
				<input id='DateTime' ref='DateTimeInput' type='text' style={inputstyle} onClick={this.showCalendar.bind(this)} placeholder={this.state.dateFormat+" "+this.state.timeFormat}/>
				<img style={calendarImgInline} src='img/calendarLight.png' width='26' />
			</div>
		);

		//show clock
		const showClock=(
			<div id="DateTime" style={selectTimeStyle} onClick={this.showClock.bind(this)}><img id='DateTime' src='img/clock.png' width='16' alt='Toggle Clock' title='Toggle Clock'/></div>
		);

		// 24 HR Clock
		const clockTypeOne = (
			<div style={clockStyle}>
				<div style={hourStyle}>
					<div id='DateTime' style={incDec} onClick={this.changeHour.bind(this, "INC")}> <img id='DateTime' src='img/inc.png' width='30' /> </div>
					<input name='hour' ref='hour' id='DateTime' style={timeInputStyle} type='text'/> 
					<div id='DateTime' style={incDec} onClick={this.changeHour.bind(this, "DEC")}> <img id='DateTime' src='img/dec.png' width='30' /> </div>
				</div>
				
				<div style={separator}>
					<div style={hiddenBlock}> + </div>
					<div> : </div>
					<div style={hiddenBlock}> - </div>
				</div>

				<div style={hourStyle}>
					<div id='DateTime' style={incDec} onClick={this.changeMinutes.bind(this, "INC")}> <img id='DateTime' src='img/inc.png' width='30' /> </div>
					<input ref='minutes' id='DateTime' style={timeInputStyle} type='text'/> 
					<div id='DateTime' style={incDec} onClick={this.changeMinutes.bind(this, "DEC")}> <img id='DateTime' src='img/dec.png' width='30' /> </div>
				</div>
			</div>
		);

		// 12 HR CLOCK
		const clockTypeTwo = (
			<div style={clockStyle}>
				<div style={hourStyle}>
					<div id='DateTime' style={incDec} onClick={this.changeHour.bind(this, "INC")}> <img id='DateTime' src='img/inc.png' width='30' /> </div>
					<input name='hour' ref='hour' id='DateTime' style={timeInputStyle} type='text'/> 
					<div id='DateTime' style={incDec} onClick={this.changeHour.bind(this, "DEC")}> <img id='DateTime' src='img/dec.png' width='30' /> </div>
				</div>
				
				<div style={separator}>
					<div style={hiddenBlock}> + </div>
					<div> : </div>
					<div style={hiddenBlock}> - </div>
				</div>

				<div style={hourStyle}>
					<div id='DateTime' style={incDec} onClick={this.changeMinutes.bind(this, "INC")}> <img id='DateTime' src='img/inc.png' width='30' /> </div>
					<input ref='minutes' id='DateTime' style={timeInputStyle} type='text'/> 
					<div id='DateTime' style={incDec} onClick={this.changeMinutes.bind(this, "DEC")}> <img id='DateTime' src='img/dec.png' width='30' /> </div>
				</div>

				<div style={hourStyle}>
					<div id='DateTime' style={incDec} onClick={this.changeAmPm.bind(this)}> <img id='DateTime' src='img/inc.png' width='30' /> </div>
					<input ref='ampm' id='DateTime' style={timeInputStyle} type='text'/> 
					<div id='DateTime' style={incDec} onClick={this.changeAmPm.bind(this)}> <img id='DateTime' src='img/dec.png' width='30' /> </div>
				</div>
			</div>
		);

		const calendarMode = (
			<div>
				{toggleCalendar}
				{calendarData}
			</div>
		);

		const clockModeOne = (
			<div>
				{showClock}
				{clockTypeOne}
			</div>
		);
		const clockModeTwo = (
			<div>
				{showClock}
				{clockTypeTwo}
			</div>
		);

		// setting dropdown after checking the mode
		let dropDown;
		if(this.props.mode == "datetime" || this.props.mode == undefined){
			if(this.props.timeFormat == undefined || this.props.timeFormat == "24" || this.props.timeFormat.length == 0){
				dropDown = (
					<div style={dropdownstyle}>
						{calendarMode}
						{clockModeOne}
					</div>
				);
			}
			else{
				dropDown = (
					<div style={dropdownstyle}>
						{calendarMode}
						{clockModeTwo}
					</div>
				);
			}
				
		}
		else if(this.props.mode == "date"){
			dropDown = (
				<div style={dropdownstyle}>
					{calendarData}
				</div>
			);
		}
		else if(this.props.mode == "time"){
			if(this.props.timeFormat == undefined || this.props.timeFormat == "24" || this.props.timeFormat.length == 0){
				dropDown = (
					<div style={dropdownstyle}>
						{clockTypeOne}
					</div>
				);	
			}
			else{
				dropDown = (
					<div style={dropdownstyle}>
						{clockTypeTwo}
					</div>
				);
			}
		}

		return <div>
			{inputBox}
			{dropDown}
		</div>;
	}
}

export default DateTimePicker;