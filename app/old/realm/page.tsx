import UserPage from "./pageClient"
import { app } from '@/app/utils/mongo_client'
import * as Realm from "realm-web"


const ServerPage = async() => {
  
  return (
    <>
    <div>
      hello 
    </div>
    
    <UserPage/>
    
    </>
  )
}

export default ServerPage;