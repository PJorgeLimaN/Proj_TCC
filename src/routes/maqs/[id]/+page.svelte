<script lang="ts">
	import { redirect } from '@sveltejs/kit';


    export let data;

    const usrType = data.typeUsr || 0;
    const usrName = data.nameUsr || "";
    const usrId = data.idUsr || 0;
    const machine = data.maq;
    const ers = data.report;
    console.log(machine);


    /* Pagina Maqs agora deve:
    Mostrar as informações da Máquina (ID, Nome, e Lab em que se encontra) 
    Lista de erros da máquina (Talvez separar entre erros resolvidos e não resolvidos)
    
    Permitir edição do lab e nome da máquina (Transferencia de máquina)
    */

</script>

<body>

    <section class="insert"> <!-- Adicionar Novo Erro -->
        <h1>Nome da Máquina: {machine?.maqName}</h1>
        <div>
            <form>
                <form action="/reports?/createError" method="POST">
                    <input type="text" name="usrId" value="{usrId}" hidden>
                    <div>
                        <label for="labName">Laboratório: </label>
                        <input type="text" name="labName" id="labName" disabled value="{machine?.labs?.lab_name}">
                    </div>

                    <div>
                        <label for="maqN">Máquina: </label>
                        <input type="text" name="maqN" id="maqN" disabled value="{machine?.maqNum}">
                        <input type="number" name="maqId" hidden value="{machine?.maqId}">
                    </div>

                    <div>
                        <label for="desc">Descrição do Erro: </label>
                        <input type="text" name="desc" id="desc" required class="descText">
                    </div>

                    <br><br>
                    <input type="submit" value="Adicionar Erro">

                    <a href="/labs/{machine?.maqLabId}/" class="button">Voltar</a>
                </form>
            </form>
        </div>
    </section>

        <section class="container">
            <h1>Erros Não Resolvidos</h1>
            <div class="bottom-border">
                <table>
                    <tr>
                        {#if +usrType < 3 && +usrType > 0}
                            <th>ID do Erro</th>
                        {/if}
                        <th>Descrição</th>
                        <th>Status</th>
                        {#if +usrType < 3 && +usrType > 0}
                            <th>Criado por</th>
                            <th>Criado</th>
                        {/if}
                    </tr>
    
                    {#each ers as erros}
                    {#if erros.isFixed == 0}
                        <tr>
                            {#if +usrType < 3 && +usrType > 0}
                                <td>{erros.error_id}</td>
                            {/if}

                            <td>{erros.description}</td>                                
                            <td>Não Resolvido</td>
    
                            {#if +usrType < 3 && +usrType > 0}
                                <td>{erros.users.user_name}</td>
                                <td>{erros.create_time.toLocaleString()}</td>
                                <td><a href="/reports/{erros.error_id}" class="button">Resolver Erro</a></td>
                            {/if}
                            
                        </tr>
                    {/if}
                    {/each}
                </table>
            </div>

            {#if +usrType < 3 && +usrType > 0}
            <div class="bottom-border">
                <h1>Erros Resolvidos</h1>
                <table>
                    <tr>
                        <th>ID do Erro</th>                        
                        <th>Descrição</th>
                        <th>Status</th>
                        <th>Criado por</th>
                        <th>Criado</th>
                    </tr>
    
                    {#each ers as erros}
                    {#if erros.isFixed == 1}
                        <tr>
                            <td>{erros.error_id}</td>
                            <td>{erros.description}</td>                                
                            <td>Resolvido</td>
                            <td>{erros.users.user_name}</td>
                            <td>{erros.create_time.toLocaleString()}</td>
                            <td><a href="/reports/{erros.error_id}" class="button">Soluções</a></td>
                        </tr>
                    {/if}
                    {/each}
                </table>
            </div>
            {/if}

            <a href="/hub/" class="button">Voltar ao Início.</a>
        </section>
    
        
</body>

<svelte:head><!-- Chamado de maqs por erro inicial meu, mas visto que os erros estão ligados as máquinas não tem muito problema. -->
    <!-- {#if erro?.error_id} 
    <title>CIET | Erro {erro?.error_id}</title> 
    <meta name="description" content="Página de Gerenciamento de Erros das máquinas do CIET.">
    {:else} -->
    <title>CIET | Novo Erro</title> <!-- Chamado de maqs por erro inicial meu, mas visto que os erros estão ligados as máquinas não tem muito problema.-->
    <meta name="description" content="Página de Gerenciamento de Erros das máquinas do CIET.">   
    <!-- {/if} -->
  
</svelte:head>