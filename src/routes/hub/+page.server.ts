import type { Actions } from "@sveltejs/kit";
import {PrismaClient} from '@prisma/client'

export const actions = {
    default: async (event) => {
        const data = await event.request.formData();
        //console.log(data);

        const lab = data.get("lab_id");
        const maq = data.get("maq_id");
        const desc = data.get("error");
        const prisma = new PrismaClient();
        if(!lab || !maq || !desc) return;

        //console.log(typeof(lab));
        const erro = await prisma.errors.create({
            data : {
                lab: lab.toString(),
                error_maq: +maq,
                description: desc.toString(), 
            }
        })
        console.log(erro);
    }
}satisfies Actions;

export async function load({params}) {
    const prisma = new PrismaClient();
    const data = await prisma.errors.findMany();
    const labData = await prisma.labs.findMany();
    return {data, labData
        
    }
}









