# webserversample
This is a node project that provides examples of how Express and NodeJS can be
used to create web services, and serve static content. This project can be
deployed to Heroku as well.

# Instructions to run the project
After cloning this repo, you can run it by typing the following at the command
prompt.
```
npm install
npm start
```

In order to run the app in development mode, you can install `nodemon` and use
a different script to run the server. 

```
npm install -g nodemon
npm run start-dev
```

# Links to run the app (hosted on heroku)
## Static HTML content
- https://webserversample.herokuapp.com

## Web app
- https://webserversample.herokuapp.com/weather.html

## Web service endpoints
- https://webserversample.herokuapp.com/test1/?q=monkey&u=maret
- https://webserversample.herokuapp.com/test2/?zip=94040
- https://webserversample.herokuapp.com/weather/?zip=94043


# Heroku related things
- [Dashboard](https://dashboard.heroku.com/apps/webserversample/settings)
- [git remote link](https://git.heroku.com/webserversample.git)

# Related links
- [Express Tutorial](https://scotch.io/tutorials/use-expressjs-to-get-url-and-post-parameters)
- [How to use node-fetch with node](https://blogs.missouristate.edu/cio/2016/01/14/fetching-data-over-http-with-nodejs-using-node-fetch/)