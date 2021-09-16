import {connect, connection} from 'mongoose'

import {ExceptionMessages} from '../messages/exceptionsMessages'

import { connectionString } from '../global/connectionString'
import { Messages } from '../messages/successfulMessages'

export function connectDB(){

    connect(connectionString, {useNewUrlParser: true})
}

export async function checkConnection() {
  var db = connection

  if(db.readyState === 0 || db.readyState === 3){
    throw new Error(`${ExceptionMessages.DATABASE_CONNECTION_ERROR } ${db.readyState}`)
  } else {
    db.once('open', () => {
      console.log(Messages.DATABASE_CONNECTION_SUCCESSFUL) 
    })
  }
}
  

