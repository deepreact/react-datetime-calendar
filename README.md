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

# Theme

```
1. Classic
```
![Alt text](/snapshot.png?raw=true "React DateTime Calendar, theme='classic'")


```
2. Window
```
![Alt text](/windowTheme.png?raw=true "React DateTime Calendar, theme='window'")

```
3. Cubito
```
![Alt text](/cubitoTheme.png?raw=true "React DateTime Calendar, theme='cubito'")

### Options

1. mode
2. onUpdate
3. background
4. dateFormat
5. timeFormat
6. width
7. theme


### Descriptions

1. mode - Select the mode of your calendar from - time/date/datetime.

		```
		<DateTimePicker mode = "datetime"/>
		```

2. onUpdate - Get the value selected into a function
	
		```
		<DateTimePicker onUpdate={this.getValue}/>
		```

		```
		getValue:function(value){
			console.log(value);
			
			/*
			* value is the select datetime value
			*/
		}
		```

3. background - Set the background color of the calendar.

		```
		<DateTimePicker background = "white"/>
		```
4. dateFormat - Allowed Values :- YYYY-MM-DD / DD-MM-YYYY / YYYY/MM/DD / DD/MM/YYYY / MONTH DATE YEAR / DATE MONTH YEAR / MONTH DATE DAY - YEAR
		
		```
		<DateTimePicker dateFormat = "MONTH DATE DAY - YEAR"/>
		```

5. timeFormat - Allowed Values :- 12 / 24
		
		```
		<DateTimePicker timeFormat = "12"/>
		```

6. width - Allow you to control the width of input box and calendar size. Allowed value :- Integer
		
		```
		<DateTimePicker width='400' />
		```

7. theme - Allow you to choose from multiple themes. Allowed Values :- classic/window/cubito

		```
		<DateTimePicker theme='window' />
		```