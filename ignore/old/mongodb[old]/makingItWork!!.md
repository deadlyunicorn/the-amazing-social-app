##  Background  

We are at a server component. We can successfully gather data from the server and display it on our browser. 

How can we make it more intereactive though?
Like 
+ display the content at the press of a button. MongoClient works only on the Server so can't add its results inside a client component

	=>We fixed it using this [source](https://beta.nextjs.org/docs/rendering/server-and-client-components#importing-server-components-into-client-components):
	We basically pass the server component or **something** returned from the server side as a prop to the client. You can pass props normally.
	
	At the beginning I passed a ReactNode as a child but for the next step I realized passing a single returned variable as a prop would work better.
	
+ Okay we get the document from the MongoDB database, but how we can dynamically choose what we get each time. Like from a movie document, lets get the **"genres"**. Or if we fetch multiple documents how do we select which documents to show? I was hopeless and about to move to trying out Realm SDK.

	=> Then I got a thought about that and realized I could pass the fetched documents down to the client component and let the component do the calculations  
	  This can be optimized ig. but we are just testing here so I didn't fetch anything too specific.  
	  So we can basically  
  1. Get our document (or document array)
  2. Pass it as a prop to client
  3. use client hooks to do the aggregation

Of course I don't mean like the same kind of aggregation you would do with multiple documents in mongodb, but like lets think of a gallery app  
1. We get all the image info we need
2. We click buttons to select what to display

for example "genres", "image count". 
IDK the optimal would be to able to be able to changed the MongoClient queries using Buttons/Range inputs from the client.

For example you select the query options on the client and you pass them into variables and use the variables inside the query command.

for example
    await client.db("deadly_testing").collection("movies").findOne({title:{Variable})