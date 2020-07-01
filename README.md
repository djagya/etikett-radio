# etikett radio

etikett radio is a radio station for students of dBs Berlin Music School.
The web site makes it possible to listen to their live radio shows or watching their twitch stream while browsing through the content or interact with other users in the chat.
Moreover, students are now able to work on their portfolio on the website without relying on the mentor.

## Technology & Features worth mentioning

- MERN tech stack

### Back End

- MongoDB
- express validator (to validate input when creating new user)
- mongoose-unique-validator (to make sure every email for any new user is unique)
- nodemailer (to send the input via contact field to the etikett email address)

### Security

- bcrypt (for encrypting passwords)
- JWT (for creating individual tokens for every db entry)
- react cookies (to safely validate users)

### Accessibility 

- react-document-title (gives each component an individual title)
- skip-links (option for users tabbing through the website to skip the navigation section)
- usage of Fragments

### Front End

- 99% of the website is built of function components
- react context
- react-alert (customized alerts instead of window.alert)
- react-responsive (to mount chat and twitch stream only on desktop)
- react-router-restore-scroll (to always start at the very top when switching to another route)


#### Header / Stream
- react player (embedding the twitch stream)
- embedded radio stream with custom controls and extracted metadata to automatically display the currently playing show on the info bar
- automatically detects if a twitch stream is happening and provides it with the option to switch between twitch input and radio input (audio only mode)

#### Visuals / Styling
- noise texture (three.js)
- planetarium (react only)
- other styling with SCSS only, no frameworks
- custom scroll bars everywhere (for chrome at least)

#### Schedule

- only input needed is show name, start date, end date
- by using moment.js, applied the logic to automatically detect which month -> week -> day and gets everything in order
- styling of the dates depends on whether it already happened, is currently happening or is in the future
- dates older than 2 months get deleted automatically 

#### Archive

- can be filtered by show, genre and date
- list header can be used to sort by show, genre and date; by clicking twice in reversed order
- Only host names from existing host profiles can be chosen when uploading to the archive to ensure all host names are linked properly to a corresponding host profile

#### Hosts

- only active hosts are shown in the host showcase
- hosts have the possibility to save all relevant social medias which will be displayed with the corresponding logo

#### Staff Only

- grants access for hosts to edit their personal/log in data, their own host profile and the info bar, create archive and blog entries and edit them
- additionally grants access for admins to see and edit all existing user and host profiles and to create new users

#### Chat

- any user can join by entering a nick name
- existing user profiles will have their user names reserved for the chat and automatically log in when logging into their user account
- autosize (automatically resizing the input field)
- react-scroll-to-bottom (so the message window automatically scrolls down with every new message)
- react-emoji (to replace codes like <3 or :) with corresponding emojis)


