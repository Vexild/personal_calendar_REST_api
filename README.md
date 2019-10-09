# personal_calendar_REST_api

### NodeJs framework + mongoDb + Express

Interface has been tested with Insomnia REST client. 

This api contains following routes and endpoints:
````
/events       GET
/new_event    POST
/delete_event DELETE
/event/:id    GET (this is for getting a single event)
/modify_event PUT
````


When posting or updating an event, new data is delivered through body as JSON. In both cases(POST and PUT) following JSON is required:
````
{
	"eventName" : "game night",
	"starting_date": "2019-10-03 18:00:00",
	"ending_date": "2019-10-05 23:59:59"
}
````

Data is saved as a mongoose schema to mongoDb. 
