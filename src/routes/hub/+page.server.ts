import {Prisma, PrismaClient} from '@prisma/client'
import type { Actions } from '@sveltejs/kit';

const prisma = new PrismaClient();

export const actions = {

    logIn:async ({ request, cookies }) => {
        const data = await request.formData();

        let message = "All Quiet";
        //console.log(data);
        
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
                message: "Senha Incorreta.",
            }
        };

        cookies.set("userName", usData.user_name, { path: "./", maxAge: 60 * 10}),
        cookies.set("userType", usData.user_type.toString(), { path: "./" , maxAge: 60 * 10}),
        cookies.set("userId", usData.user_id.toString(), { path: "./", maxAge: 60 * 10});


        return{
            sucess: "Usuário Autenticado.",
        }
    },
    
    

}satisfies Actions;

export async function load({ cookies }) {
    const prisma = new PrismaClient();
    
    const labErr = await prisma.labs.findMany({
        include: {
            _count: {
                select: {
                    machines: {
                        where: {
                            errors: {
                                some: {
                                    isFixed: 0
                                }
                            }
                        }
                    }
                }
            },
        },
        orderBy: {
            lab_name: 'asc',
        }
    });
   

    const totalErrCount = await prisma.errors.count({
        where: { isFixed: 0},
    });    

    const typeUsr = cookies.get('userType');
    const idUsr = cookies.get('userID')

    return {typeUsr, totalErrCount, labErr
        
    }
}











