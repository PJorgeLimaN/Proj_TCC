<script lang="ts">
  export let data;

  const labsData = data.labErrCount;
  const usrType = data.typeUsr || 0;

  /* 
  Decidir se o hub será clicável (Provavelmente terá de ser feito um teste para ver se o usuário está logado ou não para poder escolher laboratórios específicos) ou se ficará somente para amostra inicial.
  Decidir também se a tabela de laboratórios e quantidade de erros por laboratório será visível somente para usuários logados ou se qualquer pode ver
  Caso qualquer um possa ver a tabela, automaticamente somente Bolsistas (2) e Administradores (1) poderão visualizar laboratórios específicos.
  */

</script>

<header>
  
  <nav>
    {#if +usrType != 0}
      {#if (+usrType > 0) && (+usrType < 4) }
        <a href="./labs">Laboratórios</a>
      {/if}
        <a href="./maqs">Máquinas</a>
    {/if}
    {#if +usrType == 0}
      <a href="./login">Favor Realizar Login</a>
    {/if}
  </nav>
</header>

<body>

  <table class="hubTable">
    
    <th>Laboratório</th>
    <th>Máquinas</th>
    <th>Erros</th>

    {#each labsData as labs}

    <tr>
      <td>{labs.lab_name}</td>
      <td>{labs.maqs}</td>
      <td>{labs._count.errors}</td>
    </tr>
      
    {/each}
    


  </table>


  <!-- 
    Mostrar Lista de laboratórios 
   -->

</body>

<svelte:head>
  <title>CIET | Página Central</title>
  <meta name="description" content="Página Central do Sistema de Gerenciamento de Erros do CIET.">
</svelte:head>

<!--

  Todos tem acesso a ver quais erros existem nos laboratórios, e todos podem adicionar novos
  Mas somente administradores e bolsistas devem ter direito de editar e marcar como resolvidos.
  Logo, arrumar um jeito de mostrar as opções de editar e "resolver" somente para esses dois tipos de usuário.
    
  -->
  