import { PrismaClient } from '@prisma/client'
import { redirect } from '@sveltejs/kit';

export const load = async ({ params: { id } , cookies }) => {
    
    const prisma = new PrismaClient();

    const lab = await prisma.labs.findUnique({
        include: {
            errors: {
                include: {
                    users: {
                        select: {
                            user_name: true,
                            user_id: true,
                        },
                    },
                },
                orderBy: {
                    error_maq: 'asc',
                }
            },
        },
        where: {
            lab_id: +id,
        },
    })

    

    if(!cookies.get('userType') || !cookies.get('userName')){
        throw redirect(307, `/login/`);
    }
        const typeUsr = cookies.get('userType');
        const nameUsr = cookies.get('userName');
        const idUsr = cookies.get('userId');

    if(!lab){ 
        return
    }

    return{
        lab, typeUsr, nameUsr, idUsr,
    }

    /* const report = await fetch(/) */
}