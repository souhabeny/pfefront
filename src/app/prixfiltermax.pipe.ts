import { Pipe, PipeTransform } from '@angular/core';
import { Produit } from './model/produit';

@Pipe({
    name: 'prixFiltermax'
  })
export class prixFiltermax implements PipeTransform{

transform(produits:Produit[],prixsearch:number):Produit[]
{
   if(!prixsearch)
    {
        return produits;
    }
    return produits.filter(produit=>produit.prix<=prixsearch);
}

}