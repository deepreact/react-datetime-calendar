########################
Author - "Deep Prakash"
########################

# React DateTime Calendar

> Multifunctional DateTimePicker

## Install

```
npm install react-datetime-calendar --save
```

## Usage

```js

var DateTimePicker = require("react-datetime-calendar");

React.render(<DateTimePicker />, document.getElementById("myApp"));

```

![Alt text](/snapshot.png?raw=true "React DateTime Calendar")

### Options

1. mode
2. background
3. dateFormat
4. timeFormat


### Descriptions

1. mode - Select the mode of your calendar from - time/date/datetime.

		```
		<DateTimePicker mode = "datetime"/>
		```

2. background - Set the background color of the calendar.

		```
		<DateTimePicker background = "white"/>
		```
3. dateFormat - Allowed Values :- YYYY-MM-DD / DD-MM-YYYY / YYYY/MM/DD / DD/MM/YYYY / MONTH DATE YEAR / DATE MONTH YEAR
		
		```
		<DateTimePicker dateFormat = "MONTH DATE YEAR"/>
		```

4. timeFormat - Allowed Values :- 12 / 24
		
		```
		<DateTimePicker timeFormat = "12"/>
		```