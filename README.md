#Dolphin: cheap mask detection

###Warning: the following instructions have only been tested on linux, more especifically Pop_OS!

#####I'm just going to list the basic of making this run, to install Node, React, Python and making Tensorflow run on the Raspberry Pi you can find plenty of tutorials online

1. clone this repository with `git clone https://github.com/gustavosilva-gss/dolphin.git`

2. Create a MongoDB locally: https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/

3. Start the MongoDB (you can set a script to do this every time the system is initialized later): `sudo service mongod start`

4. Change every occurence of my local IP to yours (just do search and replace for every `192.168.100.12`)

5. Go to the `web/` directory and start the Node server with `node app.js`

6. In the `web/` directory, go to `client/` and start the React app with `npm start`
