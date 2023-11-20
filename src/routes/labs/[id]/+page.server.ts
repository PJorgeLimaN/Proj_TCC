import { PrismaClient } from '@prisma/client'
import { redirect } from '@sveltejs/kit';

export const load = async ({ params: { id } , cookies }) => {
    
    const prisma = new PrismaClient();

    const lab = await prisma.labs.findUnique({
        where: {
            lab_id: +{id}.id,
        },
    })

    const maqs = await prisma.machines.findMany({
        where: {
            maqLabId: +{id}.id,
        }, include: {
            _count: {
                select: {
                    errors: {
                        where: {
                            isFixed: 0,
                        }
                    }
                }
            }
        }
    })

    
    

    if(!cookies.get('userType') || !cookies.get('userName')){
        throw redirect(307, `/login/`);
    }
        const typeUsr = cookies.get('userType');
        const nameUsr = cookies.get('userName');
        const idUsr = cookies.get('userId');

    if (!maqs) return;

    if(!lab){ 
        return
    }

    return{
        typeUsr, nameUsr, idUsr, maqs, lab
    }

    /* const report = await fetch(/) */
}