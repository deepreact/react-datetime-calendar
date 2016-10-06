'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               * @Author: Deep Prakash
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               * @Date:   2016-09-26 17:08:02
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               * @Last Modified by:   Deep Prakash
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               * @Last Modified time: 2016-10-03 17:32:45
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               */

// images
var calendarDark = require('file!./img/calendar.png');
var calendarLight = require('file!./img/calendarLight.png');
var prevBtn = require('file!./img/prev.png');
var nextBtn = require('file!./img/next.png');
var clockBtn = require('file!./img/clock.png');
var incBtn = require('file!./img/inc.png');
var decBtn = require('file!./img/dec.png');
var calendarWindow = require('file!./img/windowIcon.png');
var windowNext = require('file!./img/windowNext.png');
var windowPrev = require('file!./img/windowPrev.png');
var anchor = require('file!./img/anchor-blue.png');
var windowCalendar = require('file!./img/windowCalendar.png');
var windowClock = require('file!./img/windowClock.png');

var DateTimePicker = function (_React$Component) {
	_inherits(DateTimePicker, _React$Component);

	// Getting props and state
	function DateTimePicker(props) {
		var _this$state;

		_classCallCheck(this, DateTimePicker);

		var _this = _possibleConstructorReturn(this, (DateTimePicker.__proto__ || Object.getPrototypeOf(DateTimePicker)).call(this, props));

		_this.state = (_this$state = {
			dropdowndisplay: "none",
			calendarObj: [],
			currentMonth: 0
		}, _defineProperty(_this$state, 'currentMonth', 0), _defineProperty(_this$state, 'currentYear', 2016), _defineProperty(_this$state, 'todayDate', 1), _defineProperty(_this$state, 'currentTime', 0), _defineProperty(_this$state, 'Clock', ""), _defineProperty(_this$state, 'Calendar', ""), _defineProperty(_this$state, 'clockVisible', false), _defineProperty(_this$state, 'calendarVisible', true), _defineProperty(_this$state, 'submitTime', "none"), _defineProperty(_this$state, 'dateFormat', "YYYY-MM-DD"), _defineProperty(_this$state, 'timeFormat', "HH:MM"), _defineProperty(_this$state, 'ampm', ""), _defineProperty(_this$state, 'formatedDate', ""), _defineProperty(_this$state, 'windowDateData', ""), _this$state);
		return _this;
	}

	// when component is mount


	_createClass(DateTimePicker, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			document.addEventListener("click", this.hideCalender.bind(this), false);

			var today = new Date();
			var currentMonth = today.getMonth() + 1;
			var day_on_first = new Date(currentMonth + "/" + "01/" + today.getFullYear());

			var calendar_start = day_on_first.getDay();
			var no_of_days = this.getDaysInMonth(currentMonth, 2016);
			var ampm = "";
			// setting clock
			if (this.props.mode == "time" || this.props.mode == "datetime" || this.props.mode == undefined) {
				var time;
				// checking if time format is 12 hr
				if (this.props.timeFormat == "12") {
					if (parseInt(this.state.currentHour) > 12) {
						time = parseInt(this.state.currentHour) - 12;
						ampm = "PM";
						this.setState({
							ampm: ampm
						});
					} else {
						time = this.state.currentHour;
						ampm = "AM";
						this.setState({
							ampm: ampm
						});
					}
				} else {
					time = this.state.currentHour;
					ampm = "";
					this.setState({
						ampm: ampm
					});
				}

				if (ampm == "" || this.props.timeFormat == undefined) {
					this.refs.hour.value = time;
					this.refs.minutes.value = this.state.currentMinute;
				} else {
					this.refs.hour.value = time;
					this.refs.minutes.value = this.state.currentMinute;
					this.refs.ampm.value = ampm;
				}
			}
			if (this.props.mode == "time") {
				this.setState({
					Clock: "block",
					submitTime: "block"
				});
			}

			// setting format
			if (this.props.dateFormat != undefined) {
				this.setState({
					dateFormat: this.props.dateFormat
				});
			}
			if (this.props.timeFormat != undefined && this.props.timeFormat == '12') {
				this.setState({
					timeFormat: "HH:MM AM/PM"
				});
			} else {
				this.setState({
					timeFormat: "HH:MM"
				});
			}

			// getting calendar
			this.getCalendar(calendar_start, no_of_days, currentMonth, today.getFullYear());

			// Intializing Window Calendar input
			if (this.props.theme == 'window' && this.state.calendarVisible == true) {
				var formateddate;
				var formatedtime;
				var months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
				var date = today.getDate();
				var month = today.getMonth();
				var year = today.getFullYear();
				var datetimeData = "";
				var hr = "00";
				var min = "00";
				// adding 0 to single digit date
				if (date.toString().length == 1) {
					date = "0" + date;
				}
				// fomatting date
				if (this.state.dateFormat == 'YYYY-MM-DD' || this.state.dateFormat == 'yyyy-mm-dd') {
					// adding 0 to single digit month
					if (month.toString().length == 1) {
						month = "0" + month;
					}
					formateddate = year + "-" + month + "-" + date;
				} else if (this.state.dateFormat == 'DD-MM-YYYY' || this.state.dateFormat == 'dd-mm-yyyy') {
					// adding 0 to single digit month
					if (month.toString().length == 1) {
						month = "0" + month;
					}
					formateddate = date + "-" + month + "-" + year;
				} else if (this.state.dateFormat == 'YYYY/MM/DD' || this.state.dateFormat == 'yyyy/mm/dd') {
					// adding 0 to single digit month
					if (month.toString().length == 1) {
						month = "0" + month;
					}
					formateddate = year + "/" + month + "/" + date;
				} else if (this.state.dateFormat == 'DD/MM/YYYY' || this.state.dateFormat == 'dd/mm/yyyy') {
					// adding 0 to single digit month
					if (month.toString().length == 1) {
						month = "0" + month;
					}
					formateddate = date + "/" + month + "/" + year;
				} else if (this.state.dateFormat == 'MONTH DATE YEAR' || this.state.dateFormat == 'month date year') {
					formateddate = months[month - 1] + " " + date + " " + year;
				} else if (this.state.dateFormat == 'DATE MONTH YEAR' || this.state.dateFormat == 'date month year') {
					formateddate = date + " " + months[month - 1] + " " + year;
				} else {
					formateddate = year + "-" + month + "-" + date;
				}

				// getting time in format
				if (this.refs.hour.value.length == 1) {
					hr = "0" + this.refs.hour.value;
				} else {
					hr = this.refs.hour.value;
				}
				if (this.refs.minutes.value.length == 1) {
					min = "0" + this.refs.minutes.value;
				} else {
					min = this.refs.minutes.value;
				}

				// formatting time
				if (ampm.length != 0) {
					formatedtime = hr + ":" + min + ":00 " + ampm;
				} else {
					formatedtime = hr + ":" + min + ":00";
				}

				//setting input value according to format
				if (this.props.mode == 'date') {
					this.setState({
						windowDateData: formateddate
					});
				} else if (this.props.mode == 'time') {
					this.setState({
						windowDateData: formatedtime
					});
				} else {
					datetimeData = formateddate + " " + formatedtime;
					this.setState({
						windowDateData: datetimeData
					});
				}
			}
		}

		// Component will mount

	}, {
		key: 'componentWillMount',
		value: function componentWillMount() {
			var today = new Date();
			var currentMonth = today.getMonth() + 1;
			var currentYear = today.getFullYear();
			var currentDate = today.getDate();
			var currentHour = today.getHours();
			var currentMinute = today.getMinutes();
			this.setState({
				todayDate: today,
				currentMonth: currentMonth,
				currentYear: currentYear,
				currentHour: currentHour,
				currentMinute: currentMinute,
				Clock: "none"
			});
		}

		// show calender when clicked on input box

	}, {
		key: 'showCalendar',
		value: function showCalendar() {
			this.setState({
				dropdowndisplay: "block"
			});
		}

		// Hiding calendar on clicking outside

	}, {
		key: 'hideCalender',
		value: function hideCalender(event) {
			if (event.target.id != "DateTime") {
				var formatedtime;
				if (this.state.clockVisible == true && this.state.calendarVisible == false || this.props.mode == "time") {
					var hr = "00";
					var min = "00";
					if (this.refs.hour.value.length == 1) {
						hr = "0" + this.refs.hour.value;
					} else {
						hr = this.refs.hour.value;
					}
					if (this.refs.minutes.value.length == 1) {
						min = "0" + this.refs.minutes.value;
					} else {
						min = this.refs.minutes.value;
					}
					// formatting time
					if (this.state.ampm.length != 0) {
						formatedtime = hr + ":" + min + ":00 " + this.state.ampm;
					} else {
						formatedtime = hr + ":" + min + ":00";
					}

					if (this.props.theme == undefined || this.props.theme == 'classic') {
						this.refs.DateTimeInput.value = formatedtime;
						// pushing the input value out
						this.props.onUpdate(this.refs.DateTimeInput.value);
					} else if (this.props.theme == 'window') {
						this.setState({
							windowDateData: formatedtime
						});
						this.props.onUpdate(formatedtime);
					}
				}

				this.setState({
					dropdowndisplay: "none"
				});
			}
		}

		// get calendar of a month

	}, {
		key: 'getCalendar',
		value: function getCalendar(calendar_start, no_of_days, currentMonth, currentYear) {
			var calendarObj = [];
			var date_counter = 0;

			for (var i = 1; i <= 35; i++) {
				if (i < calendar_start || date_counter >= no_of_days) {
					calendarObj.push("");
				} else if (i >= calendar_start) {
					date_counter += 1;
					calendarObj.push(date_counter);
				}
			}
			this.setState({
				calendarObj: calendarObj,
				currentMonth: currentMonth,
				currentYear: currentYear
			});
		}

		// get nextmonth

	}, {
		key: 'nextMonth',
		value: function nextMonth(month, year) {
			if (month < 12) {
				var currentMonth = month + 1;
				var day_on_first = new Date(currentMonth + "/" + "01/" + year);

				var calendar_start = day_on_first.getDay();
				var no_of_days = this.getDaysInMonth(currentMonth, 2016);
				this.getCalendar(calendar_start, no_of_days, currentMonth, year);
			} else {
				month = 1;
				year += 1;
				var currentMonth = month;
				var day_on_first = new Date(currentMonth + "/" + "01/" + year);

				var calendar_start = day_on_first.getDay();
				var no_of_days = this.getDaysInMonth(currentMonth, 2016);
				this.getCalendar(calendar_start, no_of_days, currentMonth, year);
			}
		}

		// get Previsous Month

	}, {
		key: 'prevMonth',
		value: function prevMonth(month, year) {
			if (month > 1) {
				var currentMonth = month - 1;
				var day_on_first = new Date(currentMonth + "/" + "01/" + year);

				var calendar_start = day_on_first.getDay();
				var no_of_days = this.getDaysInMonth(currentMonth, 2016);
				this.getCalendar(calendar_start, no_of_days, currentMonth, year);
			} else {
				month = 12;
				year -= 1;
				var currentMonth = month;
				var day_on_first = new Date(currentMonth + "/" + "01/" + year);

				var calendar_start = day_on_first.getDay();
				var no_of_days = this.getDaysInMonth(currentMonth, 2016);
				this.getCalendar(calendar_start, no_of_days, currentMonth, year);
			}
		}

		// Select Date

	}, {
		key: 'selectDate',
		value: function selectDate(date, month, year) {
			var formateddate;
			var formatedtime;
			var months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

			// adding 0 to single digit date
			if (date.toString().length == 1) {
				date = "0" + date;
			}
			// fomatting date
			if (this.state.dateFormat == 'YYYY-MM-DD' || this.state.dateFormat == 'yyyy-mm-dd') {
				// adding 0 to single digit month
				if (month.toString().length == 1) {
					month = "0" + month;
				}
				formateddate = year + "-" + month + "-" + date;
			} else if (this.state.dateFormat == 'DD-MM-YYYY' || this.state.dateFormat == 'dd-mm-yyyy') {
				// adding 0 to single digit month
				if (month.toString().length == 1) {
					month = "0" + month;
				}
				formateddate = date + "-" + month + "-" + year;
			} else if (this.state.dateFormat == 'YYYY/MM/DD' || this.state.dateFormat == 'yyyy/mm/dd') {
				// adding 0 to single digit month
				if (month.toString().length == 1) {
					month = "0" + month;
				}
				formateddate = year + "/" + month + "/" + date;
			} else if (this.state.dateFormat == 'DD/MM/YYYY' || this.state.dateFormat == 'dd/mm/yyyy') {
				// adding 0 to single digit month
				if (month.toString().length == 1) {
					month = "0" + month;
				}
				formateddate = date + "/" + month + "/" + year;
			} else if (this.state.dateFormat == 'MONTH DATE YEAR' || this.state.dateFormat == 'month date year') {
				formateddate = months[month - 1] + " " + date + " " + year;
			} else if (this.state.dateFormat == 'DATE MONTH YEAR' || this.state.dateFormat == 'date month year') {
				formateddate = date + " " + months[month - 1] + " " + year;
			} else {
				formateddate = year + "-" + month + "-" + date;
			}

			if (this.state.clockVisible == true) {
				var hr = "00";
				var min = "00";
				if (this.refs.hour.value.length == 1) {
					hr = "0" + this.refs.hour.value;
				} else {
					hr = this.refs.hour.value;
				}
				if (this.refs.minutes.value.length == 1) {
					min = "0" + this.refs.minutes.value;
				} else {
					min = this.refs.minutes.value;
				}

				// formatting time
				if (this.state.ampm.length != 0) {
					formatedtime = hr + ":" + min + ":00 " + this.state.ampm;
				} else {
					formatedtime = hr + ":" + min + ":00";
				}

				var datetime = formateddate + " " + formatedtime;
				if (this.props.theme == undefined || this.props.theme == 'classic') {
					this.refs.DateTimeInput.value = datetime;
					this.props.onUpdate(this.refs.DateTimeInput.value);
				} else if (this.props.theme == 'window') {
					this.setState({
						windowDateData: datetime
					});
					this.props.onUpdate(datetime);
				}
			} else {
				var datetime = formateddate;
				if (this.props.theme == undefined || this.props.theme == 'classic') {
					this.refs.DateTimeInput.value = datetime;
					this.props.onUpdate(this.refs.DateTimeInput.value);
				} else if (this.props.theme == 'window') {
					this.setState({
						windowDateData: datetime
					});
					this.props.onUpdate(datetime);
				}
			}
		}

		// get no. of days in the month

	}, {
		key: 'getDaysInMonth',
		value: function getDaysInMonth(month, year) {
			return new Date(year, month, 0).getDate();
		}

		// change hour

	}, {
		key: 'changeHour',
		value: function changeHour(task) {
			var currentHour = parseInt(this.refs.hour.value);
			if (task == "INC" && currentHour < 23) {
				this.refs.hour.value = currentHour + 1;
			} else if (task == "DEC" && currentHour > 0) {
				this.refs.hour.value = currentHour - 1;
			} else if (currentHour >= 23) {
				this.refs.hour.value = 0;
			} else if (currentHour <= 0) {
				this.refs.hour.value = 23;
			}
		}

		// Change Minutes

	}, {
		key: 'changeMinutes',
		value: function changeMinutes(task) {
			var currentHour = parseInt(this.refs.minutes.value);
			if (task == "INC" && currentHour < 59) {
				this.refs.minutes.value = currentHour + 1;
			} else if (task == "DEC" && currentHour > 0) {
				this.refs.minutes.value = currentHour - 1;
			} else if (currentHour >= 59) {
				this.refs.minutes.value = 0;
			} else if (currentHour <= 0) {
				this.refs.minutes.value = 59;
			}
		}

		// Change AM PM

	}, {
		key: 'changeAmPm',
		value: function changeAmPm() {
			if (this.refs.ampm.value == "AM") {
				this.refs.ampm.value = "PM";
				this.setState({
					ampm: "PM"
				});
			} else {
				this.refs.ampm.value = "AM";
				this.setState({
					ampm: "AM"
				});
			}
		}

		// Show clock

	}, {
		key: 'showClock',
		value: function showClock() {
			if (this.state.clockVisible == false) {
				if (this.state.calendarVisible == false) {
					this.setState({
						Clock: "block",
						clockVisible: true,
						submitTime: "block"
					});
				} else {
					this.setState({
						Clock: "block",
						clockVisible: true,
						submitTime: "none"
					});
				}
			} else {
				this.setState({
					Clock: "none",
					clockVisible: false
				});
			}
		}

		// toggle Calendar

	}, {
		key: 'toggleCalendar',
		value: function toggleCalendar() {
			if (this.state.calendarVisible == true) {
				if (this.state.clockVisible == true) {
					this.setState({
						Calendar: "none",
						calendarVisible: false,
						submitTime: "block"
					});
				} else {
					this.setState({
						Calendar: "none",
						calendarVisible: false
					});
				}
			} else {
				if (this.state.clockVisible == true) {
					this.setState({
						Calendar: "block",
						calendarVisible: true,
						submitTime: "none"
					});
				} else {
					this.setState({
						Calendar: "block",
						calendarVisible: true
					});
				}
			}
		}

		// Rendering the view

	}, {
		key: 'render',
		value: function render() {
			// styles
			var dropdownstyle;
			var navDaysBlock;
			var dateToday;
			var calendarStyle;
			var inlineBlocks;
			var dropDown = void 0;
			var inputBox = void 0;
			var reactCalendar = void 0;
			var calendar = void 0;
			var calendarData = void 0;
			var calendarNav = void 0;
			var calendarSuper = void 0;
			var anchorDiv = void 0;
			var toggleCalendar = void 0;
			var calendarMode = void 0;
			var navBlocks;
			var NextBtn;
			var PrevBtn;
			var months = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"];
			if (this.props.theme == undefined || this.props.theme == 'classic') {
				dropdownstyle = {
					background: this.props.background != undefined ? this.props.background : "#ecf0f1",
					display: this.state.dropdowndisplay,
					width: this.props.width != undefined ? this.props.width : 300,
					boxShadow: "1px 1px 2px 1px #bdc3c7",
					textAlign: "center"
				};
			} else if (this.props.theme == 'window') {
				dropdownstyle = {
					background: this.props.background != undefined ? this.props.background : "#ecf0f1",
					display: this.state.dropdowndisplay,
					width: this.props.width != undefined ? this.props.width : 300,
					boxShadow: "1px 1px 2px 1px #bdc3c7",
					textAlign: "center"
				};
			}

			var inputBoxWrapper = {
				width: this.props.width != undefined ? this.props.width - 100 : 300,
				borderStyle: this.props.theme == 'window' ? "none" : "solid",
				borderWidth: 1,
				borderColor: "#bdc3c7",
				fontFamily: "verdana",
				fontSize: 16,
				textAlign: "center",
				borderRadius: 2
			};

			var inlineSuper = {
				display: "inline-block"
			};

			var calendarImgInline = {
				display: "inline-block",
				marginTop: "-5px"
			};

			var inputstyle = {
				outline: "none",
				width: "90%",
				padding: 4,
				borderStyle: "none",
				display: "inline-block"
			};

			if (this.props.theme == undefined || this.props.theme == 'classic') {
				navDaysBlock = {
					display: "inline-block",
					width: "14%",
					borderStyle: "solid",
					borderWidth: 1,
					borderColor: "#bdc3c7",
					cursor: "pointer"
				};
			} else if (this.props.theme == 'window') {
				navDaysBlock = {
					display: "inline-block",
					width: "14%",
					background: "#e2e2e2",
					fontFamily: "verdana",
					fontSize: 12,
					padding: 2,
					borderStyle: "none",
					cursor: "pointer",
					color: "gray"
				};
			}

			if (this.props.theme == undefined || this.props.theme == 'classic') {
				calendarStyle = {
					display: this.state.Calendar,
					width: "100%",
					padding: 8,
					textAlign: "center"
				};
			} else if (this.props.theme == 'window') {
				calendarStyle = {
					display: this.state.Calendar,
					width: "100%",
					padding: 0,
					textAlign: "center"
				};
			}

			var calendarHead = {
				fontWeight: "bold"
			};
			var nullBlock = {
				visibility: "hidden",
				display: "inline-block",
				width: "14%",
				borderStyle: "solid",
				borderWidth: 1,
				borderColor: "#bdc3c7"
			};
			var calendarHeaderStyle = {
				marginBottom: 6
			};
			var navstyle = {
				fontWeight: "bold",
				padding: 6
			};
			if (this.props.theme == undefined || this.props.theme == 'classic') {
				navBlocks = {
					display: "inline-block"
				};
			} else if (this.props.theme == 'window') {
				navBlocks = {
					display: "inline-block",
					fontWeight: "normal",
					color: "#3498db",
					fontSize: 24,
					fontFamily: "verdana"
				};
			}

			if (this.props.theme == undefined || this.props.theme == 'classic') {
				NextBtn = nextBtn;
				PrevBtn = prevBtn;
			} else if (this.props.theme == 'window') {
				NextBtn = windowNext;
				PrevBtn = windowPrev;
			}
			var prev = {
				float: "left",
				display: "inline-block",
				backgroundImage: "url('" + PrevBtn + "')",
				backgroundSize: "100% 100%",
				backgroundPosition: "center",
				backgroundColor: "transparent",
				borderStyle: "none",
				width: 30,
				height: 20,
				marginTop: 7,
				outline: "none"
			};
			var next = {
				float: "right",
				display: "inline-block",
				backgroundImage: "url('" + NextBtn + "')",
				backgroundSize: "100% 100%",
				backgroundColor: "transparent",
				borderStyle: "none",
				width: 30,
				height: 20,
				marginTop: 7,
				outline: "none"
			};

			var clockStyle = {
				display: this.state.Clock,
				width: "100%",
				textAlign: "center"
			};
			var hourStyle = {
				display: "inline-block",
				margin: 10
			};
			var incDec = {
				fontWeight: "bold",
				fontSize: 18,
				cursor: "pointer"
			};
			var timeInputStyle = {
				width: 30,
				textAlign: "center"
			};
			var separator = {
				fontWeight: "bold",
				fontSize: 20,
				display: "inline-block"
			};
			var hiddenBlock = {
				visibility: "hidden"
			};

			var selectTimeStyle = {
				cursor: "pointer",
				padding: 10
			};

			var submitTime = {
				display: this.state.submitTime,
				padding: 6,
				cursor: "pointer",
				borderStyle: "solid",
				borderWidth: 1,
				borderColor: "#95a5a6"
			};

			// window vars
			var windowTitle = {
				backgroundColor: "#3498db",
				fontFamily: "verdana",
				fontSize: 16,
				padding: 3,
				color: "#ecf0f1",
				fontStyle: "italic",
				cursor: "pointer"
			};
			var windowDateText = {
				display: "inline-block"
			};
			var windowDateIcon = {
				display: "inline-block",
				float: "right",
				fontFamily: "verdana",
				fontSize: 14,
				fontStyle: "normal",
				backgroundImage: "url(" + calendarWindow + ")",
				backgroundSize: "100% 100%",
				color: "#3498db",
				width: 25
			};
			var calendarSuperStyle = {
				textAlign: "right",
				color: "#dddddd",
				fontFamily: "verdana",
				fontSize: 12,
				padding: "2px 10px 2px 2px",
				borderStyle: "solid",
				borderColor: "#e8e8e8",
				borderWidth: "0px 0px 1px 0px"
			};

			// toggle Calendar
			if (this.props.theme == undefined || this.props.theme == 'classic') {
				toggleCalendar = _react2.default.createElement(
					'div',
					{ id: 'DateTime', style: selectTimeStyle, onClick: this.toggleCalendar.bind(this) },
					_react2.default.createElement('img', { id: 'DateTime', src: calendarDark, width: '20', alt: 'Toggle Calendar', title: 'Toggle calendar' })
				);
			} else if (this.props.theme == 'window') {
				toggleCalendar = _react2.default.createElement(
					'div',
					{ id: 'DateTime', style: selectTimeStyle, onClick: this.toggleCalendar.bind(this) },
					_react2.default.createElement('img', { id: 'DateTime', src: windowCalendar, width: '20', alt: 'Toggle Calendar', title: 'Toggle calendar' })
				);
			}

			// Calendar Nav
			if (this.props.theme == undefined || this.props.theme == "classic") {
				calendarNav = _react2.default.createElement(
					'div',
					{ style: navstyle },
					_react2.default.createElement('button', { id: 'DateTime', style: prev, onClick: this.prevMonth.bind(this, this.state.currentMonth, this.state.currentYear) }),
					_react2.default.createElement(
						'div',
						{ style: navBlocks },
						this.state.currentMonth,
						' / ',
						this.state.currentYear
					),
					_react2.default.createElement('button', { id: 'DateTime', style: next, onClick: this.nextMonth.bind(this, this.state.currentMonth, this.state.currentYear) })
				);
			} else if (this.props.theme == 'window') {
				calendarNav = _react2.default.createElement(
					'div',
					{ style: navstyle },
					_react2.default.createElement('button', { id: 'DateTime', style: prev, onClick: this.prevMonth.bind(this, this.state.currentMonth, this.state.currentYear) }),
					_react2.default.createElement(
						'div',
						{ style: navBlocks },
						months[this.state.currentMonth - 1],
						' ',
						this.state.currentYear
					),
					_react2.default.createElement('button', { id: 'DateTime', style: next, onClick: this.nextMonth.bind(this, this.state.currentMonth, this.state.currentYear) })
				);
			}

			// calendar Header containing days
			var calendarHeader = _react2.default.createElement(
				'div',
				{ style: calendarHeaderStyle },
				_react2.default.createElement(
					'div',
					{ style: navDaysBlock },
					'Mon'
				),
				_react2.default.createElement(
					'div',
					{ style: navDaysBlock },
					'Tue'
				),
				_react2.default.createElement(
					'div',
					{ style: navDaysBlock },
					'Wed'
				),
				_react2.default.createElement(
					'div',
					{ style: navDaysBlock },
					'Thu'
				),
				_react2.default.createElement(
					'div',
					{ style: navDaysBlock },
					'Fri'
				),
				_react2.default.createElement(
					'div',
					{ style: navDaysBlock },
					'Sat'
				),
				_react2.default.createElement(
					'div',
					{ style: navDaysBlock },
					'Sun'
				)
			);
			var counter = 0;
			var rowCount = 1;
			// Calendar dates
			calendar = this.state.calendarObj.map(function (index) {
				counter++;
				if (this.props.theme == 'window') {
					var borderWidthVal;
					if (counter == 1 && rowCount == 1) {
						borderWidthVal = "0px 1px 1px 0px";
					} else if (counter > 1 && counter < 7 && rowCount == 1) {
						borderWidthVal = "0px 1px 1px 1px";
					} else if (counter == 7 && rowCount == 1) {
						borderWidthVal = "0px 0px 1px 1px";
						counter = 0;
						rowCount++;
					} else if (counter == 7 && rowCount > 1 && rowCount < 5) {
						borderWidthVal = "1px 0px 1px 1px";
						counter = 0;
						rowCount++;
					} else if (counter == 1 && rowCount > 1 && rowCount < 5) {
						borderWidthVal = "1px 1px 1px 0px";
					} else if (counter == 1 && rowCount == 5) {
						borderWidthVal = "1px 1px 0px 0px";
					} else if (counter > 1 && counter < 7 && rowCount == 5) {
						borderWidthVal = "1px 1px 0px 1px";
					} else if (counter == 7 && rowCount == 5) {
						borderWidthVal = "1px 0px 0px 1px";
						counter = 0;
						rowCount = 0;
					} else {
						borderWidthVal = "1px 1px 1px 1px";
					}
				} else {
					borderWidthVal = 1;
				}

				if (this.props.theme == undefined || this.props.theme == 'classic') {
					inlineBlocks = {
						display: "inline-block",
						width: "14%",
						borderStyle: "solid",
						borderWidth: borderWidthVal,
						borderColor: "#bdc3c7",
						cursor: "pointer"
					};
				} else if (this.props.theme == 'window') {
					var height;
					if (this.props.width != undefined) {
						height = (this.props.width - 100) / 6;
					} else {
						height = 300 / 7;
					}

					inlineBlocks = {
						display: "inline-block",
						width: "14%",
						padding: "2px 8px 2px 2px",
						fontFamily: "verdana",
						fontSize: 12,
						color: "#7f8c8d",
						margin: "-1px 0px 0px 0px",
						height: height,
						textAlign: "right",
						verticalAlign: "text-top",
						borderStyle: "solid",
						borderWidth: borderWidthVal,
						borderColor: "#ecf0f1",
						cursor: "pointer"
					};
				}

				if (this.props.theme == undefined || this.props.theme == 'classic') {
					dateToday = {
						display: "inline-block",
						width: "14%",
						borderStyle: "solid",
						borderWidth: borderWidthVal,
						borderColor: "#bdc3c7",
						background: "#bdc3c7",
						fontWeight: "bold",
						cursor: "pointer"
					};
				} else if (this.props.theme == 'window') {
					var height;
					if (this.props.width != undefined) {
						height = (this.props.width - 100) / 6;
					} else {
						height = height = 300 / 7;
					}
					dateToday = {
						display: "inline-block",
						width: "14%",
						padding: "2px 8px 2px 2px",
						margin: "-1px 0px 0px 0px",
						height: height,
						textAlign: "right",
						verticalAlign: "text-top",
						borderStyle: "solid",
						borderWidth: borderWidthVal,
						borderColor: "#3498db",
						background: "#3498db",
						cursor: "pointer",
						fontFamily: "verdana",
						fontSize: 12,
						color: "#ecf0f1"
					};
				}
				if (index != "" && index != this.state.todayDate.getDate()) {
					return _react2.default.createElement(
						'div',
						{ onClick: this.selectDate.bind(this, index, this.state.currentMonth, this.state.currentYear), style: inlineBlocks },
						index
					);
				} else if (index == "" && this.props.theme == 'window') {
					return _react2.default.createElement(
						'div',
						{ style: inlineBlocks },
						index
					);
				} else if (index == this.state.todayDate.getDate()) {
					if (this.state.todayDate.getMonth() + 1 == this.state.currentMonth && this.state.todayDate.getFullYear() == this.state.currentYear) {
						return _react2.default.createElement(
							'div',
							{ onClick: this.selectDate.bind(this, index, this.state.currentMonth, this.state.currentYear), style: dateToday },
							index
						);
					} else {
						return _react2.default.createElement(
							'div',
							{ onClick: this.selectDate.bind(this, index, this.state.currentMonth, this.state.currentYear), style: inlineBlocks },
							index
						);
					}
				} else {
					return _react2.default.createElement('div', { style: nullBlock });
				}
			}.bind(this));

			// Calendar super Head
			calendarSuper = _react2.default.createElement(
				'div',
				{ style: calendarSuperStyle },
				_react2.default.createElement(
					'div',
					{ style: inlineSuper },
					toggleCalendar
				),
				_react2.default.createElement(
					'div',
					{ style: inlineSuper },
					'CALENDAR'
				)
			);
			// Combining calendar header and dates
			if (this.props.theme == undefined || this.props.theme == 'classic') {
				calendarData = _react2.default.createElement(
					'div',
					{ style: calendarStyle },
					calendarNav,
					calendarHeader,
					calendar
				);
			} else if (this.props.theme == 'window') {
				calendarData = _react2.default.createElement(
					'div',
					{ style: calendarStyle },
					calendarNav,
					calendarHeader,
					calendar
				);
			}

			// input box
			if (this.props.theme == 'classic' || this.props.theme == undefined) {
				inputBox = _react2.default.createElement(
					'div',
					{ style: inputBoxWrapper },
					_react2.default.createElement('input', { id: 'DateTime', ref: 'DateTimeInput', type: 'text', style: inputstyle, onClick: this.showCalendar.bind(this), placeholder: this.state.dateFormat + " " + this.state.timeFormat }),
					_react2.default.createElement('img', { style: calendarImgInline, src: calendarLight, width: '26' })
				);
			} else if (this.props.theme == 'window') {
				// WindowThemeInputTitle
				inputBox = _react2.default.createElement(
					'div',
					{ style: inputBoxWrapper },
					_react2.default.createElement(
						'div',
						{ id: 'DateTime', style: windowTitle, onClick: this.showCalendar.bind(this) },
						_react2.default.createElement(
							'div',
							{ id: 'DateTime', style: windowDateText, onClick: this.showCalendar.bind(this) },
							this.state.windowDateData != "" ? this.state.windowDateData : this.state.todayDate.getDate() + "/" + this.state.currentMonth + "/" + this.state.currentYear
						),
						_react2.default.createElement(
							'div',
							{ id: 'DateTime', style: windowDateIcon, onClick: this.showCalendar.bind(this) },
							this.state.todayDate.getDate()
						)
					)
				);
			}

			//show clock
			var showClock = void 0;
			if (this.props.theme == undefined || this.props.theme == 'classic') {
				showClock = _react2.default.createElement(
					'div',
					{ id: 'DateTime', style: selectTimeStyle, onClick: this.showClock.bind(this) },
					_react2.default.createElement('img', { id: 'DateTime', src: clockBtn, width: '16', alt: 'Toggle Clock', title: 'Toggle Clock' })
				);
			} else if (this.props.theme == 'window') {
				showClock = _react2.default.createElement(
					'div',
					{ id: 'DateTime', style: selectTimeStyle, onClick: this.showClock.bind(this) },
					_react2.default.createElement('img', { id: 'DateTime', src: windowClock, width: '16', alt: 'Toggle Clock', title: 'Toggle Clock' })
				);
			}

			// 24 HR Clock
			var clockTypeOne = _react2.default.createElement(
				'div',
				{ style: clockStyle },
				_react2.default.createElement(
					'div',
					{ style: hourStyle },
					_react2.default.createElement(
						'div',
						{ id: 'DateTime', style: incDec, onClick: this.changeHour.bind(this, "INC") },
						' ',
						_react2.default.createElement('img', { id: 'DateTime', src: incBtn, width: '30' }),
						' '
					),
					_react2.default.createElement('input', { name: 'hour', ref: 'hour', id: 'DateTime', style: timeInputStyle, type: 'text' }),
					_react2.default.createElement(
						'div',
						{ id: 'DateTime', style: incDec, onClick: this.changeHour.bind(this, "DEC") },
						' ',
						_react2.default.createElement('img', { id: 'DateTime', src: decBtn, width: '30' }),
						' '
					)
				),
				_react2.default.createElement(
					'div',
					{ style: separator },
					_react2.default.createElement(
						'div',
						{ style: hiddenBlock },
						' + '
					),
					_react2.default.createElement(
						'div',
						null,
						' : '
					),
					_react2.default.createElement(
						'div',
						{ style: hiddenBlock },
						' - '
					)
				),
				_react2.default.createElement(
					'div',
					{ style: hourStyle },
					_react2.default.createElement(
						'div',
						{ id: 'DateTime', style: incDec, onClick: this.changeMinutes.bind(this, "INC") },
						' ',
						_react2.default.createElement('img', { id: 'DateTime', src: incBtn, width: '30' }),
						' '
					),
					_react2.default.createElement('input', { ref: 'minutes', id: 'DateTime', style: timeInputStyle, type: 'text' }),
					_react2.default.createElement(
						'div',
						{ id: 'DateTime', style: incDec, onClick: this.changeMinutes.bind(this, "DEC") },
						' ',
						_react2.default.createElement('img', { id: 'DateTime', src: decBtn, width: '30' }),
						' '
					)
				)
			);

			// 12 HR CLOCK
			var clockTypeTwo = _react2.default.createElement(
				'div',
				{ style: clockStyle },
				_react2.default.createElement(
					'div',
					{ style: hourStyle },
					_react2.default.createElement(
						'div',
						{ id: 'DateTime', style: incDec, onClick: this.changeHour.bind(this, "INC") },
						' ',
						_react2.default.createElement('img', { id: 'DateTime', src: incBtn, width: '30' }),
						' '
					),
					_react2.default.createElement('input', { name: 'hour', ref: 'hour', id: 'DateTime', style: timeInputStyle, type: 'text' }),
					_react2.default.createElement(
						'div',
						{ id: 'DateTime', style: incDec, onClick: this.changeHour.bind(this, "DEC") },
						' ',
						_react2.default.createElement('img', { id: 'DateTime', src: decBtn, width: '30' }),
						' '
					)
				),
				_react2.default.createElement(
					'div',
					{ style: separator },
					_react2.default.createElement(
						'div',
						{ style: hiddenBlock },
						' + '
					),
					_react2.default.createElement(
						'div',
						null,
						' : '
					),
					_react2.default.createElement(
						'div',
						{ style: hiddenBlock },
						' - '
					)
				),
				_react2.default.createElement(
					'div',
					{ style: hourStyle },
					_react2.default.createElement(
						'div',
						{ id: 'DateTime', style: incDec, onClick: this.changeMinutes.bind(this, "INC") },
						' ',
						_react2.default.createElement('img', { id: 'DateTime', src: incBtn, width: '30' }),
						' '
					),
					_react2.default.createElement('input', { ref: 'minutes', id: 'DateTime', style: timeInputStyle, type: 'text' }),
					_react2.default.createElement(
						'div',
						{ id: 'DateTime', style: incDec, onClick: this.changeMinutes.bind(this, "DEC") },
						' ',
						_react2.default.createElement('img', { id: 'DateTime', src: decBtn, width: '30' }),
						' '
					)
				),
				_react2.default.createElement(
					'div',
					{ style: hourStyle },
					_react2.default.createElement(
						'div',
						{ id: 'DateTime', style: incDec, onClick: this.changeAmPm.bind(this) },
						' ',
						_react2.default.createElement('img', { id: 'DateTime', src: incBtn, width: '30' }),
						' '
					),
					_react2.default.createElement('input', { ref: 'ampm', id: 'DateTime', style: timeInputStyle, type: 'text' }),
					_react2.default.createElement(
						'div',
						{ id: 'DateTime', style: incDec, onClick: this.changeAmPm.bind(this) },
						' ',
						_react2.default.createElement('img', { id: 'DateTime', src: decBtn, width: '30' }),
						' '
					)
				)
			);

			if (this.props.theme == undefined || this.props.theme == 'classic') {
				calendarMode = _react2.default.createElement(
					'div',
					null,
					toggleCalendar,
					calendarData
				);
			} else if (this.props.theme == 'window') {
				calendarMode = _react2.default.createElement(
					'div',
					null,
					calendarSuper,
					calendarData
				);
			}

			var clockModeOne = _react2.default.createElement(
				'div',
				null,
				showClock,
				clockTypeOne
			);
			var clockModeTwo = _react2.default.createElement(
				'div',
				null,
				showClock,
				clockTypeTwo
			);

			// setting dropdown after checking the mode
			if (this.props.theme == undefined || this.props.theme == 'classic') {
				if (this.props.mode == "datetime" || this.props.mode == undefined) {
					if (this.props.timeFormat == undefined || this.props.timeFormat == "24") {
						dropDown = _react2.default.createElement(
							'div',
							{ style: dropdownstyle },
							calendarMode,
							clockModeOne
						);
					} else {
						dropDown = _react2.default.createElement(
							'div',
							{ style: dropdownstyle },
							calendarMode,
							clockModeTwo
						);
					}
				} else if (this.props.mode == "date") {
					dropDown = _react2.default.createElement(
						'div',
						{ style: dropdownstyle },
						calendarData
					);
				} else if (this.props.mode == "time") {
					if (this.props.timeFormat == undefined || this.props.timeFormat == "24") {
						dropDown = _react2.default.createElement(
							'div',
							{ style: dropdownstyle },
							clockTypeOne
						);
					} else {
						dropDown = _react2.default.createElement(
							'div',
							{ style: dropdownstyle },
							clockTypeTwo
						);
					}
				}
			} else if (this.props.theme == 'window') {
				if (this.props.mode == "datetime" || this.props.mode == undefined) {
					if (this.props.timeFormat == undefined || this.props.timeFormat == "24") {
						dropDown = _react2.default.createElement(
							'div',
							{ style: dropdownstyle },
							calendarMode,
							clockModeOne
						);
					} else {
						dropDown = _react2.default.createElement(
							'div',
							{ style: dropdownstyle },
							calendarMode,
							clockModeTwo
						);
					}
				} else if (this.props.mode == "date") {
					dropDown = _react2.default.createElement(
						'div',
						{ style: dropdownstyle },
						calendarData
					);
				} else if (this.props.mode == "time") {
					if (this.props.timeFormat == undefined || this.props.timeFormat == "24") {
						dropDown = _react2.default.createElement(
							'div',
							{ style: dropdownstyle },
							clockTypeOne
						);
					} else {
						dropDown = _react2.default.createElement(
							'div',
							{ style: dropdownstyle },
							clockTypeTwo
						);
					}
				}
			}

			reactCalendar = _react2.default.createElement(
				'div',
				null,
				inputBox,
				dropDown
			);

			return _react2.default.createElement(
				'div',
				null,
				reactCalendar
			);
		}
	}]);

	return DateTimePicker;
}(_react2.default.Component);

exports.default = DateTimePicker;
