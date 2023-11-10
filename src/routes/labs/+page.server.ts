import { redirect, type Actions } from "@sveltejs/kit";
import {Prisma, PrismaClient} from '@prisma/client'

const prisma = new PrismaClient();

export const actions = {

    addLab: async (event) => {
        const data = await event.request.formData();

        const name = data.get("lab_nome");
        const maq = data.get("maq_qt");

        const dbLab = await prisma.labs.findFirst({
            where: {
                lab_name: name?.toString(),
            },
            select: {
                lab_name: true,
            },
        })

        if(dbLab) return;

        if(!name || !maq) return;

        const labs = await prisma.labs.create({
            data : {
                lab_name: name.toString(),
                maqs: +maq,
            }
        })
    },

    updateLab: async (event) => {
        const data = await event.request.formData();

        const id = data.get("labId");
        const name = data.get("labName");
        const maqs = data.get("maqs");
        
        if(!id || !maqs || !name) return;

        const upLab = await prisma.labs.update({
            where: {
                lab_id: +id,
            },
            data: {
                maqs: +maqs,
                lab_name: name.toString(),
            },
        })
    },

    deleteLab: async (event) => {
        const data = await event.request.formData();

        const id = data.get("id");
        if(!id) return;

        const delLab = await prisma.labs.delete({
            where: {
                lab_id: +id,
            }
        })
    }
    
}

export async function load({ cookies, url}) {
    const prisma = new PrismaClient();
    const errData = await prisma.errors.findMany({include:{labs:true}});
    const labData = await prisma.labs.findMany();

    if(!cookies.get('userType') || !cookies.get('userName')){
        throw redirect(307, `/login/?redirectTo=${url.pathname}`)
    }

        const typeUsr = cookies.get('userType');
        const nameUsr = cookies.get('userName');
        const idUsr = cookies.get('userId');

    return {errData, labData, typeUsr, nameUsr, idUsr
        
    }
}