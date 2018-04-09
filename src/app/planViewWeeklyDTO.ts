export class PlanViewWeeklyDTO { 
   constructor( 
      public soeid: string, 
      public team: string, 
      public hours: string,
      public totHours:string,
      public remainingHours:string,
      public oppm:string,
      public pNumber:string,
      public projectDesc:string,
      public projectRelease:string,
      public enabled:boolean,
   ) {  } 
}