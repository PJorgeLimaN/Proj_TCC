import {Prisma, PrismaClient} from '@prisma/client'
import { redirect } from '@sveltejs/kit';

const prisma = new PrismaClient();

export async function load({ cookies, url}) {
    const prisma = new PrismaClient();

    throw redirect(307, `/login/?redirectTo=${url.pathname}`)

    if(!cookies.get('userType') || !cookies.get('userName')){
        throw redirect(307, `/login/?redirectTo=${url.pathname}`)
    }

        const typeUsr = cookies.get('userType');
        const nameUsr = cookies.get('userName');
        const idUsr = cookies.get('userId');

    return {typeUsr, nameUsr, idUsr
        
    }
}