'use server'

import axios from "axios";


export async function submitChallenge(data: any, isNew = false) {
    if (!isNew) {
        await axios.put('http://localhost:3333/challenges/' + data._id, data);
        return {
          status: 'success',
          message: 'Challenge updated'
        }
      } else {
        await axios.post('http://localhost:3333/challenges', data);
        return {
          status: 'success',
          message: 'Challenge created'
        }
      }
}