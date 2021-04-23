import { Pipe, PipeTransform } from '@angular/core';
import { Produit } from './model/produit';

@Pipe({
    name: 'produitFilter'
  })
export class produitFilter implements PipeTransform{

transform(produits:Produit[],search:string):Produit[]
{
  if(!search)
    {
        return produits;
    }
    return produits.filter(produit=>produit.libelle.toLowerCase().indexOf(search.toLowerCase())!=-1);
}

}