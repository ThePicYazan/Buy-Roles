## Discord Temporary Role Selling Project

This project aims to provide a means of selling temporary Discord roles within communities that use Discord as a means of communication and collaboration. This project utilizes `discord.js v14.8.0` and `mongoose database` to achieve this goal.

## How to Use the Project

Users can use this project by following the steps below:

1. Install the project on the server.
2. Modify the `config.json` file with the appropriate server information.
3. Run the project using the `npm start` command.

## Project Requirements

Users must meet the following requirements before installing and using this project:

1. Users must install `node.js` and `npm` on their server.
2. Users must create a Discord application and obtain an API key.
3. Users must create a MongoDB account and obtain a link to the database.

## Config.json File

In the `config.json` file, the following values must be modified with the appropriate server information:

- `prefix`: This prefix is used to identify the commands that users can use.
- `owner`: `owner` should be set to your user ID.
- `probot`: `probot` should be set to your bot's ID.
- `buylogs`: `buylogs` should be set to the ID of the sales logs channel.
- `webhookurl`: `webhookurl` should be set to your error tracking webhook link. If you encounter any errors with the project, they will be sent to this webhook.

- `buyrole1`, `buyrole2`, `buyrole3`, `buyrole4`: These roles should be set to the different roles that users can purchase.

If you encounter any errors with the project, the command prompt won't close, and you'll see the error message. If you have any further issues, feel free to join our support server at [https://discord.gg/ra3d] or contact me personally at YAZAN#1411.
