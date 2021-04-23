import { Pipe, PipeTransform } from '@angular/core';
import { User } from './model/user';

@Pipe({
    name: 'userFilter'
  })
export class UserFilter implements PipeTransform{

transform(users:User[],search:string):User[]
{
  if(!search)
    {
        return users;
    }
   
  return users.filter(user=>user.nom.toLowerCase().indexOf(search.toLowerCase())!=-1 ||user.prenom.toLowerCase().indexOf(search.toLowerCase())!=-1 );
}

}