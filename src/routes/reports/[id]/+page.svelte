<script lang="ts">
	import { redirect } from '@sveltejs/kit';


    export let data;

    const usrType = data.typeUsr || 0;
    const usrName = data.nameUsr || "";
    const usrId = data.idUsr || 0;
    const report = data.report;
    const machine = report?.machines;
    const solutions = data.solutions || [];


</script>

<body>
    <section class="container">
        <div>
            <h2>ID do Erro: {report?.error_id}</h2>
            <h2>Lab: {machine?.labs?.lab_name}</h2>
            <h2>Máquina: {machine?.maqNum}</h2>
            <h3>Erro: {report?.description}</h3>
        </div>

        {#if report?.isFixed == 0}
        <div>            
            <form action="/reports?/createSolution" method="POST">
                <div>
                    <label for="desc">Tentativa de Correção: </label> 
                    <input type="text" name="desc" id="desc">
                </div>
                <div>
                    <label for="sim">Resolveu</label>
                    <input type="radio" name="fixed" id="sim" value="1">
                    <label for="nao">Não Resolveu</label>
                    <input type="radio" name="fixed" id="nao" value="0">
                </div>
                <input type="number" hidden name="user_id" id="user_id" value={usrId}>
                <input type="number" hidden name="error_id" id="error_id" value={report?.error_id}>

                <!-- Leve problema, se não resolver, seria bom uma nova parte de texto para explicar se teve algum efeito ou não.render
                Mas de novo, pra algo básico já ficou bem mais avançado pelo fato de ter máquinas individuais no Banco de Dados-->

                <input type="submit" value="Enviar">
            </form>
        </div>
        {/if}

        <div>
            <tabe>
                <tr>
                    <th>ID da Solução</th>
                    <th>ID do Erro</th>
                    <th>Responsável</th>
                    <th>Descrição</th>
                    <th>Criado</th>
                </tr>
                {#each solutions as sol}
                    <tr>
                        <td>{sol.sol_id}</td>
                        <td>{sol.sol_err}</td>
                        <td>{sol.users.user_name}</td>
                        <td>{sol.sol_desc}</td>
                        <td>{sol.sol_date}</td>
                    </tr>
                {/each}
            </tabe>
        </div>

        <div>
            <a href="./" class="button">Voltar</a>
        </div>
    </section>


    
</body>

<svelte:head><!-- Chamado de maqs por erro inicial meu, mas visto que os erros estão ligados as máquinas não tem muito problema. -->
    <!-- {#if erro?.error_id} 
    <title>CIET | Erro {erro?.error_id}</title> 
    <meta name="description" content="Página de Gerenciamento de Erros das máquinas do CIET.">
    {:else} -->
    <title>CIET | Soluções do Erro </title> <!-- Chamado de maqs por erro inicial meu, mas visto que os erros estão ligados as máquinas não tem muito problema.-->
    <meta name="description" content="Página de Gerenciamento de Erros das máquinas do CIET.">   
    <!-- {/if} -->
  
</svelte:head>