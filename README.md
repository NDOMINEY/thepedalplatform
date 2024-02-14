# The Pedal Platform

The Pedal Platform is an online resource for all lovers of Pedals. The admin on the sites maintain a database of pedal products to the community.

This database allows visitors to view reviews and ratings of their desired pedals. Those that create an account are able to leave reviews and save pedals in their favourites sections to curate there own selection!

The targeted audience is all who have a love of pedals and applying effects to their musical instruments be that guitars, keyboards, or drums.

![Landing Page](documentation/landing-page.png)

Live Site - [The Pedal Platform](https://thepedalplatform-554a254bc88a.herokuapp.com/) <br>
Project Repository - [The Pedal Platform - Repository](https://github.com/NDOMINEY/thepedalplatform)

## Table of Contents

- [Requirements](#requirements "Requirements")
- [Agile Methods](#agile-methods "Agile Methods")
- [Design](#design "Design")
  - [Database Schema](#database-schema "Database Schema")
  - [Wireframes](#wireframes "Wireframes")
  - [Colour Scheme](#colour-scheme "Colour Scheme")
- [Features](#features "Features")
  - [Existing Features](#existing-features "Existing Features")
  - [Future Features](#future-features "Future Features")
- [Testing](#testing "Testing")
  - [Development Process](#development-process "Development Process")
  - [Usability Testing](#usability-testing "Usability Testing")
  - [User Requirement Testing](#user-requirement-testing "User Requirement Testing")
  - [Functional Testing](#functional-testing "Functional Testing")
  - [Validator Testing](#validator-testing "Validator Testing")
  - [Automated Testing](#automated-testing "Automated Testing")
- [Technologies Used](#technologies-used "Technologies Used")
  - [Main Languages Used](#main-languages-used "Main Languages Used")
- [Deployment](#deployment "Deployment")
- [Credits](#credits "Credits")
  - [Content](#content "Content")
  - [Media](#media "Media")

## Requirements

## Agile Methods

Through this object I have taken an agile approach to my development. To do this, I used the github issue and project board to organise my user stories. Please see link below.

[Agile Development - Project Board](https://github.com/users/NDOMINEY/projects/3)

## Design

### Database Schema

### Wireframes:

### Colour Scheme:

## Features

### Existing Features

#### Navigation Bar

##### Navigation bar - user not logged in

##### Navigation bar - user logged in

##### Navigation bar - hamburger view

##### Navigation bar - collapsed hamburger view

#### Home Page/Landing Page

#### About - Facilities

#### Contact Us

#### User Registration

#### User Login

#### User Logout

#### User Account

## Testing

### Development Process

### Usability Testing

### User Requirement Testing

### Functional Testing

### Validator Testing

#### Lighthouse

#### HTML Validator

HTML validator tests were carried out accross the site.

#### Python

Through the IDE pep8 compliance was checked to ensure the code was validated

### Automated Testing

# Technologies Used

- Whitenoise was used to serve the static files - [Whitenoise](https://whitenoise.readthedocs.io/en/stable/)
- Bootstrap was used for basic html styling - [Bootstrap](https://getbootstrap.com/)
- Elephantsql was used for the sites database - [ElephantSQL](https://customer.elephantsql.com/)

### Main Languages and Frameworks Used

- Python
- Javascript
- HTML5
- CSS3
- React

## Deployment

This site is deployed through Heruko. The following steps where followed within Heroku -

Whilst on the main dashboard, click 'Create new app'
Then enter the name of the project, select your region, and the click 'Create App'
Within the settings tab, you must update the 'Config Vars' to include the following: DATABASE_URL, DEBUG, HEROKU_POSTGRESQL_PURPLE_URL, SECRET_KEY.
Click 'Reveal Config Vars' to add.
In the deploy tab, under deployment method select 'GitHub'
Next search and connect to the correct repository from GitHub
Finally, scroll down towards the bottom and you will see 'Manual Deployment'. Select the branch you would like to deploy from and click 'Deploy Branch'. Once complete, you will be presented with a link to open the deployed site.
You can also set up auto deployments, this means Heroku will re-deploy the site every time you push an update to your GitHub repository.

#### Future development

To carry out further development on the project you can clone the repository locally. This is completed by carrying out the following steps -

Within your repository, make sure you are on the 'Code' tab
Click on the button that shows '<> Code'
Then select how you wish to clone
To create an isolated version of the project, you may add a branch off of main. To do this follow the below steps -

Whilst in the code section, click on 'branch'
You will then see a breakdown of the exisiting branches
To add a new branch, click 'New Branch' which is a green button
Then name your branch and select the branch source

## Credits

### Content

### Media

#### Images

#### Logo

The logo was created using [Adobe Express](https://www.adobe.com/express/create/logo/website)
