# Quick Dict

## What is Quick Dict?

Quick Dict is a minimalistic chrome extension which is used to define a word and allows the user to listen to the word's correct pronunciation. The motivation for this project was to allow people, especially who are learning English or not very proficient at English, to improve vocabulary and understand what they are reading more conveniently and faster.

The extension allows users to select any piece of text on a webpage and quickly retrieve its definition.

To make the extension even more useful, it includes a text-to-speech feature. When the user selects text, they can click a button to have the extension read it aloud.

Expanding beyond definitions, the extension could also offer translation capabilities. For users learning english, this would be a helpful tool to help them understand words in their own language.

## Design choice
The interface is intuitive and unobtrusive. I have used plain CSS for the design as I wanted to customise it to my liking. For the definitions, I decided to use a unordered list format for the output. 

## Breakdown of files used

### manifest.json
This file helps configure the extension including the description, permissions, name and some other miscellaneous details about the extension. I used [this](https://developer.chrome.com/docs/extensions/get-started) as a guide for this file. 

### content.js
This file is the brains of the extension. There are functions defined for each of the button and 2 more for rendering the languages and identifying selected text. I used the Marriam Webster API for the define and pronounce features. I researched online how to use API in JavaScript and used this knowledge to implement these features. The Marriam Webster API gives a response in JSON format, so I also had to learn to work with this type of format. It uses asynchronous functions (likely async/await) to make API requests and handle responses. I also handled cases where the API calls fail (due to network issues or invalid words).
As for the translate feature, I was looking for a free translation API but could not find any worthwile APIs so after searching a bit online, I found a Stack Overflow thread that used google translate and jquery to obtain the translation.

### popup.html & style.css
The frontend of this extension. Buttons were styled using CSS which I copied from [here](https://getcssscan.com/css-buttons-examples).



