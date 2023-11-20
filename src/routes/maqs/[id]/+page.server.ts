import { PrismaClient } from '@prisma/client'
import { redirect } from '@sveltejs/kit';

export const load = async ({ params: { id } , cookies}) => {
    
    const prisma = new PrismaClient();

    // Refatorar esse código para condizer com as novas tabelas

    console.log(id);
    const report = await prisma.errors.findMany({
        include: {
            users: {
                select: {
                    user_name: true,
                }
            }
        }, where: {
            maq_id: +{id}.id,
        }, 
    });

    const maq = await prisma.machines.findUnique({
        where: {
            maqId: +{id}.id,
        }, include: {
            labs: {
                select: {
                    lab_name: true,
                }
            }
        }
    });

    

    //console.log("Report: "+report+"/n Maquina: "+maq?.maqId);


    //console.log("Prossegue")


    if(!cookies.get('userType') || !cookies.get('userName')){
        throw redirect(307, `/login`);
    }
        const typeUsr = cookies.get('userType');
        const nameUsr = cookies.get('userName');
        const idUsr = cookies.get('userId');

        return{ maq, report,
            typeUsr, nameUsr, idUsr,
        }

    /* const report = await fetch(/) */
}