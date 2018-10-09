# reParent API

This api was built for the ASU Hacks For Humanity 2018 hackathon.  It's part of a platform that provides an accessible a 'penpal' platform that allows elderly user to connect with others via email with speech to text email sending.

To be used with the [reParent Client](https://github.com/jsullivan5/hackf-for-humanity2018)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

What things you need to install the software and how to install them

```
git
node
npm
IBM Bluemix
```

### Installing

A step by step series of examples that tell you how to get a development env running

#### IBM Bluemix
This project uses IBM Bluemix Watson API to accomplish speech to text.

To set up:  Visit this link to the [IBM Website](https://www.ibm.com/watson/services/speech-to-text/) and follow the prompts to start for free.

1. Clone this repository

```
git clone git@github.com:jsullivan5/hack-for-humanity-2018_api.git
```

2. Navigate to project root

```
cd hack-for-humanity-2018_api
```

3. Install packages

```
npm install
```

4. Configure the enviroment

Rename sample.env to .env
```
mv sample.env .env
```

- Change the values from the sample values to fit your use case. (e.g your email variables, your IBM bluemix credentials)
- In order to use with gmail, the target account will need to be configured to [allow less secure apps for testing](https://myaccount.google.com/lesssecureapps)

4. Start development server with hot reloading

```
npm run dev
```

#### This project uses eslint
- If the packages were installed, eslint is already configured.
- Follow the instructions for your text editor to install eslint to use it. [Atom](https://atom.io/packages/linter-eslint)

Lint from the command line

```
npm run lint
```

## Running the tests

Coming soon...

### Break down into end to end tests

Coming soon...

## Deployment

Coming soon...

## Built With

* [Node](https://nodejs.org/en/) - Framework used
* [IBM Watson](https://github.com/watson-developer-cloud/speech-to-text-nodejs) - Speech to Text API
* [Nodemailer](https://nodemailer.com/about/) - Email client

## Acknowledgments

* Arizona State University
* Hack for Humanity 2018
