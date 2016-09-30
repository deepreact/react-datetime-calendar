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
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               * @Last Modified time: 2016-09-30 13:55:39
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               */

// images
var calendarDark = require('file!./img/calendar.png');
var calendarLight = require('file!./img/calendarLight.png');
var prevBtn = require('file!./img/prev.png');
var nextBtn = require('file!./img/next.png');
var clockBtn = require('file!./img/clock.png');
var incBtn = require('file!./img/inc.png');
var decBtn = require('file!./img/dec.png');

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
		}, _defineProperty(_this$state, 'currentMonth', 0), _defineProperty(_this$state, 'currentYear', 2016), _defineProperty(_this$state, 'todayDate', 1), _defineProperty(_this$state, 'currentTime', 0), _defineProperty(_this$state, 'Clock', ""), _defineProperty(_this$state, 'Calendar', ""), _defineProperty(_this$state, 'clockVisible', false), _defineProperty(_this$state, 'calendarVisible', true), _defineProperty(_this$state, 'submitTime', "none"), _defineProperty(_this$state, 'dateFormat', "YYYY-MM-DD"), _defineProperty(_this$state, 'timeFormat', "HH:MM"), _defineProperty(_this$state, 'ampm', ""), _this$state);
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

			// setting clock
			if (this.props.mode == "time" || this.props.mode == "datetime" || this.props.mode == undefined) {
				var time;
				var ampm = "";
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

				if (ampm == "" || this.props.timeFormat == undefined || this.props.timeFormat.length == 0) {
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

					this.refs.DateTimeInput.value = formatedtime;

					// pushing the input value out
					this.props.onUpdate(this.refs.DateTimeInput.value);
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
				this.refs.DateTimeInput.value = datetime;

				// pushing the input value out
				this.props.onUpdate(this.refs.DateTimeInput.value);
			} else {
				var datetime = formateddate;
				this.refs.DateTimeInput.value = datetime;

				// pushing the input value out
				this.props.onUpdate(this.refs.DateTimeInput.value);
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
			var dropDown = void 0;
			var reactCalendar = void 0;
			if (this.props.background != undefined) {
				dropdownstyle = {
					background: this.props.background,
					display: this.state.dropdowndisplay,
					width: 300,
					boxShadow: "1px 1px 2px 1px #bdc3c7",
					textAlign: "center"
				};
			} else {
				dropdownstyle = {
					background: "#ecf0f1",
					display: this.state.dropdowndisplay,
					width: 300,
					boxShadow: "1px 1px 2px 1px #bdc3c7",
					textAlign: "center"
				};
			}

			var inputBoxWrapper = {
				width: 300,
				borderStyle: "solid",
				borderWidth: 1,
				borderColor: "#bdc3c7",
				fontFamily: "verdana",
				fontSize: 16,
				textAlign: "center",
				borderRadius: 2
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
			var inlineBlocks = {
				display: "inline-block",
				width: "14%",
				borderStyle: "solid",
				borderWidth: 1,
				borderColor: "#bdc3c7",
				cursor: "pointer"
			};
			var dateToday = {
				display: "inline-block",
				width: "14%",
				borderStyle: "solid",
				borderWidth: 1,
				borderColor: "#bdc3c7",
				background: "#bdc3c7",
				fontWeight: "bold",
				cursor: "pointer"
			};
			var calendarStyle = {
				display: this.state.Calendar,
				width: "100%",
				padding: 8,
				textAlign: "center"
			};
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
				marginBottom: 4,
				fontWeight: "bold"
			};
			var navstyle = {
				fontWeight: "bold",
				padding: 6
			};
			var navBlocks = {
				display: "inline-block"
			};
			var prev = {
				float: "left",
				display: "inline-block",
				backgroundImage: "url('" + prevBtn + "')",
				backgroundSize: "100% 100%",
				backgroundColor: "transparent",
				borderStyle: "none",
				width: 30,
				height: 20,
				outline: "none"
			};
			var next = {
				float: "right",
				display: "inline-block",
				backgroundImage: "url('" + nextBtn + "')",
				backgroundSize: "100% 100%",
				backgroundColor: "transparent",
				borderStyle: "none",
				width: 30,
				height: 20,
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

			// toggle Calendar
			var toggleCalendar = _react2.default.createElement(
				'div',
				{ id: 'DateTime', style: selectTimeStyle, onClick: this.toggleCalendar.bind(this) },
				_react2.default.createElement('img', { id: 'DateTime', src: calendarDark, width: '20', alt: 'Toggle Calendar', title: 'Toggle calendar' })
			);

			// Calendar Nav
			var calendarNav = _react2.default.createElement(
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

			// calendar Header containing days
			var calendarHeader = _react2.default.createElement(
				'div',
				{ style: calendarHeaderStyle },
				_react2.default.createElement(
					'div',
					{ style: inlineBlocks },
					'Mon'
				),
				_react2.default.createElement(
					'div',
					{ style: inlineBlocks },
					'Tue'
				),
				_react2.default.createElement(
					'div',
					{ style: inlineBlocks },
					'Wed'
				),
				_react2.default.createElement(
					'div',
					{ style: inlineBlocks },
					'Thu'
				),
				_react2.default.createElement(
					'div',
					{ style: inlineBlocks },
					'Fri'
				),
				_react2.default.createElement(
					'div',
					{ style: inlineBlocks },
					'Sat'
				),
				_react2.default.createElement(
					'div',
					{ style: inlineBlocks },
					'Sun'
				)
			);

			// Calendar dates
			var calendar = this.state.calendarObj.map(function (index) {
				if (index != "" && index != this.state.todayDate.getDate()) {
					return _react2.default.createElement(
						'div',
						{ onClick: this.selectDate.bind(this, index, this.state.currentMonth, this.state.currentYear), style: inlineBlocks },
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

			// Combining calendar header and dates
			var calendarData = _react2.default.createElement(
				'div',
				{ style: calendarStyle },
				calendarNav,
				calendarHeader,
				calendar
			);
			// input box
			var inputBox = _react2.default.createElement(
				'div',
				{ style: inputBoxWrapper },
				_react2.default.createElement('input', { id: 'DateTime', ref: 'DateTimeInput', type: 'text', style: inputstyle, onClick: this.showCalendar.bind(this), placeholder: this.state.dateFormat + " " + this.state.timeFormat }),
				_react2.default.createElement('img', { style: calendarImgInline, src: calendarLight, width: '26' })
			);

			//show clock
			var showClock = _react2.default.createElement(
				'div',
				{ id: 'DateTime', style: selectTimeStyle, onClick: this.showClock.bind(this) },
				_react2.default.createElement('img', { id: 'DateTime', src: clockBtn, width: '16', alt: 'Toggle Clock', title: 'Toggle Clock' })
			);

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

			var calendarMode = _react2.default.createElement(
				'div',
				null,
				toggleCalendar,
				calendarData
			);

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
			if (this.props.mode == "datetime" || this.props.mode == undefined) {
				if (this.props.timeFormat == undefined || this.props.timeFormat == "24" || this.props.timeFormat.length == 0) {
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
				if (this.props.timeFormat == undefined || this.props.timeFormat == "24" || this.props.timeFormat.length == 0) {
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

			// Windows Style Theme

			// getting the theme
			if (this.props.theme == 'classic' || this.props.theme == undefined || this.props.theme.length == 0) {
				reactCalendar = _react2.default.createElement(
					'div',
					null,
					inputBox,
					dropDown
				);
			} else if (this.props.theme == 'windows') {
				reactCalendar = _react2.default.createElement(
					'div',
					null,
					_react2.default.createElement(WindowsTheme, null)
				);
			}

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
