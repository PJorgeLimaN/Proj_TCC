import type { Actions } from "@sveltejs/kit";
import {Prisma, PrismaClient} from '@prisma/client'

const prisma = new PrismaClient();

export const actions = {

    addErr: async (event) => {
        const data = await event.request.formData();
        //console.log(data);

        const lab = data.get("lab_id");
        const maq = data.get("maq_id");
        const desc = data.get("error");

        //console.log(lab)
        

        if(!lab || !maq || !desc) return;
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
        //console.log(typeof(lab));
        const erro = await prisma.errors.create({
            data : {
                lab_id: +lab,
                error_maq: +maq,
                description: desc.toString(), 
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
    */
}satisfies Actions;



export async function load({}) {
    const prisma = new PrismaClient();
    const errData = await prisma.errors.findMany({include:{labs:true}});
    const labData = await prisma.labs.findMany();
    return {errData, labData
        
    }
}











