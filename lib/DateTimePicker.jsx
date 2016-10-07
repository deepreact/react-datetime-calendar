/*
* @Author: Deep Prakash
* @Date:   2016-09-26 17:08:02
* @Last Modified by:   Cubito Team
* @Last Modified time: 2016-10-07 14:53:51
*/

import React from 'react';

// images
var calendarDark = require('file!./img/calendar.png');
var calendarLight = require('file!./img/calendarLight.png');
var prevBtn = require('file!./img/prev.png');
var nextBtn = require('file!./img/next.png');
var clockBtn = require('file!./img/clock.png')
var incBtn = require('file!./img/inc.png');
var decBtn = require('file!./img/dec.png');
var calendarWindow = require('file!./img/windowIcon.png');
var windowNext = require('file!./img/windowNext.png');
var windowPrev = require('file!./img/windowPrev.png');
var anchor = require('file!./img/anchor-blue.png');
var windowCalendar = require('file!./img/windowCalendar.png');
var windowClock = require('file!./img/windowClock.png');
var cubitoPrev = require('file!./img/cubitoPrev.png');
var cubitoNext = require('file!./img/cubitoNext.png');


class DateTimePicker extends React.Component{
	// Getting props and state
	constructor(props){
		super(props);
		this.state={
			dropdowndisplay:"none",
			calendarObj:[],
			selectedDateVal:0,
			selectedMonthVal:0,
			selectedYearVal:0,
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
			formatedDate:"",
			windowDateData:"",
			cubitoDateData:"",
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
		var ampm = "";
		// setting clock
		if(this.props.mode == "time" || this.props.mode == "datetime" || this.props.mode == undefined){
			var time;
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

			if(ampm == ""  || this.props.timeFormat == undefined){
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

		// Intializing Window Calendar input
		if((this.props.theme == 'window' && this.state.calendarVisible == true) || this.props.theme == 'cubito' && this.state.calendarVisible == true){
			var formateddate;
			var formatedtime;
			var months = [
				"Jan",
				"Feb",
				"Mar",
				"Apr",
				"May",
				"Jun",
				"Jul",
				"Aug",
				"Sep",
				"Oct",
				"Nov",
				"Dec"
			];
			var days = [
				"Sun",
				"Mon",
				"Tue",
				"Wed",
				"Thu",
				"Fri",
				"Sat",
			];
			var date = today.getDate();
			var month = today.getMonth();
			var year = today.getFullYear();
			var day = today.getDay();
			var datetimeData = "";
			var hr = "00";
			var min = "00";

			this.setState({
				selectedDateVal:date,
				selectedMonthVal:month+1,
				selectedYearVal:year
			});

			// adding 0 to single digit date
			if(date.toString().length == 1){
				date = "0"+date;
			}
			// fomatting date
			if(this.props.dateFormat == 'YYYY-MM-DD' || this.props.dateFormat == 'yyyy-mm-dd'){
				// adding 0 to single digit month
				if(month.toString().length == 1){
					month = "0"+month;
				}
				formateddate = year+"-"+month+"-"+date;
			}
			else if(this.props.dateFormat == 'DD-MM-YYYY' || this.props.dateFormat == 'dd-mm-yyyy'){
				// adding 0 to single digit month
				if(month.toString().length == 1){
					month = "0"+month;
				}
				formateddate = date+"-"+month+"-"+year;	
			}
			else if(this.props.dateFormat == 'YYYY/MM/DD' || this.props.dateFormat == 'yyyy/mm/dd'){
				// adding 0 to single digit month
				if(month.toString().length == 1){
					month = "0"+month;
				}
				formateddate = year+"/"+month+"/"+date;	
			}
			else if(this.props.dateFormat == 'DD/MM/YYYY' || this.props.dateFormat == 'dd/mm/yyyy'){
				// adding 0 to single digit month
				if(month.toString().length == 1){
					month = "0"+month;
				}
				formateddate = date+"/"+month+"/"+year;	
			}
			else if(this.props.dateFormat == 'MONTH DATE YEAR' || this.props.dateFormat == 'month date year'){
				formateddate = months[month]+" "+date+" "+year;
			}
			else if(this.props.dateFormat == 'DATE MONTH YEAR' || this.props.dateFormat == 'date month year'){
				formateddate = date+" "+months[month]+" "+year;
			}
			else if(this.props.dateFormat == 'MONTH DATE DAY - YEAR' || this.props.dateFormat == 'month date day - year' || this.state.dateFormat == 'MONTH DATE DAY-YEAR' || this.state.dateFormat == 'month date day-year'){
				formateddate = months[month]+" "+ date +" "+days[day]+" - "+year;	
			}
			else{
				formateddate = year+"-"+month+"-"+date;
			}

			// getting time in format
			if(this.props.mode == 'datetime' || this.props.mode == 'time')
			{
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
			}
			

			// formatting time
			if(ampm.length != 0){
				formatedtime = hr+":"+min+":00 "+ampm;
			}
			else{
				formatedtime = hr+":"+min+":00";
			}


			//setting input value according to format
			if(this.props.theme == 'window'){
				if(this.props.mode == 'date'){
					this.setState({
						windowDateData : formateddate
					});
				}
				else if(this.props.mode == 'time'){
					this.setState({
						windowDateData:formatedtime
					});
				}
				else{
					datetimeData = formateddate+" "+formatedtime
					this.setState({
						windowDateData:datetimeData
					});
				}	
			}
			else{
				if(this.props.mode == 'date'){
					this.setState({
						cubitoDateData : formateddate
					});
				}
				else if(this.props.mode == 'time'){
					this.setState({
						cubitoDateData:formatedtime
					});
				}
				else{
					datetimeData = formateddate+" "+formatedtime
					this.setState({
						cubitoDateData:datetimeData
					});
				}	
			}
		}
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
				
				if(this.props.theme == undefined || this.props.theme == 'classic'){
					this.refs.DateTimeInput.value = formatedtime;					
					// pushing the input value out
					this.props.onUpdate(this.refs.DateTimeInput.value);
				}
				else if(this.props.theme == 'window'){
					this.setState({
						windowDateData : formatedtime
					});
					this.props.onUpdate(formatedtime);
				}
				else if(this.props.theme == 'cubito'){
					this.setState({
						cubitoDateData : formatedtime
					});
					this.props.onUpdate(formatedtime);	
				}
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
		this.setState({
			selectedDateVal:date,
			selectedMonthVal:month,
			selectedYearVal:year,
		})
		var selectedDate = new Date(year,month-1,date);
		var day = selectedDate.getDay();
		var formateddate;
		var formatedtime;
		var months = [
			"Jan",
			"Feb",
			"Mar",
			"Apr",
			"May",
			"Jun",
			"Jul",
			"Aug",
			"Sep",
			"Oct",
			"Nov",
			"Dec"
		];
		var days = [
			"Sun",
			"Mon",
			"Tue",
			"Wed",
			"Thu",
			"Fri",
			"Sat",
		];
		
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
		else if(this.props.dateFormat == 'MONTH DATE DAY - YEAR' || this.props.dateFormat == 'month date day - year' || this.state.dateFormat == 'MONTH DATE DAY-YEAR' || this.state.dateFormat == 'month date day-year'){
			formateddate = months[month-1]+" "+ date +" "+days[day]+" - "+year;	
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
			if(this.props.theme == undefined || this.props.theme == 'classic'){
				this.refs.DateTimeInput.value = datetime;
				this.props.onUpdate(this.refs.DateTimeInput.value);
			}
			else if(this.props.theme == 'window'){
				this.setState({
					windowDateData : datetime
				});
				this.props.onUpdate(datetime);
			}
			else if(this.props.theme == 'cubito'){
				this.setState({
					cubitoDateData : datetime,
				});
				this.props.onUpdate(datetime);	
			}
		}
		else{
			var datetime = formateddate;
			if(this.props.theme == undefined || this.props.theme == 'classic'){
				this.refs.DateTimeInput.value = datetime;
				this.props.onUpdate(this.refs.DateTimeInput.value);
			}
			else if(this.props.theme == 'window'){
				this.setState({
					windowDateData : datetime
				});
				this.props.onUpdate(datetime);
			}
			else if(this.props.theme == 'cubito'){
				this.setState({
					cubitoDateData : datetime
				});
				this.props.onUpdate(datetime);
			}
		}
	}

	// get no. of days in the month
	getDaysInMonth(month,year) {    
		return new Date(year, month, 0).getDate();   
	}

	// change hour
	changeHour(task){
		var currentHour = parseInt(this.refs.hour.value);
		if(this.props.timeFormat == '24' || this.props.timeFormat == undefined){
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
		else if(this.props.timeFormat == '12'){
			if(task == "INC" && currentHour < 12){
				this.refs.hour.value = currentHour + 1;
			}
			else if(task == "DEC" && currentHour > 1 ){
				this.refs.hour.value = currentHour - 1;
			}
			else if(currentHour >= 12){
				this.refs.hour.value = 1;
			}
			else if(currentHour <= 1){
				this.refs.hour.value = 12;
			}
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

	// Previsous date for theme cubito
	prevDate(){
		
		var month = this.state.selectedMonthVal;
		var year = this.state.selectedYearVal;
		var date = this.state.selectedDateVal;

		if(date>1){
			date = date - 1;			
		}
		if(date <= 1){
			date = this.getDaysInMonth(month-1, year);
			if(month>1){
				month = month-1;
			}
			else{
				month = 12;
				year-=1;
			}
			this.setState({
				selectedMonthVal:month
			})
		}
		this.selectDate(date,month,year);
	}

	// next date for theme cubito
	nextDate(){
		var month = this.state.selectedMonthVal;
		var year = this.state.selectedYearVal;
		var date = this.state.selectedDateVal;

		console.log(date,month,year);
		console.log(this.getDaysInMonth(month, year));
		if(date>= 1){
			date = date + 1;			
		}
		if(date > this.getDaysInMonth(month, year)){
			date = 1;
			if(month<12){
				month = month+1;
			}
			else{
				month = 1;
				year+=1;
			}
			this.setState({
				selectedMonthVal:month
			})
		}
		this.selectDate(date,month,year);	
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
		var navDaysBlock;
		var dateToday;
		var calendarStyle;
		var inlineBlocks;
		let dropDown;
		let inputBox;
		let reactCalendar;
		let calendar;
		let calendarData;
		let calendarNav;
		let calendarSuper;
		let anchorDiv;
		let toggleCalendar;
		let calendarMode;
		var navBlocks;
		var NextBtn;
		var PrevBtn;
		var months = [
			"JANUARY",
			"FEBRUARY",
			"MARCH",
			"APRIL",
			"MAY",
			"JUNE",
			"JULY",
			"AUGUST",
			"SEPTEMBER",
			"OCTOBER",
			"NOVEMBER",
			"DECEMBER"
		];
		if(this.props.theme == undefined || this.props.theme == 'classic'){
			dropdownstyle = {
				background: (this.props.background != undefined) ? this.props.background : "#ecf0f1",
				display:this.state.dropdowndisplay,
				width:(this.props.width != undefined) ? this.props.width : 300,
				boxShadow:"1px 1px 2px 1px #bdc3c7",
				textAlign:"center",
			};	
		}
		else if(this.props.theme == 'window' || this.props.theme == 'cubito'){
			dropdownstyle = {
				background: (this.props.background != undefined) ? this.props.background : "#ecf0f1",
				display:this.state.dropdowndisplay,
				width:(this.props.width != undefined) ? this.props.width : 300,
				boxShadow:"1px 1px 2px 1px #bdc3c7",
				textAlign:"center",
			};	
		}
		
		var inputBoxWrapper = {
			width:(this.props.width != undefined) ? (this.props.width - 70) : 350,
			borderStyle:(this.props.theme == 'window' || this.props.theme == 'cubito') ? "none" :"solid",
			borderWidth:1,
			borderColor:"#bdc3c7",
			fontFamily:"verdana",
			fontSize:16,
			textAlign:"center",
			borderRadius:2,
		};

		var inlineSuper = {
			display:"inline-block"
		}

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

		if(this.props.theme == undefined || this.props.theme == 'classic'){
			navDaysBlock = {
				display:"inline-block",
				width:"14%",
				borderStyle:"solid",
				borderWidth:1,
				borderColor:"#bdc3c7",
				cursor:"pointer"
			};	
		}
		else if(this.props.theme == 'window' || this.props.theme == 'cubito'){
			navDaysBlock = {
				display:"inline-block",
				width:"14%",
				background:"#e2e2e2",
				fontFamily:"verdana",
				fontSize:12,
				padding:2,
				borderStyle:"none",
				cursor:"pointer",
				color:"gray",
			};
		}
		
		if(this.props.theme == undefined || this.props.theme == 'classic'){
			calendarStyle = {
				display:this.state.Calendar,
				width:"100%",
				padding:8,
				textAlign:"center"
			};	
		}
		else if(this.props.theme == 'window' || this.props.theme == 'cubito'){
			calendarStyle = {
				display:this.state.Calendar,
				width:"100%",
				padding:0,
				textAlign:"center"
			};
		}
		
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
			marginBottom:6,
		};
		var navstyle={
			fontWeight:"bold",
			padding:6,
		};
		if(this.props.theme == undefined || this.props.theme == 'classic'){
			navBlocks={
				display:"inline-block",
			};	
		}
		else if(this.props.theme == 'window' || this.props.theme == 'cubito'){
			navBlocks={
				display:"inline-block",
				fontWeight:"normal",
				color:"#3498db",
				fontSize:24,
				fontFamily:"verdana",
			};	
		}
		
		if(this.props.theme == undefined || this.props.theme == 'classic'){
			NextBtn = nextBtn;
			PrevBtn = prevBtn;
		}
		else if(this.props.theme == 'window' || this.props.theme == 'cubito'){
			NextBtn = windowNext;
			PrevBtn = windowPrev;
		}
		var prev={
			float:"left",
			display:"inline-block",
			backgroundImage:"url('"+PrevBtn+"')",
			backgroundSize:"100% 100%",
			backgroundPosition:"center",
			backgroundColor:"transparent",
			borderStyle:"none",
			width:30,
			height:20,
			marginTop:7,
			outline:"none",
		};
		var next={
			float:"right",
			display:"inline-block",
			backgroundImage:"url('"+NextBtn+"')",
			backgroundSize:"100% 100%",
			backgroundColor:"transparent",
			borderStyle:"none",
			width:30,
			height:20,
			marginTop:7,
			outline:"none",
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

		// window vars
		var windowTitle = {
			backgroundColor:"#3498db",
			fontFamily:"verdana",
			fontSize:16,
			padding:3,
			color:"#ecf0f1",
			fontStyle:"italic",
			cursor:"pointer"
		};
		var windowDateText= {
			display:"inline-block",
		};
		var windowDateIcon = {
			display:"inline-block",
			float:"right",
			fontFamily:"verdana",
			fontSize:14,
			fontStyle:"normal",
			backgroundImage:"url("+calendarWindow+")",
			backgroundSize:"100% 100%",
			color:"#3498db",
			width:25,
		};
		var calendarSuperStyle = {
			textAlign : "right",
			color:"#dddddd",
			fontFamily:"verdana",
			fontSize:12,
			padding:"2px 10px 2px 2px",
			borderStyle:"solid",
			borderColor:"#e8e8e8",
			borderWidth:"0px 0px 1px 0px"
		};
		
		var cubitoTitle={
				display:"inline-block",
				width:"78%",
				borderStyle:"solid",
				borderColor:"#e5e5e5",
				borderWidth:1,
				textAlign:"center",
				fontSize:11,
				fontFamily:"verdana",
				fontWeight:"bold",
				padding:"3px 0px 3px 0px",
				color:"#7f8c8d",
				cursor:"pointer"
			};
			var cubitoinline={
				display:"inline-block",
				cursor:"pointer"
			};
			var cubitoinlineltr={
				display:"inline-block",
				float:"left",
				borderStyle:"solid",
				borderColor:"#e5e5e5",
				borderWidth:"0px 1px 0px 0px",
				textAlign:"center",
				width:25,
				cursor:"pointer",
			};
			var cubitoinlinertl={
				display:"inline-block",
				float:"right",
				borderStyle:"solid",
				borderColor:"#e5e5e5",
				borderWidth:"0px 0px 0px 1px",
				textAlign:"center",
				width:25,
				cursor:"pointer"
			};
			var cubitoToday = {
				display:"inline-block",
				marginLeft:6,
				width:"18%",
				background:"#34495e",
				borderStyle:"none",
				borderRadius:4,
				textAlign:"center",
				fontSize:12,
				fontFamily:"verdana",
				padding:"3px 0px 3px 0px",
				color:"#ecf0f1",
				cursor:"pointer",
			};
			
		// toggle Calendar
		if(this.props.theme == undefined || this.props.theme == 'classic'){
			toggleCalendar = (
				<div id='DateTime' style={selectTimeStyle} onClick={this.toggleCalendar.bind(this)}><img id='DateTime' src={calendarDark} width='20' alt='Toggle Calendar' title='Toggle calendar'/></div>
			);	
		}
		else if(this.props.theme == 'window' || this.props.theme == 'cubito'){
			toggleCalendar = (
				<div id='DateTime' style={selectTimeStyle} onClick={this.toggleCalendar.bind(this)}><img id='DateTime' src={windowCalendar} width='20' alt='Toggle Calendar' title='Toggle calendar'/></div>
			);	
		}
		

		// Calendar Nav
		if(this.props.theme == undefined || this.props.theme == "classic"){
			calendarNav = (
				<div style={navstyle}>
					<button id='DateTime' style={prev} onClick={this.prevMonth.bind(this, this.state.currentMonth, this.state.currentYear)}></button>
					<div style={navBlocks}>{this.state.currentMonth} / {this.state.currentYear}</div>
					<button id='DateTime' style={next} onClick={this.nextMonth.bind(this, this.state.currentMonth, this.state.currentYear)}></button>
				</div>
			);
		}
		else if(this.props.theme == 'window' || this.props.theme == 'cubito'){
			calendarNav = (
				<div style={navstyle}>
					<button id='DateTime' style={prev} onClick={this.prevMonth.bind(this, this.state.currentMonth, this.state.currentYear)}></button>
					<div style={navBlocks}>{months[this.state.currentMonth-1]} {this.state.currentYear}</div>
					<button id='DateTime' style={next} onClick={this.nextMonth.bind(this, this.state.currentMonth, this.state.currentYear)}></button>
				</div>
			);
		}

		// calendar Header containing days
		const calendarHeader = (
			<div style={calendarHeaderStyle}>
				<div style={navDaysBlock}>Mon</div>
				<div style={navDaysBlock}>Tue</div>
				<div style={navDaysBlock}>Wed</div>
				<div style={navDaysBlock}>Thu</div>
				<div style={navDaysBlock}>Fri</div>
				<div style={navDaysBlock}>Sat</div>
				<div style={navDaysBlock}>Sun</div>
			</div>
		);
		var counter = 0;
		var rowCount = 1;
		// Calendar dates
		calendar = this.state.calendarObj.map(function(index){
			counter++;
			if(this.props.theme == 'window' || this.props.theme == 'cubito'){
				var borderWidthVal;
				if(counter == 1 && rowCount == 1){
					borderWidthVal = "0px 1px 1px 0px";
				}
				else if(counter > 1 && counter < 7 && rowCount == 1){
					borderWidthVal = "0px 1px 1px 1px";
				}
				else if(counter == 7 && rowCount == 1){
					borderWidthVal = "0px 0px 1px 1px";
					counter = 0;
					rowCount++;
				}
				else if(counter == 7 && rowCount > 1 && rowCount < 5){
					borderWidthVal = "1px 0px 1px 1px";
					counter = 0;
					rowCount++;
				}
				else if(counter == 1 && rowCount > 1 && rowCount < 5){
					borderWidthVal = "1px 1px 1px 0px";	
				}
				else if(counter == 1 && rowCount == 5){
					borderWidthVal = "1px 1px 0px 0px";
				}
				else if(counter > 1 && counter < 7 && rowCount == 5){
					borderWidthVal = "1px 1px 0px 1px";
				}
				else if(counter == 7 && rowCount == 5){
					borderWidthVal = "1px 0px 0px 1px";
					counter = 0;
					rowCount = 0;
				}
				else{
					borderWidthVal = "1px 1px 1px 1px"; 
				}
			}
			else{
				borderWidthVal = 1;
			}

			if(this.props.theme == undefined || this.props.theme == 'classic'){
				inlineBlocks = {
					display:"inline-block",
					width:"14%",
					borderStyle:"solid",
					borderWidth:borderWidthVal,
					borderColor:"#bdc3c7",
					cursor:"pointer"
				};
			}
			else if(this.props.theme == 'window' || this.props.theme == 'cubito'){
				var height;
				if(this.props.width != undefined){
					height = (this.props.width - 100) / 6;
				}
				else{
					height = 300/7;
				}
				
				inlineBlocks = {
					display:"inline-block",
					width:"14%",
					padding:"2px 8px 2px 2px",
					fontFamily:"verdana",
					fontSize:12,
					color:"#7f8c8d",
					margin:"-1px 0px 0px 0px",
					height: height,
					textAlign:"right",
					verticalAlign:"text-top",
					borderStyle:"solid",
					borderWidth:borderWidthVal,
					borderColor:"#ecf0f1",
					cursor:"pointer"
				};
			}
			
			if(this.props.theme == undefined || this.props.theme == 'classic'){
				dateToday = {
					display:"inline-block",
					width:"14%",
					borderStyle:"solid",
					borderWidth:borderWidthVal,
					borderColor:"#bdc3c7",
					background:"#bdc3c7",
					fontWeight:"bold",
					cursor:"pointer"
				};	
			}
			else if(this.props.theme == 'window' || this.props.theme == 'cubito'){
				var height;
				if(this.props.width != undefined){
					height = (this.props.width - 100) / 6;
				}
				else{
					height = height = 300/7;	
				}
				dateToday = {
					display:"inline-block",
					width:"14%",
					padding:"2px 8px 2px 2px",
					margin:"-1px 0px 0px 0px",
					height:height,
					textAlign:"right",
					verticalAlign:"text-top",
					borderStyle:"solid",
					borderWidth:borderWidthVal,
					borderColor:"#3498db",
					background:"#3498db",
					cursor:"pointer",
					fontFamily:"verdana",
					fontSize:12,
					color:"#ecf0f1",
				};	
			}
			if(index != "" && index != this.state.todayDate.getDate()){
				return (
					<div onClick={this.selectDate.bind(this, index, this.state.currentMonth, this.state.currentYear)} style={inlineBlocks}>{index}</div>
				);
			}
			else if(index == ""){
				return (
					<div style={inlineBlocks}>{index}</div>
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
		
		// Calendar super Head
		calendarSuper = (
			<div style={calendarSuperStyle}>
				<div style={inlineSuper}>{toggleCalendar}</div>
				<div style={inlineSuper}>CALENDAR</div>
			</div>
		);
		// Combining calendar header and dates
		if(this.props.theme == undefined || this.props.theme == 'classic'){
			calendarData = (
				<div style={calendarStyle}>
					{calendarNav}
					{calendarHeader}
					{calendar}
				</div>
			);
		}
		else if(this.props.theme == 'window' || this.props.theme == 'cubito'){
			calendarData = (
				<div style={calendarStyle}>
					{calendarNav}
					{calendarHeader}
					{calendar}
				</div>
			);
		}
		
		
		// input box
		if(this.props.theme == 'classic' || this.props.theme == undefined){
			inputBox= (
				<div style={inputBoxWrapper}>
					<input id='DateTime' ref='DateTimeInput' type='text' style={inputstyle} onClick={this.showCalendar.bind(this)} placeholder={this.state.dateFormat+" "+this.state.timeFormat}/>
					<img style={calendarImgInline} src={calendarLight} width='26' />
				</div>
			);
		}
		else if(this.props.theme == 'window'){
			// WindowThemeInputTitle
			inputBox= (
				<div style={inputBoxWrapper}>
					<div id='DateTime' style={windowTitle} onClick={this.showCalendar.bind(this)}>
						<div id='DateTime' style={windowDateText} onClick={this.showCalendar.bind(this)}>{(this.state.windowDateData != "")? this.state.windowDateData : (this.state.todayDate.getDate() + "/" + this.state.currentMonth + "/" + this.state.currentYear)}</div>
						<div id='DateTime' style={windowDateIcon} onClick={this.showCalendar.bind(this)}>{this.state.todayDate.getDate()}</div>
					</div>
				</div>
			);
		}
		else if(this.props.theme == 'cubito'){
			
			inputBox= (
				<div style={inputBoxWrapper}>
					<div id='DateTime' style={cubitoTitle} onClick={this.showCalendar.bind(this)}>
						<div style={cubitoinlineltr} onClick={this.prevDate.bind(this)}><img src={cubitoPrev} width='15'/></div>
						<div id='DateTime' style={cubitoinline}>{(this.state.cubitoDateData != "")? this.state.cubitoDateData : (this.state.todayDate.getDate() + "/" + this.state.currentMonth + "/" + this.state.currentYear)}</div>
						<div style={cubitoinlinertl} onClick={this.nextDate.bind(this)}><img src={cubitoNext} width='15'/></div>
					</div>
					<div style={cubitoToday} onClick={this.selectDate.bind(this, this.state.todayDate.getDate(), this.state.todayDate.getMonth()+1, this.state.todayDate.getFullYear())}>Today</div>
				</div>
			);	
		}
		else{
			inputBox= (
				<div style={inputBoxWrapper}>
					<div id='DateTime' style={windowTitle}>
						Incorrect value in prop theme,<br /> react-datetime-calendar
					</div>
				</div>
			);	
		}

		//show clock
		let showClock;
		if(this.props.theme == undefined || this.props.theme == 'classic'){
			showClock=(
				<div id="DateTime" style={selectTimeStyle} onClick={this.showClock.bind(this)}><img id='DateTime' src={clockBtn} width='16' alt='Toggle Clock' title='Toggle Clock'/></div>
			);
		}
		else if(this.props.theme == 'window' || this.props.theme == 'cubito'){
			showClock=(
				<div id="DateTime" style={selectTimeStyle} onClick={this.showClock.bind(this)}><img id='DateTime' src={windowClock} width='16' alt='Toggle Clock' title='Toggle Clock'/></div>
			);
		}
		

		// 24 HR Clock
		const clockTypeOne = (
			<div style={clockStyle}>
				<div style={hourStyle}>
					<div id='DateTime' style={incDec} onClick={this.changeHour.bind(this, "INC")}> <img id='DateTime' src={incBtn} width='30' /> </div>
					<input name='hour' ref='hour' id='DateTime' style={timeInputStyle} type='text'/> 
					<div id='DateTime' style={incDec} onClick={this.changeHour.bind(this, "DEC")}> <img id='DateTime' src={decBtn} width='30' /> </div>
				</div>
				
				<div style={separator}>
					<div style={hiddenBlock}> + </div>
					<div> : </div>
					<div style={hiddenBlock}> - </div>
				</div>

				<div style={hourStyle}>
					<div id='DateTime' style={incDec} onClick={this.changeMinutes.bind(this, "INC")}> <img id='DateTime' src={incBtn} width='30' /> </div>
					<input ref='minutes' id='DateTime' style={timeInputStyle} type='text'/> 
					<div id='DateTime' style={incDec} onClick={this.changeMinutes.bind(this, "DEC")}> <img id='DateTime' src={decBtn} width='30' /> </div>
				</div>
			</div>
		);

		// 12 HR CLOCK
		const clockTypeTwo = (
			<div style={clockStyle}>
				<div style={hourStyle}>
					<div id='DateTime' style={incDec} onClick={this.changeHour.bind(this, "INC")}> <img id='DateTime' src={incBtn} width='30' /> </div>
					<input name='hour' ref='hour' id='DateTime' style={timeInputStyle} type='text'/> 
					<div id='DateTime' style={incDec} onClick={this.changeHour.bind(this, "DEC")}> <img id='DateTime' src={decBtn} width='30' /> </div>
				</div>
				
				<div style={separator}>
					<div style={hiddenBlock}> + </div>
					<div> : </div>
					<div style={hiddenBlock}> - </div>
				</div>

				<div style={hourStyle}>
					<div id='DateTime' style={incDec} onClick={this.changeMinutes.bind(this, "INC")}> <img id='DateTime' src={incBtn} width='30' /> </div>
					<input ref='minutes' id='DateTime' style={timeInputStyle} type='text'/> 
					<div id='DateTime' style={incDec} onClick={this.changeMinutes.bind(this, "DEC")}> <img id='DateTime' src={decBtn} width='30' /> </div>
				</div>

				<div style={hourStyle}>
					<div id='DateTime' style={incDec} onClick={this.changeAmPm.bind(this)}> <img id='DateTime' src={incBtn} width='30' /> </div>
					<input ref='ampm' id='DateTime' style={timeInputStyle} type='text'/> 
					<div id='DateTime' style={incDec} onClick={this.changeAmPm.bind(this)}> <img id='DateTime' src={decBtn} width='30' /> </div>
				</div>
			</div>
		);

		if(this.props.theme == undefined || this.props.theme == 'classic'){
			calendarMode = (
				<div>
					{toggleCalendar}
					{calendarData}
				</div>
			);
		}
		else if(this.props.theme == 'window' || this.props.theme == 'cubito'){
			calendarMode = (
				<div>
					{calendarSuper}
					{calendarData}
				</div>
			);
		}


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
		if(this.props.theme == undefined || this.props.theme == 'classic' ){
			if(this.props.mode == "datetime" || this.props.mode == undefined){
				if(this.props.timeFormat == undefined || this.props.timeFormat == "24"){
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
				if(this.props.timeFormat == undefined || this.props.timeFormat == "24"){
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
		}
		else if(this.props.theme == 'window' || this.props.theme == 'cubito'){
			if(this.props.mode == "datetime" || this.props.mode == undefined){
				if(this.props.timeFormat == undefined || this.props.timeFormat == "24"){
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
				if(this.props.timeFormat == undefined || this.props.timeFormat == "24"){
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
		}

		reactCalendar = (
			<div>
				{inputBox}
				{dropDown}
			</div>
		);

		return <div>
			{reactCalendar}
		</div>;
	}
}

export default DateTimePicker;