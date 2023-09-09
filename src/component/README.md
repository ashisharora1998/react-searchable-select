# react-searchable-select

#### Developed By: Ashish Arora (GitId: ashisharora1998)

Are you tired of formatting your options list for select input like this:
 
> [{
 label: "value 1",
 value: 1, 
}]

So I developed this new component where just need to pass your data into the props and define what will be your label and what will be your value with keys from your given data.
This new Select input library also gives you an optional separate search input to search your options.
You can customize this component however you want very easily.
This library is built on MUI components which will be very friendly for you to use


### Example:


### Props list:

> ##### selectionList: 
Pass an array of objects.[{},{},{}]

> #### placeholder

> #### value:
Object as {label:"", value:""}

> #### onChange:
will return an object

> #### name

> #### isRequired: true or false

> #### label

> #### search: true or false

> #### autoFormat: true or false
Pass true if you are adding your selectionList data without formatting it as label and value object

> #### labelKey:
example: "id"

> #### valueKeys:
example:["first_name","last_name"]
