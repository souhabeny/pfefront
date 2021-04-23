import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'dateFilter'
  })
export class DateFilter implements PipeTransform{

    transform(produits:any[],search:any):any[]
    {
        if( !search)
            {
                return produits;
            }
        return produits.filter(produit=>produit.date.indexOf(search)!=-1);
     }
    
}