import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { jwtDecode, JwtPayload as DecodedJwtPayload } from "jwt-decode";


interface CustomJwtPayload extends DecodedJwtPayload {
  id: string;
}

export const authOptions: NextAuthOptions = {
  pages:{
signIn:"/login"
  },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: {},
        password: {}
      },
      async authorize(credentials, req) {
        const res = await fetch("https://ecommerce.routemisr.com/api/v1/auth/signin", {
          method: "POST",
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" }
        });

        const data = await res.json();
        console.log(data , "login data");
        if(data.message == "success"){
          const decodedToken = jwtDecode <CustomJwtPayload>(data.token)
          // console.log(decodedToken , "decodedToken")
 return{
  id:decodedToken.id as string,
            user:data.user ,
            token : data.token
          }
        }else{
         throw new Error (data.message || "something Wrong")
        }
       
      }
    })
  ],
  callbacks:{
     async jwt({ token, user}) {
      if(user){
        token.user=user.user;
        token.token=user.token;
      }
      return token
    },
     async session({ session, token }) {
      if(token){
        session.user=token.user;
      }
      return session
    },
  }
  
};