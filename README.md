### Project 4 - Arduino Data Logging App
![App Screenshot](http://i.imgur.com/Npwxdyj.png "App Screenshot")

##### Project Description:
This app allows the user to take readings from 4 sensors on an arduino and gives a real-time graphical representation of the data. 

##### Technologies Used:
<ul>
<li>D3.js</li>
<li>Nodejs</li>
<li>Express</li>
<li>Mongoose</li>
<li>Morgan</li>
<li>Path</li>
<li>Arduino Esplora</li>
<li>Web Sockets</li>
</ul>

##### General Approach:
First I wrote a program with the arduino sketchbook to get data from a sensor. Then I uploaded that program to the arduino and used web sockets to get the data real-time to the client. Finally, I used D3.js to show the data in the form of bar charts.

##### Installation Instructions:
Download the app. Run npm install. Download Arduino 1.6.9. Upload the code found below to an Esplora arduino. Connect the Arduino to your computer. Type ls /dev/tty.* into your terminal. Copy the port name (for example /dev/tty.usbmodem1421) and paste in the index.js file in the line where the port variable is defined. Now your arduino should be able to send data through the correct port. Finally, run your server, open up localhost:3000 and see the sensors return data real-time for the built-in temperature sensor, light sensor, slider, and joystick.

\#include \<Esplora.h>

void setup() {

}

void loop() {
// runs repeatedly:
//sider
int slider = Esplora.readSlider();
byte bright = slider/4;

//temp
int fahrenheit = Esplora.readTemperature(DEGREES_F);  //logs temp in farenheit
//light
int light = Esplora.readLightSensor();
//joystick xvalue
int xValueJoy = Esplora.readJoystickX(); 


String stringOne = "-";
String tempAndSlider = fahrenheit + stringOne + bright; 
String tempSlideLight = fahrenheit + stringOne + bright + stringOne + light;
String tempSlideLightJoy = fahrenheit + stringOne + bright + stringOne + light + stringOne + xValueJoy;

 
Serial.println(tempSlideLightJoy); 

delay(500);

}

##### Links:
[erds](https://github.com/la-mari/project4/blob/master/project4_erds.jpg)
[Trello](https://trello.com/b/rh7antPW/project-4)

##### Unsolved Problems/Major Hurdles:
<ul>
	<li>Unsolved: Connecting external sensors for data that I originally wanted to collect such as humidity and soil moisture.</li>
	<li>Major Hurdles: Getting data from arduino to client side.</li>