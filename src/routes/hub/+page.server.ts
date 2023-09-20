import type { Actions } from "@sveltejs/kit";
import {Prisma, PrismaClient} from '@prisma/client'

export const actions = {

    send_err: async (event) => {
        const data = await event.request.formData();
        //console.log(data);

        const lab = data.get("lab_id");
        const maq = data.get("maq_id");
        const desc = data.get("error");

        console.log(lab)
        const prisma = new PrismaClient();

        if(!lab || !maq || !desc) return;
        const qtMaq = await prisma.labs.findUnique({
            where: {
                lab_id: +lab, 
            },
            select: {
                maqs: true,
            },
        })
        if(!qtMaq) return;
        console.log(qtMaq);

        if((+maq < 0 ) || (+maq > qtMaq?.maqs)){
            //alert("O laboratório escolhido possui somente "+qtMaq+" maquinas.");

            return {status: "Error", qtMaq: qtMaq.maqs, lab: lab, maq: maq};
        }
        //console.log(typeof(lab));
        const erro = await prisma.errors.create({
            data : {
                lab_id: +lab,
                error_maq: +maq,
                description: desc.toString(), 
            }
        })
        console.log(erro);
    },

    addLab: async (event) => {
        const data = await event.request.formData();
        //console.log(data);

        const lab = data.get("lab_nome");
        const maq = data.get("maq_qt");

        const prisma = new PrismaClient();

        if(!lab || !maq) return;

        const labs = await prisma.labs.create({
            data : {
                lab_name: lab.toString(),
                maqs: +maq,
            }
        })
        console.log(labs);
    },

    deleteEntry: async (event) => {
        const prisma = new PrismaClient();
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

    deleteLab: async (event) => {
        const prisma = new PrismaClient();
        const data = await event.request.formData();

        const id = data.get("id");
        if(!id) return;
        console.log(id);
        const delLab = await prisma.labs.delete({
            where: {
                lab_id: +id,
            }
        })
        console.log(delLab);
    }

}satisfies Actions;



export async function load({}) {
    const prisma = new PrismaClient();
    const errData = await prisma.errors.findMany({include:{labs:true}});
    const labData = await prisma.labs.findMany();
    return {errData, labData
        
    }
}











