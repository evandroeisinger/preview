# [Preview](http://evandroeisinger.com/preview)

It's a file preview app. Which returns the file content and info, so you can manipulate as you like before post to you server-side applcation.

* Source: [https://github.com/evandroeisinger/preview](https://github.com/evandroeisinger/preview)
* Homepage: [http://evandroeisinger.com/preview](http://evandroeisinger.com/preview)

## Usage

Preview.js accepts any DOM element, it will add these elements listeners for drag and drop files (yes, multiple-files). But input elements work when a file is selected. After the files are dropped or selected, this files are process and returned through the callback functions, allowing for instantaneous viewing of their content and information. (Name, Type, Size, Etc.)

``` js
// setup with all callback options
$('.drop').preview({
	onEnter : function( response ) {},
    onOver : function( response ) {},
    onLeave : function( response ) {},
    onDrop : function( response ) {},
    onChange : function( response ) {},
    onProcess : function( file ) {},
    onError : function( response ) {}
});

// with some custom options and basic callback functions
$('.drop').preview({
		onEnter : function( response ) {
			$(response.target).addClass('drag');
		},
        onLeave : function( response ) {
            $(response.target).removeClass('drag');
        },
        onDrop : function( response ) { 
        	$(response.target).removeClass('drag');
        },
        onProcess : function( file ) {
	        var output  = '<h2>' + file.info.name + '</h2>';
	        	output += '<h3>' + file.info.type + '</h3>';
	            output += '<p>' + file.content + '</p>';
	        files.append(output);
        },
        onError : function( response ) { 
        	console.log( response );
        }
    });

```

## Callbacks

<table>
  <tr>
    <td><strong>Callback</strong></td>
    <td><strong>Return</strong></td>
    <td><strong>Description</strong></td>
  </tr>
  <tr>
    <td>onEnter</td>
    <td>Return enter event.</td>
    <td>Called when the selected file enter in the element area.</td>
  </tr>
  <tr>
    <td>onOver</td>
    <td>Return drag event.</td>
    <td>Called when the selected file is dragged over the element area.</td>
  </tr>
  <tr>
    <td>onLeave</td>
    <td>Return leave event.</td>
    <td>Called when the selected file leave the element area.</td>
  </tr>
  <tr>
    <td>onChange</td>
    <td>Return onchange input event.</td>
    <td>Called when the input element select a file.</td>
  </tr>
  <tr>
    <td>onProcess</td>
    <td>Return the element where the file is dropped, the file information and the file content.</td>
    <td>Called when the file has been processed.</td>
  </tr>
  <tr>
    <td>onError</td>
    <td>Return the error code and erroe alert.</td>
    <td>Called when something goes wrong.</td>
  </tr>
</table>

## Browser Support

All modern browsers (Firefox, Chrome, Safari, Opera, IE8+) should be supported. Please [open an issue](https://github.com/evandroeisinger/preview/issues) if File Preview doesn't work on a particular browser.

## Contributing

Anyone and everyone is welcome to contribute.