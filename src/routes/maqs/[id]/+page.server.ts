import { PrismaClient } from '@prisma/client'
import { redirect } from '@sveltejs/kit';

export const load = async ({ params: { id } , cookies}) => {
    
    const prisma = new PrismaClient();

    const report = await prisma.errors.findFirst({
        where: {
            error_id: +{id}.id,
        },
        select: {
            error_id: true,
            error_maq: true,
            description: true,
            lab_id: true,
        },
    })



    const labR = await prisma.labs.findUnique({
        where: {
            lab_id: report?.lab_id,
        },
        select: {
            lab_name: true,
        }
    })

    if(!cookies.get('userType') || !cookies.get('userName')){
        throw redirect(307, `/login`);
    }
        const typeUsr = cookies.get('userType');
        const nameUsr = cookies.get('userName');
        const idUsr = cookies.get('userId');

    if(report){ 
        return{
            eMaq: report.error_maq,
            desc: report.description,
            nameL: labR?.lab_name,
            eId: report.error_id,
            typeUsr, nameUsr, idUsr,
        }
    }

    /* const report = await fetch(/) */
}