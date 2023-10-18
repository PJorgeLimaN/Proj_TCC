<script lang="ts">

    export let data;



</script>

<body>
    <section class="container">
        <div>
            <form>
                <form action="/maqs?/updateEntry" method="post">

                    <div>
                        <label for="erroId">Código do Erro</label>
                        <input type="text" name="erroId" id="erroId" readonly value={data.eId}>
                    </div>

                    <div>
                        <label for="labName">Laboratório</label>
                        <input type="text" name="labName" id="labName" readonly value={data.nameL}>
                    </div>

                    <div>
                        <label for="maqN">Máquina</label>
                        <input type="number" name="maqN" id="maqN" readonly value="{data.eMaq}">
                    </div>

                    <div>
                        <label for="desc">Descrição do Erro</label>
                        <input type="text" name="desc" id="desc" value={data.desc} required class="descText">
                    </div>

                    <input type="submit" value="Atualizar">
                </form>
            </form>
        </div>
    </section>
</body>

<svelte:head>
  <title>CIET | Erro {data.eId}</title> <!-- Chamado de maqs por erro inicial meu, mas visto que os erros estão ligados as máquinas não tem muito problema.-->
  <meta name="description" content="Página de Gerenciamento de Erros das máquinas do CIET.">
</svelte:head>