# Advocate Conversions Test App

Mini-application for checking that the full conversion round-trip is functioning. All it does is take the ` advref` query paramter in the URL, if exists, and post the value back to the `/v1/register-conversion/` endpoint.

## Development

To run locally, clone the repo and run

```javascript
yarn install
npm start
```

and the browsersource should be available at `localhost:9000`

## Production

The build process creates a single static site, which will be output into the `dist` folder
but running

```javascript
npm run build
```

## Configuration

The following env variables can be set either for dev or prod

Environment Variable    | Dev Defaults   | Prod Defaults | Description
----------------------- | -------------- | ------------- | -----------
CONVERSION_API_HOST     | localhost:8000 | api.adv.gg    | base url for the advocate API
CONVERSION_API_PROTOCOL | http           | https         | HTTP protocol. Valid options are http or https
