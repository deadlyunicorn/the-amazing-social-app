import { ObjectId } from "mongodb"

export type accountEntryMagic = {
  _id: ObjectId,
  email: string,
  provider: "gmail" | "magic" | "github",
  tokenDetails?:{
    tokenValue: string,
    tokenUsed: boolean,
    tokenGenerationDate: Date 
  }
  
}