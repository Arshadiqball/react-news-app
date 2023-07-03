
# -------------- News aggregator Website ReactJs -------

# --------------------- Features -----------------------

# Pages
        1 - Home Page: Displays the latest news feeds based on user settings.
        2 - Settings Page: Allows users to customize their preferences and settings.
        3 - Login Page: Provides authentication for users to access their account.
        4 - Registration Page: Allows new users to create an account.
# Redux Store:
        1 - Utilize Redux store to manage application state and handle API requests.
        2 - Store user settings, articles, sources, categories, and other relevant data.

# LocalStorage:
        1 - Store and retrieve the access token and user settings in the local storage.
        2 - Enables persistence of user preferences and authentication status.

# Login Page:
        1 - Implements user authentication functionality.
        2 - Includes client-side and server-side error handling.
        3 - Validates user input fields to ensure data integrity.
        4 - Throttling for user login trying.

# Registration Page:
        1 - Auto-authenticates the user after successful registration.
        2 - Performs validation on user input fields to ensure data accuracy.
        3 - Includes error handling for client-side and server-side validation.
        4 - Dublicate email check validation from backend side.

# Home Page:
        1 - Automatically loads news feeds based on user preferences.
        2 - Integrates multiple APIs as per the user's selected API source.
        3 - Implements search functionality to search for specific news articles.
        4 - Includes filters for category, source, and date to customize the news feeds.
        5 - Provides a dark mode option and supports language switching.

# Settings Page:
        1 - Allows users to activate/deactivate specific APIs as per their preference.
        2 - Provides options to switch between light and dark theme modes.
        3 - Includes a language switcher to change the application language.
        4 - Allows users to define their interests, such as preferred sources, categories, and authors.

# Toaster Messages:
        1 - Utilizes toaster messages to display success and error messages.
        2 - Enhances visibility and provides feedback to users on their actions.

# Loader Screen:
        1 - Displays a loader screen to indicate ongoing processes, particularly when a button is clicked.
        2 - Prevents users from mistakenly triggering actions multiple times.

# Mobile-responsive design:
        1 - All pages optimized for mobile layout.

# Environment File:
        1 - Handle the API Integration Switching via this variable: REACT_APP_API_SOURCE
        2 - New York API Integration: REACT_APP_NEW_YORK_API
        3 - New York API Source: REACT_APP_NEW_YORK_API_SOURCE_LIST
        4 - New York API Token: REACT_APP_NEW_YORK_API_TOKEN
        5 - News API Source: REACT_APP_NEWS_API_SOURCE
        6 - News API Category: REACT_APP_NEWS_API_CATEGORY
        7 - News API: REACT_APP_NEWS_API
        8 - News API Token: REACT_APP_NEWS_API_TOKEN
        9 - Backend URL: REACT_APP_API_URL
        10 - Frontend URL: PUBLIC_URL
        11 - Application Mode: NODE_ENV
 
------------------------------------------------------------------------

# Versions and APIs:

        1 - Node Version : 20.3.1
        2 - use nvm : nvm use 20.3.1
        3 - NewsAPI
        4 - New York Times API

# How to the Run Project on Local:

        1 - npm install
        2 - npm start

# How to the Run Project on Docker:

        1 - docker-compose up -d --build
		The app will accessible at the: http://localhost:3000/

# How to down the docker project:

        1 - docker-compose down
