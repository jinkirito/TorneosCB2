import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Torneo } from '../model/Torneo.interface';



@Injectable({
  providedIn: 'root'
})
export class TorneoService {
  private torneoCollection: AngularFirestoreCollection<Torneo>;
  private torneos:Observable<Torneo[]>;

  constructor(db:AngularFirestore) {
    this.torneoCollection = db.collection<Torneo>('torneos');
    this.torneos = this.torneoCollection.snapshotChanges().pipe(map(
      actions =>{
        return actions.map(a=>{
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id, ...data}
        })
      }
    ))
   }

   getTorneos(){
    return this.torneos;
   }


   getTorneo(id?:string){
      return this.torneoCollection.doc<Torneo>(id).valueChanges();
   }

   updateTorneo(torneo:Torneo, id:string){
    return this.torneoCollection.doc(id).update(torneo);

   }

   addTorneo(torneo:Torneo){
    return this.torneoCollection.add(torneo);
   }

   removeTorneo(id:string){
    return this.torneoCollection.doc(id).delete();
   }
}
