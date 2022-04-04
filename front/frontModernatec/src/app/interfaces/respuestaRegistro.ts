
export interface RegisterRespose {
    status:string  ; 
    message: string;
    user: User;
  }


  export interface User {
      name: string;
      numero_identificacion: string;
      apellidos: string;
      telefono: string;
      email: string;
      updated_at: string;
      created_at: string;
      id: number;
    }
  





