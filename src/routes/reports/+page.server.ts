import { redirect, type Actions } from "@sveltejs/kit";
import {Prisma, PrismaClient} from '@prisma/client'

const prisma = new PrismaClient();



export const actions = {

    /* 
    Agora dois CRUDs
    Create, Update e Delete Erros, comandos nessa página
    Read para Labs e Máquinas
    Create, Update e Delete Soluções, Comandos aqui também
    */

    createError: async (event) => {
        const data = await event.request.formData();
        if(!data) return;

        const maq = data.get("maqId");
        const desc = data.get("desc");
        const usr = data.get("usrId");
        if(!maq || !desc || !usr) return;

        

        const erro = await prisma.errors.create({
            data: {
                maq_id: +maq,
                description: desc.toString(),
                user_id: +usr,
            }
        })

        return {
            message: "Adicionado com Sucesso."
        }
    },


    createSolution: async (event) => {
        const data = await event.request.formData();

        const error_id = data.get("error_id");
        const user_id = data.get("user_id");
        const desc = data.get("desc");
        const fixed = data.get("fixed");

        if(!error_id || !user_id || !desc || !fixed) return;

        
        

        const solut = await prisma.solutions.create({
            data: {
                sol_err: +error_id,
                sol_user_id: +user_id,
                sol_desc: desc.toString(),
                sol_fixed: +fixed,
            },
        });

        if(+fixed == 1){
            const fixErro = await prisma.errors.update({
                where: {
                    error_id: +error_id,
                }, data: {
                    isFixed: 1,
                },
            });
        };

        return {
            message: "Adicionado com Sucesso."
        }

    },

    deleteSolution: async (event) => {
        const data = await event.request.formData();

        //Não implementada
        //Não Completa
    }

    /* Criar Solução
        Usa ID do erro para atualizar a condição de resolvido (ou não [Futuramente])
        Descriçãp do que foi feito para resolver o erro
        Data de quando foi adicionado/resolvido
        Id próprio para mostrar na lista de soluções

        Automaticamente após criar a solução atualizar a condição do erro para "Resolvido(1)"

        Fase 2
        Criar uma tabela que mostra erros unicos e suas resoluções, para facilitar adição de novos erros e busca de soluções
        (Completo)
    */
}satisfies Actions;




export async function load({ cookies, url }) {
    if(!cookies.get('userType') || !cookies.get('userName')){
        throw redirect(307, `/login/?redirectTo=${url.pathname}`)
    }



    const typeUsr = cookies.get('userType');
    const idUsr = cookies.get('userId');
    const nameUsr = cookies.get('userName');

    const labs = await prisma.labs.findMany({
        include: {
            machines: true,
        },
        orderBy: {
            lab_name: 'asc',
        }
    })

    const erros = await prisma.errors.findMany({
        include: {
            machines: {
                include: {
                    labs: {
                        select: {
                            lab_name: true,
                        }, 
                    }, 
                },
            },
            users: {
                select: {
                    user_name: true,
                }
            }
        },
        orderBy: {
            machines:{
                labs:{
                    lab_id: 'asc',
            }}
        }
    })



    return{
        labs, typeUsr, idUsr, nameUsr, erros
    }

}











