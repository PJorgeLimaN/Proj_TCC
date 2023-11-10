import { redirect, type Actions } from "@sveltejs/kit";
import {Prisma, PrismaClient} from '@prisma/client'
import { Path } from "$env/static/private";

const prisma = new PrismaClient();

export const actions = {

    logIn:async ({ request, cookies }) => {
        const data = await request.formData();

        let message = "All Quiet";
        console.log(data);
        
        const usr = data.get("username");
        const pass = data.get("password");

        if(!usr || !pass){
            return{
                message: "Usuário ou senha Inválido.",
            }
        }

        const usData = await prisma.users.findUnique({
            where: {
                user_name: usr.toString(),
            },
            select: {
                user_name: true,
                user_pass: true,
                user_type: true,
                user_id: true,
            },
        })
        
        if(!usData){
            return{
                message: "Usuário não existe.",
            }
        }else if(usData.user_pass != pass){
            return{
                message: "Senha Incorreta."
            }
        };

        cookies.set("userName", usData.user_name, { path: "./", maxAge: 60 * 10}),
        cookies.set("userType", usData.user_type.toString(), { path: "./" , maxAge: 60 * 10}),
        cookies.set("userId", usData.user_id.toString(), { path: "./", maxAge: 60 * 10});

        if(cookies.get('userType') && cookies.get('userName')){
            throw redirect(307, `/hub/`);
        }
    },
    
    

}satisfies Actions;

export async function load({cookies}) {
    if(cookies.get('userType') && cookies.get('userName')){
        throw redirect(307, `/hub/`);
    }
}