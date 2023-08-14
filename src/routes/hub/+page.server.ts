import type { Actions } from "@sveltejs/kit";
import {Prisma, PrismaClient} from '@prisma/client'

export const actions = {

    send_err: async (event) => {
        const data = await event.request.formData();
        //console.log(data);

        const lab = data.get("lab_id");
        const maq = data.get("maq_id");
        const desc = data.get("error");

        const prisma = new PrismaClient();

        if(!lab || !maq || !desc) return;
        const qtMaq = prisma.labs.findUnique({
            where: {
                lab_id: +lab, 
            },
        })

        if((+maq < 0 ) || (+maq > +qtMaq)){
            return;
        }
        //console.log(typeof(lab));
        const erro = await prisma.errors.create({
            data : {
                lab: lab.toString(),
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

        const delLab = await prisma.labs.delete({
            where: {
                lab_id: +id,
            }
        })
    }

}satisfies Actions;

export async function load({params}) {
    const prisma = new PrismaClient();
    const data = await prisma.errors.findMany();
    const labData = await prisma.labs.findMany();
    return {data, labData
        
    }
}











