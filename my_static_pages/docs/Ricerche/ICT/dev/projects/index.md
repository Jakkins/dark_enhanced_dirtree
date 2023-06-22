# How to setup a project

## general way

```txt
project
	models
		dtos
		entities
		enums
	controllers
	services
	managers
	utils
	schedulers
	configurations
	repositories
		mysql
		mongo
	scheduler
		tasks
```

Legenda

| alias       | function                                    | esempio                                     |
| ----------- | ------------------------------------------- | ------------------------------------------- |
| controllers | layer near the input (like a reverse proxy) | a controller will call a manager            |
| managers    | usa le classi per fare cose                 | usa servizi, repo, moduli, ...              |
| scheduler   | chiamano i task in base a un cron           | myTask().run()                              |
| tasks       | chiama un qualche manager                   |                                             |
| dtos        | data to object                              | json -> java object, or Map<String, Object> |