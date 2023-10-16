import { FindCursor, WithId } from "mongodb";
import { userObject } from "../api/mongodb/user/user";
import { mongoClient } from "../api/mongodb/client";

export const availableUsersArray = async( session: userObject|null ) => {
  
  const availableUsers = [] ;
  const users = mongoClient.db('the-amazing-social-app-v3').collection('users');

  const usersCursor = users.find({});
  
  for await ( const user of usersCursor ){

    const userObject = user as unknown as userObject;
    if ( !session || ! session?._id.equals ( userObject._id ) ){
      availableUsers.push( userObject )
    };
  }

  return availableUsers;
}
