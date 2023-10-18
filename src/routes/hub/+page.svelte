
<header>
  <nav>
    <a href="./labs">Laboratórios</a>
    <a href="./maqs">Máquinas</a>
  </nav>
</header>

<body>


  <!-- <div>
    <form method="post" action="/hub?/addLab">

      <label for="lab_nome">Nome do Laboratório</label>
      <input type="text" name="lab_nome" title="Nome do Laboratório" required/><br>

      <label for="maq_qt">Quantidade de Máquinas</label>
      <input type="number" name="maq_qt" title="Quantidade de Máquinas" required/><br>

      <button>Enviar</button><br>

    </form>
  </div> 

  <div>
    <form method="post" action="/hub?/addErr">

      <label for="lab_id">Laboratório</label>
      <select name="lab_id" title="laboratório">
        {#each data.labData as labs}
          <option value="{labs.lab_id}">{labs.lab_name}</option>
        {/each}
      </select>

      {@debug selLab}

      <label for="maq_id">Máquina</label>
      <input type="number" name="maq_id" title="Máquina" required min="1" max="100" value="1"/><br>

      <label for="error">Descrição do Erro</label>
      <input type="text" name="error" title="Descrição" required size="100"/><br>

      <button>Enviar</button><br>

    </form>
  </div>

</section>

<br>

<section class="show-error">
  
  <table>
    <tr>
      <th>ID do Erro</th>
      <th>Laboratório</th>
      <th>Máquina</th>
      <th>Descrição</th>
      <th>Status</th>
    </tr>
    
    {#each data.errData as error}
    
      <tr>
        <td>{error.error_id}</td>
        <td>{error.labs.lab_name}</td>
        <td>{error.error_maq}</td>
        <td>{error.description}</td>
        <td>{error.isFixed}</td>
        <td>
          <form method="POST" action="/hub?/deleteEntry">
            <input type="hidden" name="id" value={error.error_id} />
            <button>Remover</button>
          </form>
        </td>
        
        {@debug error} 
        
      </tr>
    
    {/each}
  </table>

  <div class="delete">
    <p>Selecione qual entrada deseja deletar permanentemente.</p>
    <form method="POST" action="/hub?/deleteEntry">
      <select name="id">
        {#each data.errData as err}
          <option value="{err.error_id}">{err.error_id}</option>
        {/each}
      </select>
      <button>Deletar</button>
    </form>
  </div> 

</section>

<section class="show-labs">
  
  <table>
    <tr>
      <th>ID do Laboratório</th>
      <th>Nome do Laboratório</th>
      <th>Quantidade de Máquinas</th>
    </tr>
    {#each data.labData as labs}
      <tr>
        
          <td>{labs.lab_id}</td>
          <td>{labs.lab_name}</td>
          <td>{labs.maqs}</td>
          <td>
        <form method="POST" action="/hub?/deleteLab" >
          <input type="hidden" name="id" value={labs.lab_id} />
          <button value="Remover" aria-label="Remove">Remover</button>
        </form>
      </td>
      </tr>
    {/each}
  </table>


</section> -->

<p>    </p>
</body>

<svelte:head>
  <title>CIET | Página Central</title>
  <meta name="description" content="Página Central do Sistema de Gerenciamento de Erros do CIET.">
</svelte:head>
<!--

  Todos tem acesso a ver quais erros existem nos laboratórios, e todos podem adicionar novos
  Mas somente administradores e bolsistas tem direito de editar e marcar como resolvidos.
  Logo, arrumar um jeito de mostrar as opções de editar e "resolver" somente para esses dois tipos de usuário.


    
  -->
  