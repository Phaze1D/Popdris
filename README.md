# Popdris
[Popdris](https://phaze1d.github.io/Popdris/) is a HTML canvas game that run on [PixiJS](http://www.pixijs.com/) game engine. It is a mix between Candy Crush and Tetris. The user swipes on a bubble to move it up down left or right and has to combine 3 or more bubbles of the same color to be able to pop them. The more bubbles the user combines the more points they get. The game is a single infinite level game that only ends once a bubble reaches the top of the game area. **The game starts of very easily but will become harder and harder the longer you last**

<p align="center">
<img src="readme_imgs/screenshoot.jpg" width="250px"/>
</p>

## Getting Started
Do to Cross Origin Requests you have to run a local http server to serve the files. If you have python installed you can just run these commands inside the directory
```
$ python -m SimpleHTTPServer 8000
```
and open the game at `localhost:8000`. Or if you have nodejs you can run
```
$ npm install http-server -g
$ http-server ./
```
and open the game at `localhost:8080`.

## Instructions
- Objective is not to hit the top border and get as many points as possible
- Move a bubble by pressing and moving the mouse either up down left or right. You can only move one step at a time, and you can only move to nonempty spaces.
- Pop bubbles by tapping on a group of 3 or more bubbles of the same color

## Built With
- [PixiJS](http://www.pixijs.com/) Javascript Game Engine
- [SpinKit](http://tobiasahlin.com/spinkit/) The cool little spinner at the start

## License
This project is licensed under the MIT License - see the [LICENSE.md](./LICENSE.md) file for details
