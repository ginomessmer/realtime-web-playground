# Realtime Web Playground

**Powered by socket.io, express and Angular 6**

---

This is just a sample repository to showcase realtime capabilities of socket.io and Angular 6. It’s heavily based on this [article](https://medium.com/dailyjs/real-time-apps-with-typescript-integrating-web-sockets-node-angular-e2b57cbd1ec1) on Medium with major changes.

## Goals

- Establish persistent web socket connection.
- Send socket messages across all users.
- Display messages for all users.
- Show push notifications to user, whenever supported.

## Scopes

- `/server` - run the server, handle and maintain connections.
- `/client` - Angular app that allows users to broadcast their status to other users.

## Requirements

- gulp build runner
- node LTS
- Angular CLI

## Build & Run

### Server

First of all, we’ll need to build the server runtime:

- `cd /server`
- `npm i`
- `gulp build`
- `node build/index.js`

The server runtime uses port `8282` by default. You can change it in `src/server.ts` and rebuild the runtime.

### Client

- `cd /client`
- `npm i`
- `ng serve` (you can also build and distribute the Angular app. Refer to Angular’s documentation in this case)

Happy broadcasting!