import { redirect, type Actions } from "@sveltejs/kit";
import {Prisma, PrismaClient} from '@prisma/client'

const prisma = new PrismaClient();



export const actions = {

    addErr: async (event) => {
        const data = await event.request.formData();
        //console.log(data);

        const lab = data.get("lab_id");
        const maq = data.get("maq_id");
        const desc = data.get("error");
        const usr = data.get('user_id')
        
        if(!lab || !maq || !desc || !usr) return;

        //console.log(lab, maq, desc, usr);

        const qtMaq = await prisma.labs.findUnique({
            where: {
                lab_id: +lab, 
            },
            select: {
                maqs: true,
                lab_name: true
            },
        })
        if(!qtMaq) return;
        //console.log(qtMaq);

        if((+maq < 0 ) || (+maq > qtMaq?.maqs)){
            //alert("O laboratório escolhido possui somente "+qtMaq+" maquinas.");

            return {
                message: "O laboratório escolhido ("+qtMaq?.lab_name+") possui somente "+qtMaq?.maqs+" maquinas."
            };
        }
        //console.log("Dados" +data);
        const erro = await prisma.errors.create({
            data : {
                lab_id: +lab,
                error_maq: +maq,
                description: desc.toString(),
                user_id: +usr, 
            }
        })
        //console.log(erro);
    },


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
    const errData = await prisma.errors.findMany({
        include:{
            labs:true,
            users:true
        },
        orderBy:{
            lab_id: 'asc',
        }
        
    });
    const labData = await prisma.labs.findMany();

    if(!cookies.get('userType') || !cookies.get('userName')){
        throw redirect(307, `/login/?redirectTo=${url.pathname}`);
    }
        const typeUsr = cookies.get('userType');
        const nameUsr = cookies.get('userName');
        const idUsr = cookies.get('userId');

    



    return {errData, labData, typeUsr, nameUsr, idUsr
        
    }
}











