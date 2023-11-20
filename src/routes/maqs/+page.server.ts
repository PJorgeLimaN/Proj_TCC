import { redirect, type Actions } from "@sveltejs/kit";
import {Prisma, PrismaClient} from '@prisma/client'

const prisma = new PrismaClient();



export const actions = {

    


    updateEntry: async (event) => {
        const data = await event.request.formData();

        const id = data.get("erroId");
        const maq = data.get("maqN");
        const desc = data.get("desc");

        if(!id || !maq || !desc) {
            return{
                message: "Dados Inválidos",
            }
        }

        const upErr = await prisma.errors.update({
            where: {
                error_id: +id,
            },
            data: {
                description: desc.toString(),
            }
        })
    },

    deleteEntry: async (event) => {
        const data = await event.request.formData();

        const id = data.get("id");
        if(!id) return;

        const delErr = await prisma.errors.delete({
            where: {
                error_id: +id, 
            },
            
        })
        
        console.log(delErr);

    },




    /* Criar Solução
        Usa ID do erro para atualizar a condição de resolvido (ou não [Futuramente])
        Descriçãp do que foi feito para resolver o erro
        Data de quando foi adicionado/resolvido
        Id próprio para mostrar na lista de soluções

        Automaticamente após criar a solução atualizar a condição do erro para "Resolvido(1)"

        Fase 2
        Criar uma tabela que adiciona erros unicos e suas resoluções, para facilitar adição de novos erros e busca de soluções
    */
}satisfies Actions;



export async function load({ cookies, url }) {
    const prisma = new PrismaClient();
    /* REFATORAR PARA MOSTRAR TODAS AS MAQUINAS
    SE POSSIVEL DESCOBRIR UMA FORMA DE MOSTRAR MÁQUINAS POR LABORATÓRIO 
    NÃO DEU, SÓ VAI DAR PRA DAR [ORDER BY] NAS MAQUINAS PELO MENOS*/
    const machines = await prisma.machines.findMany({
        include: {
            labs: {
                select: {
                    lab_name: true
                }
            },
            _count: {
                select: {
                    errors: {
                        where: {
                            isFixed: 0,
                        }
                    }
                }
            }
        }, 
    });

    if(!cookies.get('userType') || !cookies.get('userName')){
        throw redirect(307, `/login/?redirectTo=${url.pathname}`);
    }
        const typeUsr = cookies.get('userType');
        const nameUsr = cookies.get('userName');
        const idUsr = cookies.get('userId');

    



    return {machines, typeUsr, nameUsr, idUsr
        
    }
}











