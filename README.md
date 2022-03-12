# BuynomicsOrg

##Run commands step by step to get started
- `yarn install`
- `docker-compose up` - launch postgres and redis
- `yarn nx run api:migrate` - do migrations to DB
- `yarn nx run api:generate-client` - generate client library for api
- `yarn nx run api:serve` - launch our backend service
- `yarn nx run buynomics:serve` - launch our frontend

##Basic description
Frontend and backend applications which do CRUD operations with Intermediaries and Products they deliver.

##ADRs
TODO: generate all notes with help of this [tool](https://github.com/npryce/adr-tools)

###Talks
- At the moment we don't have a requirement to support functionality where "Not every intermediary can deliver all products".
But in the future, we will need to resolve this requirements.
- We can write type of intermediary right in its name
- The amount of users is few people. Only our internal stuff will use it.
- The goal of our service is to deliver some information to our core service for some processing needs.

###Decisions
- Many-to-Many relations between Intermediary and Products, to resolve the future requirement
- Validate all requirements on backend to prevent code duplications and to do our frontend as simple as possible
- Calculate product's cost on backend to prevent code duplications and to do our frontend as simple as possible. Use distributed cache to prevent a lot of products' cost calculations
- Use postgres because. It fits for our tasks and we have solid devops support in our company.
- Locate frontend and backend applications within an internal network of our company. It will give us good security and simple implementation of our apps.
- Use the decision of logging from our core team
- To prevent a sink-hole pattern developers can use db-service write. We can use this approach only in selecting data cases
- Use health/check decisions from our core team
- Use nx (with nx-cloud) for faster and simpler development
- Write cypress tests for frontend applications


##Architecture
Service architecture locates next to README.md. Filename is architecture.png
