# Installation
## Install nodejs 6.5.0
	https://nodejs.org/en/download/
    node -v
## Install npm
    sudo npm install -g npm
    https://docs.npmjs.com/getting-started/installing-node
## Install yeoman
	sudo npm install -g yo
## Install jhipster
    sudo npm install -g generator-jhipster
    
# Dev ecommerce
mkdir ecommerce
cd ecommerce
mkdir ecommerce-gateway
cd ecommerce-gateway
yo jhipster
	microservice gateway
	ecommerce
	8080
	com.mycompany.ecommerce
	JWT
	SQL
	MySQL
	H2 with disk persisted
	No
	No
	Maven
	No
	No
	Gatling
	
mkdir ecommerce-doc
cd ecommerce-doc
	jdl-jh
cd ../ecommerce-gateway/
jhipster-uml ../ecommerce-doc/uml-diagram.jh 
	jhipster-uml uml-diagram.jh
	
jhipster-registry
git clone https://github.com/jhipster/jhipster-registry.git
jhipster-registry -> ecommerce-registry
mvnw

mkdir ecommerce-cart
cd ecommerce-cart
yo jhipster
? (1/16) Which *type* of application would you like to create? Microservice application
? (2/16) What is the base name of your application? cart
? (3/16) As you are running in a microservice architecture, on which port would like your server to run? It should be unique to avoid port conflicts. 8081
? (4/16) What is your default Java package name? com.mycompany.myapp
? (5/16) Which *type* of authentication would you like to use? JWT authentication (stateless, with a token)
? (6/16) Which *type* of database would you like to use? SQL (H2, MySQL, MariaDB, PostgreSQL, Oracle)
? (7/16) Which *production* database would you like to use? PostgreSQL
? (8/16) Which *development* database would you like to use? H2 with disk-based persistence
? (9/16) Do you want to use Hibernate 2nd level cache? Yes, with HazelCast (distributed cache, for multiple nodes)
? (10/16) Do you want to use a search engine in your application? No
? (11/16) Would you like to use Maven or Gradle for building the backend? Maven
? (12/16) Would you like to enable internationalization support? No
? (13/16) Which testing frameworks would you like to use? (Press <space> to select)Gatling

cd ecommerce-cart
yo jhipster:entity Item
Generating field #1

? Do you want to add a field to your entity? Yes
? What is the name of your field? productId
? What is the type of your field? Long
? Do you want to add validation rules to your field? Yes
? Which validation rules do you want to add? Required

================= Item =================
Fields
productId (Long) required 


Generating field #2

? Do you want to add a field to your entity? Yes
? What is the name of your field? price
? What is the type of your field? BigDecimal
? Do you want to add validation rules to your field? Yes
? Which validation rules do you want to add? Required, Minimum
? What is the minimum of your field? 0

================= Item =================
Fields
productId (Long) required 
price (BigDecimal) required min='0' 


Generating field #3

? Do you want to add a field to your entity? Yes
? What is the name of your field? login
? What is the type of your field? String
? Do you want to add validation rules to your field? No


show http://127.0.0.1:8761/#/
show swager

cd ecommerce-gateway
yo jhipster:entity Item

? Do you want to generate this entity from an existing microservice? Yes
? Enter the path to the microservice root directory: /Volumes/DEV/temp/ecommerce/ecommerce-cart

Found the .jhipster/Item.json configuration file, entity can be automatically generated!

? Do you want to update the entity? This will replace the existing files for this entity, all your custom code will be overwritten Yes, re generate the entity

mkdir ecommerce-docker
cd ecommerce-docker
yo jhipster:docker-compose

./mvnw package -Pprod docker:build


# Docker
  yo jhipster:docker-compose
