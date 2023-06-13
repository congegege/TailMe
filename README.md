### <p align="center"><img height="100px" align="center" src="https://media.discordapp.net/attachments/688213778206294154/1102159141159571456/2Emvhr0b_4x.png?width=597&height=597">_Tail Me_</p>

[<img height="30px" align="center" src="https://www.svgrepo.com/show/404660/youtube-video-movie-film-multimedia-social-media.svg"> Demo](https://youtu.be/oJAevW_kKpg) · [<img height="20px" align="center" src="https://www.svgrepo.com/show/285449/cocktail.svg"> Quick Start](#quick-start) · [<img height="20px" align="center" src="https://www.svgrepo.com/show/368401/info-bubble.svg"> About](#about) · [<img height="20px" align="center" src="https://www.svgrepo.com/show/285406/champagne.svg"> Features](#features) 

## <img height="30px" align="center" src="https://www.svgrepo.com/show/285449/cocktail.svg">Quick Start
### Setup
#### · create .env file underneath the client folder
```
VITE_REACT_APP_AUTH0_DOMAIN = [your AUTH0 DOMAIN key]
VITE_REACT_APP_AUTH0_CLIENT_ID = [your AUTH0 CLIENT ID key]
```
#### · create .env file underneath the server folder
```
MONGO_URI=[your MONGO_URI]
CLOUD_NAME = [your CLOUD_NAME]
CLOUD_KEY = [your CLOUD_KEY]
CLOUD_KEY_SECRET = [your CLOUD_KEY_SECRET]
```
### Backend
```
cd server
npm install
npm run dev
```
### Frontend
```
cd client
npm install
npm run start
```
Then TailMe will be running automatically at <a herf="http://127.0.0.1:5173/">http://127.0.0.1:5173/</a><br/>
Time to have a drink!<img height="30px" align="center" src="https://www.svgrepo.com/show/285397/cheers-alcohol.svg">

## <img height="30px" align="center" src="https://www.svgrepo.com/show/368401/info-bubble.svg">About
A full-stack cocktail recipes website where users can effortlessly explore their favorite drink recipes, rate, and leave comments. Or dive into the community to share or discover secret recipes from fellow enthusiasts. Plus, track their drinking days and collected recipes for their use.

For the record, I am not an alcoholic☺.TailMe project comes to mind as I hold my new shaker in hand. I aspire to create a platform where people can share and easily discover their favorite cocktail to kick-start this drinking journey. And I am thrilled to bring this project to life, but there are still numerous wide ideas there, that I hope can be fullfilled in the future too.

## <img height="30px" align="center" src="https://www.svgrepo.com/show/285406/champagne.svg">Features
### Not Log In
- Explored recipes effortlessly by applying diverse combinations of filters and utilizing the search bar.
- Explored recommended recipes and popular drink List.
- Obtained insights into the recipe detail includes: Insturction, Category, Cocktail Picture, Ingredients, Ingredient pictures, etc.
- Obtained insights into the average rating of specific recipes, comments left by other users, posts from other users in community.
### Log In
- Obtained access to rate, leave comments, and gather favorite recipes for future reference(user can cancel their rate and delete their collections too).
- Obtained access to post their own recipes by form filling, rate,leave comments and gather other people's recipe in community.
- Obtained access to user's own profile page to have a comprehensive overview of their activity
- Obtained insights into the entire collection, reviews and rates (collections can be deleted too)
- Tracked easily user's drinking history by selecting the desired date on the calendar in the profile page




