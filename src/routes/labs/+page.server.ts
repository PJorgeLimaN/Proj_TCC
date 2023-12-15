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
                maqs: +maq + 1,
            }
        });

        const lab = await prisma.labs.findFirst({
            select : {
                lab_id: true,
                lab_name: true,
            }, where : {
                lab_name: name.toString(),
            }
        })

        if(!lab) return;

        for(var i = 1; i <= +maq; i++){
            let num = '';
            let name = lab?.lab_name || '';

            if(i < 10){
                num = '0'+i;
            }else{
                num = ''+i;
            }

            if(name?.length > 3){
                name = name?.slice(0, 3);
            }

            if(i == 1){
                const labP = await prisma.machines.create({
                    data : {
                        maqLabId: lab?.lab_id,
                        maqName: 'Lab'+name+'MaqProf',
                        maqNum: 'Prof',
                    }
                })
            }

            const labs = await prisma.machines.create({
                data : {
                    maqLabId: lab?.lab_id,
                    maqName: 'Lab'+name+'Maq'+num,
                    maqNum: num,
                }
            })
        }
        
        
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
    
    const labData = await prisma.labs.findMany();

    if(!cookies.get('userType') || !cookies.get('userName')){
        throw redirect(307, `/login/?redirectTo=${url.pathname}`)
    }

        const typeUsr = cookies.get('userType');
        const nameUsr = cookies.get('userName');
        const idUsr = cookies.get('userId');

    return {labData, typeUsr, nameUsr, idUsr
        
    }
}