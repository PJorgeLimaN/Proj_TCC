<script lang="ts">
	import { redirect } from '@sveltejs/kit';


    export let data;

/* Possibilidades:
    Como é uma tela para editar um laboratório, pode também ser utilizada como tela para ver um laboratório específico e os erros pertinentes somente aquele laboratório
    Algo como se o usuário clicar no botão de editar envia um código e se clicar no laboratório em si ele envia outro
    Ou se for apenas um professor aparece somente as informações do laboratório mas sem o botão de enviar os dados novos.
    
*/

</script>

<body>
    <section class="container">
        <div>
            <form>
                <form action="/labs?/updateLab" method="post">

                    <div>
                        <label for="labId">Código do Erro</label>
                        <input type="text" name="labId" id="labId" readonly value={data.idLab}>
                    </div>

                    <div>
                        <label for="labName">Laboratório</label>
                        <input type="text" name="labName" id="labName" value={data.labName}>
                    </div>

                    <div>
                        <label for="maqs">Máquina</label>
                        <input type="number" name="maqs" id="maqs" value="{data.labMaqs}">
                    </div>

                    <input type="submit" value="Atualizar">

                    <a href="./" class="button">Voltar</a>
                </form>
            </form>
        </div>
    </section>
</body>

<svelte:head>
  <title>CIET | Laboratório {data.labName}</title> <!-- Chamado de maqs por erro inicial meu, mas visto que os erros estão ligados as máquinas não tem muito problema.-->
  <meta name="description" content="Página de Gerenciamento de Erros das máquinas do CIET.">
</svelte:head>