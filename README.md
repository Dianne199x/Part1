This repository contains an automated test suite for [Swag Labs](https://www.saucedemo.com). It leverages [Playwright](https://playwright.dev/) to perform end-to-end UI testing and API verification.

## 🚀 How to Install and Run

### Prerequisites
* [Node.js](https://nodejs.org/) (version 18 or higher recommended)

### Installation
1. Clone this repository to your local machine.
2. Install the dependencies:
   ```bash
   npm install
3.Install the Playwright browsers:
Bash
npx playwright install

Running the Suite:
Run all tests: npx playwright test
Run with UI mode (visual debugging): npx playwright test --ui
Run in headed mode: npx playwright test --headed
Run specific test: npx playwright test *filename


### Which tools you chose and why, given the kind of system described below. ###
I chose Playwright and used typescript, I'm more comfortable to use this one.


### What you tested at the UI layer versus the API layer, and the reasoning behind that split.###
My approach is to shift as much functional validation as possible to the API level. By using Restful-API.dev as a model, we can test core logic, CRUD operations, and error handling in isolation.
We reserve SauceDemo-style UI tests strictly for high-value user journeys and visual verification. This keeps our UI tests 'non-brittle' because they aren't tasked with validating backend logic—they are only tasked with verifying that the user interface correctly displays the data and flows that we have already confirmed are working via our API suite.


### What you would add or change with more time.###
With more time, I would focus on decoupling the test data from the test logic to allow for better scaling. I’d also invest in infrastructure, specifically by using API calls to seed test states for the UI. My goal would be to create a 'Testing Infrastructure' rather than just a set of scripts—moving toward a system that is environment-aware, reports errors with deep context, and treats API-driven state setup as the foundation for all UI testing.


### Where you used AI tooling, what you accepted, and what you had to correct or rewrite. ###
I used gemini ai for this task. I checked in playwright the codes that was generated and found out that it generate a generic one and incorrect output so I created the correct version of code that is for the specific website on the task that was given to me.
