# Frontends

Scroll's Monorepo for Frontends

## Purpose

This repo contains a single React app written in TypeScript to accommodate for all official Scroll frontend functionality.

## License

MIT.

## Contributing

If you encounter bugs or have feature ideas, feel free to [create an issue](/../../issues) or [write a PR](/../../pulls).

## Node Version

Tested with v20.10.0 (npm v10.2.3).

## Available Scripts

Before running locally, make sure to duplicate `.env.local.template` to a new file called `.env.local`, and update its values if necessary.

In the project directory, you can run:

### `yarn run dev`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

### `yarn run generate:sitemap`

Generate the sitemap.xml from a list of urls

### `yarn run convert:webp output_imagepath imgpath`

Generate webp format image

## Deployment

Using Scroll's team Netlify: https://vercel.com/scroll-tech/frontends

- Production (SCROLL_ENVIRONMENT=MAINNET): https://scroll.io
- Sepolia (SCROLL_ENVIRONMENT=SEPOLIA): frontends-git-sepolia-scroll-tech.vercel.app
