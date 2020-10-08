# Dolphin: cheap mask detection

## Introduction

#### What is Dolphin?

Dolphin is a project that aims to automate the process of mask verification.

During the covid-19 pandemic, many establishments had to have an employee at the entrance to check if people had their masks on. However, this becomes a waste of time and money considering that employee could be doing essential work somewhere else in the establishment. Other solutions to this issue have been created, but they charge for the installation and hardware, making it too expensive for some establishments. Dolphin, on the other hand, is open-source, so anyone with enough knowledge can install it. Also, if the establishment so desires, the detection layer can be installed in a Raspberry Pi, which should be cheap in most places.

The Raspberry Pi Zero Wireless can be found from 10 USD, costing 20 USD from Amazon (in Brazil, country where the project was created, it can be found for R$ 159,90).

The Pi Camera Module can be purchased for 9 USD, from Amazon (in Brazil, without shipping, it can be found for R$ 23,90).

Considering the establishment has some computer that can be used as a server and frontend. The whole installation costs about 30 USD or R$ 184. Being way cheaper than other alternatives and allowing the establishment to keep employees at essential work.

## Installation

### Warning: the following instructions have only been tested on linux, more especifically Pop!_OS

##### I'm just going to list the basic of making this run, to install Node, React, Python and making Tensorflow run on the Raspberry Pi you can find plenty of tutorials online

1. clone this repository with `git clone https://github.com/gustavosilva-gss/dolphin.git`

2. Create a MongoDB locally: https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/

3. Start the MongoDB (you can set a script to do this every time the system is initialized later): `sudo service mongod start`

4. Change every occurence of my local IP to yours (just do search and replace for every `192.168.100.12`)

5. Go to the `web/` directory and start the Node server with `node app.js`

6. In the `web/` directory, go to `client/` and start the React app with `npm start`

7. Go to the `detection/` directory and install the requirements with `pip install -r requirements.txt`

8. In the `detection/` directory, run the detection layer with `python detect_mask_video.py`

Note: you are likely going to run into a lot of errors, we couldn't include every single one of the possibilities here. Just search for the error and you'll probably find a solution. If everything goes wrong, contact me.

###### The software is not complete yet. Still, if you have to talk to me, send an email to gustavo24gss@gmail.com or dm [@MarmotaDesigual](https://twitter.com/MarmotaDesigual) (Twitter)
