import * as z from "zod"

export const registerSchema = z.object({
  name:z.string()
  .nonempty("Name Required")
  .min(3,"min is a 3 chars").max(20 , "max is a 20 chars") , 

  email:z.string()
  .nonempty("Email Required")
  .email("Email is not Valid"),

  password:z.string()
    .nonempty("Password Required")
  .min(7,"min is a 7 chars"),

  rePassword:z.string()
    .nonempty("Re-Password Required")
  .min(7,"min is a 7 chars"),

  phone:z.string()
    .nonempty("Phone Required")
    .regex(/^01[0125][0-9]{8}$/)
}).refine((data)=> data.password ===  data.rePassword , {
    path:["rePassword"],
     message: "Password Not Match"
})

export type registerTypeSchemas = z.infer<typeof registerSchema>




export const loginSchema = z.object({
  
  email:z.string()
  .nonempty("Email Required")
  .email("Email is not Valid"),

  password:z.string()
    .nonempty("Password Required")
  .min(7,"min is a 7 chars"),

  
})

export type loginTypeSchemas = z.infer<typeof loginSchema>