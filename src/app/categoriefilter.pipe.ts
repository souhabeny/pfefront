import { Pipe, PipeTransform } from '@angular/core';
import { Produit } from './model/produit';

@Pipe({
    name: 'CategorieFilter'
  })
export class CategorieFilter implements PipeTransform{
    
transform(produits:Produit[],categsearch:number):Produit[]
{
   if(!categsearch)
    {
        return produits;
    }
    return produits.filter(produit=>produit.idCategorie==categsearch);
}

}