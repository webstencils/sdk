# Contributing

Thank you for considering to contribute to webStencils!

From proofreading, translating, writing tutorials or blog posts, improving the documentation, submitting bug reports and feature requests, or writing code, there are many ways to contribute.

If you are interested in proposing a new feature or have found a bug that you'd like to fix, please file a new issue.

## Setup

1. Fork this repository and create your branch from `main`
2. Install the dependencies and start the development server

```bash
> yarn install
> yarn dev
```

3. Here are some additional npm scripts that might be useful

```bash
> yarn clean # clean all build files from all packages in the monorepo
> yarn build # create production build for all packages
> yarn yest # run tests across the monorepo
> yarn lint # lint all projects 
```

4. Do your magic. Make sure that the package(s) that you're working on can still be successfully built after you've applied your changes.
5. Submit a pull request to merge the changes from your fork **(If your PR is not linked to an existing issue, then please explain what your PR aims to accomplish)**

## License

By contributing, you agree that your contributions will be licensed under the [Apache License, Version 2.0](LICENSE).
