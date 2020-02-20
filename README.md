
[![Issues][issues-shield]][issues-url]
![MIT License][license-shield]



<!-- PROJECT LOGO -->
<br />
<p align="center">
  <!-- <a href="https://github.com/github_username/repo">
    <img src="images/logo.png" alt="Logo" width="80" height="80">
  </a> -->

  <h3 align="center">Apollo Transaction Plugin</h3>

  <p align="center">
    A plugin for wrapping GraphQL requests into typeorm transactions
    <br />
    <br />
    <a href="https://github.com/ams-pro/apollo-plugin-transaction/issues">Report Bug</a>
    ·
    <a href="https://github.com/ams-pro/apollo-plugin-transaction/issues">Request Feature</a>
  </p>
</p>


## About The Project

The Plugin is a small plugin for automatic typeorm transactions. All requests are encapsulated into a typeorm transaction and a EntityManager for running database commands is attached to the context.  

## Getting started

### Installation

```bash
npm install @ams-pro/apollo-plugin-transaction
```
or
```bash
yarn add @ams-pro/apollo-plugin-transaction
```

### Usage

1. Initialize the Plugin
    ```javascript
    import { TransactionPlugin } from '@ams-pro/apollo-plugin-transaction';

    // Setup database connection

    const server = new ApolloServer({
        resolvers: [...],
        typeDefs: [...],
        plugins: [
            new TransactionPlugin(pluginOptions),
        ]
    });
    ```
2. Use database in resolver
    ```javascript
    import { getRunnerFromContext } from '@ams-pro/apollo-plugin-transaction';

    const manager = getRunnerFromContext(context);
    ```
3. Configure
    | Option | Required | Default | Description |
    |----------|----------|---------|-------------|
    | connection | Yes | | The Typeorm Connection used for database queries
    | enableStuckControl| No | false | Automatically abort transaction which take longer than the transaction timeout
    |transactionTimeout|No|60000|The transaction timeout used for the stuck control


## Contributing

Any contributions you make are **greatly appreciated**. 

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request



<!-- LICENSE -->
## License

Distributed under the MIT License.




<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[issues-shield]: https://img.shields.io/github/issues/othneildrew/Best-README-Template.svg?style=flat-square
[issues-url]: https://github.com/ams-pro/apollo-plugin-transaction/issues
[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=flat-square
<!-- [license-url]:  -->
