import {HttpHeaders} from "@angular/common/http";

export const url =  'http://localhost:8080'
export const httOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
export interface LoginResponse {
  "token": "",
  "type": "Bearer",
  "id": 0,
  "username": "",
  "refreshToken": "",
  "email": "",
  "role": [
    "USER_ROLE"
  ]
}

