export class Project { 
   constructor( 
      public pNumber: string, 
      public oppm: string,
      public projectDesc: string, 
      public monthRelease: string, 
      public yearRelease: string, 
      public assigned: string,
      public hours: string, 
      public team: string, 
      public invalidated: boolean,
   ) {  } 
}