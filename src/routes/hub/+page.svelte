<script lang="ts">
  export let data;
  export let form;

  /* const labsData = data.labErrCount; */
  const usrType = data.typeUsr || 0;
  const count = data.totalErrCount;
  const labsCount = data.labErr;

  

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
        <a href="./reports">Erros</a>
    {/if}
    {#if +usrType == 0}
      <a href="./login">Favor Realizar Login</a>
    {/if}
  </nav>
</header>

<body>

  <section class="container">
  {#if form?.message}
    <h2>{form?.message}</h2>
  {:else if form?.sucess}
    <h2>{form?.sucess} Favor recarregar a página.</h2>
  {/if}
  </section>      

  {#if +usrType == 4 || +usrType == 3}
  <section class="container">
    <div>
      <h3>Instruções</h3>
      <p>Leia todas as instruções, e aperte o botão Erro acima para prosseguir.</p>
      <p>Selecione em qual laboratório se encontra o erro, se não souber em que lab está, pergunte ao professor ou veja na placa do lado de fora.</p>
      <p>Na próxima página, informe o número da máquina em questão, deve haver uma folha dizendo qual a máquina ao lado do computador.</p>
      <p>Na página final, descreva qual o erro, com a maior quantidade de detalhes que puder. Se o computador der algum código ou linha explicando qual o erro, escreva a linha inteira.</p>
      <p>Se for um erro que necessita ser resolvido imediatamente, desça na oficina e avise aos bolsistas.</p><br>
      <p>Se o erro que encontrou já estiver na lista, no laboratório e máquina corretos, favor não adicionar novamente.</p>
      <p></p>
    </div>
  </section>

  {:else if +usrType > 0 && +usrType < 3}
  <section class="container">
    <div>
      <h2>Sistema de Gerenciamento de Erros CIET</h2>
      <h3>Existem {count} erros não resolvidos no momento.</h3>
    </div>

    <table class="hubTable">    
      
      <th>Laboratório</th>
      <th>Máquinas</th>
      <th>Erros</th>
  
      {#each labsCount as labs}
  
      <tr>
        <td>{labs.lab_name}</td>
        <td>{labs.maqs}</td>
        <td>{labs._count.machines}</td>
        <td><a href="/labs/{labs.lab_id}" class="button">Ver Laboratório</a></td>
      </tr>
        
      {/each}
      
    </table> 
  </section>

  {:else}
  <section class="container">
    <div>
      <h1>Bem-Vindo ao Sistema de Gerenciamento de Erros do CIET</h1>
    </div>
  </section>
  

  {/if}
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
  